/**
 * Advisory style check for Help Center articles.
 *
 * Implements the mechanical rules from STYLE-GUIDE.md. It is ADVISORY ONLY and
 * always exits 0: it reports findings, it never fails a build or a PR. Style
 * ownership stays with the writer.
 *
 * Scope follows the guide's two style families:
 *   - OnceHub (default): every article outside src/content/docs/scheduleonce/
 *   - ScheduleOnce (legacy): src/content/docs/scheduleonce/ only, where the
 *     guide's exceptions apply (plain links, sentence-case headings, images,
 *     Customer/User capitalisation, `## Requirements`).
 *
 * Severity:
 *   rule       Mechanical, near-zero false positives. Worth fixing before review.
 *   judgement  Heuristic. May be wrong; a human decides.
 *
 * Deliberately NOT checked: sentence length. A naive sentence splitter reads
 * markdown list items and link lists as prose and reports ~30% of the corpus
 * as violations, almost all of it noise. It needs a real parser to be useful.
 *
 * Usage:
 *   node scripts/check-style.mjs            # files changed vs origin/dev
 *   node scripts/check-style.mjs --all      # entire corpus (expect legacy noise)
 *   node scripts/check-style.mjs <paths...> # specific files
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(PROJECT_ROOT, "src", "content", "docs");
const SCHEDULEONCE_DIR = path.join(CONTENT_DIR, "scheduleonce");

const BASE_REF = process.env.STYLE_BASE || "origin/dev";

/** Walk a directory recursively and return every article path. */
function walkDir(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkDir(fullPath));
    else if (/\.mdx?$/.test(entry.name)) files.push(fullPath);
  }
  return files;
}

/** Return article paths changed against the base ref, falling back to the working tree. */
function changedFiles() {
  const attempts = [
    ["diff", "--name-only", "--diff-filter=ACMR", `${BASE_REF}...HEAD`],
    ["diff", "--name-only", "--diff-filter=ACMR", "HEAD"],
    ["diff", "--name-only", "--diff-filter=ACMR"],
  ];
  for (const args of attempts) {
    try {
      const out = execFileSync("git", args, {
        cwd: PROJECT_ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      });
      const files = out
        .split(/\r?\n/)
        .filter((line) => /\.mdx?$/.test(line))
        .map((line) => path.resolve(PROJECT_ROOT, line))
        .filter((file) => file.startsWith(CONTENT_DIR + path.sep))
        .filter((file) => fs.existsSync(file));
      if (files.length) return files;
    } catch {
      // try the next strategy
    }
  }
  return [];
}

/* ------------------------------------------------------------------ *
 * Vocabulary
 * ------------------------------------------------------------------ */

// Approved UI verbs from STYLE-GUIDE.md section 6.2, plus the plain action
// verbs that recent articles use legitimately.
const STEP_VERBS = new Set([
  "click",
  "select",
  "enter",
  "define",
  "configure",
  "expand",
  "toggle",
  "hover",
  "copy",
  "paste",
  "navigate",
  "scroll",
  "open",
  "download",
  "upload",
  "add",
  "remove",
  "delete",
  "enable",
  "disable",
  "set",
  "choose",
  "drag",
  "filter",
  "search",
  "save",
  "confirm",
  "review",
  "verify",
  "use",
  "update",
  "locate",
  "move",
  "assign",
  "link",
  "unlink",
  "publish",
  "import",
  "export",
  "send",
  "start",
  "stop",
  "run",
  "test",
  "apply",
  "mark",
  "rename",
  "duplicate",
  "disconnect",
  "connect",
  "install",
]);

// Legitimate non-verb openers. A conditional clause is fine at the start of a
// step: "If you choose **Up to**, enter a value." Only ban narrative openers.
const CONDITIONAL_OPENERS = new Set([
  "if",
  "when",
  "once",
  "for",
  "to",
  "optionally",
  "repeat",
  "continue",
  "then",
  "next",
  "after",
  "before",
  "depending",
  "otherwise",
  "while",
]);

// Positional narrative openers. Banned outright: recent practice uses none.
// "In the top-right corner, you will see a gear icon that you should click."
const POSITIONAL_OPENER =
  /^(?:in|on|at)\s+the\s+(?:top|bottom|left|right|upper|lower|main|center|centre|middle|corner|far)\b/i;

// A bold named section or dialog may open a step when the name is the
// disambiguator, e.g. "Under **Guest Cancellation Policy**, select **Up to**."
// Two recent articles do this deliberately, so it is a judgement call, not a rule.
const NAMED_LOCATOR_OPENER =
  /^(?:in|on|at|under|within)\s+(?:the\s+)?(?:\*\*|`)/i;

// Banned openers that are never acceptable at the start of a numbered step.
const BAD_STEP_OPENERS = [
  { re: /^click on\b/i, fix: 'use "Click" without "on"' },
  { re: /^go to\b/i, fix: 'use "Select" or "Navigate to"' },
  { re: /^hit\b/i, fix: 'use "Click"' },
  { re: /^press\b/i, fix: 'use "Click"' },
  { re: /^tap\b/i, fix: 'use "Click" or "Select"' },
  { re: /^utilize\b/i, fix: 'use "Use"' },
  { re: /^simply\b/i, fix: "drop the word" },
  {
    re: POSITIONAL_OPENER,
    fix: "lead with the verb, then item, then location",
  },
];

// Words to avoid anywhere in body text.
const AVOID_WORDS = [
  [/\bhit\b/gi, 'use "Click"'],
  [/\bpress\b/gi, 'use "Click"'],
  [/\butiliz(?:e|es|ed|ing)\b/gi, 'use "Use"'],
  [/\bsimply\b/gi, "drop the word"],
  [/\bin order to\b/gi, 'use "To"'],
  [/\bclick here\b/gi, "name the destination"],
  [/\be-?mail address\b/gi, 'use "email address"'],
];

// Generic link text that must name the destination article instead.
const GENERIC_LINK_TEXT =
  /^(here|click here|read more|learn more|more|this article|this guide|the guide|this page|the article|see more|details|view|link)$/i;

// Lowercase words permitted in Title Case headings and titles.
const TITLE_CASE_MINOR_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "for",
  "to",
  "of",
  "in",
  "on",
  "at",
  "by",
  "with",
  "from",
  "per",
  "vs",
  "vs.",
  "into",
  "as",
  "is",
  "are",
  "your",
  "that",
  "this",
  "it",
  "its",
  "via",
  "nor",
  "so",
  "yet",
  "than",
]);

// Brands, acronyms and identifiers that keep their own casing.
const BRAND_WORDS = new Set([
  "oncehub",
  "scheduleonce",
  "salesforce",
  "hubspot",
  "stripe",
  "okta",
  "onelogin",
  "zapier",
  "icloud",
  "gmail",
  "oauth",
  "sms",
  "mfa",
  "url",
  "urls",
  "api",
  "apis",
  "crm",
  "sso",
  "mcp",
  "utm",
  "gdpr",
  "hipaa",
  "bcc",
  "ews",
  "smtp",
  "saml",
  "tls",
  "pdf",
  "csv",
  "json",
  "seo",
  "ai",
  "id",
  "ids",
  "webex",
  "teams",
  "zoom",
  "paypal",
  "entra",
  "n8n",
  "viasocket",
  "keragon",
  "integrately",
  "leadpages",
  "wordpress",
  "webhooks",
  "sdk",
]);

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

function splitFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { frontMatter: "", body: raw, bodyOffset: 0 };
  return {
    frontMatter: match[1],
    body: raw.slice(match[0].length),
    bodyOffset: match[0].split(/\r?\n/).length - 1,
  };
}

function frontMatterValue(frontMatter, key) {
  const match = frontMatter.match(
    new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, "m"),
  );
  return match ? match[1] : "";
}

/** True when every significant word is capitalised, allowing minor words and brands. */
function isTitleCase(text) {
  const words = text.replace(/[*`_]/g, "").split(/\s+/).filter(Boolean);
  return words.every((word, index) => {
    // Identifiers and mixed-case tokens are fine.
    if (/[^A-Za-z]/.test(word)) return true;
    if (/^[A-Z]/.test(word)) return true;
    const lower = word.toLowerCase();
    if (BRAND_WORDS.has(lower)) return true;
    // Minor words may be lowercase anywhere except the first word.
    if (index > 0 && TITLE_CASE_MINOR_WORDS.has(lower)) return true;
    // Short lowercase words are tolerated to avoid noise.
    return word.length <= 3;
  });
}

function isScheduleOnce(file) {
  return file.startsWith(SCHEDULEONCE_DIR + path.sep);
}

/* ------------------------------------------------------------------ *
 * Checks
 * ------------------------------------------------------------------ */

function checkFile(file) {
  const raw = fs.readFileSync(file, "utf8");
  const { frontMatter, body, bodyOffset } = splitFrontMatter(raw);
  const oncehub = !isScheduleOnce(file);
  const findings = [];

  const add = (rule, severity, line, message) =>
    findings.push({ rule, severity, line, message });

  // --- front matter -------------------------------------------------
  const title = frontMatterValue(frontMatter, "title");
  const description = frontMatterValue(frontMatter, "description");

  if (!description) {
    add("description-missing", "rule", 1, "no `description` in front matter");
  } else {
    if (description.length > 160) {
      add(
        "description-length",
        "rule",
        1,
        `description is ${description.length} characters (max 160)`,
      );
    }
    if (!/[.!?]$/.test(description.trim())) {
      add(
        "description-period",
        "rule",
        1,
        "description should end with a full stop",
      );
    }
    if (/^(learn|find out|discover)\b/i.test(description)) {
      add(
        "description-stub",
        "judgement",
        1,
        "description reads as a stub; state what the reader can do",
      );
    }
  }

  if (title && oncehub && !isTitleCase(title)) {
    add("title-case", "rule", 1, `title is not Title Case: "${title}"`);
  }

  // --- headings -----------------------------------------------------
  const lines = body.split(/\r?\n/);
  let lastHeadingLevel = 0;

  lines.forEach((line, index) => {
    const lineNo = index + 1 + bodyOffset;

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();
      const plain = text.replace(/[*`_]/g, "");

      if (level === 1) {
        add(
          "h1-in-body",
          "rule",
          lineNo,
          "the layout supplies the H1; use `##` or deeper",
        );
      }

      if (lastHeadingLevel && level > lastHeadingLevel + 1) {
        add(
          "heading-skip",
          "judgement",
          lineNo,
          `jumps from H${lastHeadingLevel} to H${level}`,
        );
      }
      lastHeadingLevel = level;

      if (level > 1 && oncehub && !isTitleCase(plain)) {
        add(
          "heading-case",
          "rule",
          lineNo,
          `heading is not Title Case: "${plain}"`,
        );
      }

      if (/TL;?\s?DR/i.test(plain)) {
        add(
          "tl-dr-heading",
          "rule",
          lineNo,
          "no TL;DR heading; open with a bolded definition instead",
        );
      }

      if (
        oncehub &&
        /^(faqs?|frequently asked questions|frequently asked questions \(faqs\))$/i.test(
          plain,
        ) &&
        plain !== "Frequently Asked Questions (FAQs)"
      ) {
        add(
          "faq-heading",
          "rule",
          lineNo,
          'use exactly "Frequently Asked Questions (FAQs)"',
        );
      }

      if (oncehub && /^requirements$/i.test(plain)) {
        add(
          "gate-heading",
          "rule",
          lineNo,
          'use "Prerequisites" in OnceHub articles',
        );
      }
    }

    // --- numbered steps ---------------------------------------------
    const step = line.match(/^\d+\.\s+(.*)$/);
    if (step) {
      const rawText = step[1];
      const text = rawText.replace(/[*`_]/g, "");
      let openerFlagged = false;

      for (const { re, fix } of BAD_STEP_OPENERS) {
        if (re.test(text)) {
          add(
            "step-opener",
            "rule",
            lineNo,
            `step opens with a banned pattern; ${fix}`,
          );
          openerFlagged = true;
          break;
        }
      }

      // Test the raw text: a bold section name is the signal we care about.
      if (!openerFlagged && NAMED_LOCATOR_OPENER.test(rawText)) {
        add(
          "step-locator",
          "judgement",
          lineNo,
          "opens with a named locator; fine when the section name disambiguates, otherwise lead with the verb",
        );
        openerFlagged = true;
      }

      if (!openerFlagged) {
        const firstWord = (text.match(/^([A-Za-z]+)/) || [])[1];
        const lower = firstWord ? firstWord.toLowerCase() : "";
        if (
          firstWord &&
          !STEP_VERBS.has(lower) &&
          !CONDITIONAL_OPENERS.has(lower)
        ) {
          add(
            "step-verb",
            "judgement",
            lineNo,
            `step opens with "${firstWord}", which is not an approved verb`,
          );
        }
      }

      if (/\b(?:and then|,\s*then|; then)\b/i.test(text)) {
        add(
          "step-two-actions",
          "judgement",
          lineNo,
          "possible two actions in one step; split it",
        );
      }
    }
  });

  // --- word list ----------------------------------------------------
  lines.forEach((line, index) => {
    for (const [re, suggestion] of AVOID_WORDS) {
      re.lastIndex = 0;
      if (re.test(line)) {
        add(
          "avoid-word",
          "rule",
          index + 1 + bodyOffset,
          `"${line.match(re)[0]}"; ${suggestion}`,
        );
      }
    }
  });

  // --- links --------------------------------------------------------
  for (const match of body.matchAll(
    /\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g,
  )) {
    const text = match[1].replace(/[*_`]/g, "").trim();
    const target = match[2];
    const lineNo =
      body.slice(0, match.index).split(/\r?\n/).length + bodyOffset;

    if (GENERIC_LINK_TEXT.test(text)) {
      add(
        "link-text",
        "rule",
        lineNo,
        `generic link text "${text}"; use the target article's title`,
      );
    }

    if (target.startsWith("/") && !target.includes("#")) {
      const isAsset = /\.(png|jpe?g|gif|svg|webp|pdf|zip|ya?ml|json)$/i.test(
        target,
      );
      if (!isAsset && !target.endsWith("/")) {
        add(
          "link-slash",
          "rule",
          lineNo,
          `internal link needs a trailing slash: ${target}`,
        );
      }
    }

    const isRelativeArticle =
      !target.startsWith("/") &&
      !target.startsWith("http") &&
      !target.startsWith("#") &&
      !target.startsWith("mailto:") &&
      !/\.(png|jpe?g|gif|svg|webp)$/i.test(target);
    if (isRelativeArticle) {
      add(
        "link-relative",
        "rule",
        lineNo,
        `use a root-relative path, not "${target}"`,
      );
    }
  }

  // --- images -------------------------------------------------------
  for (const match of body.matchAll(/!\[([^\]]*)\]\(([^)\s]+)/g)) {
    const alt = match[1].trim();
    const lineNo =
      body.slice(0, match.index).split(/\r?\n/).length + bodyOffset;
    if (!alt) {
      add(
        "image-alt",
        "judgement",
        lineNo,
        "empty alt text; describe the image or confirm it is decorative",
      );
    }
    if (oncehub && !file.includes(`${path.sep}whats-new${path.sep}`)) {
      add(
        "image-in-article",
        "judgement",
        lineNo,
        "OnceHub articles are text only; confirm this image earns its place",
      );
    }
  }

  // --- terminology --------------------------------------------------
  if (oncehub) {
    const termChecks = [
      [/\bCustomer\b/g, 'use "guest" in OnceHub articles'],
      [/\bEvent Types?\b/g, "ScheduleOnce term; OnceHub has no Event Types"],
      [/\bMaster Pages?\b/g, "ScheduleOnce term"],
      [/\bResource Pools?\b/g, "ScheduleOnce term"],
      [/\bbooking calendar\b/g, 'capitalise as "Booking Calendar"'],
    ];
    lines.forEach((line, index) => {
      for (const [re, message] of termChecks) {
        re.lastIndex = 0;
        const found = line.match(re);
        if (found) {
          add(
            "terminology",
            "rule",
            index + 1 + bodyOffset,
            `"${found[0]}"; ${message}`,
          );
        }
      }
      if (/\u2014/.test(line)) {
        add(
          "em-dash",
          "rule",
          index + 1 + bodyOffset,
          "avoid em dashes as clause connectors",
        );
      }
    });
  }

  return findings;
}

/* ------------------------------------------------------------------ *
 * Entry point
 * ------------------------------------------------------------------ */

function main() {
  const args = process.argv.slice(2);

  let files;
  if (args.includes("--all")) {
    files = walkDir(CONTENT_DIR);
  } else if (args.length) {
    files = args
      .map((arg) => path.resolve(PROJECT_ROOT, arg))
      .filter((file) => fs.existsSync(file));
  } else {
    files = changedFiles();
    if (!files.length) {
      console.log(
        "Style check (advisory): no changed articles found. Use --all to scan everything.\n",
      );
      return;
    }
  }

  let totalFindings = 0;
  let filesWithFindings = 0;
  const byRule = new Map();

  for (const file of files.sort()) {
    const findings = checkFile(file);
    if (!findings.length) continue;

    filesWithFindings++;
    totalFindings += findings.length;
    for (const finding of findings) {
      byRule.set(finding.rule, (byRule.get(finding.rule) || 0) + 1);
    }

    console.log(`\n${path.relative(PROJECT_ROOT, file).replace(/\\/g, "/")}`);
    for (const finding of findings) {
      const severity = finding.severity === "judgement" ? "?" : "!";
      console.log(
        `  ${severity} ${String(finding.line).padStart(4)}  ${finding.rule.padEnd(18)} ${finding.message}`,
      );
    }
  }

  console.log("\n" + "-".repeat(72));
  if (!totalFindings) {
    console.log(
      `Style check (advisory): ${files.length} article(s) checked, no findings.`,
    );
  } else {
    console.log(
      `Style check (advisory): ${totalFindings} finding(s) in ${filesWithFindings} of ${files.length} article(s).`,
    );
    const summary = [...byRule.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([rule, count]) => `${rule} ${count}`);
    console.log(`By rule: ${summary.join(", ")}`);
  }
  console.log(
    "Legend: ! = rule from STYLE-GUIDE.md   ? = judgement call, review manually",
  );
  console.log("This check is advisory and never fails the build.\n");
}

main();
