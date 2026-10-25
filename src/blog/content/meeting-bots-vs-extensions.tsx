import { A, Faq, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "meeting-bots-vs-extensions",
  title: "Meeting Bot vs Extension: What Belongs in Your Call?",
  headline: "Meeting bot vs extension: should your meeting tool join the call?",
  description:
    "A meeting bot joins your call as a participant everyone sees. An extension runs in your tab. Where each wins, what each costs, and why I chose the extension.",
  kicker: "opinion",
  publishDate: "2026-12-05",
  readingMin: 5,
  keywords: [
    "meeting bot vs extension",
    "meeting bot vs chrome extension",
    "google meet bot",
    "no bot meeting notes",
  ],
  faq: [
    {
      q: "What is the difference between a meeting bot and a browser extension?",
      a: "A meeting bot joins the call as its own participant, so it shows up in the People list and usually has to be admitted. A browser extension runs inside the Meet tab of the person who installed it and doesn't join the call. It works with what that browser tab shows, and only for that person.",
    },
    {
      q: "Can other people in a Google Meet see my Chrome extension?",
      a: "Nothing in Google's docs says an extension appears to others, and it doesn't join the call, so there's no participant to see. But an extension can still act in the meeting. It can post into the chat, for example. Better Chat mirrors each message into Meet's own chat, so others see those messages.",
    },
    {
      q: "When is a meeting bot the better choice?",
      a: "When you can't install anything, or the people who need the notes aren't the ones at the computer. A bot joins from its own connection, so it doesn't depend on any attendee's browser or device. It also fits when your Workspace admin blocks Chrome extensions but has approved a notetaker.",
    },
    {
      q: "Are Chrome extensions safe to use in Google Meet?",
      a: "It depends on the extension. Content scripts run inside the pages they're allowed on and can read and change them, and Chrome lists those sites in the install prompt. Read that prompt, check what the extension says it does with your data, and skip anything asking for far more access than its features need.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        I make Better Chat (a Chrome extension that adds a chat layer to Google Meet), so I made the
        meeting bot vs extension choice once already and picked the extension. That makes me biased,
        so I&apos;ve tried to give the bot its due where it&apos;s the better tool.
      </p>

      <Takeaway>
        A meeting bot joins the call as a participant, so everyone sees it in the People list and
        someone usually has to admit it. An extension runs in the browser tab of the person who
        installed it and doesn&apos;t join the call. Bots win when you can&apos;t install anything
        or need capture that doesn&apos;t depend on one person&apos;s browser. Extensions avoid
        adding a participant, but every user has to install one and trust it with access to the
        page.
      </Takeaway>

      <h2>What&apos;s the difference between a meeting bot and an extension?</h2>
      <p>
        Where the code runs. A bot is a participant. Notetaker vendors document this themselves:{" "}
        <A href="https://guide.fireflies.ai/articles/7098191513">one</A> says its bot is always
        visible in the participant list and has to be admitted if there&apos;s a lobby,{" "}
        <A href="https://www.read.ai/articles/how-to-stop-read-ai-from-joining-my-meetings">
          another
        </A>{" "}
        says its bot asks to join and posts a chat message naming who added it.
      </p>
      <p>
        An extension is code in your browser. Chrome&apos;s docs say{" "}
        <A href="https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts">
          content scripts
        </A>{" "}
        run in the context of web pages and can read and change the page. On Meet, that page is
        your tab: your view of the call, your chat panel, your captions. The extension never takes a
        seat in the meeting.
      </p>

      <h2>Why shouldn&apos;t a bot be the default?</h2>
      <p>
        Because the cost lands on everyone else. One person decides to use a notetaker, and now the
        host has a knock to handle, everyone has an extra name in the People list, and anyone who
        didn&apos;t want it has to ask for it to be removed in front of the group. Google&apos;s own
        docs treat bots as something to filter: its{" "}
        <A href="https://support.google.com/a/users/answer/11989526">Learning Center</A> says
        third-party bots, like note takers, are denied automatically in locked meetings with knocking
        off. I covered those controls in{" "}
        <A href="/blog/stop-ai-notetakers-google-meet">how to stop AI notetaker bots</A>.
      </p>
      <p>
        Compare how Google handles its own capture features. When a meeting is{" "}
        <A href="https://support.google.com/meet/answer/9308681?hl=en">recorded</A>, participants
        get a notification and late joiners get a warning. With{" "}
        <A href="https://support.google.com/meet/answer/12849897?hl=en">transcripts</A> on, a
        Transcripts icon shows at the top right for everyone. When Gemini{" "}
        <A href="https://support.google.com/meet/answer/14754931">takes notes</A>, Meet notifies all
        participants and shows a pencil icon. People find out, and nobody has to admit anything. I
        wrote about which plans get transcripts in{" "}
        <A href="/blog/google-meet-transcript-plans">Google Meet transcript plans</A>.
      </p>

      <h2>When is a bot the better tool?</h2>
      <p>
        When you can&apos;t install anything. A guest on a locked-down laptop, someone joining from a
        phone, a company where the admin{" "}
        <A href="https://support.google.com/chrome/a/answer/6177431">blocks Chrome extensions</A>{" "}
        and allows only an approved list: an extension does nothing for any of them. A bot only needs
        to be let in.
      </p>
      <p>
        And when the capture shouldn&apos;t depend on one person. A bot joins from its own
        connection, so it doesn&apos;t rely on the browser of whoever added it. An extension sees
        what one browser tab shows, and when that tab closes, it stops. If you need audio from every
        meeting your team runs, whoever happens to attend, a bot fits better.
      </p>

      <h2>What do extensions cost you?</h2>
      <p>
        Every person has to install it. If I want something in my own call, that&apos;s fine. If I
        want a shared feature, everyone who wants it needs the same extension. Better Chat has this
        limit: its extra chat is only visible to other Better Chat users in the call.
      </p>
      <p>
        Then there&apos;s trust, which is the bigger cost. An extension with access to Meet can
        read the page, and during a call that page has names, chat and captions on it. Chrome shows the sites an extension&apos;s
        content scripts run on in the install prompt, per the{" "}
        <A href="https://chromium.googlesource.com/chromium/src/+/HEAD/extensions/docs/security_faq.md">
          Chromium security FAQ
        </A>
        , so read that prompt before you click Add, and check the permissions against what the
        extension says it does.
      </p>
      <p>
        I also wouldn&apos;t call an extension invisible. I can&apos;t point to a Google doc that
        says other participants can&apos;t detect one; my reasoning is just that it runs in your tab
        and never joins the call. And an extension can still act where others see it. Better Chat
        posts each message into Meet&apos;s own chat as plain text, so people without it still read
        what was said.
      </p>

      <h2>Does the market agree?</h2>
      <p>
        Some notetaker makers seem to. Tactiq&apos;s <A href="https://tactiq.io/">site</A> says no
        bot joins the call, and Scribbl&apos;s{" "}
        <A href="https://chromewebstore.google.com/detail/scribbl-ai-note-taker-for/kmjmlilenakedodldceipdnmmnfkahni">
          store listing
        </A>{" "}
        promises notes with no bot in the call. When companies that sell AI notes market the missing
        bot as a feature, I take that as a sign people noticed the cost. I compared one of them with
        Better Chat in <A href="/blog/tactiq-vs-better-chat">Tactiq vs Better Chat</A>; they do
        different jobs.
      </p>
      <p>
        For what I build, the extension was the obvious pick. Better Chat is a chat layer, and a
        chat layer that needed its own participant would be an odd thing to ask a host to admit. No
        bot joins your call. If what you need is a recording of every meeting your team holds, the
        trade goes the other way, and I&apos;d use the bot.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
