# Agent Instructions

This file provides instructions for AI agents (GitHub Copilot, Claude, etc.) working in this repository.

---

## Absolute rule: never commit without explicit permission

**You may not create a commit, push, merge, rebase, or otherwise write to git history or the remote in this repository unless the user has explicitly told you to in the current conversation.**

This is not a default that can be inferred from context. It applies to every kind of change, content and code alike.

| Action                                               | Permitted        |
| ---------------------------------------------------- | ---------------- |
| `git status`, `git diff`, `git log`, `git show`      | Yes, freely      |
| `git add`                                            | No, unless asked |
| `git commit`                                         | No, unless asked |
| `git push`, `git push --force`                       | No, unless asked |
| `git merge`, `git rebase`, `git revert`, `git reset` | No, unless asked |
| `git commit --amend`                                 | No, unless asked |
| Creating or deleting branches                        | No, unless asked |
| Deploying or publishing the site                     | No, unless asked |

Rules of interpretation:

- **Permission is specific and current.** Approval to commit once does not authorise committing again, in a later turn or on a later task.
- **"Looks done" is not permission.** Finishing work, passing checks, or the user saying "great" does not authorise a commit.
- **When work is complete, stop and report.** Say what changed, leave it uncommitted, and let the user commit.
- **If you think a commit is needed, ask.** Ask in plain text and wait for an explicit yes.

---

## Project Overview

This is an [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/) help-center site. Content lives in `src/content/docs/` as Markdown/MDX files. Components are `.astro` files in `src/components/`. Global styles are in `src/styles/global.css`.

---

## Content style guide — read before writing any article

All article writing and rewriting must follow `STYLE-GUIDE.md` at the repository root. Read it in full before drafting or restructuring content.

The help center has **two style families** and they must not be mixed:

- **OnceHub (default).** Everything outside `src/content/docs/scheduleonce/`. This is the house style and covers 419 articles.
- **ScheduleOnce (legacy).** `src/content/docs/scheduleonce/` only, 411 older articles with frozen conventions. Apply ScheduleOnce conventions _only_ inside that folder.

The guide is the authority on voice, article types, title and heading casing, front matter, step syntax, terminology and capitalisation, link text, callouts, images, and the pre-publish checklist. It supersedes the older `Overview Article Template`, `Technical How-to Articles Template` and `Troubleshooting Template` documents wherever they disagree. Section 17 lists the known inconsistencies in legacy OnceHub content that must not be copied.

Three rules that are most often missed:

- Link text must be the target article's real title, in bold — never "here", "this article", "read more" or "guide".
- Every step opens with an approved verb and follows action, item, location as a fluid sentence, with UI labels in bold.
- New OnceHub articles are text-only. Images are restricted to What's New, diagrams, and states with no other cue.

---

## Figma MCP Integration Rules

These rules define how to translate Figma inputs into code for this project and must be followed for every Figma-driven change.

### Required flow (do not skip)

1. Run `get_design_context` first to fetch the structured representation for the exact node(s).
2. If the response is too large or truncated, run `get_metadata` to get the high-level node map and then re-fetch only the required node(s) with `get_design_context`.
3. Run `get_screenshot` for a visual reference of the node variant being implemented.
4. Only after you have both `get_design_context` and `get_screenshot`, download any assets needed and start implementation.
5. Translate the output (usually React + Tailwind) into this project's conventions, styles, and framework. Reuse the project's color tokens, components, and typography wherever possible.
6. Validate against Figma for 1:1 look and behavior before marking complete.

### Implementation rules

- Treat the Figma MCP output (React + Tailwind) as a **representation of design and behavior, not as final code style**.
- This project uses **Astro components** (`.astro`), not React. Convert any React JSX output to Astro syntax.
- Replace Tailwind utility classes with the project's preferred utilities/design-system tokens when applicable. Check `src/styles/global.css` for existing CSS custom properties and utility classes.
- Reuse existing components in `src/components/` (e.g., `Hero.astro`, `PageTitle.astro`, `SocialIcons.astro`) instead of duplicating functionality.
- Use the project's color system, typography scale, and spacing tokens consistently. Prefer CSS custom properties defined in `src/styles/global.css` over hardcoded values.
- Respect the Astro/Starlight content model — page content belongs in `src/content/docs/` as Markdown/MDX, not embedded as raw HTML in components.
- Strive for 1:1 visual parity with the Figma design. When conflicts arise, prefer design-system tokens and adjust spacing or sizes minimally to match visuals.
- Validate the final UI against the Figma screenshot for both look and behavior.

### Assets rules

- The Figma MCP Server provides an assets endpoint that can serve image and SVG assets.
- **IMPORTANT:** If the Figma MCP Server returns a `localhost` source for an image or SVG, use that image or SVG source directly.
- **IMPORTANT:** Do NOT import or add new icon packages — all assets should be in the Figma payload.
- **IMPORTANT:** Do NOT use or create placeholder images/icons if a localhost source is provided.
- Place static assets in `public/` for direct URL access, or in `src/assets/` if they will be processed by Astro's image pipeline.

### General-purpose rules

- Always use existing components from `src/components/` when possible.
- Prioritize Figma fidelity to match designs exactly.
- Avoid hardcoded color, spacing, or font values — use design tokens / CSS variables from `src/styles/global.css` where available.
- Follow WCAG accessibility requirements (semantic HTML, alt text, sufficient contrast).
- Place new UI components in `src/components/`; avoid inline styles unless truly necessary.
- Never add new npm packages without confirming with the user first.

---

## Quality Checks

Before finishing any task that modifies code, run these checks and fix any issues found:

1. **Lint** — `pnpm lint` (ESLint)
2. **Typecheck** — `pnpm typecheck` (Astro check, fails on hints/warnings/errors)
3. **Build** — `pnpm build` (verifies the site compiles successfully)

If you modified content files (Markdown/MDX), also run:

4. **Format** — `pnpm prettier --write <file>` on changed files to avoid trailing whitespace and other Prettier issues
5. **Style** — `pnpm lint:style` on the articles you changed

### The style check is advisory

`pnpm lint:style` reports findings against `STYLE-GUIDE.md` for changed articles. It **always exits 0 and must never be made to fail a build.**

- `!` findings are mechanical rules from the guide. Worth fixing before review.
- `?` findings are judgement calls. Read them, then decide. They are sometimes wrong.

Act on what it reports for articles you are writing. Do not use it as a reason to edit articles you were not asked to change, and do not "fix" the whole corpus with `--all`. That flag exists for auditing only; roughly 3,700 findings are legacy and are not scheduled for cleanup.
