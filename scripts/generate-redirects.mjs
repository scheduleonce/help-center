/**
 * Postbuild script that generates static HTML redirect files for all articles
 * with an `oldUrl` in their frontmatter.
 *
 * These redirects live at the old URL path (e.g. `/help/managing-account-permissions/`)
 * and use a combination of `<meta http-equiv="refresh">` and `location.replace()`
 * to forward visitors to the new URL.
 *
 * This script runs after `astro build` (in the `postbuild` npm script).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(PROJECT_ROOT, "src", "content", "docs");
const DIST_DIR = path.join(PROJECT_ROOT, "dist");

// Determine the canonical site URL for absolute redirect destinations.
// In CI, set SITE_URL to the dev site URL (e.g. https://help.staticso2.com).
// Defaults to the production URL.
const SITE_URL = (process.env.SITE_URL || "https://help.oncehub.com").replace(
  /\/+$/,
  "",
);

/** Walk a directory recursively and return all file paths. */
function walkDir(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Extract the `oldUrl` frontmatter value from an MDX/MD file.
 * Returns `null` if no `oldUrl` is found.
 */
function extractOldUrl(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  // Match `oldUrl: "https://..."` in the frontmatter (between --- delimiters)
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = match[1];
  const oldUrlMatch = frontmatter.match(/^oldUrl:\s*"([^"]+)"\s*$/m);
  if (!oldUrlMatch) return null;

  const oldUrl = oldUrlMatch[1];

  // Parse the URL path from the full URL
  try {
    const url = new URL(oldUrl);
    // Normalize: ensure trailing slash for directory-like paths
    let pathname = url.pathname;
    if (!pathname.endsWith("/")) {
      pathname += "/";
    }
    return pathname;
  } catch {
    // If it's not a full URL, assume it's already a path
    let pathname = oldUrl.startsWith("/") ? oldUrl : `/${oldUrl}`;
    if (!pathname.endsWith("/")) {
      pathname += "/";
    }
    return pathname;
  }
}

/**
 * Compute the new (Starlight) URL from the file path.
 * Example: `src/content/docs/account-administration/account-permissions/managing-account-permissions.mdx`
 *   → `/account-administration/account-permissions/managing-account-permissions/`
 */
function computeNewUrl(filePath) {
  const relativePath = path.relative(CONTENT_DIR, filePath);
  const parsed = path.parse(relativePath);
  // Starlight's URL is the directory path for `index.mdx` files,
  // or the file stem (without extension) for other files.
  // Both are served as directories with trailing slashes in the build.
  const segments = parsed.dir ? parsed.dir.split(path.sep) : [];
  if (parsed.name !== "index") {
    segments.push(parsed.name);
  }
  return "/" + segments.join("/") + "/";
}

/** Generate an HTML redirect page. */
function generateRedirectHtml(destination) {
  return `<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting…</title>
    <link rel="canonical" href="${destination}" />
    <meta http-equiv="refresh" content="0; url=${destination}" />
    <script>location.replace("${destination}")</script>
  </head>
  <body>
    <a href="${destination}">Redirecting…</a>
  </body>
</html>
`;
}

function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error(
      "[generate-redirects] dist/ directory not found. Run `astro build` first.",
    );
    process.exit(1);
  }

  const contentFiles = walkDir(CONTENT_DIR).filter(
    (f) => f.endsWith(".mdx") || f.endsWith(".md"),
  );

  let generated = 0;
  let skipped = 0;

  for (const filePath of contentFiles) {
    const oldPath = extractOldUrl(filePath);
    if (!oldPath) {
      skipped++;
      continue;
    }

    const newUrl = computeNewUrl(filePath);
    const absoluteUrl = `${SITE_URL}${newUrl}`;

    // Create the redirect file in the dist directory
    // e.g., dist/help/managing-account-permissions/index.html
    const redirectDir = path.join(DIST_DIR, oldPath);
    const redirectFile = path.join(redirectDir, "index.html");

    fs.mkdirSync(redirectDir, { recursive: true });
    fs.writeFileSync(redirectFile, generateRedirectHtml(absoluteUrl), "utf8");

    generated++;
  }

  console.log(
    `[generate-redirects] Generated ${generated} redirects (${skipped} files without oldUrl)`,
  );
}

main();
