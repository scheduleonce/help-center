/**
 * Prebuild script that generates hidden HTML snippets from OpenAPI specs.
 *
 * These snippets are embedded in the Scalar API reference pages as hidden
 * content so Pagefind (Starlight's search) can index every endpoint, method,
 * and description — even though the visible UI is rendered client-side by
 * the Scalar CDN component.
 *
 * ---
 *   <!-- Hidden from UI; present in the DOM for crawlers and search indexing. -->
 *   <div class="api-reference-content api-search-index" style="display: none;" aria-hidden="true">
 *     …full API reference as static HTML…
 *   </div>
 *
 * This script runs in the `prebuild` npm script, before `astro build`,
 * so the HTML is available when pages are compiled.
 */

import { createMarkdownFromOpenApi } from "@scalar/openapi-to-markdown";
import { marked } from "marked";
import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";

const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "src", "generated", "api");

/** Each spec to process */
const SPECS = [
  {
    specPath: "public/developers/api/booking-calendars-api.yaml",
    outputName: "booking-calendars-api",
    label: "Booking Calendars API",
  },
  {
    specPath: "public/scheduleonce/developers/api/booking-pages-api.yaml",
    outputName: "booking-pages-api",
    label: "Booking Pages API",
  },
];

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const { specPath, outputName, label } of SPECS) {
    const fullSpecPath = path.join(PROJECT_ROOT, specPath);

    if (!fs.existsSync(fullSpecPath)) {
      console.warn(
        `[generate-api-html] Skipping ${outputName} — ${specPath} not found`,
      );
      continue;
    }

    try {
      const rawContent = fs.readFileSync(fullSpecPath, "utf8");
      const spec = parseYaml(rawContent);

      // Step 1: Generate Markdown from the OpenAPI spec
      const markdown = await createMarkdownFromOpenApi(spec);

      // Step 2: Convert Markdown to HTML
      const bodyHtml = await marked.parse(markdown);

      // Step 3: Build the hidden snippet (mirrors Scalekit's pattern)
      const hiddenHtml =
        `<!-- Hidden from UI; present in the DOM for crawlers and search indexing. -->\n` +
        `<div class="api-reference-content api-search-index" style="display: none;" aria-hidden="true">\n` +
        `  <h1 id="api-reference">${label}</h1>\n` +
        `  ${bodyHtml}\n` +
        `</div>\n`;

      // Step 4: Write the snippet file
      const outputPath = path.join(OUTPUT_DIR, `${outputName}.html`);
      fs.writeFileSync(outputPath, hiddenHtml, "utf8");

      console.log(
        `[generate-api-html] Generated ${outputName}.html (${(hiddenHtml.length / 1024).toFixed(1)} KB)`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(
        `[generate-api-html] Failed to generate ${outputName} — ${message}`,
      );
    }
  }
}

main();
