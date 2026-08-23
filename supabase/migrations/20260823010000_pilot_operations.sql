begin;

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

  if p_event_type not in ('login', 'dashboard_view', 'profile_updated', 'service_started', 'interest_confirmed') then
    raise exception 'Unsupported activity type.' using errcode = 'P0001';
  end if;

  insert into public.activity_events (user_id, event_type, metadata)
  values (auth.uid(), p_event_type, coalesce(p_metadata, '{}'::jsonb));

  update public.profiles set last_active_at = now(), updated_at = now() where id = auth.uid();
  return true;
end;
$$;

create or replace function public.unsubscribe_newsletter(p_email text)
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
  update public.newsletter_subscribers set active = false, updated_at = now() where email = v_email;
  return true;
end;
$$;

create or replace function public.delete_my_account(p_confirmation text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_email text;
begin
  if v_user_id is null then
    raise exception 'Authentication required.' using errcode = 'P0001';
  end if;
  if upper(trim(coalesce(p_confirmation, ''))) <> 'DELETE' then
    raise exception 'Type DELETE to confirm account deletion.' using errcode = 'P0001';
  end if;

  select lower(email) into v_email from auth.users where id = v_user_id;
  delete from public.newsletter_subscribers where email = v_email;
  delete from auth.users where id = v_user_id;
  return true;
end;
$$;

create or replace function public.admin_set_contact_status(p_submission_id uuid, p_status text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_admin(auth.uid()) then
    raise exception 'Admin access required.' using errcode = 'P0001';
  end if;
  if p_status not in ('new', 'in_progress', 'closed') then
    raise exception 'Invalid contact status.' using errcode = 'P0001';
  end if;
  update public.contact_submissions set status = p_status where id = p_submission_id;
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
    'verified_signups', (select count(*) from public.profiles),
    'active_users', (
      select count(distinct user_id) from public.activity_events
      where event_type in ('service_started', 'interest_confirmed')
    ),
    'contact_messages', (select count(*) from public.contact_submissions),
    'newsletter_subscribers', (select count(*) from public.newsletter_subscribers where active),
    'by_service', coalesce((
      select jsonb_agg(jsonb_build_object('service', selected_service, 'count', total) order by total desc)
      from (select selected_service, count(*) as total from public.profiles group by selected_service) service_counts
    ), '[]'::jsonb),
    'by_promo', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', id, 'label', label, 'used_count', used_count, 'max_uses', max_uses,
        'active', active, 'allowed_services', allowed_services, 'expires_at', expires_at, 'created_at', created_at
      ) order by created_at desc) from public.promo_codes
    ), '[]'::jsonb),
    'daily_signups', coalesce((
      select jsonb_agg(jsonb_build_object('day', signup_day, 'count', total) order by signup_day)
      from (
        select created_at::date as signup_day, count(*) as total from public.profiles
        where created_at >= current_date - interval '13 days' group by created_at::date
      ) daily_counts
    ), '[]'::jsonb),
    'recent_signups', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', p.id, 'name', p.full_name, 'email', p.email, 'service', p.selected_service,
        'promo', r.promo_label, 'verified', true,
        'interest_confirmed', exists (
          select 1 from public.activity_events a
          where a.user_id = p.id and a.event_type in ('service_started', 'interest_confirmed')
        ),
        'created_at', p.created_at, 'last_active_at', p.last_active_at
      ) order by p.created_at desc)
      from (select * from public.profiles order by created_at desc limit 100) p
      left join public.promo_redemptions r on r.user_id = p.id
    ), '[]'::jsonb),
    'contacts', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', id, 'name', name, 'email', email, 'topic', topic, 'message', message,
        'status', status, 'created_at', created_at
      ) order by created_at desc)
      from (select * from public.contact_submissions order by created_at desc limit 100) c
    ), '[]'::jsonb),
    'subscribers', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', id, 'email', email, 'source', source, 'active', active,
        'subscribed_at', subscribed_at, 'updated_at', updated_at
      ) order by subscribed_at desc)
      from (select * from public.newsletter_subscribers order by subscribed_at desc limit 500) s
    ), '[]'::jsonb)
  );
end;
$$;

revoke all on function public.unsubscribe_newsletter(text) from public;
revoke all on function public.delete_my_account(text) from public;
revoke all on function public.admin_set_contact_status(uuid, text) from public;
grant execute on function public.unsubscribe_newsletter(text) to anon, authenticated;
grant execute on function public.delete_my_account(text) to authenticated;
grant execute on function public.admin_set_contact_status(uuid, text) to authenticated;

commit;

