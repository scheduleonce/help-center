/**
 * Click and keyboard handler for `[data-open-chatbot]` triggers.
 *
 * Why this exists instead of OnceHub's built-in `data-co-bot` click handler:
 * - Adding `data-co-bot-display="pop-up"` opens a centered lightbox modal
 *   instead of the corner widget.
 * - Omitting `data-co-bot-display` when `widget_on_load=true` is active hits a
 *   bug in OnceHub's bot iframe where the corner widget opens but stalls
 *   permanently on the typing indicator (`...`) if the user hasn't clicked the
 *   corner launcher first.
 *
 * When the widget hasn't been opened yet on the current page, we reload the
 * iframe and immediately open it on `bot-init` (after `widget.js` sends the
 * session cookies). Once opened at least once, subsequent clicks re-open the
 * corner widget directly without reloading.
 */
import { CHATBOT_ID } from "~/utils/chatbot";

const TRIGGER_SELECTOR = "[data-open-chatbot]";
const IFRAME_ID = "co-widget-iframe";

let hasOpenedOnce = false;
let pendingBotInitHandler: ((event: MessageEvent) => void) | null = null;

window.addEventListener("message", (event: MessageEvent) => {
  const data = event.data as { type?: string; add?: string[] } | null;
  if (
    data?.type === "updateIframe" &&
    Array.isArray(data.add) &&
    data.add.includes("co-iframe-open")
  ) {
    hasOpenedOnce = true;
  }
});

function buildOpenPayload(botId: string) {
  return {
    website_id: null,
    bot_id: botId.toUpperCase(),
    page_url: window.location.href,
    page_title: document.title,
    preview: false,
    standalone: false,
    widget_on_load: false,
    open: true,
    direct_bot: true,
    bot_type: 1,
    share_option: 2,
    start_time: Date.now(),
    page_id: null,
  };
}

function openChatbotWidget(botId: string) {
  const iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement | null;
  if (!iframe || !iframe.contentWindow) return;

  // Already open in the corner — move focus to it.
  if (iframe.classList.contains("co-iframe-open")) {
    iframe.focus();
    return;
  }

  if (hasOpenedOnce) {
    iframe.style.display = "";
    iframe.contentWindow.postMessage(buildOpenPayload(botId), "*");
    return;
  }

  // Cancel any in-flight reload handler before starting a new one.
  if (pendingBotInitHandler) {
    window.removeEventListener("message", pendingBotInitHandler);
    pendingBotInitHandler = null;
  }

  const onBotInit = (event: MessageEvent) => {
    const data = event.data as { type?: string } | null;
    if (data?.type !== "bot-init") return;
    window.removeEventListener("message", onBotInit);
    pendingBotInitHandler = null;

    // Defer one tick so `widget.js`'s `bot-init` handler sends the
    // `oh_conversation` / `oh_identify` cookies first.
    setTimeout(() => {
      iframe.style.display = "";
      iframe.contentWindow?.postMessage(buildOpenPayload(botId), "*");
    }, 50);
  };

  pendingBotInitHandler = onBotInit;
  window.addEventListener("message", onBotInit);
  // Reload the iframe so the bot initializes directly in the open state.
  iframe.src = iframe.src;
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const trigger = target.closest<HTMLElement>(TRIGGER_SELECTOR);
  if (!trigger) return;

  event.preventDefault();
  const botId = trigger.getAttribute("data-open-chatbot") || CHATBOT_ID;
  openChatbotWidget(botId);
});

// Match native `<button>` Space-key activation on `<a role="button">` triggers.
document.addEventListener("keydown", (event) => {
  if (event.key !== " ") return;
  const target = event.target;
  if (
    target instanceof HTMLElement &&
    target.matches('a[data-open-chatbot][role="button"]')
  ) {
    event.preventDefault();
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key !== " ") return;
  const target = event.target;
  if (
    target instanceof HTMLElement &&
    target.matches('a[data-open-chatbot][role="button"]')
  ) {
    target.click();
  }
});
