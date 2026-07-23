/**
 * Centralized path-based condition checks for the help center.
 *
 * The route space is a 2×3 matrix (product × section) plus homepage:
 *
 *               | Help            | Dev Docs        | Dev API
 *   OnceHub     | /*              | /developers/*   | /developers/api/*
 *   ScheduleOnce| /scheduleonce/* | /scheduleonce/  | /scheduleonce/
 *               |                 |   developers/*  |   developers/api/*
 *
 * Import in any Astro component:
 *
 *   import { classify, isHomepage, PREFIX, ... } from "~/utils/pathConditions";
 */

// ── Types ────────────────────────────────────────────────────────────────────

/**
 * The seven mutually-exclusive route buckets.
 * `classify()` is the single source of truth; call it once per page and
 * switch on the result, or use the convenience `is*` wrappers below.
 */
export type Section =
  | "homepage"
  | "oncehub-help"
  | "oncehub-dev-docs"
  | "oncehub-dev-api"
  | "scheduleonce-help"
  | "scheduleonce-dev-docs"
  | "scheduleonce-dev-api";

// ── Route constants ──────────────────────────────────────────────────────────

/**
 * Canonical path prefixes (with trailing slash).
 * Use for filtering Starlight sidebar entries by prefix.
 */
export const PREFIX = {
  developers: "/developers/",
  developersApi: "/developers/api/",
  scheduleonce: "/scheduleonce/",
  scheduleonceDevelopers: "/scheduleonce/developers/",
  scheduleonceDevelopersApi: "/scheduleonce/developers/api/",
} as const;

/**
 * Entry-point URL for each section — the page a user lands on when they
 * navigate to a section root.
 */
export const FIRST_ARTICLE: Record<Section, string | null> = {
  homepage: null,
  "oncehub-help":
    "/getting-started/introduction-oncehub/feature-comparison-booking-calendars-vs-booking-pages/",
  "oncehub-dev-docs": "/developers/overview/introduction/",
  "oncehub-dev-api": "/developers/api/",
  "scheduleonce-help": "/scheduleonce/",
  "scheduleonce-dev-docs":
    "/scheduleonce/developers/client-side-api/embedded-booking-calendar-events/",
  "scheduleonce-dev-api": "/scheduleonce/developers/api/",
};

// ── Core: single classification function ─────────────────────────────────────

/** Classify a pathname into one of the seven route buckets. */
export function classify(pathname: string): Section {
  if (pathname === "/" || pathname === "") return "homepage";

  // Order matters: most-specific prefix first.
  if (segment(pathname, "/scheduleonce/developers/api"))
    return "scheduleonce-dev-api";
  if (segment(pathname, "/scheduleonce/developers"))
    return "scheduleonce-dev-docs";
  if (segment(pathname, "/scheduleonce")) return "scheduleonce-help";

  if (segment(pathname, "/developers/api")) return "oncehub-dev-api";
  if (segment(pathname, "/developers")) return "oncehub-dev-docs";

  return "oncehub-help";
}

/**
 * Like startsWith but only matches on a segment boundary:
 * "/developers/api" matches "/developers/api/..." but NOT "/developers/api-keys".
 */
function segment(pathname: string, prefix: string): boolean {
  return pathname.startsWith(prefix + "/") || pathname === prefix;
}

// ── Convenience boolean checks ───────────────────────────────────────────────

/** True for the homepage ("/" or ""). */
export function isHomepage(pathname: string): boolean {
  return classify(pathname) === "homepage";
}

/** True for OnceHub help articles (the default, non-dev, non-SO bucket). */
export function isOncehubHelp(pathname: string): boolean {
  return classify(pathname) === "oncehub-help";
}

/** True for ScheduleOnce help articles. */
export function isSoHelp(pathname: string): boolean {
  return classify(pathname) === "scheduleonce-help";
}

/** True for any ScheduleOnce page (help or dev). */
export function isScheduleOnce(pathname: string): boolean {
  return classify(pathname).startsWith("scheduleonce");
}

/** True for any developer page (OnceHub or ScheduleOnce). */
export function isDev(pathname: string): boolean {
  const s = classify(pathname);
  return (
    s === "oncehub-dev-docs" ||
    s === "oncehub-dev-api" ||
    s === "scheduleonce-dev-docs" ||
    s === "scheduleonce-dev-api"
  );
}

// ── Link helpers ─────────────────────────────────────────────────────────────

/**
 * "Help Center" link shown on dev pages — goes back to the first article
 * of the current product's help center.
 */
export function helpCenterLink(pathname: string): string {
  const s = classify(pathname);
  return s.startsWith("scheduleonce")
    ? FIRST_ARTICLE["scheduleonce-help"]!
    : FIRST_ARTICLE["oncehub-help"]!;
}

/**
 * Product switcher links.
 * On dev pages → first article in the dev docs.
 * On help pages → respective help center root.
 */
export function productSwitcherLinks(pathname: string): {
  oncehub: string;
  scheduleonce: string;
} {
  const dev = isDev(pathname);
  return {
    oncehub: dev
      ? FIRST_ARTICLE["oncehub-dev-docs"]!
      : FIRST_ARTICLE["oncehub-help"]!,
    scheduleonce: dev
      ? FIRST_ARTICLE["scheduleonce-dev-docs"]!
      : FIRST_ARTICLE["scheduleonce-help"]!,
  };
}

/**
 * Docs & API links for the TopicsBar — context-aware by product.
 * Now includes userGuides for the site-wide 3-tab TopicsBar.
 */
export function topicsBarLinks(pathname: string): {
  userGuides: string;
  docs: string;
  api: string;
} {
  const s = classify(pathname);
  const oh = s.startsWith("oncehub");
  return {
    userGuides: oh
      ? FIRST_ARTICLE["oncehub-help"]!
      : FIRST_ARTICLE["scheduleonce-help"]!,
    docs: oh
      ? FIRST_ARTICLE["oncehub-dev-docs"]!
      : FIRST_ARTICLE["scheduleonce-dev-docs"]!,
    api: oh
      ? FIRST_ARTICLE["oncehub-dev-api"]!
      : FIRST_ARTICLE["scheduleonce-dev-api"]!,
  };
}
