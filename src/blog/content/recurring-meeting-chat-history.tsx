import { A, Faq, Table, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "recurring-meeting-chat-history",
  title: "Recurring Google Meet Chat: Keep It Week to Week",
  headline: "Does a recurring Google Meet keep last week's chat?",
  description:
    "Recurring Google Meet chat doesn't carry over by default. What continuous meeting chat does with weekly events, and how to keep one record across meetings.",
  kicker: "meet chat",
  publishDate: "2026-11-15",
  readingMin: 5,
  keywords: [
    "recurring google meet chat",
    "google meet recurring meeting chat history",
    "weekly meeting chat google meet",
    "google meet chat previous meeting",
  ],
  faq: [
    {
      q: "Can I see chat from a previous recurring Google Meet?",
      a: "Only if continuous meeting chat was on, or the meeting was recorded. With continuous chat, Google creates a separate Meeting Conversation in Google Chat for each instance, named after the event and date, so you open last week's conversation in Chat. Without it, the classic chat cleared when everyone left.",
    },
    {
      q: "Does a recurring Google Meet use the same link every week?",
      a: "Check your own invite. I couldn't find a Google page that promises every instance of a recurring event shares one link. Google does say a Calendar meeting code only expires after 60 days unused with no future events attached, so a weekly series with a fixed link keeps it.",
    },
    {
      q: "Where do continuous meeting chat conversations go after a recurring meeting?",
      a: "Google says each Meeting Conversation sits under Direct Messages in your Google Chat list by default. Since March 2026 you can turn on a Meetings section in Google Chat that groups these conversations after the meeting ends. It's opt-in, so it won't appear until you enable it.",
    },
    {
      q: "What is the simplest way to keep notes across weekly meetings?",
      a: "One running Google Doc for the whole series, linked from the Calendar event, with a dated section per meeting. It works on every account, nobody needs to install anything, and it isn't tied to the call. Chat history works best as an extra on top of the doc.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        I make a Chrome extension that keeps Google Meet chat per meeting link, so I read
        Google&apos;s help page on continuous meeting chat looking for one answer: what happens to
        recurring Google Meet chat from one week to the next. It surprised me a little. Even on the
        plans that keep chat, each week gets its own conversation.
      </p>

      <Takeaway>
        Without continuous meeting chat, nothing carries over between instances of a recurring
        Google Meet: each meeting starts with an empty chat. With continuous meeting chat (Business,
        Enterprise, Enterprise Essentials and Frontline plans), Google keeps the messages, but it
        creates a separate Meeting Conversation in Google Chat for every instance of a recurring
        Calendar event, named after the event and its date.
      </Takeaway>

      <h2>What happens to chat in a recurring meeting without continuous chat?</h2>
      <p>
        It&apos;s gone after every meeting. Google&apos;s{" "}
        <A href="https://support.google.com/meet/answer/9308979?hl=en">Meet chat help page</A> says
        messages sent before you join don&apos;t display and all messages disappear when you leave.
        A recurring Calendar event doesn&apos;t change that. Monday&apos;s standup chat is empty on
        Tuesday, and so is the doc link someone pasted on Monday.
      </p>
      <p>
        The one built-in way to keep the classic chat is recording, which saves a chat log per
        recording to the organizer&apos;s Drive, if your account can record at all. I went through
        who loses chat and who keeps it in{" "}
        <A href="/blog/google-meet-chat-disappears">why Google Meet chat disappears</A>.
      </p>

      <h2>Does continuous meeting chat carry over between recurring meetings?</h2>
      <p>
        It keeps every week, but separately. The same help page says that for recurring events in
        Calendar, a separate Meeting Conversation is created for each instance, and the name combines
        the event name and date. Google&apos;s own example is &quot;Sales Team Weekly - Nov 8&quot;
        followed by &quot;Sales Team Weekly - Nov 15&quot;. By default these sit under Direct
        Messages in Google Chat.
      </p>
      <p>
        So when someone asks for the link from two weeks ago, the answer is to open Google Chat and
        scroll to the right dated conversation. That&apos;s tidy as an archive and a little awkward
        as a working space, since the call itself only shows this week&apos;s conversation. Google
        added an opt-in{" "}
        <A href="https://workspaceupdates.googleblog.com/2026/03/introducing-new-meetings-section-in-Google-Chat.html">
          Meetings section in Google Chat
        </A>{" "}
        in March 2026 that collects meeting conversations, which makes finding them easier.
      </p>
      <p>
        The usual limits apply: continuous meeting chat skips instant meetings and meetings with
        waiting rooms or breakout rooms, and external guests only see the chat while they&apos;re in
        the call. More on that in{" "}
        <A href="/blog/google-meet-continuous-chat">who gets continuous meeting chat</A>.
      </p>

      <h2>How do you keep one chat across every week of a recurring meeting?</h2>
      <p>Two approaches that work, and a note on extensions.</p>
      <p>
        <strong>Pin a running doc.</strong> One Google Doc for the whole series, linked in the
        Calendar event description, with a dated heading per meeting for the agenda, decisions and
        links. It works on every account, you can share it with external guests, and it isn&apos;t tied
        to the call at all. If you do only one thing from this post, do this.
      </p>
      <p>
        <strong>Keep the same meeting link.</strong> Google&apos;s{" "}
        <A href="https://support.google.com/meet/answer/10710509?hl=en">meeting code page</A> says a
        code created in Calendar only expires once it goes 60 days unused and isn&apos;t attached to
        any future events, so an active weekly series won&apos;t lose its link to expiry. I
        couldn&apos;t find a Google page that promises every instance of a recurring event shares
        the same link, so open two of your instances and compare. For the people attending, one link
        means one bookmark.
      </p>
      <p>
        <strong>What an extension can and can&apos;t do here.</strong> I make Better Chat (a Chrome
        extension that keeps Meet chat per meeting link), and it doesn&apos;t solve the
        week-to-week problem either. It stores its chat on its own servers keyed by the meeting code
        and shows the last 22 hours of chat for that link, so a reload or a late join shows what was
        sent so far in that meeting, but last Monday&apos;s messages are gone by this Monday. Only
        people in the call who also run Better Chat see that history; everyone else sees each
        message in Meet&apos;s own chat as plain text. Shared files are deleted a week after upload
        and Better Chat doesn&apos;t export chat, so anything the series needs to remember belongs
        in the running doc.
      </p>

      <h2>Which approach fits your recurring meeting?</h2>
      <Table
        head={["Your meeting", "What I'd use"]}
        rows={[
          [
            "Internal weekly sync on Business or Enterprise, scheduled in Calendar",
            "Continuous meeting chat, plus a running doc",
          ],
          [
            "Client call or lesson with people outside your domain",
            "A running doc they can open between meetings",
          ],
          [
            "Personal accounts or instant meetings with a fixed link",
            "A running doc",
          ],
          [
            "Daily standup where links get re-pasted every morning",
            "Same link every day, plus a running doc with the standing links",
          ],
        ]}
      />
      <p>
        If the chat matters for a specific meeting and you just need a copy, the options in{" "}
        <A href="/blog/save-google-meet-chat">how to save Google Meet chat</A> still apply to each
        instance on its own.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
