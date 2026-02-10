import fs from 'fs-extra';
import path from 'path';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const ROOT_DIR = process.cwd();
const SOURCE_DIR = path.join(ROOT_DIR, 'ko-export/html_export');
const TARGET_DIR = path.join(ROOT_DIR, 'src/content/docs');

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});
turndownService.use(gfm);

// Custom rules for Starlight
turndownService.addRule('starlight-alerts', {
  filter: (node) => {
    return (
      node.nodeName === 'DIV' &&
      node.classList.contains('alert')
    );
  },
  replacement: (content, node) => {
    let type = 'note';
    if (node.classList.contains('alert-info')) type = 'note';
    if (node.classList.contains('alert-warning')) type = 'caution';
    if (node.classList.contains('alert-success')) type = 'tip';
    if (node.classList.contains('alert-danger')) type = 'danger';
    
    // Clean up the content - KO often has <strong>Note</strong> at the start
    let cleanContent = content.trim();
    cleanContent = cleanContent.replace(/^(Note|Tip|Warning|Caution|Important):?\s*/i, '');
    
    return `\n\n:::${type}\n${cleanContent}\n:::\n\n`;
  }
});

// Rule for iframes (videos)
turndownService.addRule('iframes', {
  filter: 'iframe',
  replacement: (content, node) => {
    const src = node.getAttribute('src');
    if (src && (src.includes('youtube.com') || src.includes('vimeo.com'))) {
        // Return as is or wrap in a component if needed
        return `\n\n<iframe src="${src}" width="100%" height="400" frameborder="0" allowfullscreen></iframe>\n\n`;
    }
    return '';
  }
});

async function migrate() {
  console.log('Starting migration...');
  
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Source directory not found: ${SOURCE_DIR}`);
    return;
  }

  const files = await getFiles(SOURCE_DIR);
  console.log(`Found ${files.length} files to process.`);

  for (const file of files) {
    if (file.endsWith('.html')) {
      await processFile(file);
    }
  }
  
  console.log('Migration complete!');
}

async function getFiles(dir) {
  const subdirs = await fs.readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = path.resolve(dir, subdir);
    return (await fs.stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-')     // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');      // Trim - from end of text
}

async function processFile(filePath) {
  try {
    const html = await fs.readFile(filePath, 'utf-8');
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const titleElement = doc.querySelector('.hg-article-title');
    const bodyElement = doc.querySelector('.hg-article-body');

    if (!titleElement || !bodyElement) {
        return;
    }

    const title = titleElement.textContent.replace('Download PDF', '').trim();
    
    bodyElement.querySelectorAll('script, style').forEach(el => el.remove());

    bodyElement.querySelectorAll('a').forEach(a => {
        const href = a.getAttribute('href');
        if (href && (href.startsWith('https://oncehub.knowledgeowl.com/help/') || href.startsWith('https://help.oncehub.com/help/'))) {
            const baseUrl = href.startsWith('https://oncehub.knowledgeowl.com/help/') 
                ? 'https://oncehub.knowledgeowl.com/help/' 
                : 'https://help.oncehub.com/help/';
            const slug = href.replace(baseUrl, '');
            // Some KO links have anchors or query params
            const [pathPart, hashPart] = slug.split('#');
            a.setAttribute('href', `/${pathPart}${hashPart ? '#' + hashPart : ''}`);
        }
    });

    let markdown = turndownService.turndown(bodyElement.innerHTML);

    // Prepare target path with slugified directories
    const relativePath = path.relative(SOURCE_DIR, filePath);
    const pathParts = relativePath.split(path.sep);
    const slugifiedParts = pathParts.map((part, index) => {
        // Last part is the filename, slugify it but keep .html (will replace later)
        if (index === pathParts.length - 1) {
            const ext = path.extname(part);
            const name = path.basename(part, ext);
            return slugify(name) + ext;
        }
        return slugify(part);
    });

    const targetPath = path.join(TARGET_DIR, ...slugifiedParts).replace('.html', '.md');
    const targetDir = path.dirname(targetPath);

    await fs.ensureDir(targetDir);

    // Frontmatter
    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
---

`;

    await fs.writeFile(targetPath, frontmatter + markdown);

    // Check for images
    const sourceImagesDir = path.join(path.dirname(filePath), 'images');
    if (fs.existsSync(sourceImagesDir)) {
        const targetImagesDir = path.join(targetDir, 'images');
        await fs.copy(sourceImagesDir, targetImagesDir);
    }

    console.log(`Processed: ${title}`);
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

migrate();
