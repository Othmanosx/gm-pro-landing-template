/* eslint-disable @next/next/no-img-element */
import { A, Faq, Figure, Table, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "google-meet-reactions",
  title: "Google Meet Reactions: Video Tiles, Emoji and Chat",
  headline: "Google Meet reactions: which ones you get, and on which plan",
  description:
    "Google Meet reactions come in three kinds: tile reactions for everyone, the full emoji library on some plans, and chat message reactions with continuous chat.",
  kicker: "meet chat",
  publishDate: "2026-11-13",
  readingMin: 5,
  keywords: [
    "google meet reactions",
    "google meet emoji reactions",
    "react to a message in google meet chat",
    "google meet reactions not showing",
  ],
  faq: [
    {
      q: "Why don't I see emoji reactions in my Google Meet call?",
      a: "Reactions are on by default, but Google's announcement says admins can turn them off in the Admin console and hosts can turn them off for a single meeting. If the smile icon is missing from the control bar, check with the host first, then with your Workspace admin if you're on a work account.",
    },
    {
      q: "Can I use any emoji as a reaction in Google Meet?",
      a: "Only on some plans. Google opened the full emoji library for Meet reactions in November 2025 for Business Standard and Plus, and Enterprise Standard and Plus. The announcement doesn't list personal accounts or other editions, which keep the smaller default set of reactions that every account has had since 2023.",
    },
    {
      q: "Can you react to a specific chat message in Google Meet?",
      a: "Natively, only with continuous meeting chat. Google's help page says text formatting, @mentions and reactions in the chat are only available when continuous chat is on, which means Business, Enterprise and Frontline plans in Calendar-scheduled meetings. The classic in-call chat has no message reactions in Google's documentation.",
    },
    {
      q: "Do personal Gmail accounts get Google Meet reactions?",
      a: "Yes, the video-tile kind. Google's January 2023 announcement made in-meeting reactions available to all Workspace customers and to personal Google accounts. Personal accounts aren't listed for the full emoji library or for continuous meeting chat, so reacting to individual chat messages isn't available natively on Gmail.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        &quot;No way to react or reply properly&quot; was one of the three Meet problems I listed
        when I launched my extension on{" "}
        <A href="https://news.ycombinator.com/item?id=43440772">Hacker News in March 2025</A>. Since
        then Google has added more reactions, but &quot;Google Meet reactions&quot; now means three
        different features with three different plan lists, and it&apos;s easy to look for the
        wrong one.
      </p>

      <Takeaway>
        Every Google Meet account, personal Gmail included, can send quick emoji reactions that pop
        up on your video tile. Business Standard and Plus and Enterprise Standard and Plus also get
        the full emoji library for those reactions. Reacting to a specific chat message is only
        built in when continuous meeting chat is on, which leaves out personal accounts, Education
        plans and instant meetings.
      </Takeaway>

      <h2>What are the three kinds of Google Meet reactions?</h2>
      <Table
        head={["Reaction type", "Since", "Who gets it"]}
        rows={[
          ["Emoji on your video tile", "January 2023", "All Workspace and personal accounts"],
          ["Full emoji library for tile reactions", "November 2025", "Business Standard/Plus, Enterprise Standard/Plus"],
          ["Reactions on a chat message", "With continuous chat (rolled out from December 2025)", "Business, Enterprise, Frontline, scheduled meetings"],
        ]}
      />

      <h2>How do video-tile reactions work?</h2>
      <p>
        Google{" "}
        <A href="https://workspaceupdates.googleblog.com/2023/01/in-meeting-reactions-for-google-meet.html">
          launched in-meeting reactions in January 2023
        </A>
        . You open the reaction bar from the smile icon, pick an emoji, and it shows as a small badge
        on your video tile and floats up the left side of the screen. When several people react at
        once you get a burst of them. You can set a skin tone by hovering over the bar. They were on
        by default for everyone, personal Google accounts included, on the web, Meet hardware and
        iOS, with Android listed as coming soon at the time.
      </p>
      <p>
        If you can&apos;t find them: admins can turn reactions off in the Admin console, and hosts
        can turn them off for a meeting.
      </p>
      <p>
        I like them for the small stuff: a thumbs up instead of unmuting to say &quot;yep&quot;, a
        quick show of hands, applause at the end of a demo. What they can&apos;t do is point at
        anything. A tile reaction says how you feel about the room right now, not about the link
        someone pasted two minutes ago or the question a student typed into chat. For that you
        need reactions on the message itself.
      </p>

      <h2>Who gets the full emoji library?</h2>
      <p>
        In November 2025 Google{" "}
        <A href="https://workspaceupdates.googleblog.com/2025/11/more-emoji-reactions-google-meet.html">
          opened the full emoji library
        </A>{" "}
        for Meet reactions. The announcement lists Business Standard and Plus, and Enterprise
        Standard and Plus. It reached Rapid Release domains from November 19, 2025 and Scheduled
        Release domains from December 9. Personal accounts and other editions aren&apos;t
        mentioned, so they keep the default set.
      </p>

      <h2>Can you react to a specific chat message in Meet?</h2>
      <p>
        Only through continuous meeting chat. Google&apos;s{" "}
        <A href="https://support.google.com/meet/answer/9308979?hl=en">Meet chat help page</A> says
        text formatting, @mentions and reactions in the chat are only available when continuous chat
        is on. That&apos;s the Google Chat-powered chat on Business, Enterprise, Enterprise
        Essentials and Frontline plans, in meetings scheduled in Calendar. Instant meetings,
        meetings with waiting rooms and breakout rooms don&apos;t get it, and external guests only
        see the chat while they&apos;re in the call. I went through all of that in{" "}
        <A href="/blog/google-meet-continuous-chat">who gets continuous meeting chat</A>.
      </p>
      <p>
        Everyone else is on the classic chat, and I couldn&apos;t find message reactions or replies
        to a specific message documented for it in Google&apos;s help page. You can react to the
        room with a tile reaction, but not to the message where someone pasted the link. And that
        chat clears when you leave, as I covered in{" "}
        <A href="/blog/google-meet-chat-disappears">why Google Meet chat disappears</A>.
      </p>

      <h2>How do you get message reactions without continuous chat?</h2>
      <p>
        This is one of the things I built Better Chat for (I make Better Chat, a Chrome extension
        that adds a chat layer to Google Meet). It adds emoji reactions and replies on individual
        messages, on any account, including personal Gmail and instant meetings, and it keeps the
        chat per meeting link so a reload doesn&apos;t clear it.
      </p>
      <p>
        The catch: reactions and replies only show for people in
        the call who also run Better Chat. Everyone else sees each message in Meet&apos;s own chat
        as plain text, and they won&apos;t see who reacted to what.
      </p>
      <Figure caption="Better Chat's chat panel next to a Meet call, from its Chrome Web Store listing.">
        <img
          src="https://lh3.googleusercontent.com/Vn3qQlegazqzvJlriBP3j1RUJfQVaIqMScbKqIf8RWum_tydkntTMiFo24WUsnHT3XbzgXGV9H7zSneOcjFDm5Aw=s1280-w1280-h800"
          alt="Better Chat chat panel beside a Google Meet video grid, showing messages with emoji reactions"
          width={1280}
          height={800}
          loading="lazy"
        />
      </Figure>
      <p>
        If your team is on Business or Enterprise and meets in scheduled Calendar events, turn on
        continuous chat and use Google&apos;s reactions. Everyone in the meeting from your
        organization sees them, and you don&apos;t need anyone to install anything. An extension
        makes sense for personal accounts, Education plans, instant meetings, or a small recurring
        group where everyone is happy to install the same thing.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
