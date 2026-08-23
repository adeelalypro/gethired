"use client";

import { type FormEvent, useState } from "react";
import FormNotice from "@/components/FormNotice";
import { ACCOUNT_BUTTON, ACCOUNT_FIELD, friendlyAccountError } from "@/lib/account";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const requestedTopic = searchParams.get("topic");
  const defaultTopic = ["support", "institutions", "other"].includes(requestedTopic || "") ? requestedTopic! : "support";
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSent(false);

    const form = event.currentTarget;
    const values = new FormData(form);
    const { error: submitError } = await getSupabaseBrowserClient().rpc("submit_contact", {
      p_name: String(values.get("name") || "").trim(),
      p_email: String(values.get("email") || "").trim(),
      p_topic: String(values.get("topic") || "support"),
      p_message: String(values.get("message") || "").trim(),
      p_company: String(values.get("company") || ""),
    });

    if (submitError) {
      setError(friendlyAccountError(submitError.message));
    } else {
      form.reset();
      setSent(true);
    }
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-7 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-[13px] font-semibold text-ink">Name</span>
          <input className={ACCOUNT_FIELD} name="name" placeholder="Your name" maxLength={100} required />
        </label>
        <label className="block">
          <span className="mb-2 block text-[13px] font-semibold text-ink">Email</span>
          <input className={ACCOUNT_FIELD} name="email" type="email" placeholder="you@email.com" maxLength={254} required />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-[13px] font-semibold text-ink">Topic</span>
        <select className={ACCOUNT_FIELD} name="topic" defaultValue={defaultTopic}>
          <option value="support">Support</option>
          <option value="institutions">Universities &amp; institutions</option>
          <option value="other">Something else</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block text-[13px] font-semibold text-ink">Message</span>
        <textarea className={ACCOUNT_FIELD} name="message" rows={5} maxLength={5000} placeholder="How can we help?" required />
      </label>
      <label className="absolute -left-[9999px]" aria-hidden="true">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      {error && <FormNotice tone="error">{error}</FormNotice>}
      {sent && <FormNotice tone="success">Your message was received. We will reply by email.</FormNotice>}
      <button type="submit" className={ACCOUNT_BUTTON} disabled={submitting}>
        {submitting ? "Sending…" : "Send message"}
      </button>
      <p className="text-center text-[12.5px] text-faint">We will reply using the email address you provide.</p>
    </form>
  );
}

