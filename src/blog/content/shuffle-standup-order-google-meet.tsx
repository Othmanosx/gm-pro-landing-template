import { A, Faq, Table, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "shuffle-standup-order-google-meet",
  title: "Google Meet Shuffle: Random Standup Speaking Order",
  headline: "How do you shuffle participants in a Google Meet standup?",
  description:
    "Google Meet has no documented way to shuffle participants. Get a random standup speaking order with a spreadsheet, a single-purpose extension, or Better Chat.",
  kicker: "how-to",
  publishDate: "2026-11-25",
  readingMin: 5,
  keywords: [
    "google meet shuffle participants",
    "google meet random order",
    "standup speaking order google meet",
    "google meet random name picker",
  ],
  faq: [
    {
      q: "Can Google Meet shuffle the participant list?",
      a: "I couldn't find a built-in shuffler in Google's help pages for Meet. To get a random speaking order you either randomize the names yourself, in a spreadsheet or a random-order tool, and paste the result into chat, or use a Chrome extension that reads the participant list and posts a shuffled version.",
    },
    {
      q: "How do I randomize a list of names in Google Sheets?",
      a: "Put the names in column A, type =RAND() in column B next to each one, then sort the range by column B. RAND returns a random number between 0 and 1, so the sort gives a random order. Copy column A and paste it into the Meet chat before the first person speaks.",
    },
    {
      q: "What happens when someone joins the standup late?",
      a: "With a list you made by hand, you add them at the end. The Shuffler extension's listing says late attendees are added to the bottom of its list. Better Chat's auto mode adds a late joiner to the bottom and reposts the list.",
    },
    {
      q: "Does everyone need the extension to see the shuffled order?",
      a: "Not for the order itself. Both Shuffler and Better Chat post the list into Meet's chat, which everyone in the call can read. Better Chat's own chat layer, with replies and history, is only visible to other people who run Better Chat; the plain-text list in Meet's chat is visible to all.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        I make Better Chat (a Chrome extension that adds a chat layer to Google Meet), which has a
        participant shuffler, so I checked Google&apos;s help pages for a native one first. For
        shuffling participants in Google Meet, I couldn&apos;t find anything. So this post covers
        the three ways I know to
        get a random standup order, one of which is mine.
      </p>

      <Takeaway>
        Google Meet has no documented way to shuffle participants or pick a random speaker; I
        couldn&apos;t find one in Google&apos;s help pages. For a random standup order you can paste
        names into a spreadsheet, sort by =RAND() and post the result in chat, or use a Chrome
        extension that does it inside the call. Shuffler is a small single-purpose extension for
        this, and Better Chat includes a shuffler with a random picker and automatic reposting when
        someone joins.
      </Takeaway>

      <h2>Why shuffle the speaking order in a standup?</h2>
      <p>
        My opinion, nothing more scientific: a fixed order goes stale. If the same person always
        opens, they carry the energy of every standup, and whoever always goes last gives their
        update when people are already thinking about their next task. Shuffling spreads that
        around. It also removes the pause after each update where everyone waits to see who goes
        next, because the order is right there in chat.
      </p>
      <p>
        It isn&apos;t a fix for a standup that runs too long.
      </p>

      <h2>Does Google Meet have a built-in shuffle?</h2>
      <p>
        Not that I could find in Google&apos;s docs. Meet shows you the participant list, but I
        didn&apos;t find a help page about randomizing it or picking a random person. If you run the
        standup on Meet, the randomness has to come from somewhere else.
      </p>

      <h2>How do you shuffle names without an extension?</h2>
      <p>
        Paste the names into a spreadsheet and let it sort them. In Google Sheets, put names in
        column A, type <code>=RAND()</code> next to each one in column B, and sort by column B.
        Google&apos;s{" "}
        <A href="https://support.google.com/docs/answer/3093438?hl=en">RAND help page</A> says it
        returns a random number from 0 up to (but not including) 1, so the sort comes out random.
        Copy column A into Meet&apos;s chat at the start of the call. Any random-order list tool on
        the web does the same job.
      </p>
      <p>
        This costs nothing and works on every account. The downsides are the copy and paste before
        each standup, keeping the name list up to date, and someone joining late who isn&apos;t on
        the list.
      </p>

      <h2>Which extensions shuffle Google Meet participants?</h2>
      <p>Two I know of, from their Chrome Web Store listings (checked October 25, 2026):</p>
      <Table
        head={["", "Shuffler", "Better Chat"]}
        rows={[
          ["Posts a shuffled list to Meet's chat", "Yes", "Yes"],
          ["Pick random people", "Yes, /pick 5 picks five", "Yes, picks one participant"],
          ["Late joiners", "Added to the bottom of the list", "Auto mode adds them to the bottom and reposts"],
          ["Other features", "None, single purpose", "Chat history per link, reactions, files, auto-mute and more"],
          ["Store listing", "41 users, 5.0 from 1 rating", "137 users, 5.0 from 3 ratings"],
        ]}
      />
      <p>
        <A href="https://chromewebstore.google.com/detail/shuffler/jngfijifagfaodogikflbmchnfifpfmm">
          Shuffler
        </A>{" "}
        is built for exactly this. Its listing says it posts the meeting&apos;s attendees to chat in
        random order for stand-up ordering, and you drive it from the chat box: /shuffler shuffles
        again, /relist prints the list again, and /pick followed by a number picks that many people
        at random. If a random order is all you need, it&apos;s the focused choice, and I&apos;d
        start there.
      </p>
      <p>
        Bias disclosed: I make{" "}
        <A href="https://chromewebstore.google.com/detail/better-chat-chat-power-up/bfmgohplnhblcajmjhmcimjlikohiomh">
          Better Chat
        </A>
        . Its shuffler shuffles the
        participant list and posts it to chat, both Meet&apos;s chat and Better Chat&apos;s own, and
        can pick one random participant. With auto mode on, it adds anyone who joins late to the
        bottom and reposts the list, so a late joiner doesn&apos;t need to ask where they are in
        the order. Because
        the list lands in Meet&apos;s own chat as plain text, everyone in the call can read it.
        Better Chat&apos;s extra chat layer is only visible to people who also run it.
      </p>
      <p>
        The shuffler is a small part of Better Chat, so it makes sense if your standup also has the
        problem it&apos;s built for: links and questions lost when someone reloads or joins late.
        It keeps the last 22 hours of chat per link, so it won&apos;t carry yesterday&apos;s links
        into today&apos;s standup; for that, see{" "}
        <A href="/blog/recurring-meeting-chat-history">keeping recurring Google Meet chat</A>. If
        you&apos;re comparing broader Meet extensions, the{" "}
        <A href="/blog/google-meet-enhancement-suite-alternatives">
          Enhancement Suite alternatives
        </A>{" "}
        post covers the bigger feature lists.
      </p>

      <h2>Tips for running a shuffled standup</h2>
      <ul>
        <li>Post the order before the first person speaks, so nobody has to remember it.</li>
        <li>
          Let the person who just finished hand off by name to the next one on the list. It keeps
          things moving without the facilitator calling every turn.
        </li>
        <li>
          Ask people to join muted so updates aren&apos;t drowned out by keyboards; the options are
          in{" "}
          <A href="/blog/google-meet-join-muted">how to join Google Meet muted</A>.
        </li>
      </ul>

      <Faq items={meta.faq} />
    </>
  );
}
