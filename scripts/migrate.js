import fs from 'fs-extra';
import path from 'path';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});
turndownService.use(gfm);

// Keep iframes for videos
turndownService.addRule('iframe', {
  filter: 'iframe',
  replacement: (content, node) => {
    return `\n\n${node.outerHTML}\n\n`;
  }
});

// Wrap embed scripts and buttons in code blocks to avoid MDX breaking on style strings or script execution
turndownService.addRule('embedStuff', {
  filter: ['script', 'button', 'style'],
  replacement: (content, node) => {
    return `\n\n\`\`\`html\n${node.outerHTML}\n\`\`\`\n\n`;
  }
});

// Custom Turndown rules for Starlight Asides
turndownService.addRule('starlightAsides', {
  filter: (node) => {
    return (
      node.nodeName === 'DIV' &&
      (node.classList.contains('ar-banner') || 
       node.classList.contains('note-banner') ||
       node.classList.contains('info-banner') ||
       node.classList.contains('tip-banner') ||
       node.classList.contains('caution-banner') ||
       node.classList.contains('danger-banner') ||
       node.classList.contains('warning-banner'))
    );
  },
  replacement: (content, node) => {
    let type = 'note';
    if (node.classList.contains('caution-banner') || node.classList.contains('warning-banner')) type = 'caution';
    if (node.classList.contains('tip-banner')) type = 'tip';
    if (node.classList.contains('danger-banner')) type = 'danger';
    if (node.classList.contains('info-banner')) type = 'note';
    
    // Remove the internal banner title if it exists (e.g. "Note", "Tip")
    let cleanContent = content.trim();
    const bannerTitles = ['Note', 'Tip', 'Caution', 'Danger', 'Warning', 'Info'];
    for (const title of bannerTitles) {
        const regex = new RegExp(`^\\*\\*${title}:?\\*\\*\\s*`, 'i');
        if (regex.test(cleanContent)) {
            cleanContent = cleanContent.replace(regex, '');
            break;
        }
    }
    
    return `\n\n<Aside type="${type}">\n${cleanContent}\n</Aside>\n\n`;
  }
});

const KO_EXPORT_DIR = '/home/michaeld/github/help-center/ko-export/html_export';
const TARGET_DOCS_DIR = '/home/michaeld/github/help-center/src/content/docs';
const TARGET_ASSETS_DIR = '/home/michaeld/github/help-center/src/assets/docs';

// Map to store slug -> full path mappings for link resolution
const slugToPathMap = new Map();

async function migrate() {
  console.log('🧹 Cleaning target directories...');
  
  // Clean docs except index.mdx
  if (await fs.exists(TARGET_DOCS_DIR)) {
    const docs = await fs.readdir(TARGET_DOCS_DIR);
    for (const doc of docs) {
      if (doc !== 'index.mdx') {
        await fs.remove(path.join(TARGET_DOCS_DIR, doc));
      }
    }
  }
  
  // Clean assets
  await fs.remove(TARGET_ASSETS_DIR);
  
  await fs.ensureDir(TARGET_DOCS_DIR);
  await fs.ensureDir(TARGET_ASSETS_DIR);

  console.log('🚀 Starting migration...');

  const files = await getFiles(KO_EXPORT_DIR);
  console.log(`Found ${files.length} total objects in export directory.`);
  
  // First pass: build slug to path mapping
  console.log('📍 Building slug-to-path map...');
  for (const file of files) {
    if (file.endsWith('.html')) {
      const relativePath = path.relative(KO_EXPORT_DIR, file);
      const fileName = path.basename(file, '.html');
      const fileSlug = slugify(fileName);
      const dirName = path.dirname(relativePath);
      const slugifiedDir = slugifyPath(dirName);
      const fullPath = `/${slugifiedDir}/${fileSlug}/`;
      slugToPathMap.set(fileSlug, fullPath);
    }
  }
  
  // Second pass: process files
  let count = 0;
  for (const file of files) {
    if (file.endsWith('.html')) {
      await processFile(file);
      count++;
      if (count % 50 === 0) console.log(`Processed ${count} files...`);
    }
  }

  console.log(`✅ Migration complete! Processed ${count} articles.`);
}

async function getFiles(dir) {
  const subdirs = await fs.readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = path.resolve(dir, subdir);
    return (await fs.stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.reduce((a, f) => a.concat(f), []);
}

function slugifyPath(fullPath) {
    if (fullPath === '.' || !fullPath) return '';
    // Split by both slash and backslash to be safe, then slugify each part
    return fullPath.split(/[/\\]+/).map(slugify).filter(Boolean).join('/');
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Convert KnowledgeOwl internal links to relative Starlight paths
 * Example: https://oncehub.knowledgeowl.com/help/introduction-to-event-types
 * Becomes: /booking-pages/event-types-classic/introduction-to-event-types/
 */
function convertInternalLinks(markdown) {
  // Pattern: [text](https://oncehub.knowledgeowl.com/help/article-slug "title")
  // or [text](https://help.oncehub.com/help/article-slug)
  const linkPattern = /\[([^\]]+)\]\((https:\/\/(?:oncehub\.knowledgeowl\.com|help\.oncehub\.com)\/help\/([^)\s"]+))(?:\s+"([^"]*)")?\)/gi;
  
  return markdown.replace(linkPattern, (match, linkText, fullUrl, slug, title) => {
    // Look up the full path from our slug map
    const fullPath = slugToPathMap.get(slug);
    const relativePath = fullPath || `/${slug}/`;
    
    if (title) {
      return `[${linkText}](${relativePath} "${title}")`;
    }
    return `[${linkText}](${relativePath})`;
  });
}

async function processFile(filePath) {
  const relativePath = path.relative(KO_EXPORT_DIR, filePath);
  const dirName = path.dirname(relativePath);
  const fileName = path.basename(filePath, '.html');
  
  // Create nested slug-friendly path
  const slugifiedDir = slugifyPath(dirName);
  const slugifiedFileName = slugify(fileName);
  
  const targetDir = path.join(TARGET_DOCS_DIR, slugifiedDir);
  const targetPath = path.join(targetDir, `${slugifiedFileName}.mdx`);
  
  await fs.ensureDir(targetDir);

  const html = await fs.readFile(filePath, 'utf8');
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const title = document.querySelector('.hg-article-title')?.textContent?.trim() || fileName;
  const bodyContent = document.querySelector('.hg-article-body');

  if (!bodyContent) {
    // console.warn(`⚠️ No body content found for ${relativePath}`);
    return;
  }

  // Handle images
  const images = bodyContent.querySelectorAll('img');
  for (const img of images) {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('http')) {
      // Decode URL-encoded characters in src
      const decodedSrc = decodeURIComponent(src);
      const sourceImgPath = path.resolve(path.dirname(filePath), decodedSrc);
      
      if (await fs.exists(sourceImgPath)) {
        const imgExt = path.extname(sourceImgPath);
        const imgName = path.basename(sourceImgPath, imgExt);
        
        // We put assets in a mirroring directory structure
        const targetImgDir = path.join(TARGET_ASSETS_DIR, slugifiedDir, 'images');
        await fs.ensureDir(targetImgDir);
        
        const targetImgPath = path.join(targetImgDir, `${imgName}${imgExt}`);
        await fs.copy(sourceImgPath, targetImgPath);
        
        // Calculate relative path from doc to image
        let relAssetPath = path.relative(targetDir, targetImgPath);
        if (!relAssetPath.startsWith('.')) relAssetPath = './' + relAssetPath;
        
        img.setAttribute('src', relAssetPath);
      } else {
        // console.warn(`❓ Image not found: ${sourceImgPath} (referenced in ${relativePath})`);
      }
    }
  }

  // Wrap problematic tags in code blocks before Turndown
  // Added 'iframe' and 'a[style]' to problem tags
  const problemTags = bodyContent.querySelectorAll('script, button, style, iframe');
  problemTags.forEach(s => {
      // If the parent is already a pre/code, don't wrap it again
      if (s.closest('pre') || s.closest('code')) return;
      
      const replacement = document.createElement('pre');
      const code = document.createElement('code');
      code.textContent = s.outerHTML;
      replacement.appendChild(code);
      s.parentNode.replaceChild(replacement, s);
  });

  // Clean up style attributes to avoid MDX parsing errors with nested quotes
  const allWithStyle = bodyContent.querySelectorAll('[style]');
  allWithStyle.forEach(el => {
    // Remove style from table elements to encourage Turndown to convert them to Markdown tables
    if (['TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD'].includes(el.tagName)) {
      el.removeAttribute('style');
      el.removeAttribute('width');
      el.removeAttribute('height');
      el.removeAttribute('cellspacing');
      el.removeAttribute('cellpadding');
      el.removeAttribute('border');
    } else {
      let style = el.getAttribute('style');
      if (style && style.includes('"')) {
        el.setAttribute('style', style.replace(/"/g, "'"));
      }
    }
  });

  // Convert to Markdown
  let markdown = turndownService.turndown(bodyContent);

  // Clean up markdown
  markdown = markdown.replace(/<!--[\s\S]*?-->/g, ''); // Remove HTML comments that break MDX
  
  // Clean up Non-Breaking Spaces (literal and entity)
  markdown = markdown.replace(/&nbsp;/g, ' ');
  markdown = markdown.replace(/\u00A0/g, ' ');

  // Fix unclosed HTML tags that break MDX
  markdown = markdown.replace(/<br>/gi, '<br />');
  markdown = markdown.replace(/<hr>/gi, '<hr />');
  markdown = markdown.replace(/<img([^>]*?)(?<!\/)>/gi, '<img$1 />');

  // Escape special characters inside raw HTML tables that remain in Markdown
  // (Turndown leaves tables as HTML if they have colspan/rowspan)
  markdown = markdown.replace(/<table[\s\S]*?<\/table>/gi, (match) => {
    return match
      .replace(/\*/g, '&#42;')
      .replace(/_/g, '&#95;')
      .replace(/{/g, '&#123;')
      .replace(/}/g, '&#125;');
  });

  // Escape { } characters which have special meaning in MDX
  markdown = markdown.replace(/{/g, '&#123;');
  markdown = markdown.replace(/}/g, '&#125;');

  // Escape < characters that are not part of an allowed list of tags
  // This helps prevent "Expected a closing tag for <Word>" errors in MDX
  // We exclude script, button, style, iframe because we usually want them escaped if they slip through
  const allowedTags = ['img', 'br', 'hr', 'Aside', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'a', 'p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div', 'strong', 'em', 'b', 'i', 'u', 'pre', 'code'];
  const tagRegex = new RegExp(`<(?!\\/?(${allowedTags.join('|')})(\\s|>|\\/))`, 'gi');
  markdown = markdown.replace(tagRegex, '&lt;');

  markdown = markdown.replace(/\\_/g, '_'); // Fix escaped underscores
  
  // Convert internal KnowledgeOwl links to relative Starlight links
  markdown = convertInternalLinks(markdown);
  
  // Fix for double bold/italic markers that Turndown sometimes leaves
  markdown = markdown.replace(/\*\*\*\*/g, '');
  
  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
---

import { Aside } from '@astrojs/starlight/components';

${markdown}`;

  await fs.writeFile(targetPath, frontmatter);
}

migrate().catch(console.error);
