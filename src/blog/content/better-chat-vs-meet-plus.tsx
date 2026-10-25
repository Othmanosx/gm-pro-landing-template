/* eslint-disable @next/next/no-img-element */
import { A, Faq, Figure, Table, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "better-chat-vs-meet-plus",
  title: "Meet Plus Alternative: Better Chat vs Meet Plus Compared",
  headline: "Meet Plus alternative: how Better Chat and Meet Plus compare",
  description:
    "Looking for a Meet Plus alternative? Better Chat and Meet Plus both add a messenger to Google Meet. Chat history, replies, files, automation, price and ratings.",
  kicker: "comparison",
  publishDate: "2026-11-19",
  readingMin: 6,
  keywords: [
    "meet plus alternative",
    "meet plus for google meet",
    "better chat vs meet plus",
    "google meet messenger extension",
  ],
  faq: [
    {
      q: "How much does Meet Plus PRO cost?",
      a: "The price isn't published on their site or store listing as of October 2026. The listing says PRO needs a monthly subscription and mentions annual and bulk pricing for schools and organizations, without figures. Their site lists a 3-day free trial; the store listing mentions both 3 days and 5 days.",
    },
    {
      q: "Do other people need the extension to see my messages?",
      a: "For the extra features, yes, with both. Meet Plus says it works best when everyone in the session has it installed. Better Chat's chat layer is only visible to other Better Chat users in the call, and each message is also posted into Meet's own chat as plain text so everyone else can still read it.",
    },
    {
      q: "Does Meet Plus have a whiteboard and polls?",
      a: "Yes, on PRO. Its Chrome Web Store listing describes a real-time whiteboard where only PRO users can draw, and an Instant Poll feature. Better Chat has neither. If those matter more to you than chat history across meetings, Meet Plus is the better fit for that part of the job.",
    },
    {
      q: "When was Meet Plus last updated?",
      a: "Its Chrome Web Store listing showed May 28, 2025 as the last update, version 11.5.7, when I checked on October 25, 2026. Better Chat's listing showed October 25, 2026, version 0.2.8. Update dates move, so check the listing yourself if recency matters for your decision.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        I make Better Chat, a Chrome extension that adds a chat layer to Google Meet, and Meet Plus
        is the extension closest to it in approach, so this comparison has an obvious bias. If
        you&apos;re after a Meet Plus alternative, here&apos;s how the two differ. I took every Meet
        Plus fact from its store listing and its site on October 25, 2026.
      </p>

      <Takeaway>
        Meet Plus and Better Chat both put their own messenger on top of Google Meet, visible only
        to people who run the same extension. Meet Plus has private messages, a whiteboard, polls
        and a much larger install base, and doesn&apos;t publish its PRO price. Better Chat keeps
        chat per meeting link across reloads, late joins and recurring calls, with replies and file
        sharing, for $9.99 a month or $149 once.
      </Takeaway>

      <h2>How do the two chat models differ?</h2>
      <p>
        Both add a layer on top of Meet&apos;s own chat instead of replacing it. The{" "}
        <A href="https://chromewebstore.google.com/detail/meet-plus-for-google-meet/lbfjgknkjfjmnjdgdhbbmmbkoddgpdoc">
          Meet Plus listing
        </A>{" "}
        describes a messenger where you broadcast to the room or send private messages to one
        person or a group, and says message history is kept in the messenger panel. Its{" "}
        <A href="https://meet-plus.com/">site</A> says it works best when everyone in the meeting
        has it installed.
      </p>
      <p>
        Better Chat has one shared room per meeting, no private messages. Its chat is stored on
        Better Chat&apos;s servers keyed by the meeting code, so someone who reloads or joins late
        sees everything sent so far, and the same meeting link next week opens with last
        week&apos;s messages. Only Better Chat users in the call see that layer; every message is
        also posted into Meet&apos;s own chat as plain text, so people without it can still read it.
      </p>
      <p>
        Neither Meet Plus page says whether its history survives a reload or carries over to the
        next meeting, so I won&apos;t guess. If that&apos;s your reason for looking, test it in a
        call before you rely on it. Meet&apos;s classic chat drops everything when you leave, which{" "}
        <A href="https://support.google.com/meet/answer/9308979?hl=en">Google&apos;s help page</A>{" "}
        confirms and I wrote about in{" "}
        <A href="/blog/google-meet-chat-disappears">why Google Meet chat disappears</A>.
      </p>

      <h2>Better Chat vs Meet Plus, feature by feature</h2>
      <Table
        head={["", "Meet Plus", "Better Chat"]}
        rows={[
          ["Shared room chat", "Yes (free)", "Yes"],
          ["Private messages", "Yes (free)", "No"],
          ["History", "Kept in the messenger panel, per its listing", "Per meeting link, across reloads, late joins and recurring calls"],
          ["Replies to messages", "Not listed", "Yes"],
          ["Emoji reactions", "Yes; Super Emojis and multimedia reactions on PRO", "Yes, on messages"],
          ["Files", "Link sharing free; file sharing to selected people on PRO", "Images, GIFs, documents, audio, video; deleted after a week"],
          ["Whiteboard, polls", "PRO", "No"],
          ["Auto join", "Listed", "Yes, for scheduled meetings"],
          ["Auto mute, camera off on join", "Not listed", "Yes"],
          ["Dark mode", "Several dark modes", "Better Chat panel"],
          ["Captions", "Not listed", "Captions tab, download as .txt"],
        ]}
      />
      <p>
        Meet Plus also lists a lot of classroom and group tools I don&apos;t build: reward points,
        tasks, trivia quizzes, a talking stick, breakout rooms, private screen sharing and voice
        chat, attendance and a host control panel, some free and some PRO.
      </p>
      <Figure caption="Better Chat's chat panel next to a Meet call, from its Chrome Web Store listing.">
        <img
          src="https://lh3.googleusercontent.com/Vn3qQlegazqzvJlriBP3j1RUJfQVaIqMScbKqIf8RWum_tydkntTMiFo24WUsnHT3XbzgXGV9H7zSneOcjFDm5Aw=s1280-w1280-h800"
          alt="Better Chat chat panel beside a Google Meet video grid, showing saved messages with emoji reactions"
          width={1280}
          height={800}
          loading="lazy"
        />
      </Figure>

      <h2>How does the automation compare?</h2>
      <p>
        Meet Plus lists meeting auto joining in its settings, along with a meeting timer and a
        stopwatch. Better Chat&apos;s automation is about the moment you join: separate toggles for
        auto mute and camera off, auto join for scheduled meetings that clicks Join at the
        scheduled time (or 1, 2 or 5 minutes after), a sound when someone is waiting to join, and a
        shuffler that posts a random speaking order to chat. The mute and camera toggles are
        covered in <A href="/blog/google-meet-join-muted">how to join Google Meet muted</A>.
      </p>

      <h2>What does each cost?</h2>
      <p>
        Meet Plus&apos;s PRO price is not published on their site or their store listing. The
        listing says PRO needs a monthly subscription and mentions annual and bulk pricing for
        schools and organizations without figures. Its site lists a 3-day free trial; the listing
        mentions 3 days in one place and 5 days in another.
      </p>
      <p>
        Better Chat is $9.99 a month, $7.99 a month billed yearly, or $149 once for lifetime access,
        with a 30-day or 30-meeting free trial, whichever comes first, and no card.
      </p>

      <h2>What do the store listings show?</h2>
      <p>From the Chrome Web Store on October 25, 2026:</p>
      <Table
        head={["", "Meet Plus", "Better Chat"]}
        rows={[
          ["Users", "200,000", "137"],
          ["Rating", "3.7 from 300 ratings", "5.0 from 3 ratings"],
          ["Last updated", "May 28, 2025", "October 25, 2026"],
        ]}
      />
      <p>
        Meet Plus is published by Winfotech Inc and its listing carries the Featured badge. Three
        ratings isn&apos;t a meaningful sample, so don&apos;t read much into my 5.0. Far more
        people have tried Meet Plus.
      </p>

      <h2>Where does Meet Plus win?</h2>
      <ul>
        <li>Private messages to one person or a group, which Better Chat doesn&apos;t do.</li>
        <li>A shared whiteboard and instant polls on PRO.</li>
        <li>Classroom tools like quizzes, reward points and a talking stick.</li>
        <li>Install base: 200,000 users against my 137, and the Featured badge.</li>
        <li>A free basic version that includes the messenger.</li>
      </ul>

      <h2>Where does Better Chat win?</h2>
      <p>
        Chat that stays with the meeting link. If your call is a recurring lesson or a weekly
        standup and the problem is that the chat starts empty every time, that&apos;s the job I
        built it for; I covered the setup in{" "}
        <A href="/blog/recurring-meeting-chat-history">chat history for recurring meetings</A>. It
        also has replies, file sharing up to 100 MB for video, a captions tab you can download, and
        a lifetime plan. If you&apos;re still weighing broader Meet extensions, my{" "}
        <A href="/blog/google-meet-enhancement-suite-alternatives">
          Enhancement Suite alternatives comparison
        </A>{" "}
        puts both next to Google&apos;s own continuous chat.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
