/* eslint-disable @next/next/no-img-element */
import { A, Faq, Figure, Table, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "save-google-meet-chat",
  title: "How to Save Google Meet Chat After the Meeting Ends",
  headline: "How to save Google Meet chat after the meeting ends",
  description:
    "Four ways to save Google Meet chat: recording, continuous meeting chat, copying it out, or an extension. Which plans support each, and what every option misses.",
  kicker: "how-to",
  publishDate: "2026-10-30",
  readingMin: 6,
  keywords: [
    "save google meet chat",
    "export google meet chat",
    "google meet chat log",
    "google meet recording chat",
  ],
  faq: [
    {
      q: "Where is the Google Meet chat saved when you record?",
      a: "If continuous meeting chat is off, Meet saves the chat as an .SBV file in the meeting organizer's Google Drive, in the Google Meet folder next to the recording. If continuous meeting chat is on, no .SBV file is created, because the conversation lives in Google Chat instead.",
    },
    {
      q: "Can I save Google Meet chat on a free Gmail account?",
      a: "Not with Google's built-in tools in most cases. Free personal accounts can't record unless they have a Google One plan with 2 TB or more, and continuous meeting chat isn't listed for personal accounts. That leaves copying the chat before you leave, or a browser extension that stores it.",
    },
    {
      q: "Does a Google Meet transcript include the chat?",
      a: "No. Google's transcript help page says only the spoken words in a meeting are included in the transcript. Chat messages need to be saved separately, through the recording's chat log, continuous meeting chat, or an extension.",
    },
    {
      q: "Is there a way to export Google Meet chat to a file?",
      a: "The recording's .SBV chat log is a file you can open in any text editor. Some Chrome extensions also export chat; Meeting Chat Saver, for example, lists TXT, Markdown, CSV, HTML and JSON export on its store page. Better Chat keeps chat history per meeting link but does not export chat.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        I make a Chrome extension whose main job is keeping Google Meet chat around, so I&apos;ve
        read every Google page on saving Meet chat, and plenty of people don&apos;t need my
        extension at all. Depending on your Google plan, you might already have a way that costs
        nothing. Here are all
        four options I know of, with what each one actually keeps.
      </p>

      <Takeaway>
        If continuous meeting chat is on (Business, Enterprise and Frontline plans, Calendar-scheduled
        meetings), the chat already stays in Google Chat after the call. Otherwise, recording the
        meeting saves the chat as an .SBV file in the organizer&apos;s Drive, if your account can
        record. Free Gmail accounts usually can&apos;t do either, so the choices there are copying
        the chat before you leave or using an extension.
      </Takeaway>

      <h2>Option 1: does continuous meeting chat already save it?</h2>
      <p>
        Check this first, because if you have it, you&apos;re done. Since Google rolled out{" "}
        <A href="https://workspaceupdates.googleblog.com/2025/11/continue-conversations-google-chat-google-meet.html">
          continuous meeting chat
        </A>
        , in-meeting messages on eligible plans are stored in a Google Chat conversation tied to the
        Calendar event. You open Google Chat after the call and the messages are there. In March
        2026 Google added a{" "}
        <A href="https://workspaceupdates.googleblog.com/2026/03/introducing-new-meetings-section-in-Google-Chat.html">
          Meetings section
        </A>{" "}
        to Chat that collects these conversations after the meeting ends. It&apos;s off by default,
        so turn it on if you want them grouped in one place.
      </p>
      <p>
        The limits, all from Google&apos;s{" "}
        <A href="https://support.google.com/meet/answer/9308979?hl=en">help page</A>: it only covers
        Business, Enterprise and Frontline editions, it doesn&apos;t apply to instant meetings,
        meetings with waiting rooms or breakout rooms, and external guests only see the chat while
        they&apos;re in the call. I wrote more about{" "}
        <A href="/blog/google-meet-chat-disappears">why Meet chat disappears for everyone else</A>.
      </p>

      <h2>Option 2: can you save Meet chat by recording?</h2>
      <p>
        Yes, when continuous meeting chat is off. Google&apos;s{" "}
        <A href="https://support.google.com/meet/answer/9308681?hl=en">recording help page</A> says
        chats are saved as .SBV files in the meeting organizer&apos;s Drive, in the Google Meet
        folder, and the log covers the whole recording. When continuous chat is on, no .SBV file is
        created.
      </p>
      <p>
        Recording has its own gatekeeping, though. It needs a qualifying Workspace edition (Business
        Standard and Plus, Enterprise editions, Education Plus for staff, Workspace Individual and a
        few others), or a Google One plan with 2 TB or more for personal accounts. An admin has to
        allow it, and someone with permission has to hit record before the messages you care about
        get sent. Messages from before the recording started aren&apos;t in the log.
      </p>

      <h2>Option 3: copy the chat before you leave</h2>
      <p>
        Open the chat panel, select the messages, paste them into a doc. It works on every account
        and costs nothing. It also only works if you remember before you close the tab, and only
        covers what you can see, so if you joined late you&apos;re copying half the conversation.
        Someone on Hacker News once said that almost nobody they knew{" "}
        <A href="https://news.ycombinator.com/item?id=24195130">
          used Meet chat for anything except sharing a link
        </A>
        , because it would be lost once the meeting was over.
      </p>

      <h2>Option 4: use a Chrome extension that stores the chat</h2>
      <p>
        Extensions can read the chat while you&apos;re in the call and keep it somewhere that
        outlives the tab. They work differently, so it&apos;s worth knowing what each one stores and
        where. Here are the ones I found on the Chrome Web Store, with what their own listings say
        (checked October 25, 2026):
      </p>
      <Table
        head={["Extension", "How it keeps chat", "Export", "Price"]}
        rows={[
          [
            <A key="bc" href="https://chromewebstore.google.com/detail/better-chat-chat-power-up/bfmgohplnhblcajmjhmcimjlikohiomh">
              Better Chat
            </A>,
            "Its own chat layer, stored on Better Chat's servers per meeting link; shows the last 22 hours",
            "Chat: no. Captions: .txt",
            "30-day free trial, then $9.99/mo or $7.99/mo billed yearly",
          ],
          [
            <A key="ms" href="https://chromewebstore.google.com/detail/meetsaver-%E2%80%93-save-google-m/keoflebbbfemdfgggclhimpfcnnckpmk">
              MeetSaver
            </A>,
            "Saves Meet's chat locally, collects links",
            "Not stated",
            "Not listed",
          ],
          [
            <A key="mcs" href="https://chromewebstore.google.com/detail/meeting-chat-saver-%E2%80%94-chat/ojpbkhnnhbplmkhlpkkjkkbjpagheglg">
              Meeting Chat Saver
            </A>,
            "Saves Meet's chat per meeting link, splits recurring meetings into sessions",
            "TXT, Markdown, CSV, HTML, JSON",
            "Not listed",
          ],
        ]}
      />
      <p>
        Bias disclosed: I make Better Chat. It works a little differently from the other two.
        Instead of saving Meet&apos;s own chat, it adds a chat layer with replies, reactions and file
        sharing, and stores that per meeting link, so a late joiner or someone who reloads sees the
        last 22 hours of chat for that link. The tradeoff is that only people who also run Better
        Chat see that
        layer; everyone else gets each message mirrored into Meet&apos;s chat as plain text. If all
        you want is a personal copy of the chat in a file, Meeting Chat Saver&apos;s export list is
        better than mine, since Better Chat doesn&apos;t export chat at all.
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

      <h2>Which option should you use?</h2>
      <Table
        head={["Your setup", "Best option"]}
        rows={[
          ["Business or Enterprise plan, scheduled internal meetings", "Continuous meeting chat (already on)"],
          ["Plan that can record, one-off important meeting", "Record it; the chat log lands in Drive"],
          ["Free Gmail, you just need a copy", "Copy before leaving, or a saver extension with export"],
          ["Calls where late joiners or reloads need what was already sent", "An extension that stores chat per meeting link"],
        ]}
      />
      <p>
        One thing that trips people up: a Meet transcript won&apos;t save the chat for you. Google&apos;s{" "}
        <A href="https://support.google.com/meet/answer/12849897?hl=en">transcript help page</A> says
        only the spoken words are included, so if the chat matters, pick one of the four options
        above as well.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
