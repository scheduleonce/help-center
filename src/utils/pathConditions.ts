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

export function isNotOnDev(pathname: string): boolean {
  return (
    !pathname.startsWith("/developers") &&
    !pathname.startsWith("/scheduleonce/developers")
  );
}
