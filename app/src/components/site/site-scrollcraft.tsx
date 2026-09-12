import { useEffect, useRef } from "react";

const TRACE_MARKERS = 10;

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function SiteScrollcraft() {
  const traceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trace = traceRef.current;
    const main = document.querySelector<HTMLElement>("#main-content");
    if (!trace || !main) return;

    const sections = Array.from(
      main.querySelectorAll<HTMLElement>("[data-cbp-motion]"),
    );
    if (!sections.length) return;

    const markers = Array.from(
      trace.querySelectorAll<HTMLElement>(".bond-trace__block"),
    );

    sections.forEach((section, sectionIndex) => {
      section.style.setProperty("--cbp-section-index", String(sectionIndex));
      section
        .querySelectorAll<HTMLElement>("[data-cbp-stagger] > *")
        .forEach((item, itemIndex) => {
          item.style.setProperty("--cbp-item-index", String(itemIndex));
        });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-cbp-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    sections.forEach((section) => observer.observe(section));

    const pointerCleanups: Array<() => void> = [];

    sections.forEach((section) => {
      if (section.dataset.cbpMotion === "spotlight") {
        const move = (event: PointerEvent) => {
          const rect = section.getBoundingClientRect();
          section.style.setProperty(
            "--cbp-mx",
            clamp((event.clientX - rect.left) / rect.width).toFixed(3),
          );
          section.style.setProperty(
            "--cbp-my",
            clamp((event.clientY - rect.top) / rect.height).toFixed(3),
          );
        };
        const leave = () => {
          section.style.setProperty("--cbp-mx", "0.5");
          section.style.setProperty("--cbp-my", "0.5");
        };
        section.addEventListener("pointermove", move, { passive: true });
        section.addEventListener("pointerleave", leave);
        pointerCleanups.push(() => {
          section.removeEventListener("pointermove", move);
          section.removeEventListener("pointerleave", leave);
        });
      }

      if (section.dataset.cbpMotion === "resolve") {
        const target = section.querySelector<HTMLElement>("a, button");
        if (!target) return;
        const move = (event: PointerEvent) => {
          const rect = target.getBoundingClientRect();
          const x = clamp((event.clientX - rect.left) / rect.width) - 0.5;
          const y = clamp((event.clientY - rect.top) / rect.height) - 0.5;
          target.style.setProperty("--cbp-cta-x", `${(x * 10).toFixed(2)}px`);
          target.style.setProperty("--cbp-cta-y", `${(y * 7).toFixed(2)}px`);
        };
        const leave = () => {
          target.style.setProperty("--cbp-cta-x", "0px");
          target.style.setProperty("--cbp-cta-y", "0px");
        };
        target.addEventListener("pointermove", move, { passive: true });
        target.addEventListener("pointerleave", leave);
        pointerCleanups.push(() => {
          target.removeEventListener("pointermove", move);
          target.removeEventListener("pointerleave", leave);
        });
      }
    });

    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      let activeIndex = 0;
      let activeProgress = 0;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const progress = clamp(
          (viewport * 0.86 - rect.top) / (viewport * 0.86 + rect.height * 0.72),
        );
        section.style.setProperty("--cbp-p", progress.toFixed(4));
        const inverse = 1 - progress;
        section.style.setProperty("--cbp-flow-y", (inverse * 32).toFixed(2) + "px");
        section.style.setProperty("--cbp-flow-opacity", (0.64 + progress * 0.36).toFixed(3));
        section.style.setProperty("--cbp-draw-opacity", (0.62 + progress * 0.38).toFixed(3));
        section.style.setProperty("--cbp-draw-x", (inverse * 35.2).toFixed(2) + "px");
        section.style.setProperty("--cbp-parallax-y", ((0.5 - progress) * 80).toFixed(2) + "px");
        section.style.setProperty("--cbp-mobile-parallax-y", ((0.5 - progress) * 41.6).toFixed(2) + "px");
        section.style.setProperty("--cbp-copy-y", (inverse * 25.6).toFixed(2) + "px");
        section.style.setProperty("--cbp-reveal-right", (inverse * 28).toFixed(2) + "%");
        section.style.setProperty("--cbp-peak-inset", (inverse * 7).toFixed(2) + "%");
        section.style.setProperty("--cbp-peak-right", (inverse * 38).toFixed(2) + "%");
        section.style.setProperty("--cbp-image-scale", (1.045 - progress * 0.045).toFixed(4));
        section.style.setProperty("--cbp-heading-x", (inverse * 32).toFixed(2) + "px");

        section
          .querySelectorAll<HTMLElement>("[data-cbp-stagger] > *")
          .forEach((item, itemIndex) => {
            const itemProgress = clamp(progress * 1.65 - itemIndex * 0.08);
            item.style.setProperty("--cbp-item-opacity", Math.max(0.64, 0.64 + itemProgress * 0.36).toFixed(3));
            item.style.setProperty("--cbp-item-y", ((1 - itemProgress) * 32).toFixed(2) + "px");
          });

        if (rect.top <= viewport * 0.58 && rect.bottom > viewport * 0.22) {
          activeIndex = index;
          activeProgress = progress;
        } else if (rect.bottom <= viewport * 0.22) {
          activeIndex = index;
          activeProgress = 1;
        }
      });

      const firstRect = sections[0].getBoundingClientRect();
      trace.dataset.visible =
        firstRect.top < viewport * 0.78 &&
        sections.at(-1)!.getBoundingClientRect().bottom > 0
          ? "true"
          : "false";

      const traceProgress = clamp(
        (activeIndex + activeProgress) / Math.max(1, sections.length),
      );
      trace.style.setProperty("--bond-progress", traceProgress.toFixed(4));
      trace.dataset.complete = traceProgress > 0.94 ? "true" : "false";

      markers.forEach((marker, index) => {
        const section = sections[index];
        marker.classList.toggle("is-used", Boolean(section));
        marker.classList.toggle(
          "is-passed",
          Boolean(section) &&
            (index < activeIndex || (index === activeIndex && activeProgress > 0.52)),
        );
        marker.classList.toggle(
          "is-peak",
          section?.dataset.cbpPeak === "true",
        );
      });
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(schedule);
      resizeObserver.observe(main);
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver?.disconnect();
      pointerCleanups.forEach((cleanup) => cleanup());
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div className="bond-trace" ref={traceRef} aria-hidden="true">
      <span className="bond-trace__track" />
      <span className="bond-trace__fill" />
      <span className="bond-trace__blocks">
        {Array.from({ length: TRACE_MARKERS }, (_, index) => (
          <i className="bond-trace__block" key={index} />
        ))}
      </span>
    </div>
  );
}
