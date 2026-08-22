import PageHeader from "@/components/PageHeader";

export default function LegalPage({
  title,
  sections,
}: {
  title: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={title}
        lede="Placeholder text for the demo build. Replace with counsel-reviewed copy before launch."
      />
      <section className="border-b border-line py-16 md:py-20">
        <div className="shell max-w-3xl space-y-9">
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
