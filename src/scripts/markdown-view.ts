/**
 * "View in Markdown" opens the current page's Markdown twin in a new tab.
 *
 * The dropdown item is rendered as a `<button>` by our pnpm patch to
 * starlight-page-actions (see patches/README.md), so the `.md` URL never
 * appears in the link graph — crawlers that follow anchors would otherwise
 * fetch every page twice, once as HTML and once as Markdown. The patch only
 * changes the markup; the behaviour lives here, in our own code.
 */

const ITEM_SELECTOR = "#dropdown-menu button[data-markdown-path]";

async function openMarkdown(path: string, item: HTMLButtonElement) {
  item.closest("#dropdown-menu")?.classList.remove("show");

  // Open synchronously so the popup blocker treats it as user initiated.
  const tab = window.open("", "_blank");

  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: ${response.status}`);
    }
    const markdown = await response.text();
    const url = URL.createObjectURL(
      new Blob([markdown], { type: "text/plain;charset=utf-8" }),
    );

    if (tab) {
      tab.location.href = url;
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } else {
      window.location.href = path;
    }
  } catch (error) {
    console.error(error);
    // The page may have no Markdown twin (e.g. the Scalar API reference
    // pages). Keep the previous new-tab behaviour instead of navigating the
    // reader away from the docs.
    if (tab) {
      tab.location.href = path;
    } else {
      window.location.href = path;
    }
  }
}

function setupMarkdownView() {
  document
    .querySelectorAll<HTMLButtonElement>(ITEM_SELECTOR)
    .forEach((item) => {
      if (item.dataset.markdownViewReady === "true") return;
      item.dataset.markdownViewReady = "true";

      item.addEventListener("click", () => {
        const path = item.dataset.markdownPath;
        if (path) void openMarkdown(path, item);
      });
    });
}

setupMarkdownView();
document.addEventListener("astro:page-load", setupMarkdownView);
