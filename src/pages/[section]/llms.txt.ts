import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

function docIdToMarkdownPath(id: string): string {
  const slug = id.replace(/\.mdx?$/, "").replace(/\/index$/, "");
  return `/${slug}.md`;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await getCollection("docs");
  const sections = new Set<string>();

  for (const doc of docs) {
    const [section] = doc.id.split("/");
    if (section && doc.id.includes("/")) {
      sections.add(section);
    }
  }

  return [...sections]
    .sort((a, b) => a.localeCompare(b))
    .map((section) => ({ params: { section } }));
};

export const GET: APIRoute = async ({ params, site }) => {
  const section = params.section ?? "";
  const base = site ?? new URL("https://help.oncehub.com/");
  const docs = await getCollection("docs");

  const sectionDocs = docs
    .filter((doc) => doc.id.startsWith(`${section}/`))
    .sort((a, b) => a.id.localeCompare(b.id));

  const title = section
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  const lines = sectionDocs.map((doc) => {
    const mdUrl = new URL(docIdToMarkdownPath(doc.id), base).href;
    const docTitle = doc.data.title || doc.id;
    const desc = doc.data.description?.trim();
    return `- [${docTitle}](${mdUrl})${desc ? `: ${desc}` : ""}`;
  });

  const body = [
    `# OnceHub Help Center — ${title}`,
    `> Markdown index for the \`${section}\` section of OnceHub Help Center (${sectionDocs.length} pages).`,
    `Back to root index: ${new URL("/llms.txt", base).href}`,
    "## Pages",
    lines.join("\n"),
  ].join("\n\n");

  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
