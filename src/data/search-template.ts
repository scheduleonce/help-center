// Pagefind result template with product + content type label tags.
// Uses string concat to avoid Astro/esbuild conflicts with {{ }} syntax.
const OB = "{".repeat(2);
const CB = "}".repeat(2);

export const RESULT_TEMPLATE = [
  '<li class="pf-result">',
  '  <div class="pf-result-card">',
  '    <div class="pf-result-header">',
  '      <div class="pf-result-header-top">',
  '        <p class="pf-result-title">',
  `          <a class="pf-result-link" href="${OB} meta.url | default(url) | safeUrl ${CB}">${OB} meta.title ${CB}</a>`,
  "        </p>",
  '        <div class="pf-result-tags">',
  `          ${OB}#if meta.products${CB}`,
  `          <span class="pf-tag pf-tag-product">${OB} meta.products ${CB}</span>`,
  `          ${OB}/if${CB}`,
  `          ${OB}#if meta.contentType${CB}`,
  `          <span class="pf-tag pf-tag-type pf-tag-type--${OB} meta.contentType ${CB}">${OB} meta.contentType ${CB}</span>`,
  `          ${OB}/if${CB}`,
  "        </div>",
  "      </div>",
  `      ${OB}#if excerpt${CB}`,
  `      <p class="pf-result-excerpt">${OB}+ excerpt +${CB}</p>`,
  `      ${OB}/if${CB}`,
  "    </div>",
  "  </div>",
  `  ${OB}#if sub_results${CB}`,
  '  <ul class="pf-heading-chips">',
  `    ${OB}#each sub_results as sub${CB}`,
  '    <li class="pf-heading-chip">',
  `      <a class="pf-heading-link" href="${OB} sub.url | safeUrl ${CB}">${OB} sub.title ${CB}</a>`,
  `      <p class="pf-heading-excerpt">${OB}+ sub.excerpt +${CB}</p>`,
  "    </li>",
  `    ${OB}/each${CB}`,
  "  </ul>",
  `  ${OB}/if${CB}`,
  "</li>",
].join("\n");

export const CONTENT_TYPE_LABELS: Record<string, string> = {
  "user-guides": "User Guides",
  "developer-docs": "Developer Docs",
};
