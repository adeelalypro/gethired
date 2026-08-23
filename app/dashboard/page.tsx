import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = { title: "Your dashboard", robots: { index: false, follow: false } };

export default function DashboardPage() {
  return <DashboardClient />;
}
