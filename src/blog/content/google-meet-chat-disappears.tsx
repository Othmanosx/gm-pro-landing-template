import { A, Faq, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "google-meet-chat-disappears",
  title: "Why Google Meet Chat Disappears When You Leave the Call",
  headline: "Why does Google Meet chat disappear when you leave?",
  description:
    "Google Meet chat disappears when you leave unless your plan has continuous meeting chat. Who keeps history, who loses it, and how to hold on to your messages.",
  kicker: "meet chat",
  publishDate: "2026-10-28",
  readingMin: 5,
  keywords: [
    "google meet chat disappears",
    "google meet chat history",
    "google meet chat late join",
    "where does google meet chat go",
  ],
  faq: [
    {
      q: "Can I get Google Meet chat back after I leave the meeting?",
      a: "Only if something saved it. Without continuous meeting chat, Meet clears the messages when you leave. If the host recorded the meeting, the chat log is saved as an .SBV file in the organizer's Google Drive. With continuous meeting chat, the conversation stays in Google Chat for internal invitees.",
    },
    {
      q: "Why can't I see messages sent before I joined the Meet call?",
      a: "Meet's classic in-call chat only shows messages sent while you are in the call. Continuous meeting chat on Business, Enterprise and Frontline plans changes that for people invited on the Calendar event from the host's organization. External guests still only see what is sent while they are there.",
    },
    {
      q: "Does reloading the Google Meet tab delete the chat?",
      a: "Reloading the tab means leaving and rejoining the call, and Google's help page says all messages disappear when you leave if continuous meeting chat is off. So on personal accounts and instant meetings, a reload clears what you could see. With continuous meeting chat on, the history comes back.",
    },
    {
      q: "Do personal Gmail accounts get continuous meeting chat?",
      a: "Google's help page lists Business, Enterprise, Enterprise Essentials and Frontline editions for continuous meeting chat. Personal Google accounts are not on that list, so a free Gmail account still gets the classic chat that clears when you leave. This could change; check the help page for the current list.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        When I posted the first version of my Google Meet extension on{" "}
        <A href="https://news.ycombinator.com/item?id=43440772">Hacker News in March 2025</A>,
        the first problem I listed was that Meet chat messages vanish when you reload. A year and a
        half later people still ask me why their chat is gone, and the answer got more complicated,
        because Google fixed it for some accounts and not for others.
      </p>

      <Takeaway>
        Google Meet&apos;s classic in-call chat only exists while you are in the call. Messages sent
        before you join don&apos;t show up, and everything disappears when you leave. Business,
        Enterprise and Frontline Workspace plans now get continuous meeting chat, which keeps the
        conversation in Google Chat, but only for Calendar-scheduled meetings and only for invitees
        inside the host&apos;s organization. Everyone else, personal Gmail accounts included, still
        loses the chat unless the meeting is recorded.
      </Takeaway>

      <h2>What happens to Google Meet chat when you leave?</h2>
      <p>
        Without continuous meeting chat, it&apos;s gone. Google&apos;s own{" "}
        <A href="https://support.google.com/meet/answer/9308979?hl=en">Meet chat help page</A> says
        messages sent before you join don&apos;t display and all messages disappear when you leave.
        Leaving includes the things you don&apos;t think of as leaving: closing the tab by accident,
        a browser crash, or reloading because your camera froze. You rejoin to an empty chat box.
      </p>
      <p>
        The same page says the chat log is saved when a meeting is recorded. That is the only
        built-in way to keep the classic chat, and it depends on someone with recording rights
        pressing record before the messages you care about were sent.
      </p>

      <h2>Why can&apos;t late joiners see earlier messages?</h2>
      <p>
        Same reason. The classic chat shows you what was sent while you were present, so the person
        who joins ten minutes late sees nothing from the first ten minutes. In practice this is the
        part that annoys people most: someone pastes the doc link at the start, a late joiner asks
        for it, and the link gets pasted again. An{" "}
        <A href="https://news.ycombinator.com/item?id=42322595">HN commenter</A> put it plainly:
        when they joined late, none of the earlier chat messages were available in the UI.
      </p>

      <h2>Which accounts keep Meet chat after the call?</h2>
      <p>
        Google announced{" "}
        <A href="https://workspaceupdates.googleblog.com/2025/11/continue-conversations-google-chat-google-meet.html">
          continuous meeting chat
        </A>{" "}
        in November 2025. In-meeting messages are powered by Google Chat and stay in a shared Chat
        conversation after the call. It reached Rapid Release domains from December 8, 2025 and
        Scheduled Release domains from March 23, 2026. The help page lists these editions:
      </p>
      <ul>
        <li>Business Starter, Standard and Plus</li>
        <li>Enterprise Starter, Standard and Plus, plus Enterprise Essentials and Essentials Plus</li>
        <li>Frontline Starter, Standard and Plus</li>
      </ul>
      <p>
        Personal Google accounts, Workspace Individual and Education editions aren&apos;t on that
        list. If you run tutoring sessions from a Gmail account, or your school uses Workspace for
        Education, you are still on the chat that clears when you leave.
      </p>

      <h2>When does chat still disappear on a Business plan?</h2>
      <p>
        Even on an eligible plan, continuous meeting chat skips a lot of meetings. Google lists
        these as unsupported:
      </p>
      <ul>
        <li>Instant meetings, the ones you start with a quick &quot;new meeting&quot;</li>
        <li>Meetings with waiting rooms, and breakout rooms</li>
        <li>Live streams, huddles, and events without a Meet ID</li>
        <li>Client-side encrypted meetings</li>
      </ul>
      <p>
        External guests are the other gap. The help page says they only have access to the chat
        during the time they are in the meeting. If you meet clients from outside your company, they
        get the classic behaviour even when you don&apos;t. And the host can switch continuous chat
        off in the Calendar event before the meeting starts, which puts everyone back on the old
        chat for that call.
      </p>

      <h2>How do you keep the chat if your plan doesn&apos;t?</h2>
      <p>You have three real options, and none of them is perfect:</p>
      <ol>
        <li>
          <strong>Record the meeting.</strong> If your account can record, the chat is saved as an
          .SBV file next to the recording in the organizer&apos;s Drive, according to{" "}
          <A href="https://support.google.com/meet/answer/9308681?hl=en">Google&apos;s recording help page</A>.
          Free personal accounts can&apos;t record unless they have a qualifying Google One plan.
        </li>
        <li>
          <strong>Copy it out before you leave.</strong> Free and reliable, as long as you remember,
          and you never remember on the call where it mattered.
        </li>
        <li>
          <strong>Use an extension that stores the chat.</strong> This is what I build (I make
          Better Chat, a Chrome extension for this). It keeps chat history per meeting link, so a
          reload or a late join shows everything sent so far, and a recurring meeting on the same
          link keeps its chat. The catch you should know about: the extra chat is only visible to
          people in the call who also have Better Chat. Everyone else sees each message in
          Meet&apos;s own chat as plain text, with the same disappearing behaviour.
        </li>
      </ol>
      <p>
        If you&apos;re on a Business or Enterprise plan and your meetings are scheduled in Calendar
        with internal people, Google&apos;s continuous meeting chat is probably all you need, and
        it&apos;s already included in what you pay. The gaps are personal accounts, Education,
        instant meetings and external guests. That&apos;s where the chat still resets every time the
        call does.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
