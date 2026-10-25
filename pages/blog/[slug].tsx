import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { NextSeo } from "next-seo";

import { PostCta } from "../../src/blog/PostCta";
import {
  BLOG_AUTHOR,
  formatPostDate,
  type PostMeta,
  SITE_URL,
} from "../../src/blog/site";
import { Footer } from "../../src/sections/Footer";
import { Header } from "../../src/sections/Header";

type Props = { meta: PostMeta; html: string; related: PostMeta[] };

export const getStaticPaths: GetStaticPaths = async () => {
  const { publishedPosts } = await import("../../src/blog/posts");
  return {
    paths: publishedPosts().map((p) => ({ params: { slug: p.meta.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { postBySlug, relatedPosts } = await import("../../src/blog/posts");
  const { postHtml } = await import("../../src/blog/render");
  const post = postBySlug(String(params?.slug));
  if (!post) return { notFound: true };
  return {
    props: { meta: post.meta, html: postHtml(post), related: relatedPosts(post.meta.slug) },
  };
};

const jsonLd = (meta: PostMeta) => {
  const url = `${SITE_URL}/blog/${meta.slug}`;
  const article = {
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    image: `${url}/og.png`,
    datePublished: meta.publishDate,
    dateModified: meta.updated ?? meta.publishDate,
    url,
    mainEntityOfPage: url,
    author: {
      "@type": "Person",
      name: BLOG_AUTHOR.name,
      jobTitle: BLOG_AUTHOR.role,
      sameAs: BLOG_AUTHOR.sameAs,
    },
    publisher: { "@type": "Organization", name: "Better Chat", url: SITE_URL },
  };
  const faq = {
    "@type": "FAQPage",
    mainEntity: meta.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return JSON.stringify({ "@context": "https://schema.org", "@graph": [article, faq] }).replace(
    /</g,
    "\\u003c"
  );
};

const PostPage = ({
  meta,
  html,
  related,
  isDarkMode,
  toggleDarkMode,
}: Props & { isDarkMode: boolean; toggleDarkMode: () => void }) => {
  const url = `${SITE_URL}/blog/${meta.slug}`;
  return (
    <>
      <NextSeo
        title={`${meta.title} | Better Chat`}
        description={meta.description}
        canonical={url}
        openGraph={{
          type: "article",
          url,
          title: meta.title,
          description: meta.description,
          siteName: "Better Chat",
          images: [{ url: `${url}/og.png`, width: 1200, height: 630, alt: meta.headline }],
          article: {
            publishedTime: meta.publishDate,
            ...(meta.updated ? { modifiedTime: meta.updated } : {}),
            authors: [BLOG_AUTHOR.sameAs[0]],
            tags: meta.keywords,
          },
        }}
        twitter={{ cardType: "summary_large_image" }}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(meta) }}
        />
      </Head>
      <div className="overflow-hidden col text-strong">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="w-full max-w-2xl px-5 pt-32 pb-24 mx-auto">
          <p className="text-sm font-bold tracking-widest uppercase text-primary-600">
            {meta.kicker}
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tighter md:text-5xl text-strong">
            {meta.headline}
          </h1>
          <p className="mt-4 text-sm text-light">
            {BLOG_AUTHOR.name} · {formatPostDate(meta.publishDate)}
            {meta.updated && <> · Updated {formatPostDate(meta.updated)}</>} ·{" "}
            {meta.readingMin} min read
          </p>
          <article className="mt-10 post-body" dangerouslySetInnerHTML={{ __html: html }} />
          {related.length > 0 && (
            <nav className="pt-8 mt-16 border-t border-gray-300 dark:border-gray-700">
              <h2 className="text-lg font-bold">Keep reading</h2>
              <ul className="gap-3 mt-4 col">
                {related.map((r) => (
                  <li key={r.slug}>
                    <a className="text-primary-600 hover:underline" href={`/blog/${r.slug}`}>
                      {r.headline}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className="mt-12 post-body">
            <PostCta slug={meta.slug} cta="end" />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PostPage;
