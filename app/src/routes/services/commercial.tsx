import { createFileRoute } from "@tanstack/react-router";
import { ProcessList, ServiceDetail, SpecLedger, TechnicalSection } from "@/components/site/service-detail";

export const Route = createFileRoute("/services/commercial")({
  head: () => ({ meta: [{ title: "Commercial Masonry | Colorado Block Pros" }, { name: "description", content: "Inspection-aware commercial masonry built around mock-ups, testing, grout sequencing, and Colorado weather." }] }),
  component: Commercial,
});

function Commercial() {
  return (
    <ServiceDetail
      category="Commercial masonry"
      title="We plan around inspection."
      intro="The goal is not to react faster after a missed hold point. It is to make the mock-up, testing, grout sequence, and weather plan part of production."
      image="/assets/projects/commercial.webp"
    >
      <TechnicalSection title="The schedule starts before production." lead="Masonry quality assurance is governed by the adopted code, the project specifications, TMS 602, and the statement of special inspections. The exact inspection level depends on the building and adopted edition.">
        <ProcessList items={[
          { title: "Submittal review", copy: "Units, mortar, grout, reinforcement, anchors, ties, and weather procedures are coordinated against the issued specification." },
          { title: "Mock-up and verification", copy: "Schedule the quality-assurance mock-up and required strength verification before wall production." },
          { title: "Placement and testing", copy: "Sequence reinforcement, cleanouts, lifts, consolidation, and field testing with the inspector." },
          { title: "Closeout", copy: "Track corrections, cleaning requirements, and final acceptance without losing the finish standard." },
        ]} />
      </TechnicalSection>

      <TechnicalSection title="The mortar and block-strength mismatch." image="/assets/projects/mortar-macro.webp" reverse>
        <p className="technical-lead">A specification that pairs f'm = 2,000 psi with Type N mortar can require a CMU strength of 2,650 psi under the unit-strength method in certain TMS editions.</p>
        <p>That value can exceed routine plant production. Catching the combination during submittal review is far cheaper than discovering it after block arrives. The adopted TMS edition and project specification control.</p>
        <SpecLedger rows={[
          { label: "Mortar", value: "ASTM C270", note: "Project type and structural role determine the specified mortar." },
          { label: "Grout", value: "ASTM C476", note: "Placement and testing follow the project quality-assurance program." },
          { label: "Grout specimens", value: "ASTM C1019", note: "Coordinate frequency and reporting with the testing agency." },
        ]} />
      </TechnicalSection>

      <section className="temperature-ladder" data-cbp-motion="draw">
        <div className="temperature-ladder__intro">
          <img src="/assets/icons/icon-2.png" alt="" />
          <h2>Cold-weather masonry is a plan, not a judgment call.</h2>
          <p>When jobsite temperatures are expected below 40°F, the project needs defined construction and protection procedures.</p>
        </div>
        <div className="temperature-ladder__rows" data-cbp-stagger>
          <div><strong>40°F to 32°F</strong><span>Heat sand or water to keep mortar within the required range.</span></div>
          <div><strong>Below 32°F to 25°F</strong><span>Heat both sand and water.</span></div>
          <div><strong>Below 25°F to 20°F</strong><span>Heat masonry surfaces and add wind breaks or enclosures when conditions require them.</span></div>
          <div><strong>Below 20°F</strong><span>Use a heated enclosure. Do not lay frozen, snow-covered, or ice-covered units.</span></div>
        </div>
        <p className="source-note">Temperature procedures shown are a planning summary. The adopted TMS 602 edition and project specification control.</p>
      </section>

      <TechnicalSection title="Grout sequencing belongs on the look-ahead.">
        <SpecLedger rows={[
          { label: "Typical lift", value: "5 ft maximum", note: "Higher placements and cleanout requirements depend on the specification and wall configuration." },
          { label: "Consolidation", value: "Required", note: "Mechanical vibration or approved rodding is coordinated with placement." },
          { label: "Protection", value: "24 to 48 hours", note: "Duration depends on grouted status, temperature, and specified materials." },
        ]} />
      </TechnicalSection>
    </ServiceDetail>
  );
}
