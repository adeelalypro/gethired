"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import FormNotice from "@/components/FormNotice";
import { ACCOUNT_BUTTON, ACCOUNT_FIELD, friendlyAccountError } from "@/lib/account";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setNotice("");

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");

    try {
      const supabase = getSupabaseBrowserClient();
      const { error: loginError } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
      if (loginError) throw loginError;

      await supabase.rpc("track_activity", { p_event_type: "login", p_metadata: {} });

      const requested = new URLSearchParams(window.location.search).get("next");
      const destination = requested && requested.startsWith("/") && !requested.startsWith("//") ? requested : "/dashboard/";
      window.location.assign(destination);
    } catch (loginError) {
      setError(friendlyAccountError(loginError instanceof Error ? loginError.message : ""));
    } finally {
      setSubmitting(false);
    }
  }

  async function handlePasswordReset() {
    setError("");
    setNotice("");

    if (!email.trim()) {
      setError("Enter your email above, then choose reset password.");
      return;
    }

    setSendingReset(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/reset-password/`,
      });
      if (resetError) throw resetError;
      setNotice("If an account exists for that email, a password-reset link is on its way.");
    } catch (resetError) {
      setError(friendlyAccountError(resetError instanceof Error ? resetError.message : ""));
    } finally {
      setSendingReset(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card mt-8 space-y-4 p-7">
      <label className="block">
        <span className="mb-2 block text-[13px] font-semibold text-ink">Email</span>
        <input
          className={ACCOUNT_FIELD}
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@email.com"
          required
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-[13px] font-semibold text-ink">Password</span>
        <input className={ACCOUNT_FIELD} name="password" type="password" autoComplete="current-password" placeholder="Your password" required />
      </label>

      {error && <FormNotice tone="error">{error}</FormNotice>}
      {notice && <FormNotice tone="success">{notice}</FormNotice>}

      <button type="submit" disabled={submitting} className={ACCOUNT_BUTTON}>
        {submitting ? "Signing in…" : "Log in"}
      </button>
      <button
        type="button"
        onClick={handlePasswordReset}
        disabled={sendingReset}
        className="w-full text-center text-[13.5px] font-semibold text-brand-dark underline underline-offset-3 disabled:opacity-60"
      >
        {sendingReset ? "Sending reset link…" : "Forgot your password?"}
      </button>
      <p className="text-center text-[13.5px] text-muted">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-brand-dark underline underline-offset-2">Create an account</Link>
      </p>
    </form>
  );
}
