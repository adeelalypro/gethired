import PageHeader from "@/components/PageHeader";

export default function LegalPage({
  title,
  lede,
  sections,
}: {
  title: string;
  lede: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={title}
        lede={lede}
      />
      <section className="border-b border-line py-16 md:py-20">
        <div className="shell max-w-3xl space-y-9">
          <p className="text-[13px] font-medium text-faint">Current for the private GetHired early-access pilot · Last updated August 23, 2026</p>
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-[19px]">{s.heading}</h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

