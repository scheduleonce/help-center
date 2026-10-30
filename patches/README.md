# Dependency patches

## `starlight-page-actions@0.7.1`

**Why:** every page in the help center has a Markdown twin (`/<path>.md`) that is
advertised to agents via `<link rel="alternate" type="text/markdown">` (see
`src/components/Head.astro`) and `llms.txt`. The plugin renders the
"View in Markdown" entry of the "Open" dropdown as a real
`<a href="/<path>.md">`, which puts a second URL for the same page into the link
graph. Any crawler that follows anchors — including OnceHub's knowledge-base
crawler — then fetches every page twice: once as HTML, once as Markdown.

**What the patch does:** renders that one dropdown entry as
`<button type="button" data-markdown-path="…">` instead of an anchor, plus the
CSS needed for a button to look identical to the other entries. **Nothing
else** — no behaviour is added to the dependency. (Separately, `.md` responses
are marked `X-Robots-Tag: noindex` in `public/staticwebapp.config.json` so
search engines do not index the twins either.)

**Where the behaviour lives:** `src/scripts/markdown-view.ts` (loaded from
`src/components/Head.astro`) handles the click: it closes the dropdown, fetches
the `.md` and opens it in a new tab.

**Upgrading the plugin:** the patch is pinned to an exact version. A patch that
no longer applies fails the install (`allowUnusedPatches` defaults to `false`),
so an upgrade cannot silently bring the anchor back. To rebase:

```sh
pnpm patch starlight-page-actions@<new-version>
# re-apply the two changes to components/Dropdown.astro (markup + button CSS)
pnpm patch-commit 'node_modules/.pnpm_patches/starlight-page-actions@<new-version>'
```

**Removing it:** ideally upstream support for rendering the `markdown` action as
a button, then `pnpm patch-remove starlight-page-actions`, drop the entry from
`pnpm-workspace.yaml` and remove the script import from `src/components/Head.astro`.
