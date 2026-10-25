import { A, Faq, Table, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "google-meet-share-files",
  title: "How to Share Files in Google Meet Chat",
  headline: "How do you share files in Google Meet chat?",
  description:
    "You can share files in Google Meet chat only with continuous meeting chat. What works on each plan, what external guests miss, and why a Drive link is safer.",
  kicker: "how-to",
  publishDate: "2026-11-27",
  readingMin: 5,
  keywords: [
    "google meet share files in chat",
    "send file in google meet chat",
    "google meet chat attachment",
    "share pdf in google meet",
  ],
  faq: [
    {
      q: "Can you attach a file in Google Meet chat?",
      a: "With continuous meeting chat, yes. Google's November 2025 announcement says you can share images and files from inside Meet when continuous chat is on. That covers Business, Enterprise, Enterprise Essentials and Frontline plans in Calendar-scheduled meetings. Google's help page doesn't describe file attachments for the classic in-call chat.",
    },
    {
      q: "Why can't external guests see the image I sent in Meet chat?",
      a: "Google's Meet chat help page says some rich media messages, such as images, video files or custom domain GIFs sent by internal users, may be unavailable for external participants to view. External guests also only see the chat while they're in the call. For files guests need, share a Drive link instead.",
    },
    {
      q: "How do I share a file in Google Meet on a free Gmail account?",
      a: "Put the file in Google Drive, set sharing so the people in the call can open it, and paste the link into the chat. Free personal accounts use the classic chat, which clears when you leave, so send the same link by email or calendar invite if people need it after the call.",
    },
    {
      q: "How big a file can I share with Better Chat?",
      a: "Images up to 25 MB, audio and documents up to 50 MB, and video up to 100 MB. Executables and scripts are blocked. Each user can upload 100 files or 2 GB per calendar month, and uploads are deleted one week after upload, after which the message shows the file as expired.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        The Google Meet extension I make has file sharing, so I&apos;ve read every Google help page
        I could find on sharing files in Meet. The answer to &quot;can I
        share files in Google Meet chat&quot; depends on your plan and the kind of meeting, and for
        anything people need after the call, my advice is the same either way: use a Drive link.
      </p>

      <Takeaway>
        Google Meet lets you share images and files in chat only when continuous meeting chat is on,
        which means Business, Enterprise and Frontline plans in Calendar-scheduled meetings. Even
        then, some images and video files may not reach external guests. On the classic chat that
        personal accounts get, Google doesn&apos;t document attachments, so the reliable way to share
        a file in any Meet call is to put it in Google Drive and paste the link.
      </Takeaway>

      <h2>Can you share files in Google Meet chat?</h2>
      <p>
        Yes, with continuous meeting chat. Google&apos;s{" "}
        <A href="https://workspaceupdates.googleblog.com/2025/11/continue-conversations-google-chat-google-meet.html">
          November 2025 announcement
        </A>{" "}
        says that with Meet chat powered by Google Chat, you can share images and files from inside
        Meet, alongside emoji reactions. It reached Rapid Release domains from December 8, 2025 and
        Scheduled Release domains from March 23, 2026.
      </p>
      <p>
        The usual continuous chat limits apply. Google&apos;s{" "}
        <A href="https://support.google.com/meet/answer/9308979?hl=en">Meet chat help page</A> lists
        it for Business, Enterprise, Enterprise Essentials and Frontline editions, and not for
        instant meetings, meetings with waiting rooms or breakout rooms, live streams or huddles.
        I went through the whole list in{" "}
        <A href="/blog/google-meet-continuous-chat">who gets continuous meeting chat</A>. The
        conversation lives in Google Chat, so it follows your organization&apos;s Chat retention
        rules and Vault like any other Chat conversation, and you can find it there after the call.
      </p>

      <h2>What do external guests see when you share a file?</h2>
      <p>
        Possibly not the file. The same help page says some rich media messages sent by internal
        users, such as images, video files or custom domain GIFs, may be unavailable for external
        participants to view. External guests also only see the chat while they&apos;re in the
        meeting. If you run client calls or lessons with people outside your organization, don&apos;t
        count on an attachment reaching them.
      </p>

      <h2>What about the classic chat on personal accounts?</h2>
      <p>
        Google&apos;s help page describes the classic chat as something you use while you&apos;re in
        the meeting, and it doesn&apos;t describe attaching files to it. What everyone does is paste
        a link. That works, with the problem I keep writing about: the classic chat{" "}
        <A href="/blog/google-meet-chat-disappears">disappears when you leave</A>, and late joiners
        don&apos;t see what was sent before they arrived. Someone on Hacker News{" "}
        <A href="https://news.ycombinator.com/item?id=41615584">built a whole extension</A> after
        losing a document link a mentor had shared in Meet chat. If you&apos;re on a free Gmail
        account, the <A href="/blog/google-meet-personal-account">personal account rundown</A> has
        the other limits too.
      </p>

      <h2>How does Better Chat handle file sharing?</h2>
      <p>
        I make Better Chat (a Chrome extension that adds a chat layer to Google Meet), and it adds
        file and image sharing on any account, including personal Gmail and instant meetings, plus a
        GIF picker powered by Tenor. Here&apos;s what it accepts:
      </p>
      <Table
        head={["Type", "Examples", "Size cap"]}
        rows={[
          ["Images", "Photos, screenshots", "25 MB"],
          ["Documents", "PDF, Word, Excel, PowerPoint, txt, md, csv, json, rtf, zip", "50 MB"],
          ["Audio", "mp3, wav, m4a, ogg, aac", "50 MB"],
          ["Video", "mp4, webm, mov, m4v", "100 MB"],
        ]}
      />
      <p>
        Executables and scripts are blocked. Each user gets 100 files or 2 GB per calendar month.
        Uploads are deleted one week after upload; the message stays, and the file shows as expired.
      </p>
      <p>
        The same caveat as the rest of Better Chat: files and GIFs only show for people in the call
        who also run it. Everyone else sees each message in Meet&apos;s own chat as plain text. So
        it&apos;s good for a recurring call where everyone has it, like a weekly lesson or a small
        team standup, and not a way to hand a file to a client who doesn&apos;t.
      </p>

      <h2>What&apos;s the best way to share a file people need after the call?</h2>
      <p>
        Put it in Google Drive and paste the link. Set the sharing permissions before the call so
        people can actually open it, and if you&apos;re on the classic chat, send the link in the
        Calendar invite or an email too, since the chat won&apos;t keep it. That works on every plan,
        for external guests, and long after a week has passed.
      </p>
      <p>
        Attachments in chat are fine for the stuff that only matters during the call: a screenshot,
        a quick image, a GIF. For the worksheet, the contract, or the slides someone will ask for
        next Tuesday, a Drive link is better than any chat attachment, Google&apos;s or mine.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
