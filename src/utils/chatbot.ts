/**
 * Shared OnceHub ChatOnce widget configuration.
 *
 * Single live-chat bot used across all help-center sections so conversations
 * persist as visitors navigate between pages.
 */
export const CHATBOT_WEBSITE_ID = "WEB-A358762760";
export const CHATBOT_ID = "BOT-F032420ADA";
export const CHATBOT_SCRIPT_SRC = "https://cdn.oncehub.com/co/widget.js";
export const CHATBOT_SCRIPT_PARAMS = `website_id=${CHATBOT_WEBSITE_ID}&bot_id=${CHATBOT_ID}&widget_on_load=true`;

/**
 * Attributes for in-page chatbot trigger anchors.
 *
 * Note: Triggers must remain `<a>` elements (not `<button>`) because OnceHub's
 * `widget.js` queries `document.getElementsByTagName("a")` to prefetch
 * `data-co-bot-display="pop-up"` bot IDs. `role="button"` communicates the
 * in-page modal interaction to assistive tech; Space-key activation is handled
 * in `src/scripts/chatbot-a11y.ts`.
 */
export const CHATBOT_TRIGGER_ATTRS = {
  "data-co-bot": CHATBOT_ID,
  "data-co-bot-display": "pop-up",
  role: "button",
} as const;
