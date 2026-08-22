begin;

create extension if not exists pgcrypto;

create table if not exists public.promo_codes (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  code_hash text not null unique,
  allowed_services text[] not null default '{}',
  active boolean not null default true,
  max_uses integer,
  used_count integer not null default 0,
  starts_at timestamptz not null default now(),
  expires_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint promo_codes_max_uses_check check (max_uses is null or max_uses > 0),
  constraint promo_codes_used_count_check check (used_count >= 0)
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null,
  selected_service text not null,
  role text not null default 'user',
  access_status text not null default 'promo',
  last_active_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_service_check check (selected_service in ('free', 'learner', 'jobseeker', 'switcher', 'interview')),
  constraint profiles_role_check check (role in ('user', 'admin')),
  constraint profiles_access_check check (access_status in ('promo', 'paused', 'expired'))
);

create table if not exists public.promo_redemptions (
  id uuid primary key default gen_random_uuid(),
  promo_code_id uuid not null references public.promo_codes(id) on delete restrict,
  promo_label text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  selected_service text not null,
  redeemed_at timestamptz not null default now(),
  unique (user_id),
  constraint promo_redemptions_service_check check (selected_service in ('free', 'learner', 'jobseeker', 'switcher', 'interview'))
);

create table if not exists public.activity_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  topic text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  constraint contact_topic_check check (topic in ('support', 'billing', 'institutions', 'other')),
  constraint contact_status_check check (status in ('new', 'in_progress', 'closed'))
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'footer',
  active boolean not null default true,
  subscribed_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.owner_claim_tokens (
  id smallint primary key default 1,
  code_hash text not null unique,
  claimed_by uuid references auth.users(id) on delete set null,
  claimed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint owner_claim_tokens_singleton check (id = 1)
);

alter table public.promo_codes enable row level security;
alter table public.profiles enable row level security;
alter table public.promo_redemptions enable row level security;
alter table public.activity_events enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.owner_claim_tokens enable row level security;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

drop policy if exists "Users can read their own redemption" on public.promo_redemptions;
create policy "Users can read their own redemption"
on public.promo_redemptions for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can read their own activity" on public.activity_events;
create policy "Users can read their own activity"
on public.activity_events for select
to authenticated
using ((select auth.uid()) = user_id);

revoke all on all tables in schema public from anon, authenticated;
grant usage on schema public to anon, authenticated;
grant select on public.profiles, public.promo_redemptions, public.activity_events to authenticated;
grant update (full_name, last_active_at, updated_at) on public.profiles to authenticated;

create or replace function public.is_admin(p_user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = p_user_id and role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_code text;
  v_hash text;
  v_service text;
  v_name text;
  v_promo_id uuid;
  v_promo_label text;
begin
  v_code := upper(trim(coalesce(new.raw_user_meta_data ->> 'promo_code', '')));
  v_service := coalesce(nullif(new.raw_user_meta_data ->> 'selected_service', ''), 'free');
  v_name := trim(coalesce(new.raw_user_meta_data ->> 'full_name', ''));

  if v_name = '' or char_length(v_name) > 120 then
    raise exception 'Please enter a valid full name.' using errcode = 'P0001';
  end if;

  if v_service not in ('free', 'learner', 'jobseeker', 'switcher', 'interview') then
    raise exception 'Please select a valid service.' using errcode = 'P0001';
  end if;

  if v_code = '' then
    raise exception 'A valid promo code is required.' using errcode = 'P0001';
  end if;

  v_hash := encode(extensions.digest(v_code, 'sha256'), 'hex');

  select id, label
  into v_promo_id, v_promo_label
  from public.promo_codes
  where code_hash = v_hash
    and active = true
    and starts_at <= now()
    and (expires_at is null or expires_at > now())
    and (max_uses is null or used_count < max_uses)
    and (cardinality(allowed_services) = 0 or v_service = any(allowed_services))
  for update;

  if v_promo_id is null then
    raise exception 'That promo code is invalid, expired, or unavailable for this service.' using errcode = 'P0001';
  end if;

  insert into public.profiles (id, email, full_name, selected_service)
  values (new.id, coalesce(new.email, ''), v_name, v_service);

  insert into public.promo_redemptions (promo_code_id, promo_label, user_id, selected_service)
  values (v_promo_id, v_promo_label, new.id, v_service);

  update public.promo_codes
  set used_count = used_count + 1
  where id = v_promo_id;

  insert into public.activity_events (user_id, event_type, metadata)
  values (new.id, 'signup_completed', jsonb_build_object('service', v_service, 'promo', v_promo_label));

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.track_activity(p_event_type text, p_metadata jsonb default '{}'::jsonb)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required.' using errcode = 'P0001';
  end if;

  if p_event_type not in ('login', 'dashboard_view', 'profile_updated', 'service_started') then
    raise exception 'Unsupported activity type.' using errcode = 'P0001';
  end if;

  insert into public.activity_events (user_id, event_type, metadata)
  values (auth.uid(), p_event_type, coalesce(p_metadata, '{}'::jsonb));

  update public.profiles
  set last_active_at = now(), updated_at = now()
  where id = auth.uid();

  return true;
end;
$$;

create or replace function public.submit_contact(
  p_name text,
  p_email text,
  p_topic text,
  p_message text,
  p_company text default ''
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid := gen_random_uuid();
  v_email text := lower(trim(p_email));
begin
  if trim(coalesce(p_company, '')) <> '' then
    return v_id;
  end if;

  if char_length(trim(coalesce(p_name, ''))) < 2 or char_length(trim(p_name)) > 120 then
    raise exception 'Please enter a valid name.' using errcode = 'P0001';
  end if;
  if v_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then
    raise exception 'Please enter a valid email.' using errcode = 'P0001';
  end if;
  if p_topic not in ('support', 'billing', 'institutions', 'other') then
    raise exception 'Please choose a valid topic.' using errcode = 'P0001';
  end if;
  if char_length(trim(coalesce(p_message, ''))) < 10 or char_length(trim(p_message)) > 5000 then
    raise exception 'Please enter a message between 10 and 5,000 characters.' using errcode = 'P0001';
  end if;

  insert into public.contact_submissions (id, user_id, name, email, topic, message)
  values (v_id, auth.uid(), trim(p_name), v_email, p_topic, trim(p_message));

  return v_id;
end;
$$;

create or replace function public.subscribe_newsletter(p_email text, p_source text default 'footer')
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text := lower(trim(p_email));
begin
  if v_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then
    raise exception 'Please enter a valid email.' using errcode = 'P0001';
  end if;

  insert into public.newsletter_subscribers (email, source)
  values (v_email, left(coalesce(nullif(trim(p_source), ''), 'footer'), 80))
  on conflict (email) do update
    set active = true, source = excluded.source, updated_at = now();

  return true;
end;
$$;

create or replace function public.claim_owner_access(p_code text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_claimed smallint;
begin
  if auth.uid() is null then
    raise exception 'Authentication required.' using errcode = 'P0001';
  end if;

  update public.owner_claim_tokens
  set claimed_by = auth.uid(), claimed_at = now()
  where id = 1
    and claimed_by is null
    and code_hash = encode(extensions.digest(upper(trim(p_code)), 'sha256'), 'hex')
  returning id into v_claimed;

  if v_claimed is null then
    raise exception 'Owner access code is invalid or has already been used.' using errcode = 'P0001';
  end if;

  update public.profiles set role = 'admin', updated_at = now() where id = auth.uid();
  return true;
end;
$$;

create or replace function public.admin_create_promo(
  p_code text,
  p_label text,
  p_max_uses integer default null,
  p_allowed_services text[] default '{}',
  p_expires_at timestamptz default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_code text := upper(trim(p_code));
begin
  if not public.is_admin(auth.uid()) then
    raise exception 'Admin access required.' using errcode = 'P0001';
  end if;
  if char_length(v_code) < 6 or char_length(v_code) > 80 then
    raise exception 'Promo codes must contain between 6 and 80 characters.' using errcode = 'P0001';
  end if;
  if char_length(trim(coalesce(p_label, ''))) < 2 then
    raise exception 'Please enter a campaign label.' using errcode = 'P0001';
  end if;
  if p_max_uses is not null and p_max_uses < 1 then
    raise exception 'Maximum uses must be at least 1.' using errcode = 'P0001';
  end if;
  if exists (
    select 1 from unnest(coalesce(p_allowed_services, '{}')) service
    where service not in ('free', 'learner', 'jobseeker', 'switcher', 'interview')
  ) then
    raise exception 'One or more services are invalid.' using errcode = 'P0001';
  end if;

  insert into public.promo_codes (label, code_hash, max_uses, allowed_services, expires_at, created_by)
  values (
    trim(p_label),
    encode(extensions.digest(v_code, 'sha256'), 'hex'),
    p_max_uses,
    coalesce(p_allowed_services, '{}'),
    p_expires_at,
    auth.uid()
  )
  returning id into v_id;

  return jsonb_build_object('id', v_id, 'code', v_code, 'label', trim(p_label));
exception
  when unique_violation then
    raise exception 'That promo code already exists.' using errcode = 'P0001';
end;
$$;

create or replace function public.admin_toggle_promo(p_promo_id uuid, p_active boolean)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_admin(auth.uid()) then
    raise exception 'Admin access required.' using errcode = 'P0001';
  end if;
  update public.promo_codes set active = p_active where id = p_promo_id;
  return found;
end;
$$;

create or replace function public.get_admin_dashboard()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.is_admin(auth.uid()) then
    raise exception 'Admin access required.' using errcode = 'P0001';
  end if;

  return jsonb_build_object(
    'total_signups', (select count(*) from public.profiles),
    'verified_signups', (
      select count(*) from auth.users u
      join public.profiles p on p.id = u.id
      where u.email_confirmed_at is not null
    ),
    'active_users', (
      select count(distinct user_id) from public.activity_events
      where event_type in ('dashboard_view', 'service_started')
    ),
    'contact_messages', (select count(*) from public.contact_submissions),
    'newsletter_subscribers', (select count(*) from public.newsletter_subscribers where active),
    'by_service', coalesce((
      select jsonb_agg(jsonb_build_object('service', selected_service, 'count', total) order by total desc)
      from (
        select selected_service, count(*) as total
        from public.profiles
        group by selected_service
      ) service_counts
    ), '[]'::jsonb),
    'by_promo', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', id,
        'label', label,
        'used_count', used_count,
        'max_uses', max_uses,
        'active', active,
        'allowed_services', allowed_services,
        'expires_at', expires_at,
        'created_at', created_at
      ) order by created_at desc)
      from public.promo_codes
    ), '[]'::jsonb),
    'daily_signups', coalesce((
      select jsonb_agg(jsonb_build_object('day', signup_day, 'count', total) order by signup_day)
      from (
        select created_at::date as signup_day, count(*) as total
        from public.profiles
        where created_at >= current_date - interval '13 days'
        group by created_at::date
      ) daily_counts
    ), '[]'::jsonb),
    'recent_signups', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', p.id,
        'name', p.full_name,
        'email', p.email,
        'service', p.selected_service,
        'promo', r.promo_label,
        'verified', (u.email_confirmed_at is not null),
        'created_at', p.created_at,
        'last_active_at', p.last_active_at
      ) order by p.created_at desc)
      from (
        select * from public.profiles order by created_at desc limit 50
      ) p
      join auth.users u on u.id = p.id
      left join public.promo_redemptions r on r.user_id = p.id
    ), '[]'::jsonb)
  );
end;
$$;

revoke all on function public.is_admin(uuid) from public;
revoke all on function public.handle_new_user() from public;
revoke all on function public.track_activity(text, jsonb) from public;
revoke all on function public.submit_contact(text, text, text, text, text) from public;
revoke all on function public.subscribe_newsletter(text, text) from public;
revoke all on function public.claim_owner_access(text) from public;
revoke all on function public.admin_create_promo(text, text, integer, text[], timestamptz) from public;
revoke all on function public.admin_toggle_promo(uuid, boolean) from public;
revoke all on function public.get_admin_dashboard() from public;

grant execute on function public.is_admin(uuid) to authenticated;
grant execute on function public.track_activity(text, jsonb) to authenticated;
grant execute on function public.submit_contact(text, text, text, text, text) to anon, authenticated;
grant execute on function public.subscribe_newsletter(text, text) to anon, authenticated;
grant execute on function public.claim_owner_access(text) to authenticated;
grant execute on function public.admin_create_promo(text, text, integer, text[], timestamptz) to authenticated;
grant execute on function public.admin_toggle_promo(uuid, boolean) to authenticated;
grant execute on function public.get_admin_dashboard() to authenticated;

insert into public.promo_codes (label, code_hash, max_uses)
values ('Early access 2026', 'ace124ab9cc7f6277d7d0aa96de62d4da548ff9db1d3fe1d57ba788c9b85fa0d', 500)
on conflict (code_hash) do nothing;

insert into public.owner_claim_tokens (id, code_hash)
values (1, 'ccb31611d78bccebe70dcc56fe0ada02a452ada1b5ced06a08025a704182ddd6')
on conflict (id) do nothing;

commit;

