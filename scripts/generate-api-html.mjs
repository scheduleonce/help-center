/**
 * Prebuild script that generates hidden HTML snippets from OpenAPI specs.
 *
 * These snippets are embedded in the Scalar API reference pages as hidden
 * content so Pagefind (Starlight's search) can index every endpoint, method,
 * and description — even though the visible UI is rendered client-side by
 * the Scalar CDN component.
 *
 * This script runs in the `prebuild` npm script, before `astro build`,
 * so the HTML is available when pages are compiled.
 */

import { convertSpec, PROJECT_ROOT, SPECS } from "../src/lib/openapi.mjs";
import { marked } from "marked";
import fs from "node:fs";
import path from "node:path";

const OUTPUT_DIR = path.join(PROJECT_ROOT, "src", "generated", "api");

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const { specPath, name, label } of SPECS) {
    const fullSpecPath = path.join(PROJECT_ROOT, specPath);

    if (!fs.existsSync(fullSpecPath)) {
      console.warn(
        `[generate-api-html] Skipping ${name} — ${specPath} not found`,
      );
      continue;
    }

    try {
      // Step 1: Parse + convert via shared pipeline
      const { markdown } = await convertSpec(fullSpecPath);

      // Step 2: Convert Markdown to HTML
      const bodyHtml = await marked.parse(markdown);

      // Step 3: Build the hidden snippet
      const hiddenHtml =
        `<!-- Hidden from UI; present in the DOM for crawlers and search indexing. -->\n` +
        `<div class="api-reference-content api-search-index" style="display: none;" aria-hidden="true">\n` +
        `  <h1 id="api-reference">${label}</h1>\n` +
        `  ${bodyHtml}\n` +
        `</div>\n`;

      // Step 4: Write the snippet file
      const outputPath = path.join(OUTPUT_DIR, `${name}.html`);
      fs.writeFileSync(outputPath, hiddenHtml, "utf8");

      console.log(
        `[generate-api-html] Generated ${name}.html (${(hiddenHtml.length / 1024).toFixed(1)} KB)`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(
        `[generate-api-html] Failed to generate ${name} — ${message}`,
      );
    }
  }
}

main();
