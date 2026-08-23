import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import UnsubscribeForm from "./UnsubscribeForm";

export const metadata: Metadata = { title: "Unsubscribe", alternates: { canonical: "/unsubscribe/" }, robots: { index: false, follow: true } };

export default function UnsubscribePage() {
  return (
    <>
      <PageHeader eyebrow="Email preferences" title="Stop product updates." lede="Enter the email address you used for the update list. Your account access is not affected." />
      <section className="border-b border-line py-16 md:py-20"><div className="shell max-w-md"><UnsubscribeForm /></div></section>
    </>
  );
}
