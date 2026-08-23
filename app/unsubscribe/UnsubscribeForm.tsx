"use client";

import { type FormEvent, useState } from "react";
import FormNotice from "@/components/FormNotice";
import { ACCOUNT_BUTTON, ACCOUNT_FIELD, friendlyAccountError } from "@/lib/account";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export default function UnsubscribeForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();
    const { error: unsubscribeError } = await getSupabaseBrowserClient().rpc("unsubscribe_newsletter", { p_email: email });
    if (unsubscribeError) setError(friendlyAccountError(unsubscribeError.message));
    else { form.reset(); setComplete(true); }
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="card mt-8 space-y-4 p-7">
      <label className="block"><span className="mb-2 block text-[13px] font-semibold text-ink">Email address</span><input className={ACCOUNT_FIELD} name="email" type="email" autoComplete="email" placeholder="you@email.com" required /></label>
      {error && <FormNotice tone="error">{error}</FormNotice>}
      {complete && <FormNotice tone="success">That email has been removed from active pilot updates.</FormNotice>}
      <button type="submit" className={ACCOUNT_BUTTON} disabled={submitting}>{submitting ? "Updating…" : "Unsubscribe"}</button>
    </form>
  );
}

