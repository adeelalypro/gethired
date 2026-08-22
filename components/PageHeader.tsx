export default function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="dotfield absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-light/70 to-transparent"
        aria-hidden="true"
      />
      <div className="shell relative py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-4 text-[38px] leading-[1.05] sm:text-[48px]">{title}</h1>
          {lede && (
            <p className="mt-5 text-[17px] leading-relaxed text-muted">{lede}</p>
          )}
        </div>
      </div>
    </section>
  );
}
