import { A, Faq, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "google-meet-caption-history",
  title: "Google Meet Caption History: What It Keeps and Loses",
  headline: "Google Meet caption history: what it keeps, and what it loses",
  description:
    "Google Meet caption history lets you scroll back 30 minutes of captions during a call. What it covers, what it loses after the call, and your other options.",
  kicker: "captions",
  publishDate: "2026-11-05",
  readingMin: 5,
  keywords: [
    "google meet caption history",
    "google meet scroll back captions",
    "google meet captions after meeting",
    "save google meet captions",
  ],
  faq: [
    {
      q: "How far back can you scroll Google Meet captions?",
      a: "Thirty minutes. Google's caption history update lets you scroll back through the last 30 minutes of live and translated captions during a call, then select Jump to the bottom to return to the live text. Anything older than that window is no longer in the caption panel.",
    },
    {
      q: "Can other people see that I turned on captions in Google Meet?",
      a: "Google's live captions help page says captions are turned on only for you. Turning them on doesn't change anything for the other people in the call, and each person who wants captions turns them on for themselves. Caption history works the same way, inside your own view.",
    },
    {
      q: "Are Google Meet captions saved after the meeting?",
      a: "Neither Google's captions help page nor the caption history announcement describes any saved copy of captions after the call. The saved version is a transcript, which some Workspace plans can turn on. It goes to the organizer's Google Drive and only includes spoken words, not the chat.",
    },
    {
      q: "Does caption history work on personal Gmail accounts?",
      a: "Yes. Google's February 2025 announcement says caption history is available for all Google Workspace customers and for users with personal Google accounts, and admins have no setting for it. So a free Gmail account gets the same 30 minutes of scrollback as a paid Workspace plan.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        When I posted my Google Meet extension on{" "}
        <A href="https://news.ycombinator.com/item?id=43440772">Hacker News in March 2025</A>, one of
        my complaints was that Meet&apos;s transcriptions only showed the last few sentences. You
        looked away for a second, the line you needed scrolled off, and that was it. Google was
        fixing that around the same time with caption history, and it&apos;s good. It also stops at
        30 minutes and at the end of the call.
      </p>

      <Takeaway>
        Google Meet caption history lets anyone, on Workspace or a personal Google account, scroll
        back through the last 30 minutes of live and translated captions during a call. Captions are
        only on for you, and Google doesn&apos;t document any way to get them back once you leave.
        If you need a saved text record, that&apos;s a transcript, which only some Workspace plans
        get.
      </Takeaway>

      <h2>What is Google Meet caption history?</h2>
      <p>
        Google{" "}
        <A href="https://workspaceupdates.googleblog.com/2025/02/google-meet-caption-history.html">
          announced caption history in February 2025
        </A>
        . Before it, captions vanished as soon as the next line came in. Now you can scroll back and
        review the last 30 minutes of live and translated captions, then hit &quot;Jump to the
        bottom&quot; to get back to what&apos;s being said right now. It rolled out from February
        18, 2025 for Rapid Release domains and March 6 for Scheduled Release, and it&apos;s
        available to all Workspace customers and personal Google accounts. Admins don&apos;t get a
        switch for it.
      </p>
      <p>
        Google&apos;s{" "}
        <A href="https://support.google.com/meet/answer/15077804?hl=en">live captions help page</A>{" "}
        adds two details worth knowing. Captions are turned on only for you, so nobody else sees
        that you&apos;re using them. And you can scroll up or down to review them, which only covers
        the parts of the call where you were there with captions on.
      </p>
      <p>
        Back in 2020 an{" "}
        <A href="https://news.ycombinator.com/item?id=24948312">HN commenter</A> in a thread about
        captions said they preferred
        running Live Transcribe on a phone over Meet&apos;s captions, because the phone kept a
        history they could look back at. Meet now does a version of that on its own.
      </p>

      <h2>What doesn&apos;t caption history keep?</h2>
      <ul>
        <li>
          <strong>Anything older than 30 minutes.</strong> In an hour-long lesson or a long planning
          call, the first half is out of reach by the end.
        </li>
        <li>
          <strong>Anything after you leave.</strong> Neither Google page mentions keeping captions
          once the call ends. Close the tab, reload because your mic stopped working, or drop off
          the Wi-Fi, and Google doesn&apos;t describe any way to get the earlier captions back. It&apos;s the same pattern as{" "}
          <A href="/blog/google-meet-chat-disappears">Meet&apos;s classic chat disappearing</A> when
          you leave.
        </li>
      </ul>

      <h2>Is a transcript the saved version of captions?</h2>
      <p>
        Pretty much. Google&apos;s{" "}
        <A href="https://support.google.com/meet/answer/12849897?hl=en">transcripts help page</A>{" "}
        says transcripts are saved to the meeting organizer&apos;s Drive, in the &quot;Google
        Meet&quot; folder, and only spoken words are included. The catch is the plan list: Business
        Standard and Plus, Enterprise Starter, Standard and Plus, Education Plus, Teaching and
        Learning Upgrade, and Workspace Individual. Personal Google accounts aren&apos;t on it.
        Transcripts also work in fewer languages than captions (English, French, German, Italian,
        Japanese, Korean, Portuguese and Spanish), and they only run on a computer, laptop or
        Android device.
      </p>
      <p>
        One more thing transcripts skip: the chat. If the links people pasted matter as much as what
        they said, you&apos;ll need{" "}
        <A href="/blog/save-google-meet-chat">a separate way to save the chat</A>.
      </p>

      <h2>When is Google&apos;s built-in caption history enough?</h2>
      <p>
        Most of the time. If you only need to catch a sentence you missed, a name someone
        spelled out, or the number from five minutes ago, caption history does that on every
        account and costs nothing. If you&apos;re on a plan with transcripts and the organizer turns
        them on, you get a saved copy in Drive too. I&apos;d use those before installing anything.
      </p>

      <h2>Where does an extension fit?</h2>
      <p>
        The gaps are calls longer than 30 minutes, reloads in the middle of a call, and personal
        accounts that want a copy of the captions afterwards. That&apos;s what the captions tab in
        my extension is for (I make Better Chat, a Chrome extension for Google Meet). With its
        Transcriptions (Beta) toggle on, it turns on Meet&apos;s captions and collects them in a
        tab you can scroll back through, with no 30-minute cut-off. It stores them in your browser
        per meeting link for 22 hours, so a reload keeps them, and a Download button saves them as
        a .txt file.
      </p>
      <p>
        It&apos;s built on Meet&apos;s own captions, so caption languages and accuracy are
        Google&apos;s, and it only collects what Meet captions while you&apos;re in the call. It
        isn&apos;t an AI notetaker, and no bot joins the call. If you only ever need the last few
        minutes, skip it and use what Meet already gives you.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
