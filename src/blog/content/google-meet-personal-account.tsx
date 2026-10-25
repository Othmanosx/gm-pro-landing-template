import { A, Faq, Table, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "google-meet-personal-account",
  title: "Google Meet Personal Account: What You Get in 2026",
  headline: "What does a free Google Meet personal account get in 2026?",
  description:
    "A Google Meet personal account gets 60-minute group calls, 100 participants and captions, but no saved chat, recording or transcripts. Each limit, sourced.",
  kicker: "plans",
  publishDate: "2026-11-23",
  readingMin: 6,
  keywords: [
    "google meet personal account",
    "google meet free account limits",
    "google meet gmail 60 minute limit",
    "google meet free vs workspace",
  ],
  faq: [
    {
      q: "How long can a free Google Meet call last?",
      a: "On a computer, a free personal account can hold a one-on-one call for up to 24 hours and a call with three or more people for up to 60 minutes. Everyone hears a chime at 50 minutes. Google's help page says the host can upgrade their account to keep the meeting going.",
    },
    {
      q: "Can I record Google Meet on a personal Gmail account?",
      a: "Only with a Google One plan of 2 TB or more. Google's recording help page lists Workspace editions that can record, and personal accounts qualify only through that Google One tier. Without it, a free account has no built-in recording, and the classic chat isn't saved anywhere after the call.",
    },
    {
      q: "Do free Google Meet accounts keep the chat after the call?",
      a: "No. Personal accounts use Meet's classic chat, which Google's help page says doesn't show messages sent before you join and clears when you leave. Continuous meeting chat, which keeps messages in Google Chat, is listed only for Business, Enterprise, Enterprise Essentials and Frontline editions.",
    },
    {
      q: "Do free Google Meet accounts get captions?",
      a: "Yes. Live captions are available to all users, and since February 2025 caption history lets personal accounts scroll back through the last 30 minutes of captions during a call. Saved transcripts are a different feature, and Google's transcripts page lists only Workspace editions, not personal accounts.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        In June 2026 I got in touch with tutoring businesses whose lessons run on Google Meet, about
        keeping chat between lessons. A free Gmail account is the cheapest way to run lessons like
        those, so I went through Google&apos;s help pages and wrote down what a Google Meet
        personal account actually gets in 2026.
      </p>

      <Takeaway>
        A free personal Google account can host Meet calls of up to 60 minutes with three or more
        people (a chime plays at 50 minutes), one-on-one calls of up to 24 hours on a computer, and
        up to 100 participants. It gets live captions, 30 minutes of caption history and video-tile
        reactions. It doesn&apos;t get continuous meeting chat, saved transcripts, or recording
        unless you add a Google One plan of 2 TB or more.
      </Takeaway>

      <h2>What does a free personal account get in Google Meet?</h2>
      <Table
        head={["Feature", "Free personal account", "Source"]}
        rows={[
          ["Group calls (3+ people)", "Up to 60 minutes, chime at 50", <A key="len" href="https://support.google.com/meet/answer/7317473?hl=en">Meeting limits</A>],
          ["1:1 calls", "Up to 24 hours on a computer", <A key="len2" href="https://support.google.com/meet/answer/7317473?hl=en">Meeting limits</A>],
          ["Participants", "Up to 100", <A key="len3" href="https://support.google.com/meet/answer/7317473?hl=en">Meeting limits</A>],
          ["In-call chat", "Classic chat, clears when you leave", <A key="chat" href="https://support.google.com/meet/answer/9308979?hl=en">Chat help</A>],
          ["Continuous meeting chat", "Not listed", <A key="chat2" href="https://support.google.com/meet/answer/9308979?hl=en">Chat help</A>],
          ["Recording", "Only with Google One 2 TB or more", <A key="rec" href="https://support.google.com/meet/answer/9308681?hl=en">Recording help</A>],
          ["Live captions and caption history", "Yes, 30 minutes of scrollback", <A key="cap" href="https://workspaceupdates.googleblog.com/2025/02/google-meet-caption-history.html">Caption history</A>],
          ["Saved transcripts", "Not listed", <A key="tr" href="https://support.google.com/meet/answer/12849897?hl=en">Transcripts help</A>],
          ["Video-tile reactions", "Yes", <A key="re" href="https://workspaceupdates.googleblog.com/2023/01/in-meeting-reactions-for-google-meet.html">Reactions</A>],
        ]}
      />
      <p>
        &quot;Not listed&quot; means the help page names specific Workspace editions and personal
        accounts aren&apos;t among them.
      </p>

      <h2>How long can a Google Meet call last on a free account?</h2>
      <p>
        Google&apos;s{" "}
        <A href="https://support.google.com/meet/answer/7317473?hl=en">meeting limits page</A> says
        that without a subscription, on a computer, a one-on-one call can run up to 24 hours, and a
        call with three or more participants is capped at 60 minutes. At 50 minutes everyone hears a
        chime and gets a notice that the call is ending soon. The host can upgrade their account to
        extend it; otherwise it ends at the hour. So a 1:1 tutoring lesson can run long, and the
        same lesson with a parent joining can&apos;t.
      </p>

      <h2>What happens to the chat on a personal account?</h2>
      <p>
        It disappears. Personal accounts get Meet&apos;s classic chat, which doesn&apos;t show
        messages sent before you join and clears when you leave, and continuous meeting chat is only
        listed for Business, Enterprise and Frontline editions. The full story is in{" "}
        <A href="/blog/google-meet-chat-disappears">why Google Meet chat disappears</A> and{" "}
        <A href="/blog/google-meet-continuous-chat">who gets continuous meeting chat</A>.
      </p>
      <p>
        Reactions are similar. You get the quick emoji reactions on your video tile, but the full
        emoji library and reactions on individual chat messages are for some Workspace plans only,
        as I laid out in <A href="/blog/google-meet-reactions">Google Meet reactions by plan</A>.
      </p>

      <h2>Can you record or transcribe on a free account?</h2>
      <p>
        Recording needs a Google One plan with 2 TB or more, according to Google&apos;s recording
        help page. Transcripts aren&apos;t listed for personal accounts at all. What you do get is
        live captions and caption history, which lets you scroll back through the last 30 minutes of
        captions while the call is running. I compared those in{" "}
        <A href="/blog/google-meet-transcript-plans">which plans save a Meet transcript</A>.
      </p>

      <h2>Where does an extension help, and where should you upgrade Google?</h2>
      <p>
        Some of these gaps are things a browser extension can fill, and some only Google can. I make
        Better Chat (a Chrome extension that adds a chat layer to Google Meet), so here&apos;s where
        each one helps.
      </p>
      <p>
        Upgrade Google if the 60-minute cap is what hurts, or you need recordings or
        transcripts that land in Drive. No extension changes how long Google lets your meeting run,
        and Better Chat doesn&apos;t record or transcribe. Workspace Individual, for example, is on
        Google&apos;s lists for both recording and transcripts.
      </p>
      <p>
        An extension helps with the chat and caption gaps. Better Chat keeps the last 22 hours of
        chat per meeting link, so a reload or a late join shows what was already sent in that
        meeting. It doesn&apos;t carry chat over to the next lesson. It adds replies, emoji reactions on
        messages and file sharing, and its captions tab keeps Meet&apos;s captions past the
        30-minute window and downloads them as .txt. The extra chat is only visible to people in the
        call who also run Better Chat; everyone else sees each message in Meet&apos;s chat as plain
        text. It&apos;s $9.99 a month after a 30-day free trial. Upgrading Google for longer calls
        won&apos;t fix the chat on its own, by the way: Workspace Individual isn&apos;t on the
        continuous chat list either.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
