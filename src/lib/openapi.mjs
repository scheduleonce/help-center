/**
 * Shared OpenAPI spec list and conversion pipeline.
 *
 * Both `scripts/generate-api-html.mjs` (prebuild) and
 * `src/integrations/openapi-markdown.ts` (build hook) import from here
 * so spec paths are defined once and the parse+convert step is not duplicated.
 *
 * @module openapi
 */

import { createMarkdownFromOpenApi } from "@scalar/openapi-to-markdown";
import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";

// ── Spec list (single source of truth) ──────────────────────────────────────

export const SPECS = [
  {
    specPath: "public/developers/api/booking-calendars-api.yaml",
    /** Short identifier, also used as the HTML snippet filename */
    name: "booking-calendars-api",
    /** Human-readable label for hidden HTML heading */
    label: "Booking Calendars API",
  },
  {
    specPath: "public/scheduleonce/developers/api/booking-pages-api.yaml",
    name: "booking-pages-api",
    label: "Booking Pages API",
  },
  {
    specPath: "public/developers/api/oncehub-v1.yaml",
    name: "v1-api",
    label: "ScheduleOnce v1 API (Deprecated)",
  },
];

// ── Conversion (shared parse + markdown step) ────────────────────────────────

/**
 * Parse a YAML (or JSON) OpenAPI spec and convert it to Markdown.
 *
 * @param {string} specPath - Absolute path to the YAML/JSON spec file.
 * @returns {Promise<{ spec: Record<string, unknown>; markdown: string }>}
 */
export async function convertSpec(specPath) {
  const rawContent = fs.readFileSync(specPath, "utf8");

  const isYaml = specPath.endsWith(".yaml") || specPath.endsWith(".yml");
  /** @type {Record<string, unknown>} */
  const spec = isYaml ? parseYaml(rawContent) : JSON.parse(rawContent);

  const markdown = await createMarkdownFromOpenApi(spec);

  return { spec, markdown };
}

/**
 * Derive the output Markdown file path from a spec path.
 * E.g. "public/developers/api/booking-calendars-api.yaml"
 *   → "developers/api/booking-calendars-api.md"
 *
 * @param {string} specPath
 * @returns {string}
 */
export function specToOutputFile(specPath) {
  return specPath.replace("public/", "").replace(/\.ya?ml$/, ".md");
}

/** Project root resolved from this module's location. */
export const PROJECT_ROOT = path.resolve(import.meta.dirname, "../..");
