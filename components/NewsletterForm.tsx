"use client";

import { type FormEvent, useState } from "react";
import { friendlyAccountError } from "@/lib/account";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export default function NewsletterForm() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setIsError(false);
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();
    const { error } = await getSupabaseBrowserClient().rpc("subscribe_newsletter", { p_email: email });
    if (error) {
      setIsError(true);
      setMessage(friendlyAccountError(error.message));
    } else {
      form.reset();
      setMessage("You are subscribed.");
    }
    setSubmitting(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-6 flex items-center gap-2 rounded-full border border-line bg-surface p-1.5 pl-4">
        <input
          type="email"
          name="email"
          required
          maxLength={254}
          placeholder="Enter your email"
          aria-label="Email address"
          className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-faint"
        />
        <button
          type="submit"
          disabled={submitting}
          className="shrink-0 rounded-full bg-brand-deep px-4 py-2 text-[13.5px] font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-wait disabled:opacity-60"
        >
          {submitting ? "Saving…" : "Subscribe"}
        </button>
      </form>
      {message && <p role="status" className={`mt-2 text-[12.5px] ${isError ? "text-red-700" : "text-brand-dark"}`}>{message}</p>}
    </>
  );
}
