import { Children, Fragment, isValidElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import type { Post } from "./posts";
import { PostCta } from "./PostCta";
import { Takeaway } from "./prose";
import { SITE_URL } from "./site";

/** Fails the build when a post body is not a fragment with a top-level Takeaway. */
const withInlineCta = (post: Post): ReactNode[] => {
  const body = post.Body();
  if (body.type !== Fragment) throw new Error(`Post ${post.meta.slug}: Body must return a fragment`);
  const blocks = Children.toArray(body.props.children);
  const at = blocks.findIndex((b) => isValidElement(b) && b.type === Takeaway) + 1;
  if (at === 0) throw new Error(`Post ${post.meta.slug}: Body needs a top-level <Takeaway>`);
  return [...blocks.slice(0, at), <PostCta key="cta" slug={post.meta.slug} cta="inline" />, ...blocks.slice(at)];
};

// React 19 hoists <link rel="preload"> for non-lazy images to the top of the markup.
const stripHoisted = (html: string) => html.replace(/<link [^>]*>/g, "");

export const postHtml = (post: Post) => stripHoisted(renderToStaticMarkup(<>{withInlineCta(post)}</>));

/** Portable HTML for syndication importers: absolute URLs, no div/span/aside/section. */
export const feedHtml = (post: Post) =>
  stripHoisted(renderToStaticMarkup(<post.Body />))
    .replace(/<img class="shot-dark"[^>]*>/g, "")
    .replace(/ class="[^"]*"/g, "")
    .replace(/(href|src)="\//g, `$1="${SITE_URL}/`)
    .replace(/<aside><strong>([^<]*)<\/strong><p>/g, "<blockquote><p><strong>$1:</strong> ")
    .replace(/<\/p><\/aside>/g, "</p></blockquote>")
    .replace(/<\/?(div|span|section)[^>]*>/g, "")
    .replace(/\]\]>/g, "]]&gt;");
