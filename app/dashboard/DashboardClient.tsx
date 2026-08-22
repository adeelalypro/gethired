"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import FormNotice from "@/components/FormNotice";
import { Check, Glyph } from "@/components/Icons";
import { ACCOUNT_FIELD, friendlyAccountError, isPlanId } from "@/lib/account";
import { MODULES, PLAN_BY_ID, type PlanId } from "@/lib/pricing";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type Profile = {
  id: string;
  email: string;
  full_name: string;
  selected_service: PlanId;
  role: "user" | "admin";
  access_status: "promo" | "paused" | "expired";
  last_active_at: string | null;
  created_at: string;
};

type Redemption = {
  promo_label: string;
  redeemed_at: string;
};

export default function DashboardClient() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [redemption, setRedemption] = useState<Redemption | null>(null);
  const [serviceStarted, setServiceStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    const supabase = getSupabaseBrowserClient();

    async function loadAccount() {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      if (!session) {
        router.replace("/login/?next=/dashboard/");
        return;
      }

      const [profileResult, redemptionResult, activityResult] = await Promise.all([
        supabase.from("profiles").select("id,email,full_name,selected_service,role,access_status,last_active_at,created_at").eq("id", session.user.id).single(),
        supabase.from("promo_redemptions").select("promo_label,redeemed_at").eq("user_id", session.user.id).maybeSingle(),
        supabase.from("activity_events").select("id").eq("user_id", session.user.id).eq("event_type", "service_started").limit(1),
      ]);

      if (!active) return;
      if (profileResult.error) {
        setError(friendlyAccountError(profileResult.error.message));
      } else {
        const nextProfile = profileResult.data as Profile;
        if (!isPlanId(nextProfile.selected_service)) nextProfile.selected_service = "free";
        setProfile(nextProfile);
        setRedemption(redemptionResult.data as Redemption | null);
        setServiceStarted(Boolean(activityResult.data?.length));
        await supabase.rpc("track_activity", { p_event_type: "dashboard_view", p_metadata: { service: nextProfile.selected_service } });
      }
      setLoading(false);
    }

    loadAccount();
    return () => { active = false; };
  }, [router]);

  const plan = useMemo(() => profile ? PLAN_BY_ID[profile.selected_service] : null, [profile]);

  async function handleProfileUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;
    setSaving(true);
    setError("");
    setNotice("");
    const fullName = String(new FormData(event.currentTarget).get("full_name") || "").trim();

    try {
      const supabase = getSupabaseBrowserClient();
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ full_name: fullName, updated_at: new Date().toISOString() })
        .eq("id", profile.id);
      if (updateError) throw updateError;
      await supabase.rpc("track_activity", { p_event_type: "profile_updated", p_metadata: {} });
      setProfile({ ...profile, full_name: fullName });
      setNotice("Your account details have been updated.");
    } catch (updateError) {
      setError(friendlyAccountError(updateError instanceof Error ? updateError.message : ""));
    } finally {
      setSaving(false);
    }
  }

  async function handleStartService() {
    if (!profile) return;
    setStarting(true);
    setError("");
    const { error: activityError } = await getSupabaseBrowserClient().rpc("track_activity", {
      p_event_type: "service_started",
      p_metadata: { service: profile.selected_service },
    });
    if (activityError) setError(friendlyAccountError(activityError.message));
    else {
      setServiceStarted(true);
      setNotice(`${plan?.name || "Your"} onboarding has started. Your place is recorded.`);
    }
    setStarting(false);
  }

  async function handleSignOut() {
    await getSupabaseBrowserClient().auth.signOut();
    router.push("/");
  }

  if (loading) {
    return <section className="border-b border-line py-24"><div className="shell max-w-5xl"><p className="text-muted">Loading your workspace…</p></div></section>;
  }

  if (!profile || !plan) {
    return <section className="border-b border-line py-24"><div className="shell max-w-2xl"><FormNotice tone="error">{error || "We could not load your account."}</FormNotice></div></section>;
  }

  return (
    <section className="border-b border-line bg-surface py-12 md:py-16">
      <div className="shell max-w-6xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Your workspace</span>
            <h1 className="mt-3 text-[32px] leading-tight md:text-[40px]">Welcome, {profile.full_name.split(" ")[0]}.</h1>
            <p className="mt-3 text-[15px] text-muted">Your promotional access is active and your service choice has been recorded.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.role === "admin" && <Link href="/admin" className="rounded-full border border-brand-mid bg-brand-light px-4 py-2.5 text-[13.5px] font-semibold text-brand-deep">Analytics</Link>}
            <button onClick={handleSignOut} className="rounded-full border border-line bg-white px-4 py-2.5 text-[13.5px] font-semibold text-ink hover:border-brand-mid">Log out</button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="card overflow-hidden">
              <div className="border-b border-line bg-white p-6 md:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand-deep"><Glyph name={plan.id} className="h-6 w-6" /></span>
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-faint">Selected service</p>
                      <h2 className="mt-1 text-[22px]">{plan.name}</h2>
                    </div>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-light px-3 py-1.5 text-[12.5px] font-semibold text-brand-deep">
                    <Check className="h-3.5 w-3.5" /> Promo access active
                  </span>
                </div>
                <p className="mt-5 max-w-2xl text-[14.5px] leading-relaxed text-muted">{plan.who}</p>
              </div>
              <div className="grid gap-px bg-line sm:grid-cols-2">
                {MODULES.map((module) => (
                  <div key={module.id} className="bg-white p-5">
                    <p className="text-[12px] font-semibold text-muted">{module.name}</p>
                    <p className="mt-1 text-[14px] font-semibold text-ink">{plan.meters[module.id] || "Not included"}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="eyebrow">Activation</p>
                  <h2 className="mt-2 text-[22px]">Ready to begin?</h2>
                </div>
                <span className="text-[13px] font-semibold text-brand-dark">{serviceStarted ? "3 of 3" : "2 of 3"}</span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-surface-2"><div className="h-full rounded-full bg-brand transition-all" style={{ width: serviceStarted ? "100%" : "66.67%" }} /></div>
              <ol className="mt-6 space-y-3 text-[14px]">
                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-brand" /><span>Account created</span></li>
                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-brand" /><span>Email verified</span></li>
                <li className="flex items-center gap-3">
                  <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${serviceStarted ? "border-brand bg-brand text-white" : "border-brand"}`}>{serviceStarted && <Check className="h-3 w-3" />}</span>
                  <span>{serviceStarted ? `${plan.name} onboarding started` : `Start ${plan.name} onboarding`}</span>
                </li>
              </ol>
              {!serviceStarted && (
                <button onClick={handleStartService} disabled={starting} className="mt-6 rounded-full bg-brand-deep px-5 py-3 text-[14px] font-semibold text-white hover:bg-brand-dark disabled:opacity-60">
                  {starting ? "Starting…" : "I'm ready to start"}
                </button>
              )}
              {serviceStarted && <p className="mt-5 rounded-xl bg-brand-light px-4 py-3 text-[13.5px] text-brand-deep">Your interest is recorded. The GetHired team can now see that you activated {plan.name}.</p>}
            </div>
          </div>

          <aside className="space-y-6">
            {(error || notice) && <FormNotice tone={error ? "error" : "success"}>{error || notice}</FormNotice>}
            <form onSubmit={handleProfileUpdate} className="card p-6">
              <p className="eyebrow">Account details</p>
              <h2 className="mt-2 text-[20px]">Your profile</h2>
              <label className="mt-5 block">
                <span className="mb-2 block text-[12.5px] font-semibold text-ink">Full name</span>
                <input className={ACCOUNT_FIELD} name="full_name" defaultValue={profile.full_name} maxLength={120} required />
              </label>
              <div className="mt-4">
                <p className="text-[12.5px] font-semibold text-ink">Email</p>
                <p className="mt-1 break-all text-[13.5px] text-muted">{profile.email}</p>
              </div>
              <button type="submit" disabled={saving} className="mt-5 w-full rounded-full border border-brand-mid bg-brand-light px-4 py-2.5 text-[13.5px] font-semibold text-brand-deep hover:bg-brand-mid disabled:opacity-60">
                {saving ? "Saving…" : "Save details"}
              </button>
            </form>

            <div className="card p-6">
              <p className="eyebrow">Access record</p>
              <dl className="mt-4 space-y-4 text-[13.5px]">
                <div className="flex items-start justify-between gap-4"><dt className="text-muted">Campaign</dt><dd className="text-right font-semibold text-ink">{redemption?.promo_label || "Promotional access"}</dd></div>
                <div className="flex items-start justify-between gap-4"><dt className="text-muted">Service</dt><dd className="text-right font-semibold text-ink">{plan.name}</dd></div>
                <div className="flex items-start justify-between gap-4"><dt className="text-muted">Joined</dt><dd className="text-right font-semibold text-ink">{new Date(profile.created_at).toLocaleDateString()}</dd></div>
                <div className="flex items-start justify-between gap-4"><dt className="text-muted">Payment method</dt><dd className="text-right font-semibold text-brand-dark">Not required</dd></div>
              </dl>
            </div>

            <div className="rounded-card bg-brand-deep p-6 text-white">
              <p className="text-[11px] font-bold tracking-[0.13em] uppercase text-brand-mid">Need help?</p>
              <h2 className="mt-2 text-[20px] text-white">Talk to the team.</h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/70">Questions about your service or promo access are saved directly for follow-up.</p>
              <Link href="/contact" className="mt-5 inline-flex rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-brand-deep">Contact support</Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
