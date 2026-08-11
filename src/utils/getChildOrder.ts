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

/**
 * A single entry in the ordered child list, preserving the interleaving of
 * articles and subdirectories as defined in the sidebar config.
 */
export type ChildOrderEntry =
  | { type: "article"; slug: string }
  | { type: "subdir"; name: string };

/** Ordered list of children (articles and subdirectories interleaved). */
export type ChildOrder = ChildOrderEntry[];

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
 * Returns an ordered list of articles and subdirectories in sidebar order
 * (preserving interleaving), or `null` if the directory has no explicit
 * sidebar configuration.
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

    const order: ChildOrder = [];
    let found = false;

    for (const item of items) {
      if (typeof item === "string") continue;

      if (item.items) {
        // This item has children — it's either a subcategory group or a
        // labelled group containing articles/subcategories.
        let subdirFound = false;

        for (const nested of item.items) {
          if (typeof nested === "string") continue;

          if (nested.autogenerate?.directory.startsWith(prefix)) {
            order.push({
              type: "subdir",
              name: nested.autogenerate.directory.slice(prefix.length),
            });
            subdirFound = true;
            found = true;
          } else if (nested.items) {
            // Deeply nested autogenerate (e.g. Troubleshooting > autogenerate)
            for (const deep of nested.items) {
              if (typeof deep === "string") continue;
              if (deep.autogenerate?.directory.startsWith(prefix)) {
                order.push({
                  type: "subdir",
                  name: deep.autogenerate.directory.slice(prefix.length),
                });
                subdirFound = true;
                found = true;
              }
            }
          } else if (nested.slug?.startsWith(prefix)) {
            order.push({
              type: "article",
              slug: nested.slug.slice(prefix.length),
            });
            subdirFound = true;
            found = true;
          }
        }

        // If the item itself has children but none matched the prefix,
        // it might be a labelled group that should be treated as a subdir
        // (e.g. a group with autogenerate at the item level).
        if (!subdirFound && item.autogenerate?.directory.startsWith(prefix)) {
          order.push({
            type: "subdir",
            name: item.autogenerate.directory.slice(prefix.length),
          });
          found = true;
        }
      } else if (item.autogenerate?.directory.startsWith(prefix)) {
        order.push({
          type: "subdir",
          name: item.autogenerate.directory.slice(prefix.length),
        });
        found = true;
      } else if (item.slug?.startsWith(prefix)) {
        order.push({
          type: "article",
          slug: item.slug.slice(prefix.length),
        });
        found = true;
      }
    }

    if (found) return order;

    // Recurse into sub-groups
    const result = findInEntries(directory, prefix, items);
    if (result) return result;
  }

  return null;
}
