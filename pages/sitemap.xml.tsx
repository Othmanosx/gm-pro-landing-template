import type { GetServerSideProps } from "next";

import { lastModified, publishedPosts } from "../src/blog/posts";
import { sendText } from "../src/blog/sendText";
import { SITE_URL } from "../src/blog/site";

// No lastmod on static pages: no lastmod beats a wrong one.
const STATIC_ROUTES = ["", "/pricing", "/privacy", "/terms", "/support"];

const entry = (path: string, lastmod?: string) =>
  `  <url><loc>${SITE_URL}${path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = publishedPosts().map((p) => p.meta);
  const newest = posts.map(lastModified).sort().at(-1);
  const urls = [
    ...STATIC_ROUTES.map((r) => entry(r)),
    entry("/blog", newest),
    ...posts.map((m) => entry(`/blog/${m.slug}`, lastModified(m))),
  ];
  return sendText(
    res,
    "application/xml",
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`
  );
};

const Sitemap = () => null;
export default Sitemap;
