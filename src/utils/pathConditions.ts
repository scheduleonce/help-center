/**
 * Centralized path-based condition checks for the help center.
 *
 * Import in any Astro component to avoid duplicating these checks:
 *
 *   import { isHomepage, isOncehubHelp, ... } from "~/utils/pathConditions";
 *
 * All functions take `pathname: string` (e.g. Astro.url.pathname).
 */

export function isHomepage(pathname: string): boolean {
  return pathname === "/" || pathname === "";
}

export function isOncehubDevDocs(pathname: string): boolean {
  return (
    pathname.startsWith("/developers") &&
    !pathname.startsWith("/developers/api") &&
    !pathname.startsWith("/scheduleonce/")
  );
}

export function isOncehubDevApi(pathname: string): boolean {
  return pathname.startsWith("/developers/api");
}

export function isSoDevDocs(pathname: string): boolean {
  return (
    pathname.startsWith("/scheduleonce/developers") &&
    !pathname.startsWith("/scheduleonce/developers/api")
  );
}

export function isSoDevApi(pathname: string): boolean {
  return pathname.startsWith("/scheduleonce/developers/api");
}

export function isSoHelp(pathname: string): boolean {
  return (
    pathname.startsWith("/scheduleonce") &&
    !pathname.startsWith("/scheduleonce/developers")
  );
}

export function isOncehubHelp(pathname: string): boolean {
  return (
    !pathname.startsWith("/scheduleonce") && !pathname.startsWith("/developers")
  );
}

/**
 * Help Center link — shown on dev pages, goes back to the first article of the
 * product's help center.
 */
export function helpCenterLink(pathname: string): string {
  return pathname.startsWith("/scheduleonce/developers")
    ? "/scheduleonce/"
    : "/getting-started/introduction-oncehub/feature-comparison-booking-calendars-vs-booking-pages/";
}

/**
 * Product switcher links — context-aware.
 * On dev pages → links point to the first article in the respective dev docs.
 * On help pages → links point to the respective help center.
 */
export function productSwitcherLinks(pathname: string): {
  oncehub: string;
  scheduleonce: string;
} {
  return {
    oncehub: isDev(pathname)
      ? "/developers/overview/introduction/"
      : "/getting-started/introduction-oncehub/feature-comparison-booking-calendars-vs-booking-pages/",
    scheduleonce: isDev(pathname)
      ? "/scheduleonce/developers/client-side-api/embedded-booking-calendar-events/"
      : "/scheduleonce",
  };
}

/** Whether the path is within the OnceHub developer section. */
export function isOncehubDev(pathname: string): boolean {
  return isOncehubDevDocs(pathname) || isOncehubDevApi(pathname);
}

/** Whether the path is within the ScheduleOnce developer section. */
export function isSoDev(pathname: string): boolean {
  return isSoDevDocs(pathname) || isSoDevApi(pathname);
}

/** Whether the path is anywhere on ScheduleOnce (help or dev). */
export function isScheduleOnce(pathname: string): boolean {
  return pathname.startsWith("/scheduleonce");
}

export function isDev(pathname: string): boolean {
  return isOncehubDev(pathname) || isSoDev(pathname);
}
