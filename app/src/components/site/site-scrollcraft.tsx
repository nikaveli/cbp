import { useEffect, useRef } from "react";

const TRACE_MARKERS = 10;

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function directContent(section: HTMLElement) {
  return Array.from(section.children).filter(
    (child): child is HTMLElement =>
      child instanceof HTMLElement &&
      !child.matches("img, [class*='shade'], [class*='scrim']"),
  );
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

    let disposed = false;
    let teardown = () => undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([gsapModule, scrollTriggerModule]) => {
        if (disposed) return;

        const gsap = gsapModule.gsap;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({ ignoreMobileResize: true });

        const supportsHover = window.matchMedia(
          "(hover: hover) and (pointer: fine)",
        ).matches;

        const markers = Array.from(
          trace.querySelectorAll<HTMLElement>(".bond-trace__block"),
        );
        const media = gsap.matchMedia();
        const imageRefreshers: Array<{
          image: HTMLImageElement;
          refresh: () => void;
        }> = [];

        sections.forEach((section, sectionIndex) => {
          section.style.setProperty("--cbp-section-index", String(sectionIndex));
          section
            .querySelectorAll<HTMLElement>("[data-cbp-stagger] > *")
            .forEach((item, itemIndex) => {
              item.style.setProperty("--cbp-item-index", String(itemIndex));
            });
        });

        markers.forEach((marker, index) => {
          marker.classList.toggle("is-used", index < sections.length);
          marker.classList.toggle(
            "is-peak",
            sections[index]?.dataset.cbpPeak === "true",
          );
        });

        media.add("(prefers-reduced-motion: no-preference)", () => {
          const pointerCleanups: Array<() => void> = [];
          main.classList.add("is-cbp-gsap");

          gsap.fromTo(
            trace,
            { "--bond-progress": 0 },
            {
              "--bond-progress": 1,
              ease: "none",
              scrollTrigger: {
                id: "cbp-bond-progress",
                trigger: sections[0],
                start: "top 78%",
                endTrigger: sections.at(-1),
                end: "bottom 28%",
                scrub: 0.75,
              },
            },
          );

          ScrollTrigger.create({
            id: "cbp-bond-visibility",
            trigger: sections[0],
            start: "top 78%",
            endTrigger: sections.at(-1),
            end: "bottom 8%",
            onToggle: (self) => {
              trace.dataset.visible = self.isActive ? "true" : "false";
            },
          });

          sections.forEach((section, index) => {
            const motion = section.dataset.cbpMotion;
            const staggerItems = Array.from(
              section.querySelectorAll<HTMLElement>("[data-cbp-stagger] > *"),
            );
            const marker = markers[index];

            gsap.fromTo(
              section,
              { "--cbp-p": 0 },
              {
                "--cbp-p": 1,
                ease: "none",
                scrollTrigger: {
                  id: `cbp-progress-${index}`,
                  trigger: section,
                  start: "top 92%",
                  end: "bottom 22%",
                  scrub: 0.65,
                },
              },
            );

            if (marker) {
              gsap.set(marker, { autoAlpha: 0.55, scale: 0.78 });
              ScrollTrigger.create({
                id: `cbp-marker-${index}`,
                trigger: section,
                start: "top 58%",
                end: "bottom 42%",
                onEnter: () => {
                  marker.classList.add("is-passed");
                  gsap
                    .timeline()
                    .to(marker, {
                      autoAlpha: 1,
                      scale: section.dataset.cbpPeak === "true" ? 1.34 : 1.16,
                      duration: 0.24,
                      ease: "power3.out",
                    })
                    .to(marker, {
                      scale: 1,
                      duration: 0.42,
                      ease: "elastic.out(1, 0.55)",
                    });
                },
                onLeaveBack: () => {
                  marker.classList.remove("is-passed");
                  gsap.to(marker, {
                    autoAlpha: 0.55,
                    scale: 0.78,
                    duration: 0.2,
                    ease: "power2.out",
                  });
                },
              });
            }

            if (motion === "flow") {
              gsap.fromTo(
                directContent(section),
                {
                  "--cbp-flow-y": "52px",
                  "--cbp-flow-opacity": 0.5,
                },
                {
                  "--cbp-flow-y": "0px",
                  "--cbp-flow-opacity": 1,
                  duration: 1.15,
                  stagger: 0.12,
                  ease: "power3.out",
                  scrollTrigger: {
                    id: `cbp-flow-${index}`,
                    trigger: section,
                    start: "top 82%",
                    once: true,
                  },
                },
              );

              if (staggerItems.length) {
                gsap.fromTo(
                  staggerItems,
                  {
                    "--cbp-item-y": "64px",
                    "--cbp-item-opacity": 0.48,
                  },
                  {
                    "--cbp-item-y": "0px",
                    "--cbp-item-opacity": 1,
                    duration: 1.05,
                    stagger: 0.11,
                    ease: "power3.out",
                    scrollTrigger: {
                      id: `cbp-flow-items-${index}`,
                      trigger: staggerItems[0],
                      start: "top 86%",
                      once: true,
                    },
                  },
                );
              }
            }

            if (motion === "draw") {
              gsap.fromTo(
                section,
                {
                  "--cbp-draw-x": "58px",
                  "--cbp-draw-opacity": 0.52,
                },
                {
                  "--cbp-draw-x": "0px",
                  "--cbp-draw-opacity": 1,
                  ease: "none",
                  scrollTrigger: {
                    id: `cbp-draw-${index}`,
                    trigger: section,
                    start: "top 84%",
                    end: "center 48%",
                    scrub: 0.8,
                  },
                },
              );

              if (staggerItems.length) {
                gsap.fromTo(
                  staggerItems,
                  { autoAlpha: 0.42, x: 34 },
                  {
                    autoAlpha: 1,
                    x: 0,
                    duration: 0.85,
                    stagger: 0.09,
                    ease: "power3.out",
                    scrollTrigger: {
                      id: `cbp-draw-items-${index}`,
                      trigger: staggerItems[0],
                      start: "top 84%",
                      once: true,
                    },
                  },
                );
              }
            }

            if (motion === "parallax") {
              gsap.fromTo(
                section,
                {
                  "--cbp-parallax-y": "62px",
                  "--cbp-mobile-parallax-y": "34px",
                  "--cbp-copy-y": "42px",
                  "--cbp-parallax-scale": 1.1,
                },
                {
                  "--cbp-parallax-y": "-52px",
                  "--cbp-mobile-parallax-y": "-26px",
                  "--cbp-copy-y": "-12px",
                  "--cbp-parallax-scale": 1.025,
                  ease: "none",
                  scrollTrigger: {
                    id: `cbp-parallax-${index}`,
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.05,
                  },
                },
              );

              gsap.fromTo(
                directContent(section),
                { autoAlpha: 0.62 },
                {
                  autoAlpha: 1,
                  duration: 0.85,
                  stagger: 0.08,
                  ease: "power2.out",
                  scrollTrigger: {
                    id: `cbp-parallax-copy-${index}`,
                    trigger: section,
                    start: "top 78%",
                    once: true,
                  },
                },
              );
            }

            if (motion === "reveal") {
              const peak = section.dataset.cbpPeak === "true";
              gsap.fromTo(
                section,
                {
                  "--cbp-reveal-right": peak ? "44%" : "32%",
                  "--cbp-peak-inset": peak ? "8%" : "0%",
                  "--cbp-peak-right": peak ? "46%" : "32%",
                  "--cbp-image-scale": peak ? 1.095 : 1.065,
                  "--cbp-heading-x": "48px",
                },
                {
                  "--cbp-reveal-right": "0%",
                  "--cbp-peak-inset": "0%",
                  "--cbp-peak-right": "0%",
                  "--cbp-image-scale": 1,
                  "--cbp-heading-x": "0px",
                  ease: "none",
                  scrollTrigger: {
                    id: `cbp-reveal-${index}`,
                    trigger: section,
                    start: "top 88%",
                    end: peak ? "center 40%" : "center 52%",
                    scrub: peak ? 1.15 : 0.78,
                  },
                },
              );

              if (staggerItems.length) {
                gsap.fromTo(
                  staggerItems,
                  { autoAlpha: 0.5, y: 52 },
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                      id: `cbp-reveal-items-${index}`,
                      trigger: staggerItems[0],
                      start: "top 88%",
                      once: true,
                    },
                  },
                );
              }
            }

            if (motion === "spotlight") {
              gsap.fromTo(
                directContent(section),
                { autoAlpha: 0.58, y: 46 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 1.05,
                  stagger: 0.14,
                  ease: "power3.out",
                  scrollTrigger: {
                    id: `cbp-spotlight-in-${index}`,
                    trigger: section,
                    start: "top 80%",
                    once: true,
                  },
                },
              );

              if (supportsHover) {
                const move = (event: PointerEvent) => {
                  const rect = section.getBoundingClientRect();
                  gsap.to(section, {
                    "--cbp-mx": clamp((event.clientX - rect.left) / rect.width),
                    "--cbp-my": clamp((event.clientY - rect.top) / rect.height),
                    duration: 0.55,
                    ease: "power3.out",
                    overwrite: "auto",
                  });
                };
                const leave = () => {
                  gsap.to(section, {
                    "--cbp-mx": 0.5,
                    "--cbp-my": 0.5,
                    duration: 0.7,
                    ease: "power3.out",
                    overwrite: "auto",
                  });
                };
                section.addEventListener("pointermove", move, { passive: true });
                section.addEventListener("pointerleave", leave);
                pointerCleanups.push(() => {
                  section.removeEventListener("pointermove", move);
                  section.removeEventListener("pointerleave", leave);
                });
              }
            }

            if (motion === "resolve") {
              gsap.fromTo(
                directContent(section),
                { autoAlpha: 0.58, y: 68 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 1.15,
                  stagger: 0.11,
                  ease: "power3.out",
                  scrollTrigger: {
                    id: `cbp-resolve-${index}`,
                    trigger: section,
                    start: "top 82%",
                    once: true,
                  },
                },
              );

              const image = section.querySelector<HTMLImageElement>(":scope > img");
              if (image) {
                gsap.fromTo(
                  image,
                  { scale: 1.085, yPercent: -2 },
                  {
                    scale: 1.02,
                    yPercent: 2,
                    ease: "none",
                    scrollTrigger: {
                      id: `cbp-resolve-image-${index}`,
                      trigger: section,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 1.1,
                    },
                  },
                );
              }

              const target = section.querySelector<HTMLElement>("a, button");
              if (target && supportsHover) {
                const move = (event: PointerEvent) => {
                  const rect = target.getBoundingClientRect();
                  const x = clamp((event.clientX - rect.left) / rect.width) - 0.5;
                  const y = clamp((event.clientY - rect.top) / rect.height) - 0.5;
                  gsap.to(target, {
                    "--cbp-cta-x": `${(x * 12).toFixed(2)}px`,
                    "--cbp-cta-y": `${(y * 8).toFixed(2)}px`,
                    duration: 0.28,
                    ease: "power3.out",
                    overwrite: "auto",
                  });
                };
                const leave = () => {
                  gsap.to(target, {
                    "--cbp-cta-x": "0px",
                    "--cbp-cta-y": "0px",
                    duration: 0.5,
                    ease: "elastic.out(1, 0.55)",
                    overwrite: "auto",
                  });
                };
                target.addEventListener("pointermove", move, { passive: true });
                target.addEventListener("pointerleave", leave);
                pointerCleanups.push(() => {
                  target.removeEventListener("pointermove", move);
                  target.removeEventListener("pointerleave", leave);
                });
              }
            }
          });

          const images = Array.from(main.querySelectorAll<HTMLImageElement>("img"));
          images.forEach((image) => {
            if (image.complete) return;
            const refresh = () => ScrollTrigger.refresh();
            image.addEventListener("load", refresh, { once: true });
            imageRefreshers.push({ image, refresh });
          });

          requestAnimationFrame(() => ScrollTrigger.refresh());

          return () => {
            pointerCleanups.forEach((cleanup) => cleanup());
          };
        });

        media.add("(prefers-reduced-motion: reduce)", () => {
          trace.dataset.visible = "false";
          sections.forEach((section) => {
            section.style.setProperty("--cbp-p", "1");
          });
        });

        teardown = () => {
          imageRefreshers.forEach(({ image, refresh }) => {
            image.removeEventListener("load", refresh);
          });
          main.classList.remove("is-cbp-gsap");
          trace.dataset.visible = "false";
          media.revert();
        };
      })
      .catch((error) => {
        console.error("Scroll choreography failed to initialize", error);
      });

    return () => {
      disposed = true;
      teardown();
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
