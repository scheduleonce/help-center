# OnceHub Help Center style guide

The house style for articles in `src/content/docs/`. Written for both writers and AI agents, so every rule is checkable rather than aspirational.

## Scope: two style families

OnceHub and ScheduleOnce are separate product lines with genuinely different house styles. Do not average them.

| Family                    | Folders                           | Files | Status                                             |
| ------------------------- | --------------------------------- | ----- | -------------------------------------------------- |
| **OnceHub (default)**     | everything except `scheduleonce/` | 419   | Current. Follow this guide.                        |
| **ScheduleOnce (legacy)** | `scheduleonce/` only              | 411   | Older content, frozen conventions. See appendix A. |

**Default to the OnceHub style.** ScheduleOnce conventions apply _only_ when editing an article under `scheduleonce/`, and even there only to keep that folder internally consistent. Never carry a ScheduleOnce convention into a OnceHub article, and never "modernise" a ScheduleOnce article to OnceHub conventions unless you are rewriting it for that product.

**Scope of application.** This guide governs new articles, and existing articles that are already being revised for a substantive reason. It does not authorise editing an article just to match the guide. Existing content is left alone unless someone asks for a specific change to it.

**Precedence.** This guide beats general writing advice, and beats the older `Overview / Technical How-to / Troubleshooting` template documents where the two conflict. Where this guide is silent, follow the closest shipped OnceHub article in the same folder.

**Basis, and how much to trust each source.** Every convention below was measured against the live content on 2026-11-19, with OnceHub and ScheduleOnce counted separately.

Where sources disagree, weight them in this order:

1. **OnceHub articles written or substantially rewritten in the last four months.** This is current practice and the strongest signal. 22 articles meet the bar, and they are unusually consistent: 100% Title Case titles, 100% Title Case headings, one `Click on` and one `Go to` between them.
2. **The wider OnceHub corpus (419 articles).** Useful for volume and for conventions that predate the recent run, but it carries legacy habits.
3. **The old template documents.** Weakest. They describe an intent that was never fully applied, and several of their rules are contradicted by current practice.

Figures are cited throughout so you can see the weight of evidence. Section 17 lists where shipped OnceHub content still contradicts itself.

---

## 1. The short version

If you read nothing else, these eight rules produce content that looks native to help.oncehub.com:

1. **Lead with a bolded definition.** Open with `**Feature Name** is/are/does …` in one sentence. No `TL;DR` heading.
2. **Title Case the title and headings**, keeping short words like _to, of, for, and, the_ lowercase.
3. **One action per numbered step**, opening with a verb, with the UI label in bold.
4. **Action, item, location**, in that order, inside a fluid sentence. Never fragments joined by dashes.
5. **Link with the article's real title, in bold.** Never "here", "this article", "read more".
6. **Second person, present tense, active voice.** "You can", not "the user is able to".
7. **Text only.** 17 of 391 OnceHub articles carry a screenshot. Do not add one.
8. **Name the benefit before the mechanic.** One sentence of _why_, then the _how_.

---

## 2. Voice and tone

| Dimension  | Do                                                 | Don't                                                        |
| ---------- | -------------------------------------------------- | ------------------------------------------------------------ |
| Person     | Second person: "you", "your Booking Calendar"      | "the user", "one", "we recommend you"                        |
| Tense      | Present: "OnceHub sends", "the meeting is created" | "OnceHub will send", "the meeting would be created"          |
| Voice      | Active: "Select **Save**"                          | Passive: "**Save** should be selected"                       |
| Register   | Calm, direct, helpful                              | Chatty, exclamatory, salesy                                  |
| Confidence | State what happens                                 | Hedge with "may", "might", "should" when you know the answer |

Write to a competent adult who is busy and mildly frustrated. Assume intelligence, not familiarity with OnceHub terminology.

**Explain the why once, briefly.** One sentence of motivation before a procedure is the house pattern:

> These policies help protect your time and revenue by automatically enforcing your meeting change rules.

Do not repeat the benefit in every step. Once per section is enough.

---

## 3. Article types

Four shapes cover the OnceHub corpus. Pick one before drafting; do not blend them.

### 3.1 Introduction (lobby) article

Teaches what a feature _is_ and whether it is right for the reader. Links out to the how-tos instead of containing them.

```
---
title: "Introduction to [Feature]"
description: "[One sentence, under 160 characters.]"
products:
  - oncehub
sidebar:
  order: 1
---

**Feature Name** is/are [what it is, in one sentence] that [what it does for the reader].

## How [Feature] Works        # mechanics, no steps
## The Guest Experience       # or "Use Cases"
## Frequently Asked Questions (FAQs)

Learn more about [task]:
- For Administrators: [**How to …**](/path/)
- For Members and Team Managers: [**How to …**](/path/)
```

Rules specific to this type:

- **No step-by-step instructions.** If you catch yourself writing "Click the…", that content belongs in a how-to.
- **Use cases get a bold lead-in plus a scenario:** "**Getting started quickly:** Eliminate the need to configure from scratch. **For example:** a new team member can fast-track onboarding by using a pre-configured template."
- **End with the lobby links**, bulleted, optionally split by role.
- **The FAQ is the only place in this type that may mention plans, licences or cost.**

### 3.2 Technical how-to

The workhorse. Answers "how do I…" completely, with no theory.

```
---
title: "How to [Task]"
description: "[One sentence, under 160 characters.]"
products:
  - oncehub
sidebar:
  order: N
---

[One or two sentences: what you can achieve and why it matters. Optionally a YouTubeEmbed.]

## Prerequisites           # only if there is a real gate: role, licence, or prior setup

## [Descriptive heading]   # Mode B
1. Click **Booking Calendars** in the left-hand navigation menu.
2. Select the Booking Calendar you want to edit.

## Step 1: [Milestone]     # Mode A, only for 4+ step or cross-platform work
## Step 2: [Milestone]

## Frequently Asked Questions (FAQs)
```

**Choose the layout mode by complexity, not by preference:**

- **Mode A (numbered steps as headings)** when the process has more than four steps, spans two products (OnceHub plus Okta/Salesforce/Stripe), or has a strict order. Use `## Step 1: …`, and H3s inside a step when the reader has to switch platforms.
- **Mode B (descriptive headings)** for everything else: one section of the app, one setting, a few steps. Headings name the task ("Configure Cancellation and Rescheduling Policies"), never "Step 1".

**Never mention pricing or plan levels in a how-to.** That belongs in Billing or an Introduction FAQ.

### 3.3 Troubleshooting

One H2 per problem, then a fixed three-part body, separated by `---`.

```
# [Issue] troubleshooting

[One sentence: what this article covers and who hits it.]

---

## [Problem name]

**Symptoms:**

- The integration stops syncing.
- An error message says the token has expired.

**Resolution:**

1. Click the **gear icon** in the top-right corner of the page.
2. Select **Account Integrations** from the dropdown menu.

---

## Frequently Asked Questions (FAQs)
```

- Name the problem in the reader's words, not the system's ("Too Many Accounts Connected", not "ERR_409").
- Every problem needs both **Symptoms** and **Resolution**. If you cannot supply a resolution, do not add the problem.
- Put platform-specific problems last and label them inline: "Too Many Accounts Connected (Salesforce-specific)".
- Add `## Best Practices for [Topic] Maintenance` when preventive advice genuinely helps.
- When the reader must act outside OnceHub, you may use `## Troubleshooting` H3s or an `<Aside type="caution">`.

### 3.4 Concept and reference

Explains a model, a rule set, or a matrix: "How OnceHub Handles Duplicate Contacts", "URL Parameters: Syntax and Processing Rules", "User Roles and Their Permissions". Structure freely, but keep:

- a bolded definition in the first paragraph,
- one H2 per concept, not per sentence,
- a `## Key Points to Remember` or `## Best Practices` close when the rules are easy to get wrong,
- tables for anything with three or more comparable options.

### 3.5 What's New entries

`src/content/docs/whats-new/YYYY-MM-DD-slug.mdx`, one file per release. Required front matter: `title`, `date`, `description`, `products`. Then, per feature:

```
![](files/<timestamp>.png)

## [Feature name]

[Two or three sentences: what changed and what it means for the reader.]

### Key Benefits

- **Lead-In Label:** One line on the outcome.

For setup instructions, read our [**How to …**](/path/) article.
```

This is the one article type where images are the norm (24 of 28 entries carry one). Titles are a feature list, not a sentence: "Guest Cancellation and Rescheduling Policies for Booking Calendars and Enhanced Mobile Verification for User SMS Notifications".

---

## 4. Titles and headings

**Casing.** Title Case everywhere, with function words of three letters or fewer lowercase: _a, an, and, as, at, but, by, for, from, in, into, of, on, or, the, to, with, per, vs_. Capitalise everything else, including both halves of a hyphenated term.

OnceHub titles run 376 Title Case to 43 sentence case, and headings 763 to 101. Among the 22 articles written or substantially rewritten since July 2026 it is **100%** in both cases, with no exceptions at all. This is not a close call.

| Correct                                                                       | Wrong                                                                         |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| How to Set Guest Cancellation and Rescheduling Policies for Booking Calendars | How To Set Guest Cancellation And Rescheduling Policies For Booking Calendars |
| The Booking Calendar Owner                                                    | The Booking calendar owner                                                    |
| Introduction to Booking Calendar Templates                                    | Introduction To Booking Calendar Templates                                    |
| Managing Your Subscription                                                    | Managing your subscription                                                    |

> **Decision against the old templates.** The Overview and How-to templates ask for sentence case titles. The live OnceHub content is overwhelmingly Title Case, so Title Case wins. The only part of the old rule that survives is "no trailing period".

**Article titles.**

| Pattern                                                          | Use                                                                 |
| ---------------------------------------------------------------- | ------------------------------------------------------------------- |
| `Introduction to [Feature]`                                      | Lobby article                                                       |
| `How to [Task]`                                                  | Technical how-to. Lowercase _to_ (23 live versus 13 with `How To`). |
| `[Feature] troubleshooting` / `Troubleshooting [Feature] Issues` | Troubleshooting                                                     |
| `Integrating OnceHub with [App]`                                 | Third-party integration                                             |
| `[Plural noun]`                                                  | Reference or index ("User Roles and Their Permissions")             |

Never end a title with a period. Never put a question mark in a title. Avoid "Managing…" unless the article really is about ongoing administration.

**Headings.**

- `##` for sections, `###` for sub-sections. Never start at `###`, never skip a level, never use `#` (the layout supplies the H1).
- Headings are signposts, not sentences. No trailing punctuation, except a question mark in an FAQ question used as a heading.
- Front-load the distinctive word. "Configure Cancellation Policies", not "Cancellation Policies Configuration".
- Do not number headings (`1.`, `2.`) except in Mode A `Step N:` headings.
- Gerund headings are not the house style: "Configure the policy", not "Configuring the policy".

**Fixed heading names.** Use these exact strings so search and anchor links stay stable:

| Section   | OnceHub heading                                                                          |
| --------- | ---------------------------------------------------------------------------------------- |
| FAQs      | `Frequently Asked Questions (FAQs)`: 29 of 33 OnceHub FAQ headings use this exact form   |
| Gates     | `Prerequisites`: 9 live versus 6 `Requirements`. `Requirements` is the ScheduleOnce form |
| Use cases | `Use Cases`                                                                              |
| Mechanics | `How [Feature] Works`                                                                    |

---

## 5. Front matter

`description` is required in practice and is rendered as the page meta description and search snippet.

```yaml
---
title: "How to Set Guest Cancellation and Rescheduling Policies for Booking Calendars"
description: "Configure when guests can cancel or reschedule bookings and learn how these policies affect notifications."
products:
  - oncehub
sidebar:
  order: 16
---
```

| Key             | Rule                                                                                                                                                       |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`         | Title Case, no trailing period, matches the H1 exactly                                                                                                     |
| `description`   | One sentence, 120–160 characters, starts with a capital, **ends with a period** (398 of 418 OnceHub descriptions do), no links, no "Learn how to…" padding |
| `products`      | `oncehub`, `scheduleonce`, or both. Omit only if the article is genuinely platform-neutral; the default is `oncehub`                                       |
| `sidebar.order` | Integers within a folder. Leave gaps (10, 20, 30) so inserts do not renumber siblings                                                                      |
| `oldUrl`        | Only for migrated legacy URLs. Never invent one                                                                                                            |
| `date`          | What's New only, `YYYY-MM-DD`. Must match the filename date                                                                                                |
| `contentType`   | `user-guides` or `developer-docs`; developer articles only                                                                                                 |

Do not add custom keys. The schema in `src/content.config.ts` is strict.

---

## 6. Writing steps

This is where most style drift happens, so the rules are mechanical.

### 6.1 One action per step

Every numbered item contains exactly one user action. If a step needs "and then", split it.

```markdown
1. Click **Save** to apply the changes.
```

Not:

```markdown
1. Adjust the setting, click Save, and refresh the page.
```

### 6.2 Verb table

Use these verbs, and only these, for these meanings. The mapping is deliberate: it lets a reader scan the first word and know what kind of interaction follows.

| Verb                 | Use it for                                                            | Example                                                         |
| -------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Click**            | Buttons, links, icons, tabs, menu items                               | Click **Save** in the bottom bar.                               |
| **Select**           | Choosing from a list, dropdown, checkbox, radio button, card, or tile | Select **SAML 2.0** from the **Sign on method** dropdown.       |
| **Enter**            | Typing into a field that expects content                              | Enter a **Template Name**.                                      |
| **Define**           | Naming or setting custom text or a label                              | Define the **App name** in **General settings**.                |
| **Configure**        | Setting up functional options that span several controls              | Configure the SAML settings in the Okta dashboard.              |
| **Expand**           | Opening a collapsed section                                           | Expand the **Duration** section.                                |
| **Toggle**           | Switching a switch on or off                                          | Toggle **Centralized control** on.                              |
| **Hover**            | Revealing something without a click                                   | Hover over the row to reveal the three-dot menu.                |
| **Copy** / **Paste** | Clipboard actions                                                     | Copy the **Client ID**.                                         |
| **Navigate to**      | Reaching a page when no visible control is being clicked              | Navigate to the **Booking Calendar Templates** lobby.           |
| **Scroll**           | Moving within a view                                                  | Scroll to the **Cancellation and Rescheduling Policy** section. |

**Banned:** _Hit_, _Press_, _Choose_ (use Select), _Check_ (use Select for checkboxes), _Utilize_, _Tap_.

### 6.3 Action, then item, then location

A step is a fluid sentence, ordered: **verb → object → where it lives**.

| Verdict                      | Example                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| Correct                      | Click the **Save** button in the bottom-right corner of the page.                     |
| Correct                      | Select the **Booking pages** icon from the left-hand navigation menu.                 |
| Correct (named locator)      | Under **Guest Cancellation Policy**, select **Up to**.                                |
| Wrong (positional narrative) | In the top-right corner, you will see a gear icon that you should click.              |
| Wrong (dash fragments)       | Click - Save - Bottom-right corner.                                                   |
| Wrong (verbose)              | If you would like to save your changes, please go ahead and click on the Save button. |

Use natural prepositions (_in, on, at, from, under, next to_), never dashes, arrows or brackets to separate the three parts. The arrow `→` is reserved for a breadcrumb _path_ inside one step:

```markdown
1. Select the **gear icon** → **Security and Compliance** → **Session policies**.
```

**The one sanctioned exception: the named locator.** When two identical controls sit under different headings, the section name is the disambiguator, so it may lead:

```markdown
4. Under **Guest Cancellation Policy**, choose **Anytime**, **Up to**, or **Never**.
5. Under **Guest Rescheduling Policy**, choose **Anytime**, **Up to**, or **Never**.
```

Read the two steps above without the section names and they are indistinguishable. That is the test: **a locator may lead only when removing it would make the step ambiguous, and only when it names a bold UI label.**

What is never acceptable is _positional_ narrative, where the opener describes where to look rather than which control to use. Recent content contains none of it: 0 positional openers against 41 action-first steps.

What you must not write:

```markdown
1. In the top-right corner, you will see a gear icon that you should click.
```

That sentence buries the action, describes furniture instead of naming a control, and uses nine words to do the work of three.

### 6.4 Interface labels

**Bold what the interface says, not what it looks like.** The dividing line is whether the words appear on screen as text.

| Bold                                                         | Do not bold                                         |
| ------------------------------------------------------------ | --------------------------------------------------- |
| **Save**, **Create template**, **Anytime**, **Up to**        | the gear icon                                       |
| **Booking Calendars**, **Account Integrations** (menu items) | the three-dot menu                                  |
| **Cancellation and Rescheduling Policy** (section name)      | the left-hand navigation menu                       |
| **Guest Cancellation Policy** (field group)                  | the top-right corner, the bottom bar, the main pane |

Rules:

- Bold the label exactly as it appears, including its casing: `Click **Save**.`
- Bold the label only. Do not bold surrounding prose: `Click the **Create template** button`, not `**Click the Create template button**`.
- Write the visible words. If the button says "Create template", do not call it "the create button".
- When a control has no text label, describe it in lowercase and give its location: `Click the gear icon in the top-right corner.` Never `Click the **gear icon**`.
- Bold only the first mention of a product entity, then leave it unbolded: `**Phone Booking** allows…` then "Phone Booking answers…".

Across the OnceHub corpus, position and appearance descriptions are never bolded (`left-hand navigation menu` 50 times, `top-right corner` 65 times, all unbolded), while `gear icon` is unbolded roughly twice as often as bolded (50 to 25). The divide above is what that pattern means in practice.

### 6.5 Numbered lists for sequence, bullets for options

- Numbered (`1.`) when order matters. Markdown renumbers automatically, so write `1.` on every line.
- Bulleted when the items are peers: options, symptoms, settings, benefits.
- Nested bullets must be indented four spaces and introduce a real condition: `- If you choose **Up to**, enter a value…`
- Never a one-item list. A single bullet is a paragraph.

---

## 7. Terminology and capitalisation

OnceHub capitalises its product entities. Lowercase the ordinary English uses of the same words.

| Term                 | OnceHub house style                                                | Evidence              |
| -------------------- | ------------------------------------------------------------------ | --------------------- |
| Booking Calendar     | **Booking Calendar**                                               | 469 vs 24 lowercase   |
| Booking Hub          | **Booking Hub**                                                    | 69 vs 2               |
| Booking Form         | **Booking Form**                                                   | 53 vs 7               |
| The person who books | **guest** (lowercase mid-sentence)                                 | 329 vs 80 capitalised |
| The account holder   | **user** (lowercase mid-sentence)                                  | 368 vs 224            |
| Roles                | **Account Owner**, **Administrator**, **Team Manager**, **Member** | always capitalised    |

_Booking page_, _Event Type_, _Master Page_ and _Resource Pool_ are ScheduleOnce concepts and do not occur in OnceHub content at all. Do not introduce them in a OnceHub article; see appendix A for their ScheduleOnce treatment.

**Never write "Customer" in a OnceHub article.** That is the ScheduleOnce word for the person who books. OnceHub says **guest**.

**Constant everywhere:** _Account Owner_, _Administrator_, _Team Manager_, _Member_, _OnceHub_. Never "admin", "super user", "end user", "client", "attendee" (unless it is a literal meeting attendee).

**One concept, one name.** If the article says "routing form", it never later says "routing flow". If the UI says "Cancellation and Rescheduling Policy", the prose uses that, not "cancellation rules".

**Define jargon on first use**, in the sentence rather than a glossary:

> **Pooled availability** is a distribution method that assigns a booking to the resource who has been idle the longest.

---

## 8. Linking

### 8.1 Link text is the article title, and it is bold

This is the single most-transgressed rule, and the one that matters most for accessibility and answer-engine retrieval. OnceHub content bolds its cross-reference links (627 bold versus 258 plain), and the bolded text is always the target's real title.

| Verdict | Example                                                                                                                                                           |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Correct | To learn more, read our [**How to Create and Manage Templates**](/account-administration/booking-calendar-templates/how-to-create-and-manage-templates/) article. |
| Correct | For setup instructions, read our [**Managing Your Profile in OnceHub**](/profile-management/managing-your-profile-in-oncehub/) article.                           |
| Wrong   | To learn more, [click here](…).                                                                                                                                   |
| Wrong   | [Read more](…)                                                                                                                                                    |
| Wrong   | See our [guide](…).                                                                                                                                               |
| Wrong   | View the [step-by-step instructions](…).                                                                                                                          |

The link text must match the target article's `title`, not a paraphrase. If you change the target's title, fix the inbound link text in the same change.

### 8.2 Sentence patterns

| Purpose                  | Pattern                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| Primary cross-reference  | `To learn more, read our [**Article Title**](/path/) article.`                                   |
| Conditional prerequisite | `To learn more about meeting durations, take a look at our [**Article Title**](/path/) article.` |
| Setup follow-up          | `For setup instructions, read our [**Article Title**](/path/) article.`                          |
| Lobby close              | `Learn more about [task]:` followed by a role-split bullet list                                  |
| Inline pointer           | `…as described in [**Article Title**](/path/).`                                                  |

Prefer **read our** for articles and **see** for sections or external references. Never "please click".

### 8.3 Paths

- Internal links are **root-relative with a trailing slash**: `/product/booking-calendars/.../`. All internal article links comply; keep it at 100%.
- Section links append an anchor: `/...#unlink-a-template-from-a-booking-calendar`.
- Never `../` or bare relative article paths. Relative paths are for images only (`files/…png`).
- External links get the full `https://` URL. Do not link to a vendor's homepage when a specific doc page exists.
- Support contact is always `[**contact our support team**](/contact-us/)`.

### 8.4 How many links

Link the first useful mention, not every mention. Target two to six internal links in a how-to: the prerequisites, the related how-to, and the concept article. No "related articles" list at the very end unless it adds something the body did not.

---

## 9. Callouts

Use the Starlight component, imported from `@astrojs/starlight/components`:

```mdx
import { Aside } from "@astrojs/starlight/components";

<Aside type="note">
  Session policies are not available for Users signed in via G Suite or SSO.
</Aside>
```

| Type      | Use for                                                                | OnceHub count          |
| --------- | ---------------------------------------------------------------------- | ---------------------- |
| `note`    | A condition, dependency, or exception the reader needs _before_ acting | most of the 166 asides |
| `caution` | Data loss, irreversible action, billing consequence, security risk     | ~100                   |
| `tip`     | A genuine shortcut or best practice                                    | ~40                    |

Rules:

- **Three or fewer per article.** An aside on every section is wallpaper.
- Never use an aside for the main instruction. If it is required to complete the task, it belongs in the step list.
- Never put a heading inside an aside.
- No `type="danger"` in this codebase; escalated risk is still `caution`.
- Inline `> **IMPORTANT:**` blockquotes are legacy. Use `<Aside type="caution">` instead.

---

## 10. Lists, tables, code

**Tables** for anything with three or more comparable items and short cell text: permission matrices, option comparisons, limits, parameters, troubleshooting symptoms by platform. Not for prose in cells.

**Bullets** for options and symptoms. Keep them parallel in grammar: all noun phrases or all verb phrases, never mixed.

**Bold lead-in bullets** for benefit and use-case lists:

```markdown
- **Time and Revenue Protection:** Reduce lost revenue from appointment slots that cannot be filled after last-minute cancellations.
```

**Code** in fenced blocks with a language hint (`json`, `bash`, `yaml`). Inline code for keys, parameters, values and file paths: `client_id`, `C_ID`, `/api/v1/bookings`.

**Keyboard shortcuts** as `**Ctrl** + **S**`. Never "press".

**Breadcrumb paths** inside a step: `**gear icon** → **Security and Compliance** → **Session policies**`.

---

## 11. Images and video

**Default: do not add images.** Of the 16 user-facing OnceHub articles written since July 2026, **none** contains a screenshot. Across the wider corpus, 17 of 391 non-What's-New articles contain one. A screenshot of a labelled button adds nothing to a sentence that already names the button. Describe the interface in words instead:

> Click the blue **Submit** button in the bottom-right corner of the page.

| Context                                                         | Images                                                   |
| --------------------------------------------------------------- | -------------------------------------------------------- |
| What's New entries                                              | Yes. One per feature section; 24 of 28 entries carry one |
| Diagrams, flows, matrices that text cannot express              | Yes, with alt text                                       |
| A state with no other cue (an error toast, a broken connection) | Yes, cropped to the relevant area                        |
| A how-to or concept article                                     | No                                                       |
| Ordinary "click this button" screenshots                        | No                                                       |

**Rules when you do add one:**

- Alt text is mandatory and describes the content, not the filename: `![The Cancellation and Rescheduling Policy section with Never selected](files/policy-section.png)`.
- Assets live in a `files/` folder beside the article, referenced relatively.
- Never reference a Google Docs, Confluence or Figma URL as an image source; download the asset first.
- Video uses the project component, never a raw iframe:

```mdx
import YouTubeEmbed from "~/components/YouTubeEmbed.astro";

<YouTubeEmbed
  id="B-6z-72VC88"
  title="How to Set Guest Cancellation and Rescheduling Policies"
/>
```

---

## 12. Formatting mechanics

| Rule               | Value                                                                                                                                                                                                                       |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Paragraph length   | One to three sentences. Never more than four.                                                                                                                                                                               |
| Sentence length    | Aim under 25 words; hard ceiling around 35.                                                                                                                                                                                 |
| Article length     | OnceHub median is 339 words, three quarters under 510. Split anything over ~700 into a lobby plus how-tos.                                                                                                                  |
| Section separators | `---` on its own line between major sections is the OnceHub house pattern (783 uses across 419 files). Put one between the intro and the first H2, and between independent top-level blocks. Do not put one after every H2. |
| Dashes             | Avoid em dashes and en dashes as clause connectors. Use a colon, comma, or new sentence.                                                                                                                                    |
| Apostrophes        | Straight `'` in body text. Do not mix in curly quotes mid-article.                                                                                                                                                          |
| Quotation marks    | Double quotes `""` for UI copy and user-entered strings; italicise literal on-screen messages with `_"…"_`.                                                                                                                 |
| Numbers            | Numerals for all counts and quantities, including under ten: "2 options", "5 minutes". Words only at the start of a sentence.                                                                                               |
| Units              | Space between number and unit: "24 hours", "30 minutes", "365 days".                                                                                                                                                        |
| Ranges             | "between 5 minutes and 365 days", not "5–365 minutes".                                                                                                                                                                      |
| Time               | 12-hour with am/pm: "3:00 pm". Include the time zone only when it is user-configurable.                                                                                                                                     |
| Dates              | "October 29, 2026" in prose; `YYYY-MM-DD` in front matter and filenames.                                                                                                                                                    |
| File names         | lowercase, hyphens, no dates except in What's New, no spaces                                                                                                                                                                |
| Slugs              | Stable. Changing one breaks inbound links and `oldUrl` mappings.                                                                                                                                                            |

**Sentence case for body text.** Every sentence starts with a capital and ends with a full stop. UI labels keep their own casing and keep their bold.

---

## 13. Plan, pricing and licence placement

| Article type         | Plans, pricing, licences                                                      |
| -------------------- | ----------------------------------------------------------------------------- |
| Introduction (lobby) | Allowed, in the FAQ only: "Is this feature available on all plans?"           |
| Technical how-to     | Forbidden                                                                     |
| Troubleshooting      | Forbidden, except a one-line pointer to Billing when a limit causes the issue |
| Concept / reference  | Forbidden                                                                     |
| What's New           | Only a factual sentence if the release changes plan availability              |
| Billing articles     | Required, this is their subject                                               |

Never invent a price, a plan name, or a limit. If the source does not state it, ask.

---

## 14. Accessibility

- One H1 per page (supplied by the layout), headings in order, no skipped levels.
- Link text describes the destination out of context. A screen-reader user navigating by link list must understand every entry.
- Never encode meaning in colour, bold, or position alone. "The red button" becomes "the **Delete** button, shown in red".
- Alt text for every informative image; empty alt for decorative ones.
- Tables get a header row. Never use a table for layout.
- Do not say "click" for a touch-only context; "select" is acceptable there.
- No directional-only instructions ("the button on the right") without the label as well.
- No "above" or "below"; use "earlier" / "later", or repeat the heading name.

---

## 15. Word list

| Prefer                               | Avoid                                                               |
| ------------------------------------ | ------------------------------------------------------------------- |
| click, select, enter                 | hit, press, choose, check, pick, tap                                |
| navigate to                          | go to (398 live uses across the corpus; clean up opportunistically) |
| to                                   | in order to (53 live)                                               |
| make sure, verify                    | ensure that, please make sure                                       |
| use                                  | utilize (16 live), leverage                                         |
| because                              | due to the fact that                                                |
| if                                   | in the event that, should you wish to                               |
| can                                  | is able to, has the ability to                                      |
| now, then                            | at this point in time, subsequently                                 |
| also, and                            | additionally, furthermore, moreover                                 |
| delete, remove                       | nuke, purge, wipe                                                   |
| set up (verb) / setup (noun)         | setup as a verb                                                     |
| sign in (verb) / sign-in (adjective) | login as a verb                                                     |
| email                                | e-mail                                                              |

Drop these entirely: _simply_ (54 live), _just_, _easily_, _obviously_, _of course_, _seamless_, _robust_, _powerful_, _cutting-edge_, _revolutionary_, _game-changing_.

Never open a step with "Please". Never end an article with "And that's it!" or "Congratulations!".

---

## 16. Pre-publish checklist

Copy this into the PR description and tick it.

**Structure**

- [ ] Article type chosen, skeleton followed, no type blending
- [ ] Opening sentence is a bolded definition of the feature
- [ ] Headings are Title Case, in order, no skipped levels
- [ ] `## Prerequisites` present only if there is a real gate
- [ ] FAQ heading is exactly `Frequently Asked Questions (FAQs)`
- [ ] No pricing or plan detail outside a lobby FAQ, Billing, or What's New

**Steps**

- [ ] Numbered steps used for sequences, bullets for options
- [ ] Every step opens with an approved verb
- [ ] Every step is action, item, location, as a fluid sentence
- [ ] Every UI label is bold and matches the app exactly
- [ ] No step contains two actions
- [ ] No fragments joined by dashes

**Language**

- [ ] Second person, present tense, active voice
- [ ] No banned words from section 15
- [ ] Paragraphs are three sentences or fewer
- [ ] OnceHub terminology used, one name per concept, no "Customer"

**Links and media**

- [ ] Every internal link is root-relative with a trailing slash
- [ ] Every link text is the target article's real title, in bold
- [ ] No "here", "this article", "read more", "guide" as link text
- [ ] No new images, or alt text on any that are genuinely needed
- [ ] Video uses `<YouTubeEmbed>`

**Front matter and build**

- [ ] `title`, `description` (120–160 chars, ends with a period), `products`, `sidebar.order`
- [ ] `description` is a full sentence, not a fragment or a "Learn how to…" stub
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm build` pass
- [ ] `pnpm exec prettier --write` run on every changed file

---

## 17. Legacy OnceHub content that breaks these rules

These are measured inconsistencies inside the OnceHub folders. Follow this guide, not whatever the nearest old article does.

| Inconsistency                          | OnceHub reality                                    | Follow                    |
| -------------------------------------- | -------------------------------------------------- | ------------------------- |
| Sentence-case titles                   | 43 of 419, none since July 2026                    | Title Case                |
| `How To` in titles                     | 13 versus 23 `How to`                              | `How to`                  |
| `Requirements` as the gate heading     | 6 versus 9 `Prerequisites`                         | `Prerequisites`           |
| Plain (unbolded) cross-reference links | 258 versus 627 bold                                | Bold                      |
| `Go to` as a step verb                 | 95 uses, but only 1 across the 22 recent articles  | `Select` or `Navigate to` |
| `Click on`                             | 256 uses, but only 2 across the 22 recent articles | `Click`                   |
| Screenshots in how-tos                 | 17 of 391 articles, none among the 16 recent ones  | Text only                 |
| Plan mentions inside how-tos           | Present in some older articles                     | Forbidden                 |
| Bare `Frequently Asked Questions`      | 4 of 33, including the newest article              | `(FAQs)`                  |

**The step-verb habit is already fixed in new writing.** `Click on` and `Go to` survive almost entirely in legacy articles: 351 uses across 419 articles, of which 3 appear in the 22 written since July. Do not treat the older corpus as a model for step syntax, and do not read this table as a reason to go and fix those older articles.

**Legacy article titles that already break the rules stay as they are.** Renaming a live article breaks inbound links and search ranking. Apply this guide to new articles, and to an old article only when you are substantially rewriting it.

This table is informational. It is **not** a work queue.

---

## 18. Decisions recorded

Agreed during the setup phase. Do not reopen these without a new instruction from the content owner.

1. **No changes to existing articles.** This guide governs work on new articles and on articles that are already being rewritten for a real reason. It is not authorisation for a cleanup pass, and no article is edited solely to bring it into line with this guide.
2. **Legacy screenshots stay.** The 17 OnceHub articles that carry images are left untouched. No strip-out campaign.
3. **Legacy title casing stays.** The 43 sentence-case OnceHub titles are not bulk-normalised. No redirect work is scoped.
4. **`Go to` is not a cleanup project.** Existing occurrences are left alone. The rule applies to text you write.
5. **Overrides of the old template documents are approved.** Title Case over sentence case, `Prerequisites` over `Requirements`, no `TL;DR` heading, bold cross-reference links, and text-only images are all confirmed as the intended house style.
6. **The style check is advisory, not enforced.** `scripts/check-style.mjs` reports findings and always exits 0. It must never fail a build or block a PR.
7. **Nothing is committed without explicit permission.** No commit, push, merge or branch change in this repository unless the user asks for it directly in the current conversation. Work is left uncommitted for the user to review.

---

## 19. The advisory style check

`scripts/check-style.mjs` implements the mechanical rules in this guide.

```bash
pnpm lint:style          # articles changed against origin/dev
pnpm lint:style:all      # whole corpus, for auditing only
node scripts/check-style.mjs <paths...>   # specific files
```

**It is advisory and always exits 0.** Style ownership stays with the writer; the check exists to make drift visible, not to gate work.

| Marker | Meaning                                                      |
| ------ | ------------------------------------------------------------ |
| `!`    | Mechanical rule from this guide. Worth fixing before review. |
| `?`    | Judgement call. Read it, then decide. It is sometimes wrong. |

What it covers: step openers and step verbs, the banned word list, generic link text, internal link shape, heading and title casing, heading level skips, `TL;DR`, the FAQ and gate headings, description length and punctuation, OnceHub-only terminology, em dashes, and image alt text.

What it deliberately does **not** check: sentence length. A naive splitter reads markdown list items and link lists as prose and flags about 30% of the corpus, almost all of it noise. It needs a real parser before it is worth having.

Two rules it reports softly, because recent practice is more nuanced than a simple ban:

- **Named locators.** `Under **Guest Cancellation Policy**, select **Up to**` is flagged as `?`, not `!`, because it is correct when the section name disambiguates. Positional narrative (`In the top-right corner, you will see…`) is flagged as `!`.
- **Step verbs.** A first word outside the approved list is `?`. Conditional openers (_If_, _When_, _Once_, _For_) are not flagged at all.

Two things to keep in mind:

- **The corpus is not a work queue.** `--all` reports roughly 3,700 findings across 830 articles, nearly all legacy and none of it scheduled for cleanup.
- **A clean run is not approval.** The check cannot tell you whether a statement about the product is true, whether the article type is right, or whether the example is real. It catches a narrow, mechanical class of error and nothing more.

---

# Appendix A: ScheduleOnce style

**Scope: `scheduleonce/` only (411 files).** This folder is older content with its own frozen conventions. It is not the house style and must never leak into OnceHub articles. Match these conventions so that changes inside `scheduleonce/` stay consistent with their neighbours.

Where ScheduleOnce is silent, fall back to the main guide.

| Convention           | ScheduleOnce                                                                                                     | OnceHub (do not mix in)             |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| Heading casing       | **Sentence case**: "Booking page ownership", "When to use specific triggers" (382 sentence versus 98 Title Case) | Title Case                          |
| Link text            | **Plain, unbolded**: `[Booking page overview](/…)` (3,534 plain versus 87 bold)                                  | Bold                                |
| Booking calendar     | **booking calendar**, lowercase (47 versus 6)                                                                    | Booking Calendar                    |
| Booking page         | **Booking page**, capital B and lowercase page (1,419 versus 43)                                                 | n/a                                 |
| Event type           | **Event type** (544 versus 2)                                                                                    | Event Type                          |
| Master page          | **Master page** (758 versus 72)                                                                                  | Master Page                         |
| Resource pool        | **Resource pool** (228 versus 2)                                                                                 | Resource Pool                       |
| Booking form         | **Booking form** (613 versus 4)                                                                                  | Booking Form                        |
| The person who books | **Customer**, capitalised (1,850 versus 577)                                                                     | guest                               |
| The account holder   | **User**, capitalised (824 versus 531)                                                                           | user                                |
| Gate heading         | **`## Requirements`** (76 uses, zero `Prerequisites`)                                                            | `## Prerequisites`                  |
| Images               | Normal and expected (212 of 411 articles)                                                                        | Text only                           |
| `---` separators     | Rare (72 uses across 411 files)                                                                                  | Common                              |
| FAQ sections         | Rare and inconsistently named; only 5 across the folder                                                          | `Frequently Asked Questions (FAQs)` |

Everything else in the main guide still applies inside `scheduleonce/`: step syntax, verb vocabulary, banned words, action-first ordering, front matter shape, accessibility, and the word list.

**Do not apply the OnceHub "no images" rule here.** Screenshots are part of how this folder documents itself, and removing them would break the articles.

**Do not renumber or re-case existing ScheduleOnce headings** as a drive-by edit. If you are rewriting a ScheduleOnce article substantially, keep its existing conventions rather than converting it to OnceHub style, unless the brief says otherwise.

---

_Last audited: 2026-11-19 against 419 OnceHub and 411 ScheduleOnce articles in `src/content/docs`. Re-run the audit before changing any figure in this document._
