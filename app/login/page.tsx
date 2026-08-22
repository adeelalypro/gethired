import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <section className="border-b border-line py-20 md:py-28">
      <div className="shell max-w-md">
        <span className="eyebrow">Your account</span>
        <h1 className="mt-4 text-[32px] leading-tight">Welcome back.</h1>
        <p className="mt-3 text-[15.5px] text-muted">Pick up where you left off.</p>
        <LoginForm />
      </div>
    </section>
  );
}
