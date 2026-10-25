import type { GetStaticProps } from "next";
import { NextSeo } from "next-seo";

import { BLOG_DESCRIPTION, formatPostDate, type PostMeta, SITE_URL } from "../../src/blog/site";
import { Footer } from "../../src/sections/Footer";
import { Header } from "../../src/sections/Header";

export const getStaticProps: GetStaticProps<{ posts: PostMeta[] }> = async () => {
  const { publishedPosts } = await import("../../src/blog/posts");
  return { props: { posts: publishedPosts().map((p) => p.meta) } };
};

const BlogIndex = ({
  posts,
  isDarkMode,
  toggleDarkMode,
}: {
  posts: PostMeta[];
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}) => (
  <>
    <NextSeo
      title="Blog | Better Chat"
      description={BLOG_DESCRIPTION}
      canonical={`${SITE_URL}/blog`}
      openGraph={{ url: `${SITE_URL}/blog`, title: "Better Chat Blog", description: BLOG_DESCRIPTION }}
      additionalLinkTags={[
        { rel: "alternate", type: "application/rss+xml", href: `${SITE_URL}/blog/feed.xml` },
      ]}
    />
    <div className="overflow-hidden col text-strong">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="w-full max-w-2xl px-5 pt-32 pb-24 mx-auto">
        <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl text-strong">
          Blog
        </h1>
        <p className="mt-4 body-lg text-light">{BLOG_DESCRIPTION}</p>
        {posts.length === 0 && (
          <p className="mt-14 text-light">The first post goes up soon.</p>
        )}
        <ul className="gap-10 mt-14 col">
          {posts.map((p) => (
            <li key={p.slug}>
              <a href={`/blog/${p.slug}`} className="block group">
                <p className="text-xs font-bold tracking-widest uppercase text-primary-600">
                  {p.kicker}
                </p>
                <h2 className="mt-2 text-2xl font-bold leading-snug group-hover:underline text-strong">
                  {p.headline}
                </h2>
                <p className="mt-2 text-light">{p.description}</p>
                <p className="mt-2 text-sm text-extra-light">
                  {formatPostDate(p.publishDate)} · {p.readingMin} min read
                </p>
              </a>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  </>
);

export default BlogIndex;
