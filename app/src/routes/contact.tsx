import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/site/contact-form";
import { PageShell } from "@/components/site/site-chrome";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact | Colorado Block Pros Masonry" }, { name: "description", content: "Send bid details or contact Colorado Block Pros Masonry in Arvada, Colorado." }] }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell>
      <main id="main-content" className="contact-page">
        <section className="contact-hero" data-cbp-motion="parallax">
          <img src="/assets/projects/contact-front-range.webp" alt="" />
          <div className="contact-hero__copy">
            <p className="page-kicker">Bid and project contact</p>
            <h1>Start with the plans and the schedule.</h1>
            <p>Send the bid date, project location, masonry scope, and current documents. We will start with the details that affect pricing and execution.</p>
          </div>
        </section>
        <section className="contact-body" data-cbp-motion="flow">
          <div className="contact-body__form">
            <h2>Project details</h2>
            <ContactForm />
          </div>
          <aside className="contact-card">
            <p>Colorado Block Pros Masonry</p>
            <a className="contact-card__phone" href="tel:+13039471095">303.947.1095</a>
            <a href="mailto:info@cbpmasonry.com">info@cbpmasonry.com</a>
            <address>6864 Nelson St<br />Arvada, CO 80004</address>
            <div className="contact-card__rule" />
            <strong>Useful bid information</strong>
            <ul>
              <li>Plan and specification set</li>
              <li>Bid date and addenda status</li>
              <li>Project location and funding source</li>
              <li>Anticipated masonry schedule</li>
              <li>Alternates and unit-price requests</li>
            </ul>
          </aside>
        </section>
      </main>
    </PageShell>
  );
}
