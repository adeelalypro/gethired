type FormNoticeProps = {
  tone: "error" | "success" | "info";
  children: React.ReactNode;
};

export default function FormNotice({ tone, children }: FormNoticeProps) {
  const classes = {
    error: "border-red-200 bg-red-50 text-red-800",
    success: "border-brand-mid bg-brand-light text-brand-deep",
    info: "border-line bg-surface text-ink-2",
  }[tone];

  return (
    <div role={tone === "error" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-[13.5px] leading-relaxed ${classes}`}>
      {children}
    </div>
  );
}
