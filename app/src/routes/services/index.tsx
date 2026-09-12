import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/site-chrome";

export const Route = createFileRoute("/services/")({
  head: () => ({ meta: [{ title: "Masonry Services | Colorado Block Pros" }, { name: "description", content: "Governmental, commercial, and architectural masonry capabilities for Colorado projects." }] }),
  component: Services,
});

const items = [
  { title: "Governmental", image: "/assets/projects/governmental.webp", to: "/services/governmental" as const, copy: "Material reporting, public-work payroll, local labor requirements, and procurement coordination." },
  { title: "Commercial", image: "/assets/projects/commercial.webp", to: "/services/commercial" as const, copy: "Mock-ups, special inspection, strength verification, grout sequencing, and weather planning." },
  { title: "Architectural", image: "/assets/projects/architectural.webp", to: "/services/architectural" as const, copy: "Coursing, material compatibility, moisture control, finish consistency, and cleaning coordination." },
];

function Services() {
  return (
    <PageShell>
      <main id="main-content" className="services-page">
        <section className="services-intro" data-cbp-motion="parallax">
          <img src="/assets/projects/home-hero.webp" alt="" />
          <div>
            <p className="page-kicker">Masonry capabilities</p>
            <h1>Scope clarity before field production.</h1>
            <p>Colorado Block Pros works where technical coordination, schedule discipline, and the finished wall all matter.</p>
          </div>
        </section>
        <section className="services-stagger" data-cbp-motion="flow" data-cbp-stagger>
          {items.map((item, index) => (
            <Link to={item.to} key={item.title} className={`services-stagger__item services-stagger__item--${index + 1}`}>
              <img src={item.image} alt="" />
              <div><span>{String(index + 1).padStart(2, "0")}</span><h2>{item.title}</h2><p>{item.copy}</p><strong>Review capability</strong></div>
            </Link>
          ))}
        </section>
        <section className="services-method" data-cbp-motion="resolve">
          <img src="/assets/projects/tools.webp" alt="" />
          <div>
            <h2>Built around the submittal, inspection, and schedule.</h2>
            <p>The job is more than laying units. We study the plans, clarify the assembly, coordinate required information, and plan the work around testing and weather.</p>
            <Link to="/contact" className="services-method__link">Send plans</Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
