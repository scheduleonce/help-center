import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { spawnSync } from 'child_process';

const DOCS_DIR = 'src/content/docs';
const CACHE_FILE = 'sitemap-lastmod-cache.json';

function walkDir(dir, callback) {
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, callback);
    } else if (stat.isFile() && /\.(md|mdx)$/.test(item)) {
      callback(fullPath);
    }
  }
}

function getUrlPath(filePath) {
  const rel = relative(DOCS_DIR, filePath);
  let urlPath = rel.replace(/\.mdx?$/, '');

  // Handle index files: getting-started/index → getting-started/
  if (urlPath.endsWith('/index')) {
    urlPath = urlPath.slice(0, -6); // remove '/index'
  } else if (urlPath === 'index') {
    urlPath = '';
  }

  // Slugify path segments to match generated URL slugs
  // Astro/Starlight removes apostrophes and other special chars from slugs
  urlPath = urlPath.toLowerCase().replace(/'/g, ''); // remove apostrophes

  // Ensure leading slash and trailing slash
  urlPath = '/' + urlPath;
  if (!urlPath.endsWith('/')) {
    urlPath += '/';
  }

  return urlPath;
}

function getGitLastCommitDate(filePath) {
  const result = spawnSync('git', ['log', '-1', '--format=%cI', filePath], {
    encoding: 'utf-8',
    cwd: process.cwd(),
  });

  if (result.error || result.status !== 0 || !result.stdout.trim()) {
    return null;
  }

  return result.stdout.trim();
}

const cache = {};
const processed = [];

walkDir(DOCS_DIR, (filePath) => {
  const urlPath = getUrlPath(filePath);
  const date = getGitLastCommitDate(filePath);

  if (date) {
    cache[urlPath] = date;
    processed.push({ path: urlPath, date, file: filePath });
  } else {
    console.warn(`Warning: Could not get git date for ${filePath}`);
  }
});

writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
console.log(`Generated ${CACHE_FILE} with ${Object.keys(cache).length} entries`);

// Log a sample for verification
if (processed.length > 0) {
  console.log('\nSample entries:');
  for (const entry of processed.slice(0, 5)) {
    console.log(`  ${entry.path} → ${entry.date}`);
  }
  if (processed.length > 5) {
    console.log(`  ... and ${processed.length - 5} more`);
  }
}
