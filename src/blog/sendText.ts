import type { ServerResponse } from "http";

/** For getServerSideProps routes that serve a text file instead of a page. */
export const sendText = (res: ServerResponse, type: string, body: string) => {
  res.setHeader("Content-Type", `${type}; charset=utf-8`);
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.end(body);
  return { props: {} };
};
