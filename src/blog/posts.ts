import type { ReactElement, ReactNode } from "react";

import type { PostMeta } from "./site";

import * as continuousChat from "./content/google-meet-continuous-chat";
import * as meetChatDisappears from "./content/google-meet-chat-disappears";
import * as saveMeetChat from "./content/save-google-meet-chat";

export type Post = {
  meta: PostMeta;
  Body: () => ReactElement<{ children?: ReactNode }>;
};

const ALL: Post[] = [meetChatDisappears, saveMeetChat, continuousChat].map((m) => ({
  meta: m.meta,
  Body: m.default,
}));

// Gate on the deploy's build time, so pages, feed, sitemap and llms.txt agree
// until the next deploy releases the next post. `next dev` shows everything.
const isLive = (p: Post) =>
  process.env.NODE_ENV === "development" ||
  new Date(`${p.meta.publishDate}T08:00:00Z`) <=
    new Date(process.env.BUILD_TIME ?? Date.now());

const dates = ALL.map((p) => p.meta.publishDate);
const collisions = dates.filter((d, i) => dates.indexOf(d) !== i);
if (collisions.length) {
  throw new Error(`Duplicate publishDate: ${collisions.join(", ")}`);
}

/** Live posts, newest first. */
export const publishedPosts = (): Post[] =>
  ALL.filter(isLive).sort((a, b) =>
    b.meta.publishDate.localeCompare(a.meta.publishDate)
  );

export const postBySlug = (slug: string) =>
  publishedPosts().find((p) => p.meta.slug === slug);

/** max(updated, publishDate): a revision can land before a post releases. */
export const lastModified = (m: PostMeta) =>
  m.updated && m.updated > m.publishDate ? m.updated : m.publishDate;

const STOP = new Set(["google", "meet", "chat", "the", "and", "for", "how", "what", "your"]);
const topicWords = (m: PostMeta) =>
  new Set(
    m.keywords
      .flatMap((k) => k.toLowerCase().split(/[^a-z0-9]+/))
      .filter((w) => w.length > 2 && !STOP.has(w))
  );

/** Closest live posts by shared keyword words and kicker; deterministic. */
export const relatedPosts = (slug: string, n = 3): PostMeta[] => {
  const live = publishedPosts().map((p) => p.meta);
  const me = live.find((m) => m.slug === slug);
  if (!me) return [];
  const mine = topicWords(me);
  return live
    .filter((m) => m.slug !== slug)
    .map((m) => ({
      m,
      score:
        [...topicWords(m)].filter((w) => mine.has(w)).length +
        (m.kicker === me.kicker ? 2 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.m.slug.localeCompare(b.m.slug))
    .slice(0, n)
    .map((x) => x.m);
};
