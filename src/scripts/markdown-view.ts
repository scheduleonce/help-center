/**
 * "View in Markdown" opens the current page's Markdown twin in a new tab.
 *
 * The dropdown item is rendered as a `<button>` by our pnpm patch to
 * starlight-page-actions (see patches/README.md), so the `.md` URL never
 * appears as a link in the HTML — crawlers that follow anchors would
 * otherwise fetch every page twice, once as HTML and once as Markdown. The
 * patch only changes the markup; the behaviour lives here, in our own code.
 *
 * The tab opens the real `.md` URL (not a blob) so the address bar shows a
 * shareable link. Servers should serve those as `text/markdown`, which
 * browsers render as plain text.
 */

const ITEM_SELECTOR = "#dropdown-menu button[data-markdown-path]";

function setupMarkdownView() {
  document
    .querySelectorAll<HTMLButtonElement>(ITEM_SELECTOR)
    .forEach((item) => {
      if (item.dataset.markdownViewReady === "true") return;
      item.dataset.markdownViewReady = "true";

      item.addEventListener("click", () => {
        const path = item.dataset.markdownPath;
        if (!path) return;

        item.closest("#dropdown-menu")?.classList.remove("show");

        const tab = window.open(path, "_blank");
        if (tab) {
          // Same-origin static Markdown; drop the opener reference anyway.
          tab.opener = null;
        } else {
          window.location.href = path;
        }
      });
    });
}

setupMarkdownView();
document.addEventListener("astro:page-load", setupMarkdownView);
