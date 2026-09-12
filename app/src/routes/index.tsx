import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { PageShell } from "@/components/site/site-chrome";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";

export const Route = createFileRoute("/")({
  component: Index,
});

const services = [
  {
    title: "Governmental",
    copy: "Public-work coordination that accounts for material documentation, wage requirements, certified payroll, and Colorado labor rules.",
    image: "/assets/projects/governmental.webp",
    icon: "/assets/icons/icon-0.png",
    to: "/services/governmental" as const,
  },
  {
    title: "Commercial",
    copy: "Inspection-aware execution built around mock-ups, strength verification, grout sequencing, and cold-weather planning.",
    image: "/assets/projects/commercial.webp",
    icon: "/assets/icons/icon-1.png",
    to: "/services/commercial" as const,
  },
  {
    title: "Architectural",
    copy: "Material, coursing, moisture-control, and finish coordination that protects the design from submittal through cleanup.",
    image: "/assets/projects/architectural.webp",
    icon: "/assets/icons/icon-3.png",
    to: "/services/architectural" as const,
  },
];

function Index() {
  return (
    <PageShell overlayHeader>
      <main id="main-content" className="home-page">
        <ScrollScrub scenes={scrollScrubScenes} theme={scrollScrubTheme} />

        <section className="service-bond" data-cbp-motion="flow">
          <div className="section-title">
            <p>Three capability tracks</p>
            <h2>The wall is one package. The risks are not.</h2>
          </div>
          <div className="service-bond__grid" data-cbp-stagger>
            {services.map((service, index) => (
              <Link key={service.title} to={service.to} className={`service-path service-path--${index + 1}`}>
                <img className="service-path__image" src={service.image} alt="" />
                <span className="service-path__shade" />
                <img className="service-path__icon" src={service.icon} alt="" />
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <span className="service-path__route">Review capability <i aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="standards-band" data-cbp-motion="draw">
          <div className="standards-band__heading">
            <img src="/assets/icons/icon-4.png" alt="" />
            <h2>Prepared before the wall starts.</h2>
            <p>The useful work happens before material lands: reading the spec, scheduling the mock-up, confirming testing, and planning for the weather window.</p>
          </div>
          <dl className="standards-band__ledger" data-cbp-stagger>
            <div><dt>Quality assurance</dt><dd>TMS 602 and the project statement of special inspections</dd></div>
            <div><dt>Mortar and grout</dt><dd>ASTM C270 and ASTM C476 coordination</dd></div>
            <div><dt>Weather trigger</dt><dd>Cold-weather procedures below 40°F</dd></div>
            <div><dt>Public material reporting</dt><dd>Current solicitation requirements and product documentation</dd></div>
          </dl>
        </section>

        <section className="industries-canvas" data-cbp-motion="reveal" data-cbp-peak="true">
          <div className="industries-canvas__lead">
            <h2>Built around how Colorado projects get delivered.</h2>
            <Link to="/industries" className="industries-route">View industries <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="industries-canvas__images" data-cbp-stagger>
            <figure className="industry-image industry-image--wide">
              <img src="/assets/projects/institutional.webp" alt="" />
              <figcaption>Public and institutional</figcaption>
            </figure>
            <figure className="industry-image industry-image--tall">
              <img src="/assets/projects/multifamily.webp" alt="" />
              <figcaption>Multifamily</figcaption>
            </figure>
            <figure className="industry-image industry-image--small">
              <img src="/assets/projects/healthcare.webp" alt="" />
              <figcaption>Healthcare</figcaption>
            </figure>
          </div>
        </section>

        <section className="adam-profile" data-cbp-motion="spotlight">
          <div className="adam-profile__portrait">
            <img src="/assets/brand/adam.webp" alt="Adam Gutierrez, Colorado Block Pros Masonry" />
            <span>Adam Gutierrez</span>
          </div>
          <div className="adam-profile__copy">
            <p className="page-kicker">Field-first leadership</p>
            <h2>Twenty-five-plus years in the trade.</h2>
            <p>Adam Gutierrez is a Denver native who built Colorado Block Pros around direct accountability, capable field leadership, and an understanding of what the general contractor needs from a masonry subcontractor.</p>
          </div>
        </section>

        <section className="bid-invitation" data-cbp-motion="resolve">
          <img src="/assets/projects/bid-cta.webp" alt="" />
          <div className="bid-invitation__shade" />
          <div className="bid-invitation__copy">
            <p>Estimating and preconstruction</p>
            <h2>Send the plans. We will study the wall.</h2>
            <Link to="/contact" className="bid-invitation__link">Start a bid <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
