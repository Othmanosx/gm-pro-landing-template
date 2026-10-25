# Marketing voice

The reference for anything public about Better Chat: blog posts, landing copy, store listing, emails, HN/Reddit/X/LinkedIn drafts. Read it before drafting. A draft that doesn't sound like the samples at the bottom is wrong, however polished it is. When a skill's advice conflicts with this file, this file wins.

## What Better Chat is

A Chrome extension that adds a second chat layer on top of Google Meet's own chat. It keeps chat history per meeting link (so a recurring meeting keeps its chat, and late joiners see what was said before they arrived), and adds emoji reactions, replies, image, GIF and file sharing, dark mode, auto-mute and camera-off on join, auto-join for scheduled meetings, a scrollback tab for Meet's captions, a lobby chime, and an attendee shuffler.

How it works, stated plainly because posts must never contradict it:

- The extra chat is visible only to people in the same call who also run Better Chat. Everyone else still sees each message in Meet's own chat as plain text.
- Messages are stored on Better Chat's servers (Firebase), keyed by the meeting code. Attachments are deleted one week after upload. Uploads are capped at 100 files / 2 GB per user per month.
- It runs in the browser as an extension. No bot joins the call.

Pricing (source: `src/sections/Pricing.tsx`, `gm-pro/src/shared/hooks/useSubscriptionStatus.ts`): $9.99/month, $7.99/month billed annually, $149 lifetime (shown as reduced from $249). Free trial: 30 days or 30 meetings, whichever comes first, no card.

What it is not: not an AI notetaker, not a meeting recorder, not a Google product, not a replacement for Google Chat or Slack, not for Zoom or Teams.

Built and run by one person, Othman. First person singular, always: "I built", never "we built" (ToS, privacy and billing copy are the only exceptions).

## The problem, in the reader's words

"I pasted the link in chat and now it's gone." "Someone joined late and asked me to resend everything." "We have the same standup every day and the chat starts empty every time." Meet's in-call chat is fine during the call and useless the moment it ends or someone arrives late.

## Audience

1. **The tutor or teacher** running recurring 1:1 or small-group lessons on Meet. Wants links, worked problems and homework to stay in one place across lessons for the same student.
2. **The person who runs a recurring team meeting** (standup, weekly sync, client call) on Meet and keeps re-sharing the same links and losing decisions typed into chat.

Not: enterprises buying through procurement, Zoom/Teams users, people looking for AI summaries.

## What we're against

The meeting chat as a throwaway side box: a text field that exists for the length of one call, then empties. Criticize that as a category. Second target: bots that join your call to take notes. Better Chat doesn't add a participant.

## Voice rules

1. **Open with myself, not the thesis.** "I kept losing the links I pasted in Meet chat", "A student asked me to resend the worksheet for the third time". An insight-first opener ("Most teams underestimate...") is banned; it is the loudest AI tell.
2. **Experience is the evidence.** Claims come with lived context. Numbers are mine and owned, or cited to a primary source. No benchmark-speak.
3. **Reuse the riffs** below verbatim. Repetition is the brand.
4. **Direct opinions.** No both-sides hedging about the throwaway chat box.
5. **Anti-ad instinct.** Mention Better Chat only where it is relevant, disclosed in parentheses on first mention in opinion and how-to posts: "(I make Better Chat, a Chrome extension for this)". Soft CTAs. Offer more instead of pushing.
6. **Don't over-polish.** Contractions, comma-chained sentences, the occasional casual intensifier. Symmetrical grammar-perfect prose is itself a tell.
7. **Strip the tells:** no em dashes (commas, colons, parens, periods instead), no "supercharge", "seamless", "game-changer", "revolutionize", "unleash", "effortless", "ultimate", "Introducing", "in today's fast-paced world", no summary sentence that restates the paragraph, no pull-quote closers, no emoji in prose.

## Claims policy

Needs a primary source opened by whoever writes the post: every number, date, price, quote, and every description of how Google Meet, Google Chat, Chrome or a competitor behaves. Not an article citing it: the source (support.google.com, workspaceupdates.googleblog.com, the competitor's own site, the store listing).

Product claims must match the code. If the code changes, posts that describe it get updated (see `docs/blog-ops.md`).

### Banned claims

Grepped by `scripts/blog-check.mjs`; extend the list there when you add here.

- Privacy absolutes: "never leaves your browser", "we never store", "end-to-end encrypted", "private by default", "no data collected". Messages are stored on our servers. State what is true: "attachments are deleted after a week", "no bot joins the call".
- Unqualified "free" ("free extension", "100% free", "free forever"). It's paid with a trial; say "30-day free trial".
- "Anonymous" or "no account". There's no sign-up form, but it identifies you by the Google account signed into Chrome (`chrome.identity.getProfileUserInfo`). "No sign-up" is fine.
- Inflated social proof: "thousands of users", "loved by", "trusted by teams at". The store listing shows the real numbers; use those or nothing.
- Anything implying Google made, endorses or partners with Better Chat. Say "for Google Meet".
- "Everyone in the call sees..." without saying they need Better Chat too.

## Competitor naming policy

- **Opinion and how-to posts** criticize categories (the throwaway chat box, notetaker bots), never a named company.
- **Comparison pages** ("Better Chat vs ...", "... alternatives", "how to save Google Meet chat") may name Google Meet's own features and other extensions, with: the bias disclosed up top ("I make Better Chat"), a fair "where they win" section, and every competitor fact verified on their live site on the writing date.
- **Google Meet and Google Chat** may always be named and described, accurately and with citations. Where Google's own feature is the better answer for a reader (for example Workspace accounts that already save chat to a Chat space), say so.

## Canonical riffs

Proposed, from my own writing. Approve, edit or replace before the first wave ships.

- "The chat shouldn't reset every time the call does."
- "Late joiners see what they missed."
- "It runs inside the Meet you already use."
- "No bot joins your call."

## Canonical samples

Verbatim. The Pyor samples are my own casual writing about another product I make; they set the rhythm (lowercase openers, comma chains, "from experience", the anti-ad close). The Better Chat email is the closest sample to this product. Names and discount codes are removed.

### Show HN post (Pyor)

> since the introduction of AI, the bottleneck for shipping code shifted from producing code to reviewing it, and the PR reviewing experience on Github is lackluster, leaving a lot to be desired.
> my team now ships too much code and it sits in review for too long, review AI code is not easy and we need a better tool to review code, especially on large PRs.
> So I built Pyor, a website and a performant desktop app to review code at least 3x faster compared to Github (from experience)
> As a web dev, I compiled all of my painpoints into this project, what would make a review easy (and even fun) for me, I integrated tools to group noise from actual important bits to focus on reviewing, that speeds up reviewing time immensely, especially on migration PRs where most is mechanical name changes.
> Try it out at https://www.pyor.review and let me know what you think!
> it's free!

### Comment (Pyor)

> You still have to read the code anyways. even if the AI reviews the code, the output is still on you. AI is just shifting the bottleneck.
> The way I'm approaching this problem is to use AI to reduce the stuff we have to review instead of increasing it. The AI is not that good at dissecting very complex code or architecting better solutions, but it's good at identifying noise or things that are safe to merge. So we could use the AI to handle all the noise and keep the important stuff that we need a human review for. GitHub is no longer a good place for reviewing PRs nowadays.

### Story (Pyor)

> I got frustrated enough that I built my own reviewer around this idea: instead of adding commentary, it groups files into folders by complexity, surfaces the handful of changes that actually need deep review, and marks the mechanical noise so you can blow through it. On migration PRs it cut my review time down a lot.
> I can share more if people are curious, I'd rather not turn this into an ad.

### Show HN, March 2025 (Better Chat, then named GM Pro)

From [HN 43440772](https://news.ycombinator.com/item?id=43440772). The post body is more polished than the target voice (it says "seamlessly"), so only the problem line and the closing ask are kept, with the original dash replaced by a colon.

> Google Meet works well for video calls, but its chat and transcription features have limitations: messages disappear when you reload, transcriptions only show the last few sentences, and there's no way to react or reply properly.
>
> What other Google Meet features do you wish existed?

Reply to the first commenter, the target voice:

> Glad you're enjoying it! Dark mode was a must-have for me too. Let me know if you run into any issues or have ideas for new features.

### Reply to a Marketplace reviewer (Better Chat add-on, April 30, 2026)

> Apologies, I still don't understand, the app itself is a chat widget, a better alternative to what Meet offers, which is why I simply called it "better chat". What could be a better more aligned name for such addon?

### Re-engagement email (Better Chat, April 2026)

> I'm Othman, the maker of Better Chat. I noticed you've been using it across a few meetings over the last couple of weeks, really glad it's been useful.
>
> I wanted to reach out personally because you're right at the line where most people either go pro or drop off, and I'm curious which way you're leaning. Is there a feature you wish it had? Something blocking you on the paid side (price, billing through work, anything)? I'd genuinely love to hear it.
>
> And if it's a work-card situation and you need an invoice or a different billing setup, just reply and I'll sort it out.

## Channel notes

| Channel | Notes |
|---|---|
| Blog | Founder voice above. One real product screenshot where the product is relevant. CTA: Add to Chrome. |
| HN / Reddit | Answer the thread first, product in parens, never post-and-run. I post these myself; agents only draft. |
| X / LinkedIn | One idea per post, personal opener. Drafts only. |
| Email | Under 120 words, one ask, first person. |
