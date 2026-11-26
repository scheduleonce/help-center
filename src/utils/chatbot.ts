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
 * Attributes for in-page chatbot trigger elements.
 *
 * Click handling and Space-key activation live in `src/scripts/chatbot-triggers.ts`
 * so triggers open the corner widget cleanly (without OnceHub's lightbox modal
 * or the `widget_on_load` + `data-co-bot` typing-indicator stall).
 */
export const CHATBOT_TRIGGER_ATTRS = {
  "data-open-chatbot": CHATBOT_ID,
  role: "button",
} as const;
