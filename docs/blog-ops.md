# Blog operations

Hand-off notes for whoever runs the blog next. Voice and claims rules live in `MARKETING.md`; the schedule lives in `docs/blog-roadmap.md`.

## How it works

- Posts are TSX modules in `src/blog/content/<slug>.tsx` exporting `meta` and a `Body` fragment with one top-level `<Takeaway>`. Register each in `src/blog/posts.ts`.
- A post is live once a deploy's build time (`BUILD_TIME`, set in `next.config.js`) passes `publishDate` at 08:00 UTC. `next dev` shows everything. Pages, `/blog/feed.xml`, `/sitemap.xml` and `/llms.txt` all use the same gate, so they agree until the next deploy.
- Post bodies are rendered to HTML at build time in `getStaticProps`, so unreleased posts never reach the client bundle.
- A duplicate `publishDate` throws at build time.
- OG cards: `/blog/<slug>/og.png`, rewritten to `pages/api/og.tsx` (edge, `image/png`).
- CTAs link to the Chrome Web Store with `utm_source=blog&utm_medium=inline|end&utm_campaign=<slug>`. The store dashboard breaks page views down by these three parameters ([Chrome docs](https://developer.chrome.com/blog/cws-analytics-revamp)); with the store's Google Analytics opt-in they're forwarded to GA too ([docs](https://developer.chrome.com/docs/webstore/google-analytics)). Only source, medium and campaign are supported.
- Review gate: `pnpm blog:check` (add `--links` for external URLs). Runs on PRs touching the blog via `.github/workflows/blog.yml`.

## Automation (`.github/workflows/blog.yml`)

| Job | When (UTC) | Needs |
|---|---|---|
| gate | every PR touching `src/blog/**` | nothing |
| release: deploy hook, wait for today's post in the feed (fails after 5 min), ping IndexNow for today's post and any sitemap lastmod in the last 2 days | 08:15 daily | secret `VERCEL_DEPLOY_HOOK_URL` |
| devto: add `cover_image` to imported drafts, publish the oldest draft | 13:00 daily | secret `DEVTO_API_KEY`, dev.to RSS import on |

Scheduled jobs only run from the default branch (`main`). Each job skips with a warning when its secret is missing.

IndexNow key: `919335287357a53ecbe3c535122ce683`, served at `/919335287357a53ecbe3c535122ce683.txt`.

## Accounts

- Google Search Console: `sc-domain:gm-pro.online` is verified (owner). No query data yet. Submit `https://www.gm-pro.online/sitemap.xml` once this ships.
- Bing Webmaster Tools: not set up. Import from Search Console, then submit the sitemap.
- dev.to: not set up. Settings > Extensions > RSS feed URL `https://www.gm-pro.online/blog/feed.xml`, mark "canonical URL", then add the API key secret.
- Analytics: none on the site. Blog conversion is measured through the store's UTM report.

## Research pack (2026-10-25)

Primary sources opened on that date. Re-check before reusing.

- Classic Meet chat clears when you leave, late joiners see nothing earlier, recording saves an .SBV chat log: [support.google.com/meet/answer/9308979](https://support.google.com/meet/answer/9308979?hl=en), [9308681](https://support.google.com/meet/answer/9308681?hl=en).
- Continuous meeting chat: announced Nov 3 2025, Rapid Release Dec 8 2025, Scheduled Release Mar 23 2026; Business, Enterprise, Enterprise Essentials, Frontline only; not instant meetings, waiting rooms, breakout rooms, live streams, huddles, CSE, events without a Meet ID; external guests only see chat while present; no .SBV with recordings ([announcement](https://workspaceupdates.googleblog.com/2025/11/continue-conversations-google-chat-google-meet.html)).
- Meetings section in Google Chat, Mar 20 2026, opt-in ([post](https://workspaceupdates.googleblog.com/2026/03/introducing-new-meetings-section-in-Google-Chat.html)). Meeting recaps in Chat, Oct 19 2026 ([post](https://workspaceupdates.googleblog.com/2026/10/follow-through-on-your-meeting-tasks-with-meeting-recaps-in-Google-Chat.html)).
- Caption history: 30-minute scrollback for everyone, rolling out from Feb 18 2025 ([post](https://workspaceupdates.googleblog.com/2025/02/google-meet-caption-history.html)). Transcripts exclude chat and work on computer, laptop or Android ([12849897](https://support.google.com/meet/answer/12849897?hl=en)).
- Recurring Calendar events get a separate Meeting Conversation per occurrence, named event + date ([9308979](https://support.google.com/meet/answer/9308979?hl=en)). No Google page says whether a recurring series reuses one Meet link; posts tell readers to check their invite.
- Meeting codes from the Meet homepage or Gmail expire 365 days after last use; Calendar codes after 60 days unused with no future events ([10710509](https://support.google.com/meet/answer/10710509)).
- Personal accounts without a Meet subscription: 1:1 up to 24 h, 3+ participants up to 60 min (chime at 50), max 100 participants ([7317473](https://support.google.com/meet/answer/7317473?hl=en)).
- Mute shortcut Ctrl/Command + d ([15738543](https://support.google.com/meet/answer/15738543?hl=en)).
- Join chime only for the first 5 participants ([9303069](https://support.google.com/meet/answer/9303069?hl=en)).
- Competitor store data and pricing (Enhancement Suite $5/mo or $60/yr, 7-day trial; Tactiq Pro $8/user/mo annual; Meet Plus pricing not published) as of 2026-10-25.
- HN threads used: 43440772 (Othman's own 2025 Show HN), 42322595, 24195130, 45188825, 28057969, 41615584.

## Claims that failed verification (do not reintroduce)

- "Meet has no caption scrollback." False since Feb 2025 (30 minutes). Better Chat's angle is captions kept per meeting link in the browser and downloadable as .txt.
- A 500-character limit on Meet chat. Only third-party sources; no Google page. (Better Chat's own input is capped at 500 characters; that's ours, not Meet's.)
- Meet auto-mutes the sixth person to join. Third-party only.
- Native replies/threads in Meet's call chat. Not documented.
- Whether a knock request plays a sound. Not documented.
- "Transcriptions: 24-hour persistence" (from the 2025 Show HN). Current code keeps captions in the browser's IndexedDB per meeting code with no 24-hour rule.
- Better Chat exporting chat. It doesn't; only captions download.
- Meet transcripts are "computer only". The help page says computer, laptop or Android.
- "Google improved caption history after the 2025 Show HN." It rolled out Feb to Mar 2025, around the same time.
- Enhancement Suite chimes on join/leave/new message in its free tier. The vendor lists entry/join chimes as Pro; the store's Basic list says only "Always Play Chimes". Its listing never says "free": say "Basic tier".
- Meet Plus default mic/camera state, and whether its message history survives a reload. Neither is on its listing or site.
- Meet Plus trial length: listing says 3 and 5 days, site says 3. State both.
- A Google page saying recurring Calendar events always share one Meet link. Not found.

## Decisions

- Pages Router stays (next.config `i18n` rules out mixing in the App Router), so feed, sitemap and llms.txt are `getServerSideProps` routes gated on `BUILD_TIME` rather than request time.
- Em dash banned everywhere. Disclosure in parentheses wins over unslop's no-parentheses rule (voice file outranks skills).
- Competitors may be named only on comparison-style pages with a "where they win" note (`MARKETING.md`).
- The store listing's marketing composite stands in as the product screenshot until real light/dark captures exist.

## Open questions for Othman

1. Approve or edit `MARKETING.md`, especially the canonical riffs.
2. Your origin story for the manifesto post (why you built it, the meeting where it broke). Not written, since I won't invent it.
3. Landing page says "All in one free extension" in the hero while the product is paid with a trial. Change the hero?
4. Capture real light and dark screenshots of the chat panel at 2x for posts. Three posts (save chat, reactions, two comparisons) reuse the store composite meanwhile.
6. Confirm the lobby notifier description: posts say it "plays a sound when someone is waiting to join" (it watches Meet's lobby status element).
5. Create the deploy hook and dev.to account, add both secrets.

## Fact audit log

- 2026-10-25: initial sources gathered; wave 1 (17 posts, Oct 28 to Dec 1) written against them, competitor listings re-checked that day. Next audit: 2026-11-25 (re-fetch Enhancement Suite, Meet Plus, Tactiq and Shuffler listings and pricing before then).
