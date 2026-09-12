import { createElement } from "react";
import type {
  ScrollScrubScene,
  ScrollScrubTheme,
} from "@/components/scroll-scrub/scroll-scrub";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#A61920",
  background: "#111416",
  ink: "#F3F3EF",
  muted: "#C7C7C0",
};

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    body: "Commercial masonry shaped by 25-plus years in the trade, disciplined coordination, and Colorado conditions.",
    clip: "/assets/world/cbp-journey.mp4",
    id: "qualification",
    kicker: "Colorado commercial masonry",
    label: "Qualification",
    mobileClip: "/assets/world/cbp-journey-mobile.mp4",
    mobilePoster: "/assets/world/cbp-journey-mobile-poster.png",
    poster: "/assets/world/cbp-journey-poster.png",
    tags: ["Governmental", "Commercial", "Architectural"],
    title: "Built for the work behind the wall.",
    actions: createElement(
      "a",
      { className: "hero-bid-link", href: `${import.meta.env.BASE_URL}contact` },
      createElement("span", null, "Start a bid"),
      createElement("i", { "aria-hidden": true }),
    ),
    align: "left",
    scroll: 4.8,
    linger: 0.24,
    objectPosition: "58% 50%",
    mobileObjectPosition: "54% 50%",
  },
];
