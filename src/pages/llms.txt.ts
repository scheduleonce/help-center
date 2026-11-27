import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

const SECTION_META: Record<string, { label: string; description: string }> = {
  "getting-started": {
    label: "Getting Started",
    description: "Onboarding, account setup, and core OnceHub concepts.",
  },
  product: {
    label: "Product Guides",
    description:
      "Booking Calendars, Booking Hubs, Routing Forms, Chatbots, and scheduling workflows.",
  },
  developers: {
    label: "Developer Documentation",
    description:
      "OnceHub REST API v2 guides, webhooks, authentication, and OpenAPI reference.",
  },
  "account-integrations": {
    label: "Account Integrations",
    description:
      "CRM, marketing automation, Zapier, OnceHub MCP, and workspace integrations.",
  },
  "user-integrations": {
    label: "User Integrations",
    description:
      "Calendar connections (Google, Outlook, Office 365, iCloud) and video conferencing.",
  },
  "account-administration": {
    label: "Account Administration",
    description:
      "Users, roles, teams, permissions, and organization-level settings.",
  },
  "user-account-management": {
    label: "User Account Management",
    description: "Managing user accounts, access, and authentication.",
  },
  "profile-management": {
    label: "Profile Management",
    description:
      "Personal profile, availability, notifications, and working hours.",
  },
  "contact-management": {
    label: "Contact Management",
    description: "Managing contacts, guests, and booking history.",
  },
  "activities-analytics": {
    label: "Activities & Analytics",
    description: "Activity stream, reporting, and scheduling analytics.",
  },
  chatbots: {
    label: "Chatbots",
    description: "Additional chatbot configuration and troubleshooting guides.",
  },
  billing: {
    label: "Billing & Plans",
    description: "Plans, subscriptions, invoices, and billing management.",
  },
  "security-compliance": {
    label: "Security & Compliance",
    description: "Security architecture, GDPR, HIPAA, and compliance controls.",
  },
  "whats-new": {
    label: "What's New",
    description: "Product release notes and feature announcements.",
  },
  scheduleonce: {
    label: "ScheduleOnce (Legacy)",
    description:
      "Legacy Booking Pages and Master Pages documentation for ScheduleOnce.",
  },
};

function formatSectionLabel(section: string): string {
  return (
    SECTION_META[section]?.label ??
    section
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );
}

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL("https://help.oncehub.com/");
  const docs = await getCollection("docs");

  const sectionCounts = new Map<string, number>();
  for (const doc of docs) {
    const [section] = doc.id.split("/");
    if (!section || !doc.id.includes("/")) continue;
    sectionCounts.set(section, (sectionCounts.get(section) ?? 0) + 1);
  }

  const orderedSections = [
    ...Object.keys(SECTION_META).filter((s) => sectionCounts.has(s)),
    ...[...sectionCounts.keys()]
      .filter((s) => !(s in SECTION_META))
      .sort((a, b) => a.localeCompare(b)),
  ];

  const sectionLines = orderedSections.map((section) => {
    const label = formatSectionLabel(section);
    const count = sectionCounts.get(section) ?? 0;
    const desc = SECTION_META[section]?.description;
    const url = new URL(`/${section}/llms.txt`, base).href;
    return `- [${label} (${count} pages)](${url})${desc ? `: ${desc}` : ""}`;
  });

  const body = [
    "# OnceHub Help Center",
    "> Help documentation, user guides, and API references for OnceHub scheduling, routing forms, chatbots, and integrations.",
    "Use the section indexes below to browse specific areas, or append `.md` to any documentation URL to fetch its Markdown version directly.",
    "## Documentation Sets",
    [
      `- [Abridged documentation](${new URL("/llms-small.txt", base).href}): Compact OnceHub documentation (excludes legacy ScheduleOnce articles).`,
      `- [Complete documentation](${new URL("/llms-full.txt", base).href}): Full concatenated documentation across OnceHub and ScheduleOnce.`,
    ].join("\n"),
    "## Section Indexes",
    sectionLines.join("\n"),
    "## API & Agent Resources",
    [
      `- [Developer Documentation Overview](${new URL("/developers/overview/introduction.md", base).href}): OnceHub REST API v2 introduction and authentication.`,
      `- [OpenAPI Specification (3.1)](${new URL("/openapi.json", base).href}): Machine-readable OnceHub REST API schema.`,
      `- [API Catalog (RFC 9727)](${new URL("/.well-known/api-catalog", base).href}): Standard API discovery linkset.`,
      `- [OnceHub MCP Server Metadata](${new URL("/.well-known/mcp.json", base).href}): Model Context Protocol server endpoint and documentation.`,
      `- [Connect OnceHub MCP to Your AI Assistant](${new URL("/account-integrations/automation/oncehub-mcp/how-to-connect-oncehub-to-your-ai-assistant.md", base).href}): Setup guide for OnceHub MCP.`,
      `- [OnceHub MCP Supported Tools](${new URL("/account-integrations/automation/oncehub-mcp/list-of-supported-tools.md", base).href}): Available tools in the OnceHub MCP server.`,
    ].join("\n"),
    "## Notes",
    "- Every documentation page has a plain Markdown twin at `<page-path>.md`.",
    "- Legacy ScheduleOnce documentation is separated under `/scheduleonce/llms.txt`.",
  ].join("\n\n");

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
