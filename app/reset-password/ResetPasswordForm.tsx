"use client";

import { type FormEvent, useEffect, useState } from "react";
import FormNotice from "@/components/FormNotice";
import { ACCOUNT_BUTTON, ACCOUNT_FIELD, friendlyAccountError } from "@/lib/account";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export default function ResetPasswordForm() {
  const [ready, setReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    supabase.auth.getSession().then(({ data }) => setReady(Boolean(data.session)));
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    const confirmation = String(form.get("confirmation") || "");

    if (password !== confirmation) {
      setError("The passwords do not match.");
      setSubmitting(false);
      return;
    }

    try {
      const { error: updateError } = await getSupabaseBrowserClient().auth.updateUser({ password });
      if (updateError) throw updateError;
      setSuccess(true);
    } catch (updateError) {
      setError(friendlyAccountError(updateError instanceof Error ? updateError.message : ""));
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return <FormNotice tone="success">Your password has been updated. You can now return to the login page.</FormNotice>;
  }

  return (
    <form onSubmit={handleSubmit} className="card mt-8 space-y-4 p-7">
      {!ready && <FormNotice tone="info">Open this page using the password-reset link sent to your email.</FormNotice>}
      <label className="block">
        <span className="mb-2 block text-[13px] font-semibold text-ink">New password</span>
        <input className={ACCOUNT_FIELD} name="password" type="password" minLength={8} autoComplete="new-password" required />
      </label>
      <label className="block">
        <span className="mb-2 block text-[13px] font-semibold text-ink">Confirm password</span>
        <input className={ACCOUNT_FIELD} name="confirmation" type="password" minLength={8} autoComplete="new-password" required />
      </label>
      {error && <FormNotice tone="error">{error}</FormNotice>}
      <button type="submit" disabled={!ready || submitting} className={ACCOUNT_BUTTON}>
        {submitting ? "Updating password…" : "Update password"}
      </button>
    </form>
  );
}
