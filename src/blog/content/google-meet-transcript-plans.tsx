import { A, Faq, Table, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "google-meet-transcript-plans",
  title: "Google Meet Transcript: Which Plans Save One to Drive",
  headline: "Which Google Meet plans can save a transcript?",
  description:
    "Google Meet transcripts save to Drive only on some Workspace plans. Which plans, which languages and devices, what's left out, and what everyone else can do.",
  kicker: "captions",
  publishDate: "2026-11-07",
  readingMin: 5,
  keywords: [
    "google meet transcript",
    "google meet transcript plans",
    "google meet transcript free account",
    "where are google meet transcripts saved",
  ],
  faq: [
    {
      q: "Can a free Gmail account get Google Meet transcripts?",
      a: "Google's transcripts help page only lists Workspace editions: Business Standard and Plus, Enterprise Starter, Standard and Plus, Education Plus, Teaching and Learning Upgrade, and Workspace Individual. Personal Google accounts aren't on that list, so a free Gmail account can use live captions and caption history but not saved transcripts.",
    },
    {
      q: "Where are Google Meet transcripts saved?",
      a: "In the meeting organizer's Google Drive, in the Google Meet folder, with a sub-folder per meeting. Google also emails a link to the host, any co-hosts and the person who turned transcripts on, and attaches the transcript to the meeting's Calendar event. It needs enough Drive space to save.",
    },
    {
      q: "Does a Google Meet transcript include the chat?",
      a: "No. Google's help page says only the spoken words in a meeting are included in the transcript. To keep the chat, Google suggests recording the meeting, which saves a chat file when continuous meeting chat is off. With continuous meeting chat on, the messages stay in Google Chat instead.",
    },
    {
      q: "Can I start a Google Meet transcript from my phone?",
      a: "Only on Android. Google's transcripts help page says you can use transcripts on a computer, laptop, or Android device. iPhone and iPad aren't listed. Who can start one also depends on host management: when it's on, only the host and co-hosts can turn transcripts on.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        I build a Chrome extension for Google Meet, and part of it keeps Meet&apos;s captions so you
        can read them back, so the obvious question is whether Meet already does transcripts. It
        does, on some plans. Here&apos;s the plan list from Google&apos;s own
        help page, plus what the Google Meet transcript leaves out and what you can do if your
        account doesn&apos;t have it.
      </p>

      <Takeaway>
        Google Meet transcripts are saved to the organizer&apos;s Google Drive on Business Standard
        and Plus, Enterprise Starter, Standard and Plus, Education Plus, Teaching and Learning
        Upgrade, and Workspace Individual. They cover spoken words only, not the chat, in eight
        languages, and you start them from a computer or Android device. Personal Google accounts
        don&apos;t get them; caption history is the closest built-in option there.
      </Takeaway>

      <h2>Which Google Workspace plans include Meet transcripts?</h2>
      <p>
        From Google&apos;s{" "}
        <A href="https://support.google.com/meet/answer/12849897?hl=en">transcripts help page</A>:
      </p>
      <Table
        head={["Plan", "Meet transcripts"]}
        rows={[
          ["Business Standard, Business Plus", "Yes"],
          ["Enterprise Starter, Standard, Plus", "Yes"],
          ["Education Plus, Teaching and Learning Upgrade", "Yes"],
          ["Workspace Individual", "Yes"],
          ["Business Starter", "Not listed"],
          ["Other Education editions", "Not listed"],
          ["Personal Google accounts (Gmail)", "Not listed"],
        ]}
      />
      <p>
        &quot;Not listed&quot; is my wording for plans the page doesn&apos;t mention. Google adds
        editions over time, so if you&apos;re on the edge, check the page.
      </p>

      <h2>Where does the transcript go, and who gets it?</h2>
      <p>
        Transcripts land in the meeting organizer&apos;s Drive, in the &quot;Google Meet&quot;
        folder, with a sub-folder for each meeting. Google emails a link to the host, any co-hosts
        and whoever turned the transcript on, and attaches it to the Calendar event. Who can turn it
        on depends on host management: with it off, anyone from the host&apos;s domain can start a
        transcript, and with it on, only the host and co-hosts can.
      </p>
      <p>
        So if you&apos;re a guest in someone else&apos;s meeting, the transcript is theirs. It sits
        in their Drive, not yours. Two more practical details from the same page: hosts can set
        transcripts to start automatically, so nobody has to remember to press the button, and the
        organizer needs enough Drive space for the file to save.
      </p>

      <h2>What languages and devices do Meet transcripts support?</h2>
      <p>
        Eight languages: English, French, German, Italian, Japanese, Korean, Portuguese and Spanish.
        Live captions cover more languages than that, so a call you can caption may not be one you
        can transcribe. On devices, the help page says transcripts work on a computer, laptop or
        Android device. iPhone and iPad aren&apos;t mentioned. So if you teach in a language outside
        those eight, or you take most calls from an iPad, a paid plan with transcripts still
        won&apos;t give you one, and caption history is what you&apos;re left with.
      </p>

      <h2>Does the Google Meet transcript include the chat?</h2>
      <p>
        No. The help page says only the spoken words are included,
        and points you to recording if you want the chat. That only works when continuous meeting
        chat is off. I wrote up{" "}
        <A href="/blog/save-google-meet-chat">every way to save Meet chat</A> separately, because
        it&apos;s its own problem. People have wanted both for a long time: in 2021 someone on HN
        was{" "}
        <A href="https://news.ycombinator.com/item?id=28057969">
          asking for a way to save Meet chat and transcription
        </A>
        .
      </p>

      <h2>How does a transcript compare to caption history?</h2>
      <Table
        head={["Feature", "Caption history", "Meet transcript"]}
        rows={[
          ["Accounts", "Every account, personal included", "Listed Workspace plans only"],
          ["What you see", "Last 30 minutes, during the call", "A saved file, after the call"],
          ["Where it lives", "Your caption panel, only for you", "Organizer's Drive, Google Meet folder"],
          ["Chat included", "No", "No"],
        ]}
      />

      <h2>What can you do without a transcript plan?</h2>
      <p>If your account isn&apos;t on the list, here are the realistic options.</p>
      <ol>
        <li>
          <strong>Caption history.</strong> Every account, personal ones included, can scroll back
          through the last 30 minutes of captions during the call. Nothing is kept after you leave.
          I covered how it works in{" "}
          <A href="/blog/google-meet-caption-history">Google Meet caption history</A>.
        </li>
        <li>
          <strong>Record the meeting, if you can.</strong> Google&apos;s{" "}
          <A href="https://support.google.com/meet/answer/9308681?hl=en">recording help page</A>{" "}
          lists a slightly different set of editions, and personal accounts only qualify with a
          Google One plan of 2 TB or more. You get the video, plus the chat log when continuous chat
          is off.
        </li>
        <li>
          <strong>Use an extension that keeps the captions.</strong> This is the part I build (I
          make Better Chat, a Chrome extension for Google Meet). Its captions tab turns on
          Meet&apos;s captions, collects them for the whole call, keeps them in your browser per
          meeting link for 22 hours so a reload doesn&apos;t wipe them, and downloads them as a .txt
          file.
          It&apos;s built on Meet&apos;s captions, so languages and accuracy are Google&apos;s, and
          no bot joins the call.
        </li>
      </ol>
      <p>
        If your organization already pays for Business Standard or above, use Google&apos;s
        transcripts. They go to the organizer&apos;s Drive, get attached to the Calendar event, and
        you don&apos;t need anything extra. The extension route is for personal accounts, Business Starter, and anyone
        who wants their own copy of the captions instead of waiting for the organizer to share one.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
