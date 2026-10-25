/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Blog posts go live once a deploy's build time passes their publish date.
  env: { BUILD_TIME: new Date().toISOString() },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async rewrites() {
    return [{ source: "/blog/:slug/og.png", destination: "/api/og?slug=:slug" }];
  },
  async headers() {
    return [
      {
        // Allow the sidepanel to be embedded in Google Meet's iframe
        source: "/sidepanel",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://meet.google.com https://*.google.com",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
