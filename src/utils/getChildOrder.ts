/**
 * getChildOrder — walk the sidebar config tree to determine the display order
 * of subdirectories and articles under a given content directory.
 *
 * This is the single seam between sidebar structure and index-page ordering.
 * Changes to the sidebar config are reflected through this module without
 * touching SectionIndex.astro.
 */

import {
  onceHubSidebar,
  scheduleOnceSidebar,
  developersSidebar,
  scheduleOnceDevelopersSidebar,
} from "../sidebarConfig.mjs";

// ── Types ────────────────────────────────────────────────────────────────────

/** A single entry in a Starlight sidebar config. Items may be bare slug strings. */
interface SidebarEntry {
  label?: string;
  collapsed?: boolean;
  slug?: string;
  autogenerate?: { directory: string };
  items?: (SidebarEntry | string)[];
}

/** Ordered lists of child names (relative to the directory prefix). */
export interface ChildOrder {
  /** Subdirectory names in sidebar order */
  subdirs: string[];
  /** Article slugs in sidebar order (without the directory prefix) */
  articles: string[];
}

// ── All sidebar configs to search ────────────────────────────────────────────

const ALL_CONFIGS = [
  onceHubSidebar,
  scheduleOnceSidebar,
  developersSidebar,
  scheduleOnceDevelopersSidebar,
];

// ── Core ─────────────────────────────────────────────────────────────────────

/**
 * Walk the sidebar configs to find ordering for children of `directory`.
 * Returns ordered subdirectory names and article slugs, or `null` if the
 * directory has no explicit sidebar configuration.
 */
export function getChildOrder(directory: string): ChildOrder | null {
  const prefix = directory + "/";
  return findInEntries(directory, prefix, ALL_CONFIGS);
}

/**
 * Recursively search sidebar entries for a group whose items belong to `prefix`.
 */
function findInEntries(
  directory: string,
  prefix: string,
  entries: (SidebarEntry | SidebarEntry[] | string)[],
): ChildOrder | null {
  for (const entry of entries) {
    if (typeof entry === "string") continue;

    const items = Array.isArray(entry) ? entry : entry.items;
    if (!items) continue;

    const subdirs: string[] = [];
    const articles: string[] = [];
    let found = false;

    for (const item of items) {
      if (typeof item === "string") continue;

      if (item.items) {
        for (const nested of item.items) {
          if (typeof nested === "string") continue;

          if (nested.autogenerate?.directory.startsWith(prefix)) {
            subdirs.push(nested.autogenerate.directory.slice(prefix.length));
            found = true;
          } else if (nested.items) {
            for (const deep of nested.items) {
              if (typeof deep === "string") continue;
              if (deep.autogenerate?.directory.startsWith(prefix)) {
                subdirs.push(deep.autogenerate.directory.slice(prefix.length));
                found = true;
              }
            }
          } else if (nested.slug?.startsWith(prefix)) {
            articles.push(nested.slug.slice(prefix.length));
            found = true;
          }
        }
      } else if (item.autogenerate?.directory.startsWith(prefix)) {
        subdirs.push(item.autogenerate.directory.slice(prefix.length));
        found = true;
      } else if (item.slug?.startsWith(prefix)) {
        articles.push(item.slug.slice(prefix.length));
        found = true;
      }
    }

    if (found) return { subdirs, articles };

    // Recurse into sub-groups
    const result = findInEntries(directory, prefix, items);
    if (result) return result;
  }

  return null;
}
