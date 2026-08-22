import type { Metadata } from "next";
import LegalPage from "../legal/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={[
        {
          heading: "What we collect",
          body: "Account details, the professional information you upload or sync, and the work you produce inside the platform — resumes, interview recordings, transcripts, and Experience Lab submissions.",
        },
        {
          heading: "How it is used",
          body: "To generate your analysis, resumes, interview questions, and feedback. Your uploaded profile is the single source every module reads from, which is why nothing contradicts anything else.",
        },
        {
          heading: "Sharing",
          body: "Your profile is private until you publish it. Nothing is sold. Institutional accounts see cohort-level data only where the student has joined that cohort.",
        },
        {
          heading: "Deletion",
          body: "Delete your account from settings at any time. Recordings and generated documents are removed with it.",
        },
      ]}
    />
  );
}
