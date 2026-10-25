import type { GetServerSideProps } from "next";

import { feedHtml } from "../../src/blog/render";
import { publishedPosts } from "../../src/blog/posts";
import { sendText } from "../../src/blog/sendText";
import { BLOG_AUTHOR, BLOG_DESCRIPTION, SITE_URL } from "../../src/blog/site";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 with full content; dev.to imports from here. */
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const items = publishedPosts()
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.meta.slug}`;
      const image = `${url}/og.png`;
      return `    <item>
      <title>${esc(p.meta.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${p.meta.publishDate}T08:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>${esc(BLOG_AUTHOR.name)}</dc:creator>
      <description>${esc(p.meta.description)}</description>
      <enclosure url="${image}" type="image/png" length="0"/>
      <media:content url="${image}" type="image/png" medium="image" width="1200" height="630"/>
      <content:encoded><![CDATA[${feedHtml(p)}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  return sendText(
    res,
    "application/rss+xml",
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Better Chat Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    <description>${esc(BLOG_DESCRIPTION)}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`
  );
};

const Feed = () => null;
export default Feed;
