import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const scrubStyles = readFileSync(
  new URL("../src/components/scroll-scrub/scroll-scrub.css", import.meta.url),
  "utf8",
);
const scrubRuntime = readFileSync(
  new URL("../src/components/scroll-scrub/scroll-scrub.tsx", import.meta.url),
  "utf8",
);
const sectionMotion = readFileSync(
  new URL("../src/components/site/site-scrollcraft.tsx", import.meta.url),
  "utf8",
);
const router = readFileSync(
  new URL("../src/router.tsx", import.meta.url),
  "utf8",
);
const rootRoute = readFileSync(
  new URL("../src/routes/__root.tsx", import.meta.url),
  "utf8",
);

describe("mobile scroll stability", () => {
  test("uses stable small-viewport units for the pinned mobile journey", () => {
    expect(scrubStyles).toContain("height: 100svh");
    expect(scrubStyles).toContain("margin-top: -100svh");
    expect(scrubRuntime).toContain('"--ss-mobile-band-height"');
    expect(scrubRuntime).toContain("MOBILE_SCROLL_SCALE = 1.25");
  });

  test("ignores browser-chrome resize noise and touch pointer movement", () => {
    expect(sectionMotion).toContain("ignoreMobileResize: true");
    expect(sectionMotion).toContain(
      '"(hover: hover) and (pointer: fine)"',
    );
    expect(sectionMotion).toContain("if (supportsHover)");
    expect(sectionMotion).toContain("if (target && supportsHover)");
  });

  test("does not reset an in-progress public-page scroll during hydration", () => {
    expect(router).toContain(
      'location.pathname.startsWith("/app")',
    );
    expect(rootRoute).toContain("if (initialRender.current)");
    expect(rootRoute).toContain("<PublicRouteScrollReset />");
  });
});
