import type { GetServerSideProps } from "next";

import { publishedPosts } from "../src/blog/posts";
import { sendText } from "../src/blog/sendText";
import { SITE_URL, STORE_URL } from "../src/blog/site";

/** llmstxt.org index: what Better Chat is, and the live posts. */
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = publishedPosts()
    .map((p) => `- [${p.meta.title}](${SITE_URL}/blog/${p.meta.slug}): ${p.meta.description}`)
    .join("\n");

  return sendText(
    res,
    "text/plain",
    `# Better Chat

> Better Chat is a Chrome extension that adds a second chat layer to Google Meet:
> the last 22 hours of chat kept per meeting link (reloads and late joiners see
> earlier messages from that meeting), emoji reactions, replies, image, GIF and
> file sharing, dark mode, auto-mute and camera-off on join, auto-join, a captions
> scrollback tab, and a chime for when someone joins while you wait to enter.
> The extra chat is visible to other Better Chat users in the same call; messages
> are also posted to Meet's own chat as plain text. Paid, with a free trial of
> 30 days or 30 meetings, whichever comes first. Built by one person.

## Product

- [Homepage](${SITE_URL}): features and demo
- [Pricing](${SITE_URL}/pricing): monthly, annual and lifetime plans
- [Chrome Web Store](${STORE_URL})

## Blog

${posts}

## Notes for agents

- Statistics and product behaviour described in posts cite primary sources inline.
- Feed: ${SITE_URL}/blog/feed.xml
`
  );
};

const Llms = () => null;
export default Llms;
