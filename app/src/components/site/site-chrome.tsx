import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteScrollcraft } from "./site-scrollcraft";

const services = [
  { label: "Governmental", to: "/services/governmental" as const },
  { label: "Commercial", to: "/services/commercial" as const },
  { label: "Architectural", to: "/services/architectural" as const },
];

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={overlay ? "site-header site-header--overlay" : "site-header"}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="site-header__inner">
        <Link to="/" className="site-brand" aria-label="Colorado Block Pros Masonry home">
          <img src="/assets/brand/logo.png" alt="" width="154" height="114" />
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link to="/services" activeProps={{ "aria-current": "page" }}>Services</Link>
          <Link to="/industries" activeProps={{ "aria-current": "page" }}>Industries</Link>
          <Link to="/about" activeProps={{ "aria-current": "page" }}>About</Link>
          <Link to="/contact" activeProps={{ "aria-current": "page" }}>Contact</Link>
        </nav>
        <Link to="/contact" className="header-plans-link">
          <span>Send plans</span><i aria-hidden="true" />
        </Link>
        <details className="mobile-menu">
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            {services.map((service) => (
              <Link key={service.to} to={service.to}>{service.label}</Link>
            ))}
            <Link to="/industries">Industries</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__identity">
          <img src="/assets/brand/logo.png" alt="Colorado Block Pros Masonry" width="190" height="141" />
          <p>Commercial masonry for Colorado's governmental, commercial, and architectural work.</p>
        </div>
        <div className="site-footer__column">
          <strong>Capabilities</strong>
          {services.map((service) => (
            <Link key={service.to} to={service.to}>{service.label}</Link>
          ))}
          <Link to="/industries">Industries</Link>
        </div>
        <div className="site-footer__column">
          <strong>Company</strong>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <a href="mailto:info@cbpmasonry.com">info@cbpmasonry.com</a>
        </div>
        <a className="footer-call-block" href="tel:+13039471095">
          <small>Direct line</small>
          <span>303.947.1095</span>
        </a>
      </div>
      <div className="site-footer__base">
        <span>6864 Nelson St, Arvada, CO 80004</span>
        <span>© 2026 Colorado Block Pros Masonry</span>
      </div>
    </footer>
  );
}

export function PageShell({
  children,
  overlayHeader = false,
}: {
  children: ReactNode;
  overlayHeader?: boolean;
}) {
  return (
    <>
      <SiteHeader overlay={overlayHeader} />
      <SiteScrollcraft />
      {children}
      <SiteFooter />
    </>
  );
}
