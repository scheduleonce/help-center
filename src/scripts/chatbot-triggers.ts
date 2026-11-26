/**
 * Click and keyboard handler for `[data-open-chatbot]` triggers.
 *
 * Why this exists instead of OnceHub's built-in `data-co-bot` click handler:
 * - Adding `data-co-bot-display="pop-up"` opens a centered lightbox modal
 *   instead of the corner widget.
 * - Omitting `data-co-bot-display` when `widget_on_load=true` is active hits a
 *   bug in OnceHub's bot iframe where the corner widget opens but stalls
 *   permanently on the typing indicator (`...`) if the conversation has never
 *   been opened yet (`Initialised` state).
 *
 * Strategy:
 * - Track the active `oh_conversation` session ID in `sessionStorage` once the
 *   widget has been opened at least once (via the corner launcher or a button).
 * - If the current conversation is already active (either opened on this page
 *   or carried over from another page via `oh_conversation`), send the open
 *   `postMessage` directly with `website_id` preserved — no iframe reload, so
 *   the ongoing conversation is never reset.
 * - Only when the conversation has never been opened yet do we reload the
 *   iframe and open it on `bot-init` (after `widget.js` sends the cookies) so
 *   it initializes cleanly without stalling on `...`.
 */
import { CHATBOT_ID, CHATBOT_WEBSITE_ID } from "~/utils/chatbot";

const TRIGGER_SELECTOR = "[data-open-chatbot]";
const IFRAME_ID = "co-widget-iframe";
const CONVERSATION_COOKIE = "oh_conversation";
const OPENED_SESSION_KEY = "oh_chatbot_opened_session";

let hasOpenedOnPage = false;
let pendingBotInitHandler: ((event: MessageEvent) => void) | null = null;

function getActiveConversationId(): string | null {
  try {
    const cookies = document.cookie.split(";");
    for (const raw of cookies) {
      const idx = raw.indexOf("=");
      if (idx === -1) continue;
      const name = raw.slice(0, idx).trim();
      if (name !== CONVERSATION_COOKIE) continue;
      const value = decodeURIComponent(raw.slice(idx + 1).trim());
      const parsed = JSON.parse(value) as {
        bot?: Record<string, { value?: string; expiry?: string }>;
      };
      const entry = parsed?.bot?.[CHATBOT_WEBSITE_ID];
      if (
        entry?.value &&
        (!entry.expiry || Date.parse(entry.expiry) > Date.now())
      ) {
        return entry.value;
      }
    }
  } catch {
    // Ignore malformed cookie values.
  }
  return null;
}

function rememberOpenedSession() {
  const sessionId = getActiveConversationId();
  if (!sessionId) return;
  try {
    localStorage.setItem(OPENED_SESSION_KEY, sessionId);
  } catch {
    // Ignore storage errors (e.g. private browsing restrictions).
  }
}

function isConversationAlreadyOpened(): boolean {
  if (hasOpenedOnPage) return true;
  const sessionId = getActiveConversationId();
  if (!sessionId) return false;
  try {
    return localStorage.getItem(OPENED_SESSION_KEY) === sessionId;
  } catch {
    return false;
  }
}

window.addEventListener("message", (event: MessageEvent) => {
  const data = event.data as { type?: string; add?: string[] } | null;
  if (
    data?.type === "updateIframe" &&
    Array.isArray(data.add) &&
    data.add.includes("co-iframe-open")
  ) {
    hasOpenedOnPage = true;
    rememberOpenedSession();
  } else if (data?.type === "setBotCookie" && hasOpenedOnPage) {
    // Cookie may be written right after the widget opens on a fresh session.
    setTimeout(rememberOpenedSession, 0);
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

  // Conversation is already active (opened earlier on this page or another
  // page in this tab) — open directly without reloading so chat state persists.
  if (isConversationAlreadyOpened()) {
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
  // Reload the iframe so a brand-new bot initializes directly in the open state.
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
