import type { AstroIntegration } from "astro";
import { convertSpec, specToOutputFile, SPECS } from "../lib/openapi.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export default function openapiToMarkdown(): AstroIntegration {
  return {
    name: "openapi-to-markdown",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const distPath = fileURLToPath(dir);
        const publicPath = path.resolve("public");

        for (const { specPath } of SPECS) {
          const fullSpecPath = path.resolve(specPath);

          if (!fs.existsSync(fullSpecPath)) {
            const outputFile = specToOutputFile(specPath);
            console.warn(
              `openapi-to-markdown: skipping ${outputFile} — ${specPath} not found`,
            );
            continue;
          }

          try {
            const { markdown } = await convertSpec(fullSpecPath);
            const outputFile = specToOutputFile(specPath);

            // Write to dist/ for the current build
            const distOutput = path.join(distPath, outputFile);
            fs.mkdirSync(path.dirname(distOutput), { recursive: true });
            fs.writeFileSync(distOutput, markdown);

            // Write to public/ so the file is a static asset on subsequent builds
            const publicOutput = path.join(publicPath, outputFile);
            fs.mkdirSync(path.dirname(publicOutput), { recursive: true });
            fs.writeFileSync(publicOutput, markdown);

            console.log(
              `openapi-to-markdown: generated ${outputFile} (${(markdown.length / 1024).toFixed(1)} KB)`,
            );
          } catch (error) {
            const outputFile = specToOutputFile(specPath);
            const message =
              error instanceof Error ? error.message : String(error);
            console.error(
              `openapi-to-markdown: failed to generate ${outputFile} — ${message}`,
              error,
            );
          }
        }
      },
    },
  };
}
