/**
 * Keyboard support for `<a role="button" data-co-bot="...">` chatbot triggers.
 *
 * OnceHub's `widget.js` requires `<a>` elements for `pop-up` prefetching, so
 * native `<button>` cannot be used directly. Because `<a>` only activates on
 * Enter by default, we add Space-key handling (preventing page scroll on
 * keydown and activating on keyup) to match native `<button>` behavior.
 */
const TRIGGER_SELECTOR = 'a[data-co-bot][role="button"]';

document.addEventListener("keydown", (event) => {
  if (event.key !== " ") return;
  const target = event.target;
  if (target instanceof HTMLElement && target.matches(TRIGGER_SELECTOR)) {
    event.preventDefault();
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key !== " ") return;
  const target = event.target;
  if (target instanceof HTMLElement && target.matches(TRIGGER_SELECTOR)) {
    target.click();
  }
});
