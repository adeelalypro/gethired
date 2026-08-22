import type { Metadata } from "next";
import Link from "next/link";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <div className="shell max-w-md">
        <span className="eyebrow">Account recovery</span>
        <h1 className="mt-4 text-[32px] leading-tight">Choose a new password.</h1>
        <p className="mt-3 text-[15.5px] text-muted">Use at least eight characters and avoid passwords you use elsewhere.</p>
        <ResetPasswordForm />
        <p className="mt-5 text-center text-[13.5px] text-muted">
          <Link href="/login" className="font-semibold text-brand-dark underline underline-offset-3">Back to login</Link>
        </p>
      </div>
    </section>
  );
}
