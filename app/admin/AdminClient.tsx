"use client";

import Link from "next/link";
import { type FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import FormNotice from "@/components/FormNotice";
import { ACCOUNT_BUTTON, ACCOUNT_FIELD, friendlyAccountError, isPlanId } from "@/lib/account";
import { PLAN_BY_ID, PLANS } from "@/lib/pricing";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type ServiceCount = { service: string; count: number };
type DailyCount = { day: string; count: number };
type PromoSummary = {
  id: string;
  label: string;
  used_count: number;
  max_uses: number | null;
  active: boolean;
  allowed_services: string[];
  expires_at: string | null;
  created_at: string;
};
type RecentSignup = {
  id: string;
  name: string;
  email: string;
  service: string;
  promo: string;
  verified: boolean;
  interest_confirmed: boolean;
  created_at: string;
  last_active_at: string | null;
};
type ContactSubmission = { id: string; name: string; email: string; topic: string; message: string; status: "new" | "in_progress" | "closed"; created_at: string };
type Subscriber = { id: string; email: string; source: string; active: boolean; subscribed_at: string; updated_at: string };
type AdminData = {
  total_signups: number;
  verified_signups: number;
  active_users: number;
  contact_messages: number;
  newsletter_subscribers: number;
  by_service: ServiceCount[];
  by_promo: PromoSummary[];
  daily_signups: DailyCount[];
  recent_signups: RecentSignup[];
  contacts: ContactSubmission[];
  subscribers: Subscriber[];
};

function csvCell(value: unknown) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function downloadCsv(filename: string, headers: string[], rows: unknown[][]) {
  const csv = [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function AdminClient() {
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [claimRequired, setClaimRequired] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [serviceFilter, setServiceFilter] = useState("all");
  const [campaignFilter, setCampaignFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");
    const supabase = getSupabaseBrowserClient();
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      window.location.replace("/login/?next=/admin/");
      return;
    }

    const { data: dashboardData, error: dashboardError } = await supabase.rpc("get_admin_dashboard");
    if (dashboardError) {
      if (dashboardError.message.toLowerCase().includes("admin access")) setClaimRequired(true);
      else setError(friendlyAccountError(dashboardError.message));
      setData(null);
    } else {
      setClaimRequired(false);
      setData(dashboardData as AdminData);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadDashboard(); }, 0);
    return () => window.clearTimeout(timer);
  }, [loadDashboard]);

  const maxServiceCount = useMemo(
    () => Math.max(1, ...(data?.by_service || []).map((item) => Number(item.count))),
    [data],
  );

  const filteredSignups = useMemo(() => (data?.recent_signups || []).filter((signup) => {
    if (serviceFilter !== "all" && signup.service !== serviceFilter) return false;
    if (campaignFilter !== "all" && signup.promo !== campaignFilter) return false;
    if (dateFilter && signup.created_at.slice(0, 10) < dateFilter) return false;
    return true;
  }), [data, serviceFilter, campaignFilter, dateFilter]);

  async function handleOwnerClaim(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const code = String(new FormData(event.currentTarget).get("owner_code") || "");
    const { error: claimError } = await getSupabaseBrowserClient().rpc("claim_owner_access", { p_code: code });
    if (claimError) setError(friendlyAccountError(claimError.message));
    else {
      setNotice("Owner access activated.");
      await loadDashboard();
    }
    setSubmitting(false);
  }

  async function handleCreatePromo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setNotice("");
    const form = new FormData(event.currentTarget);
    const code = String(form.get("code") || "").trim().toUpperCase();
    const label = String(form.get("label") || "").trim();
    const maxUsesRaw = String(form.get("max_uses") || "").trim();
    const service = String(form.get("service") || "all");
    const expiresRaw = String(form.get("expires_at") || "").trim();
    const { data: created, error: createError } = await getSupabaseBrowserClient().rpc("admin_create_promo", {
      p_code: code,
      p_label: label,
      p_max_uses: maxUsesRaw ? Number(maxUsesRaw) : null,
      p_allowed_services: service === "all" ? [] : [service],
      p_expires_at: expiresRaw ? new Date(`${expiresRaw}T23:59:59`).toISOString() : null,
    });

    if (createError) setError(friendlyAccountError(createError.message));
    else {
      setNotice(`Promo created: ${(created as { code: string }).code}. Copy it now and share it with the intended users.`);
      event.currentTarget.reset();
      await loadDashboard();
    }
    setSubmitting(false);
  }

  async function handleTogglePromo(promo: PromoSummary) {
    setError("");
    const { error: toggleError } = await getSupabaseBrowserClient().rpc("admin_toggle_promo", {
      p_promo_id: promo.id,
      p_active: !promo.active,
    });
    if (toggleError) setError(friendlyAccountError(toggleError.message));
    else await loadDashboard();
  }

  async function handleContactStatus(contact: ContactSubmission, status: ContactSubmission["status"]) {
    setError("");
    const { error: statusError } = await getSupabaseBrowserClient().rpc("admin_set_contact_status", { p_submission_id: contact.id, p_status: status });
    if (statusError) setError(friendlyAccountError(statusError.message));
    else await loadDashboard();
  }

  if (loading) {
    return <section className="border-b border-line py-24"><div className="shell max-w-6xl"><p className="text-muted">Loading signup analytics…</p></div></section>;
  }

  if (claimRequired) {
    return (
      <section className="border-b border-line py-20 md:py-28">
        <div className="shell max-w-md">
          <span className="eyebrow">Private analytics</span>
          <h1 className="mt-4 text-[32px]">Admin access required.</h1>
          <p className="mt-3 text-[14.5px] leading-relaxed text-muted">Private signup, message, and campaign data is available only to an authorised admin account.</p>
          <form onSubmit={handleOwnerClaim} className="card mt-8 space-y-4 p-7">
            <label className="block">
              <span className="mb-2 block text-[13px] font-semibold text-ink">Owner access code</span>
              <input className={`${ACCOUNT_FIELD} uppercase`} name="owner_code" autoComplete="off" required />
            </label>
            {error && <FormNotice tone="error">{error}</FormNotice>}
            <button className={ACCOUNT_BUTTON} disabled={submitting}>{submitting ? "Activating…" : "Activate analytics"}</button>
          </form>
        </div>
      </section>
    );
  }

  if (!data) {
    return <section className="border-b border-line py-24"><div className="shell max-w-2xl"><FormNotice tone="error">{error || "Analytics are unavailable."}</FormNotice></div></section>;
  }

  const metricCards = [
    ["Total signups", data.total_signups],
    ["Active accounts", data.verified_signups],
    ["Interest confirmed", data.active_users],
    ["Contact messages", data.contact_messages],
    ["Newsletter", data.newsletter_subscribers],
  ] as const;

  return (
    <section className="border-b border-line bg-surface py-12 md:py-16">
      <div className="shell max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Pilot operations</span>
            <h1 className="mt-3 text-[32px] md:text-[40px]">Demand, campaigns, and follow-up.</h1>
            <p className="mt-3 text-[15px] text-muted">See which tracks attract users, who confirmed interest, and which messages need a response.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={loadDashboard} className="rounded-full border border-line bg-white px-4 py-2.5 text-[13.5px] font-semibold text-ink">Refresh</button>
            <Link href="/dashboard" className="rounded-full bg-brand-deep px-4 py-2.5 text-[13.5px] font-semibold text-white">My dashboard</Link>
          </div>
        </div>

        {(error || notice) && <div className="mt-6"><FormNotice tone={error ? "error" : "success"}>{error || notice}</FormNotice></div>}

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {metricCards.map(([label, value]) => (
            <div key={label} className="card p-5">
              <p className="text-[12px] font-semibold text-muted">{label}</p>
              <p className="mt-2 font-display text-[30px] font-extrabold text-ink">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="card p-6 md:p-7">
            <h2 className="text-[21px]">Signups by track</h2>
            <div className="mt-6 space-y-5">
              {data.by_service.length === 0 && <p className="text-[14px] text-muted">No signups yet.</p>}
              {data.by_service.map((item) => {
                const plan = isPlanId(item.service) ? PLAN_BY_ID[item.service] : null;
                return (
                  <div key={item.service}>
                    <div className="flex items-center justify-between gap-4 text-[13.5px]"><span className="font-semibold text-ink">{plan?.name || item.service}</span><span className="text-muted">{item.count}</span></div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2"><div className="h-full rounded-full bg-brand" style={{ width: `${(Number(item.count) / maxServiceCount) * 100}%` }} /></div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card p-6 md:p-7">
            <h2 className="text-[21px]">Last 14 days</h2>
            <div className="mt-6 flex h-44 items-end gap-2">
              {data.daily_signups.length === 0 && <p className="self-start text-[14px] text-muted">Daily signup activity will appear here.</p>}
              {data.daily_signups.map((item) => {
                const max = Math.max(1, ...data.daily_signups.map((day) => Number(day.count)));
                return (
                  <div key={item.day} className="group flex min-w-0 flex-1 flex-col items-center justify-end gap-2" title={`${item.day}: ${item.count} signups`}>
                    <span className="text-[10px] font-semibold text-muted opacity-0 transition-opacity group-hover:opacity-100">{item.count}</span>
                    <div className="w-full rounded-t-md bg-brand" style={{ height: `${Math.max(10, (Number(item.count) / max) * 120)}px` }} />
                    <span className="hidden text-[9px] text-faint sm:block">{new Date(`${item.day}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="card p-6 md:p-7">
            <h2 className="text-[21px]">Create a promo campaign</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted">Use separate labels or codes to compare audiences without exposing the codes later.</p>
            <form onSubmit={handleCreatePromo} className="mt-5 space-y-4">
              <label className="block"><span className="mb-2 block text-[12.5px] font-semibold text-ink">Campaign label</span><input className={ACCOUNT_FIELD} name="label" placeholder="September campus event" required /></label>
              <label className="block"><span className="mb-2 block text-[12.5px] font-semibold text-ink">Promo code</span><input className={`${ACCOUNT_FIELD} uppercase`} name="code" placeholder="CAMPUS-SEP26" minLength={6} maxLength={80} required /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="mb-2 block text-[12.5px] font-semibold text-ink">Allowed track</span><select className={ACCOUNT_FIELD} name="service" defaultValue="all"><option value="all">All tracks</option>{PLANS.map((plan) => <option key={plan.id} value={plan.id}>{plan.name}</option>)}</select></label>
                <label className="block"><span className="mb-2 block text-[12.5px] font-semibold text-ink">Maximum uses</span><input className={ACCOUNT_FIELD} name="max_uses" type="number" min={1} placeholder="Unlimited" /></label>
              </div>
              <label className="block"><span className="mb-2 block text-[12.5px] font-semibold text-ink">Expiry date</span><input className={ACCOUNT_FIELD} name="expires_at" type="date" /></label>
              <button className={ACCOUNT_BUTTON} disabled={submitting}>{submitting ? "Creating…" : "Create promo code"}</button>
            </form>
          </div>

          <div className="card overflow-hidden">
            <div className="border-b border-line p-6 md:p-7"><h2 className="text-[21px]">Promo campaigns</h2><p className="mt-2 text-[13.5px] text-muted">Codes are stored securely; only their labels and performance remain visible.</p></div>
            <div className="divide-y divide-line">
              {data.by_promo.map((promo) => (
                <div key={promo.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2"><p className="font-semibold text-ink">{promo.label}</p><span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${promo.active ? "bg-brand-light text-brand-deep" : "bg-surface-2 text-muted"}`}>{promo.active ? "Active" : "Paused"}</span></div>
                    <p className="mt-1 text-[12.5px] text-muted">{promo.used_count}{promo.max_uses ? ` of ${promo.max_uses}` : ""} uses · {promo.allowed_services.length ? promo.allowed_services.map((service) => isPlanId(service) ? PLAN_BY_ID[service].name : service).join(", ") : "All services"}</p>
                  </div>
                  <button onClick={() => handleTogglePromo(promo)} className="w-fit rounded-full border border-line px-3 py-2 text-[12px] font-semibold text-ink hover:border-brand-mid">{promo.active ? "Pause" : "Reactivate"}</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card mt-6 overflow-hidden">
          <div className="border-b border-line p-6 md:p-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div><h2 className="text-[21px]">Recent signups</h2><p className="mt-2 text-[13.5px] text-muted">Filter the newest 100 accounts by track, campaign, or join date.</p></div>
              <button onClick={() => downloadCsv("gethired-signups.csv", ["Name", "Email", "Track", "Campaign", "Interest confirmed", "Joined"], filteredSignups.map((signup) => [signup.name, signup.email, signup.service, signup.promo, signup.interest_confirmed ? "Yes" : "No", signup.created_at]))} className="rounded-full border border-line bg-white px-4 py-2.5 text-[12.5px] font-semibold text-ink hover:border-brand-mid">Export filtered CSV</button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <label><span className="mb-1.5 block text-[11.5px] font-semibold text-muted">Track</span><select className={ACCOUNT_FIELD} value={serviceFilter} onChange={(event) => setServiceFilter(event.target.value)}><option value="all">All tracks</option>{PLANS.map((plan) => <option key={plan.id} value={plan.id}>{plan.name}</option>)}</select></label>
              <label><span className="mb-1.5 block text-[11.5px] font-semibold text-muted">Campaign</span><select className={ACCOUNT_FIELD} value={campaignFilter} onChange={(event) => setCampaignFilter(event.target.value)}><option value="all">All campaigns</option>{data.by_promo.map((promo) => <option key={promo.id} value={promo.label}>{promo.label}</option>)}</select></label>
              <label><span className="mb-1.5 block text-[11.5px] font-semibold text-muted">Joined on or after</span><input className={ACCOUNT_FIELD} type="date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} /></label>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-[13px]">
              <thead className="bg-surface text-muted"><tr><th className="px-5 py-3 font-semibold">User</th><th className="px-5 py-3 font-semibold">Track</th><th className="px-5 py-3 font-semibold">Promo</th><th className="px-5 py-3 font-semibold">Account</th><th className="px-5 py-3 font-semibold">Interest</th><th className="px-5 py-3 font-semibold">Joined</th></tr></thead>
              <tbody className="divide-y divide-line bg-white">
                {filteredSignups.map((signup) => (
                  <tr key={signup.id}>
                    <td className="px-5 py-4"><p className="font-semibold text-ink">{signup.name}</p><p className="mt-0.5 text-[11.5px] text-faint">{signup.email}</p></td>
                    <td className="px-5 py-4 font-semibold text-ink">{isPlanId(signup.service) ? PLAN_BY_ID[signup.service].name : signup.service}</td>
                    <td className="px-5 py-4 text-muted">{signup.promo}</td>
                    <td className="px-5 py-4"><span className="rounded-full bg-brand-light px-2 py-1 text-[10px] font-bold uppercase text-brand-deep">Active</span></td>
                    <td className="px-5 py-4 text-muted">{signup.interest_confirmed ? "Confirmed" : "Not yet"}</td>
                    <td className="px-5 py-4 text-muted">{new Date(signup.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
                {!filteredSignups.length && <tr><td colSpan={6} className="px-5 py-8 text-center text-muted">No signups match these filters.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="card overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-line p-6 md:flex-row md:items-center md:justify-between md:p-7"><div><h2 className="text-[21px]">Contact inbox</h2><p className="mt-2 text-[13.5px] text-muted">Messages submitted through the public contact form.</p></div><span className="w-fit rounded-full bg-brand-light px-3 py-1.5 text-[11px] font-bold uppercase text-brand-deep">{data.contacts.filter((contact) => contact.status === "new").length} new</span></div>
            <div className="divide-y divide-line">
              {data.contacts.map((contact) => (
                <article key={contact.id} className="p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><h3 className="text-[16px]">{contact.name}</h3><span className="rounded-full bg-surface px-2 py-1 text-[10px] font-bold uppercase text-muted">{contact.topic}</span></div><a href={`mailto:${contact.email}`} className="mt-1 inline-block text-[12.5px] font-semibold text-brand-dark underline underline-offset-2">{contact.email}</a></div><select aria-label={`Status for message from ${contact.name}`} className="rounded-lg border border-line bg-white px-3 py-2 text-[12px] font-semibold text-ink" value={contact.status} onChange={(event) => void handleContactStatus(contact, event.target.value as ContactSubmission["status"])}><option value="new">New</option><option value="in_progress">In progress</option><option value="closed">Closed</option></select></div>
                  <p className="mt-4 whitespace-pre-wrap text-[14px] leading-relaxed text-ink-2">{contact.message}</p>
                  <p className="mt-3 text-[11.5px] text-faint">Received {new Date(contact.created_at).toLocaleString()}</p>
                </article>
              ))}
              {!data.contacts.length && <p className="p-6 text-[14px] text-muted">No contact messages yet.</p>}
            </div>
          </div>

          <div className="card h-fit overflow-hidden">
            <div className="border-b border-line p-6"><h2 className="text-[21px]">Pilot update list</h2><p className="mt-2 text-[13.5px] text-muted">Active subscribers only are included in exports.</p><button onClick={() => downloadCsv("gethired-subscribers.csv", ["Email", "Source", "Subscribed"], data.subscribers.filter((subscriber) => subscriber.active).map((subscriber) => [subscriber.email, subscriber.source, subscriber.subscribed_at]))} className="mt-4 rounded-full border border-line px-4 py-2 text-[12px] font-semibold text-ink hover:border-brand-mid">Export active CSV</button></div>
            <div className="max-h-[520px] divide-y divide-line overflow-y-auto">
              {data.subscribers.map((subscriber) => <div key={subscriber.id} className="p-4"><p className="break-all text-[13px] font-semibold text-ink">{subscriber.email}</p><p className="mt-1 text-[11.5px] text-faint">{subscriber.active ? "Active" : "Unsubscribed"} · {subscriber.source} · {new Date(subscriber.subscribed_at).toLocaleDateString()}</p></div>)}
              {!data.subscribers.length && <p className="p-6 text-[14px] text-muted">No subscribers yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

