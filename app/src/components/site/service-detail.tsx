import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageShell } from "./site-chrome";

export function ServiceDetail({
  category,
  title,
  intro,
  image,
  children,
}: {
  category: string;
  title: string;
  intro: string;
  image: string;
  children: ReactNode;
}) {
  return (
    <PageShell>
      <main id="main-content" className="detail-page">
        <section className="detail-hero" data-cbp-motion="parallax">
          <img src={image} alt="" />
          <div className="detail-hero__scrim" />
          <div className="detail-hero__copy">
            <p className="page-kicker">{category}</p>
            <h1>{title}</h1>
            <p>{intro}</p>
          </div>
          <div className="detail-hero__index" aria-hidden="true">CBP / CAPABILITY</div>
        </section>
        <div className="detail-content">{children}</div>
        <section className="detail-contact-band" data-cbp-motion="resolve">
          <div>
            <p>Bid invitation</p>
            <h2>Put a prepared masonry partner on the list.</h2>
          </div>
          <Link to="/contact" className="detail-contact-target">
            <i aria-hidden="true" /><span>Send plans</span><i aria-hidden="true" />
          </Link>
        </section>
      </main>
    </PageShell>
  );
}

export function TechnicalSection({
  title,
  lead,
  children,
  image,
  reverse = false,
}: {
  title: string;
  lead?: string;
  children: ReactNode;
  image?: string;
  reverse?: boolean;
}) {
  return (
    <section className={reverse ? "technical-section technical-section--reverse" : "technical-section"} data-cbp-motion={image ? "reveal" : "flow"}>
      <div className="technical-section__copy">
        <h2>{title}</h2>
        {lead ? <p className="technical-lead">{lead}</p> : null}
        {children}
      </div>
      {image ? <img className="technical-section__image" src={image} alt="" /> : null}
    </section>
  );
}

export function SpecLedger({
  rows,
}: {
  rows: Array<{ label: string; value: string; note?: string }>;
}) {
  return (
    <dl className="spec-ledger" data-cbp-stagger>
      {rows.map((row) => (
        <div key={row.label}>
          <dt>{row.label}</dt>
          <dd><strong>{row.value}</strong>{row.note ? <span>{row.note}</span> : null}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ProcessList({
  items,
}: {
  items: Array<{ title: string; copy: string }>;
}) {
  return (
    <ol className="process-list" data-cbp-stagger>
      {items.map((item, index) => (
        <li key={item.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div><h3>{item.title}</h3><p>{item.copy}</p></div>
        </li>
      ))}
    </ol>
  );
}
