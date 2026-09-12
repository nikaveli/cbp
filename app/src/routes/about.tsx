import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About | Colorado Block Pros Masonry" }, { name: "description", content: "Meet Adam Gutierrez and the field-first approach behind Colorado Block Pros Masonry." }] }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <main id="main-content" className="about-page">
        <section className="about-hero" data-cbp-motion="parallax">
          <div className="about-hero__portrait">
            <img src="/assets/brand/adam.webp" alt="Adam Gutierrez" />
          </div>
          <div className="about-hero__copy">
            <p className="page-kicker">Adam Gutierrez</p>
            <h1>Field experience, carried into every decision.</h1>
            <p>Adam Gutierrez is a Denver native with more than 25 years in the masonry trade. He founded Colorado Block Pros to give project teams direct access to practical masonry leadership.</p>
          </div>
        </section>
        <section className="about-story" data-cbp-motion="reveal">
          <img src="/assets/projects/mason-hands.webp" alt="" />
          <div>
            <h2>The work is technical. Accountability stays personal.</h2>
            <p>CBP approaches each package as part of the larger build. That means studying the documents, clarifying interfaces, supporting the field team, and staying available when conditions change.</p>
            <p>The standard is simple to state and hard to fake: prepared foremen, informed crews, honest coordination, and finished masonry the whole team can stand behind.</p>
          </div>
        </section>
        <section className="principles-ledger" data-cbp-motion="flow" data-cbp-stagger>
          <div><strong>Safety</strong><p>Plan access, sequencing, protection, and production before the work starts.</p></div>
          <div><strong>Quality</strong><p>Treat mock-ups, materials, testing, tooling, and cleaning as one acceptance path.</p></div>
          <div><strong>Service</strong><p>Give estimators, PMs, architects, inspectors, and the field clear information.</p></div>
          <div><strong>Schedule</strong><p>Bring long leads, hold points, weather triggers, and inspection needs into the look-ahead.</p></div>
        </section>
        <section className="about-colorado" data-cbp-motion="draw">
          <img src="/assets/projects/open-graph.webp" alt="" />
          <div><p>Colorado rooted</p><h2>Built for the Front Range.</h2><p>Local conditions are not fine print. They shape material selection, moisture control, protection, and the production calendar.</p></div>
        </section>
        <section className="about-contact" data-cbp-motion="resolve">
          <h2>Bring us into the project conversation.</h2>
          <Link to="/contact" className="about-contact__link"><span>Send plans</span><i aria-hidden="true" /></Link>
        </section>
      </main>
    </PageShell>
  );
}
