import type { Metadata } from "next";
import { Suspense } from "react";
import SignupContent, { SignupView } from "./SignupContent";

export const metadata: Metadata = { title: "Get started" };

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupView planId="free" />}>
      <SignupContent />
    </Suspense>
  );
}

