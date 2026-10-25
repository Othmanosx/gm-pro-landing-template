import { A, Faq, Table, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "google-meet-continuous-chat",
  title: "Google Meet Continuous Chat: Who Gets It and Who Doesn't",
  headline: "Google Meet continuous meeting chat: who gets it, and who doesn't",
  description:
    "Continuous meeting chat keeps Google Meet messages in Google Chat after the call. Which plans get it, which meetings skip it, and what external guests can see.",
  kicker: "meet chat",
  publishDate: "2026-11-01",
  readingMin: 6,
  keywords: [
    "continuous meeting chat",
    "google meet continuous chat",
    "google meet chat in google chat",
    "turn off continuous meeting chat",
  ],
  faq: [
    {
      q: "How do I turn off continuous meeting chat in Google Meet?",
      a: "Open the Calendar event before the meeting starts, go to video call options, and set continuous meeting chat to off in the chat moderation section. Google's help page says the setting can't be changed once the meeting begins, and the meeting then uses the classic chat that clears when people leave.",
    },
    {
      q: "Can external guests see continuous meeting chat history?",
      a: "No. Google says external guests only have access to the chat during the time they are in the meeting. They don't see messages from before they joined and lose access when they leave. People who aren't signed in get the same treatment.",
    },
    {
      q: "Why don't I have continuous meeting chat in my instant meeting?",
      a: "Instant meetings are on Google's list of unsupported meeting types, along with meetings with waiting rooms, breakout rooms, live streams, huddles, client-side encrypted meetings and events without a Meet ID. Continuous chat needs a meeting scheduled in Google Calendar on an eligible plan.",
    },
    {
      q: "Is continuous meeting chat saved with the recording?",
      a: "No. When continuous meeting chat is on, Google says chat messages aren't saved to the organizer's Drive with the recording, and no .SBV chat file is created. The messages stay in the Google Chat conversation instead, under your organization's Chat retention rules.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        I build an extension that adds persistent chat to Google Meet, so when Google shipped its
        own version I read every help page about it, mostly to figure out who still needs mine. The
        short version is that continuous meeting chat is good, and it covers fewer meetings than its
        announcement makes it sound.
      </p>

      <Takeaway>
        Continuous meeting chat moves Google Meet&apos;s in-call messages into a Google Chat
        conversation that survives the call. It&apos;s on by default for meetings scheduled in
        Google Calendar on Business, Enterprise, Enterprise Essentials and Frontline plans, for
        invitees inside the host&apos;s organization. Personal accounts, Education plans, instant
        meetings, meetings with waiting rooms or breakout rooms, and external guests don&apos;t get
        it.
      </Takeaway>

      <h2>What is continuous meeting chat?</h2>
      <p>
        Google{" "}
        <A href="https://workspaceupdates.googleblog.com/2025/11/continue-conversations-google-chat-google-meet.html">
          announced it in November 2025
        </A>
        : messages you send in a Meet call are powered by Google Chat, so they stay in a shared Chat
        conversation after the meeting ends. You can react with emoji, share images and files from
        inside Meet, and anything posted in that Chat conversation before the meeting shows up in
        Meet during the call. It reached Rapid Release domains from December 8, 2025 and Scheduled
        Release domains from March 23, 2026.
      </p>
      <p>
        Before this, Meet chat only existed while you were in the call. That classic behaviour is
        still what everyone outside the eligible plans gets; I covered it in{" "}
        <A href="/blog/google-meet-chat-disappears">why Google Meet chat disappears when you leave</A>.
      </p>

      <h2>Which Google Workspace plans get continuous meeting chat?</h2>
      <p>
        According to Google&apos;s{" "}
        <A href="https://support.google.com/meet/answer/9308979?hl=en">Meet chat help page</A>:
      </p>
      <Table
        head={["Edition family", "Continuous meeting chat"]}
        rows={[
          ["Business Starter, Standard, Plus", "Yes"],
          ["Enterprise Starter, Standard, Plus", "Yes"],
          ["Enterprise Essentials, Essentials Plus", "Yes"],
          ["Frontline Starter, Standard, Plus", "Yes"],
          ["Education editions", "Not listed"],
          ["Workspace Individual", "Not listed"],
          ["Personal Google accounts (Gmail)", "Not listed"],
        ]}
      />
      <p>
        &quot;Not listed&quot; is my wording for editions the help page doesn&apos;t mention. Google
        adds editions over time, so check the page if your plan is one of those.
      </p>

      <h2>Which meetings don&apos;t get it, even on an eligible plan?</h2>
      <p>The help page lists these meeting types as unsupported:</p>
      <ul>
        <li>Instant meetings</li>
        <li>Meetings with waiting rooms</li>
        <li>Breakout rooms</li>
        <li>Live streams and huddles</li>
        <li>Client-side encrypted meetings</li>
        <li>Events without a Meet ID</li>
      </ul>
      <p>
        The host can also turn it off per meeting. It&apos;s on by default, and the switch lives in
        the Calendar event&apos;s video call options. Once the meeting starts, the setting is
        locked, so a host who forgot can&apos;t fix it mid-call.
      </p>

      <h2>What do external guests see?</h2>
      <p>
        Only what&apos;s sent while they&apos;re in the call. Google&apos;s wording is that external
        guests only have access to the chat during the time they are in the meeting, and the same
        goes for people who aren&apos;t signed in. Internal attendees get a banner when external
        guests are present. If your work is mostly calls with clients, students or contractors from
        outside your domain, they&apos;re on the classic chat even when you aren&apos;t.
      </p>

      <h2>What happens to the chat after the meeting?</h2>
      <p>
        It stays in Google Chat, and it follows your organization&apos;s Chat retention rules and
        Vault, like any other Chat conversation. Two related changes landed in 2026:
      </p>
      <ul>
        <li>
          A{" "}
          <A href="https://workspaceupdates.googleblog.com/2026/03/introducing-new-meetings-section-in-Google-Chat.html">
            Meetings section in Google Chat
          </A>{" "}
          (March 2026) that collects meeting conversations after they end. It&apos;s off by default,
          so you have to opt in.
        </li>
        <li>
          <A href="https://workspaceupdates.googleblog.com/2026/10/follow-through-on-your-meeting-tasks-with-meeting-recaps-in-Google-Chat.html">
            Meeting recaps in Google Chat
          </A>{" "}
          (October 2026): when &quot;Take notes for me&quot; is on, a recap card with a summary,
          decisions and action items gets posted to the meeting&apos;s Chat conversation. That one
          is limited to Business Standard and Plus, Enterprise Standard and Plus, and Frontline
          Plus.
        </li>
      </ul>
      <p>
        One side effect to know about: with continuous chat on, the chat is no longer saved next to
        the recording in Drive. If your team relied on the .SBV chat file that came with recordings,
        it&apos;s gone for those meetings, and the Chat conversation is where you look instead.{" "}
        <A href="/blog/save-google-meet-chat">My guide to saving Google Meet chat</A> covers both
        paths.
      </p>

      <h2>What if you don&apos;t have continuous meeting chat?</h2>
      <p>
        Then you&apos;re in the group I build for (I make Better Chat, a Chrome extension that keeps
        Meet chat per meeting link). It works on any account, including personal Gmail, and on
        instant meetings, because it stores the chat itself instead of relying on Google Chat. It
        only shows its chat to people in the call who also run it; everyone else sees the messages
        in Meet&apos;s own chat as plain text.
      </p>
      <p>
        If your meetings are internal, scheduled in Calendar, and you&apos;re on Business or
        Enterprise, use what Google gives you. It&apos;s included in your plan and it&apos;s wired
        into Chat and Vault, which an extension can&apos;t match.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
