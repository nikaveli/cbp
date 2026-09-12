import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/site-chrome";

export const Route = createFileRoute("/industries")({
  head: () => ({ meta: [{ title: "Industries | Colorado Block Pros Masonry" }, { name: "description", content: "Masonry capability for municipal, education, multifamily, worship, healthcare, and commercial projects across Colorado's Front Range." }] }),
  component: Industries,
});

const sectors = [
  { title: "Government and municipal", image: "/assets/projects/governmental.webp", copy: "Public procurement, documentation, wage requirements, inspection, and durable community facilities." },
  { title: "Education and institutional", image: "/assets/projects/institutional.webp", copy: "Schedule-sensitive facilities where mock-ups, phased access, and finish consistency need early decisions." },
  { title: "Multifamily", image: "/assets/projects/multifamily.webp", copy: "Repetitive production balanced with fire separation, reinforcement, openings, and architectural exterior work." },
  { title: "Healthcare", image: "/assets/projects/healthcare.webp", copy: "Coordinated work for occupied or controlled environments with demanding schedules and inspection paths." },
  { title: "Commercial", image: "/assets/projects/commercial.webp", copy: "Structural and veneer packages shaped around the GC's sequence, testing plan, and turnover date." },
  { title: "Architectural masonry", image: "/assets/projects/architectural.webp", copy: "Exposed CMU and veneer where material compatibility, coursing, joints, and cleaning define the finished building." },
];

function Industries() {
  return (
    <PageShell>
      <main id="main-content" className="industries-page">
        <section className="industries-hero" data-cbp-motion="parallax">
          <img src="/assets/projects/dusk-jobsite.webp" alt="" />
          <div>
            <p className="page-kicker">Industries</p>
            <h1>Different owners. Different risk. Same wall.</h1>
            <p>CBP aligns the masonry package with the way each project is funded, reviewed, inspected, sequenced, and accepted.</p>
          </div>
        </section>
        <section className="sector-grid" data-cbp-motion="reveal" data-cbp-peak="true" data-cbp-stagger>
          {sectors.map((sector, index) => (
            <article key={sector.title} className={`sector-grid__item sector-grid__item--${index + 1}`}>
              <img src={sector.image} alt="" />
              <div><span>{String(index + 1).padStart(2, "0")}</span><h2>{sector.title}</h2><p>{sector.copy}</p></div>
            </article>
          ))}
        </section>
        <section className="climate-band" data-cbp-motion="parallax">
          <img src="/assets/projects/contact-front-range.webp" alt="" />
          <div>
            <p>Colorado conditions</p>
            <h2>Weather planning protects the wall and the schedule.</h2>
            <p>Freeze-thaw exposure, shoulder-season temperature swings, wind, and summer heat all affect materials, protection, and sequencing. We bring those conversations forward.</p>
          </div>
        </section>
        <section className="industry-delivery" data-cbp-motion="resolve">
          <div><span>01</span><h3>Read the project</h3><p>Funding, occupancy, inspection, phasing, specification, and finish standard.</p></div>
          <div><span>02</span><h3>Resolve the assembly</h3><p>Units, mortar, grout, reinforcement, accessories, moisture control, and interfaces.</p></div>
          <div><span>03</span><h3>Plan production</h3><p>Submittals, mock-ups, release dates, testing, weather procedures, access, and manpower.</p></div>
          <Link to="/contact" className="industry-delivery__link">Discuss a project <i aria-hidden="true" /></Link>
        </section>
      </main>
    </PageShell>
  );
}
