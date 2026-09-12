import { createFileRoute } from "@tanstack/react-router";
import { ProcessList, ServiceDetail, SpecLedger, TechnicalSection } from "@/components/site/service-detail";

export const Route = createFileRoute("/services/architectural")({
  head: () => ({ meta: [{ title: "Architectural Masonry | Colorado Block Pros" }, { name: "description", content: "Architectural masonry coordination for single-wythe systems, water repellents, coursing, control joints, and finish consistency." }] }),
  component: Architectural,
});

function Architectural() {
  return (
    <ServiceDetail
      category="Architectural masonry"
      title="The finish is the system."
      intro="Architectural masonry succeeds when units, mortar, flashing, joints, sealants, coatings, coursing, and workmanship are coordinated as one assembly."
      image="/assets/projects/architectural.webp"
    >
      <TechnicalSection title="Single-wythe has no second chance." lead="A single-wythe CMU wall can provide structure and finished facade in one assembly. Without a continuous drainage cavity, material compatibility and workmanship carry more responsibility.">
        <SpecLedger rows={[
          { label: "Unit and mortar IWR", value: "Compatible system", note: "Integral water repellent belongs in both when the assembly calls for it." },
          { label: "Head joints", value: "Fully filled", note: "Single-wythe installation may require double buttering for complete contact." },
          { label: "Joint profile", value: "Concave or V", note: "Tooled profiles support water shedding when specified and executed correctly." },
        ]} />
      </TechnicalSection>

      <TechnicalSection title="Water repellent is not waterproofing." image="/assets/projects/mortar-macro.webp" reverse>
        <p className="technical-lead">Integral water repellent reduces absorption. It does not replace flashing, weeps, sealants, joint tooling, caps, or a coordinated drainage path.</p>
        <p>Block and mortar admixtures must be compatible. Surface-applied silane or siloxane products also need coordination because an integral repellent can reduce penetration of a later coating.</p>
        <div className="field-test-note">
          <strong>Field check</strong>
          <p>A simple water-droplet check can indicate whether a CMU contains integral water repellent. Formal acceptance follows the specified product data and test method.</p>
        </div>
      </TechnicalSection>

      <section className="detail-index" data-cbp-motion="reveal" data-cbp-peak="true" data-cbp-stagger>
        <div><span>COURSE</span><h2>Coursing and openings</h2><p>Review dimensions before bid so openings, bond, cuts, and visible irregularities are understood.</p></div>
        <div><span>MOVE</span><h2>Control joints</h2><p>Coordinate locations with wall geometry, openings, reinforcement, and the architect's elevations.</p></div>
        <div><span>SHED</span><h2>Caps and penetrations</h2><p>Keep parapets, fenestration joints, sealants, and drainage paths connected.</p></div>
        <div><span>FINISH</span><h2>Cleaning and coating</h2><p>Follow the selected manufacturer's cleaning limits before applying a compatible breathable repellent.</p></div>
      </section>

      <TechnicalSection title="Early involvement should produce decisions.">
        <ProcessList items={[
          { title: "Review the specification", copy: "Flag strength combinations, IWR conflicts, cleaning restrictions, and incomplete accessory requirements." },
          { title: "Coordinate the mock-up", copy: "Use the approved panel to settle unit range, mortar, joint tooling, cleaning, and acceptance." },
          { title: "Study the module", copy: "Check coursing at openings, corners, transitions, and special shapes before release." },
          { title: "Protect consistency", copy: "Plan batching, pallet blending, weather exposure, and cleaning for the full wall run." },
        ]} />
      </TechnicalSection>
    </ServiceDetail>
  );
}
