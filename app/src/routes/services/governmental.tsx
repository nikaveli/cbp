import { createFileRoute } from "@tanstack/react-router";
import { ProcessList, ServiceDetail, SpecLedger, TechnicalSection } from "@/components/site/service-detail";

export const Route = createFileRoute("/services/governmental")({
  head: () => ({ meta: [{ title: "Governmental Masonry | Colorado Block Pros" }, { name: "description", content: "Colorado public-work masonry coordination for material reporting, prevailing wage, certified payroll, and local labor requirements." }] }),
  component: Governmental,
});

function Governmental() {
  return (
    <ServiceDetail
      category="Governmental masonry"
      title="Public work without paperwork surprises."
      intro="A serious public masonry package accounts for documentation, wage rules, local labor, inspection, and the schedule that connects them."
      image="/assets/projects/governmental.webp"
    >
      <TechnicalSection title="Buy Clean belongs in the masonry scope." lead="Colorado state solicitations can require current environmental product declarations for eligible materials, including concrete masonry units. The awarded contractor depends on suppliers and subcontractors for accurate documentation.">
        <SpecLedger rows={[
          { label: "2026 OSA CMU limit", value: "395 kg CO₂e/m³", note: "Confirm the current limit and project eligibility in the solicitation." },
          { label: "Declaration type", value: "Type III EPD", note: "Product-specific or accepted industry-wide documentation must be current." },
          { label: "Expiration", value: "Five years", note: "An expired declaration can hold up the submittal." },
        ]} />
      </TechnicalSection>

      <TechnicalSection title="Three wage regimes. One project-specific plan." image="/assets/projects/dark-block.webp" reverse>
        <div className="decision-table" role="table" aria-label="Public project wage regimes">
          <div role="row"><strong role="cell">Colorado state-funded</strong><span role="cell">State prevailing-wage requirements may apply when the total project exceeds the statutory threshold.</span></div>
          <div role="row"><strong role="cell">Federally funded</strong><span role="cell">Davis-Bacon requirements govern covered federal work.</span></div>
          <div role="row"><strong role="cell">CDOT</strong><span role="cell">Confirm the controlling requirements in the bid documents and project funding source.</span></div>
        </div>
        <p className="technical-note">The practical issue is execution: correct classifications, weekly pay where required, accurate certified payroll, and current site postings.</p>
      </TechnicalSection>

      <section className="public-labor-band" data-cbp-motion="draw">
        <img src="/assets/icons/icon-5.png" alt="" />
        <div><p>Colorado labor</p><h2>The public-work requirement reaches counties, school districts, and municipalities.</h2></div>
        <strong>80%</strong>
        <p>The Keep Jobs in Colorado Act generally requires Colorado labor to perform at least 80 percent of covered public works, unless the financing governmental body grants a waiver.</p>
      </section>

      <TechnicalSection title="A bid package that is ready to move.">
        <ProcessList items={[
          { title: "Read the funding source", copy: "Identify the controlling wage and documentation regime from the solicitation." },
          { title: "Map the material submittals", copy: "Confirm unit, mortar, grout, reinforcement, and any required environmental documentation." },
          { title: "Plan payroll and reporting", copy: "Align the field schedule with weekly pay, certified payroll, and posting obligations where applicable." },
          { title: "Coordinate inspection early", copy: "Put mock-ups, testing, and hold points on the schedule before mobilization." },
        ]} />
        <p className="source-note">Requirements vary by funding source, project, and current law. Final compliance follows the issued bid documents and current agency guidance.</p>
      </TechnicalSection>
    </ServiceDetail>
  );
}
