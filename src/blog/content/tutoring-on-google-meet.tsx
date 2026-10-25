import { A, Faq, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "tutoring-on-google-meet",
  title: "Google Meet Tutoring: A Setup for Recurring Lessons",
  headline: "Google Meet tutoring: a setup for recurring lessons",
  description:
    "Google Meet tutoring on a free account: time limits for 1:1 and group lessons, why chat clears between lessons, and a setup that keeps each student's work.",
  kicker: "tutoring",
  publishDate: "2026-11-09",
  readingMin: 6,
  keywords: [
    "google meet tutoring",
    "tutoring on google meet",
    "google meet for online lessons",
    "google meet tutor setup",
  ],
  faq: [
    {
      q: "Is Google Meet free for tutoring?",
      a: "Yes, for most tutors. Without a Meet subscription, Google allows one-on-one meetings of up to 24 hours on a computer, so a 1:1 lesson isn't limited in practice. Meetings with three or more participants end at 60 minutes, which affects group lessons with two or more students.",
    },
    {
      q: "Can my student see last week's Google Meet chat?",
      a: "Not with Meet's classic chat, which clears when people leave. Continuous meeting chat keeps messages on Business and Enterprise plans, but Google says external guests only see the chat while they are in the meeting. Students outside your domain count as external guests, so a shared doc is the reliable place for anything they need later.",
    },
    {
      q: "Should I use the same Google Meet link for every lesson?",
      a: "For recurring lessons with one student, it helps. The student bookmarks one link, and you stop sending a new one before each lesson. Google says codes made on the Meet homepage expire 365 days after last use, so a weekly lesson keeps its link alive.",
    },
    {
      q: "Does Google Meet chat work for students on Education accounts?",
      a: "Classic in-call chat works for everyone in the call. Continuous meeting chat, the version that keeps messages after the call, is listed for Business, Enterprise, Enterprise Essentials and Frontline editions on Google's help page. Education editions aren't on that list, so on a school account, expect the chat that clears when the lesson ends.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        In June 2026 I contacted tutoring businesses whose lessons run on Google Meet to ask about
        one thing: keeping chat between lessons. I make Better Chat, so I had my own reason for
        asking, but anyone doing Google Meet tutoring runs into the same problem. Meet&apos;s chat
        starts empty every lesson unless your Google plan says otherwise, and the worked problem you
        pasted on Tuesday isn&apos;t there on Thursday.
      </p>

      <Takeaway>
        Google Meet tutoring works on a free personal Google account: 1:1 lessons can run up to 24
        hours, and lessons with three or more people stop at 60 minutes without a subscription.
        Meet&apos;s chat clears when the lesson ends unless the meeting uses continuous meeting chat,
        which needs a Business or Enterprise plan and still only shows students outside your domain
        what was sent while they were in the call. One link per student plus a shared Google Doc
        covers most of what the chat can&apos;t.
      </Takeaway>

      <h2>Can you tutor on Google Meet with a free account?</h2>
      <p>
        For 1:1 lessons, yes. Google&apos;s{" "}
        <A href="https://support.google.com/meet/answer/7317473?hl=en">meeting length page</A> says
        that without a Meet subscription, on a computer, one-on-one meetings can last up to 24 hours
        and meetings with three or more participants up to 60 minutes. At 50 minutes everyone gets a
        chime and a message that the meeting is about to end, and the host can upgrade to keep
        going.
      </p>
      <p>
        So a weekly 1:1 lesson on a personal Gmail account isn&apos;t limited in any way you&apos;ll
        notice. A group of you plus two students is capped at an hour. If your group lessons run 90
        minutes, that&apos;s where you either pay for a plan or split the lesson in two.
      </p>

      <h2>Why does the chat disappear between lessons?</h2>
      <p>
        Because Meet&apos;s classic chat only exists while you&apos;re in the call. Google&apos;s{" "}
        <A href="https://support.google.com/meet/answer/9308979?hl=en">chat help page</A> says
        messages sent before you join don&apos;t display and all messages disappear when you leave.
        Every lesson is a fresh chat box, even on the same link. A student who reloads because their
        camera froze loses the chat too, mid-lesson.
      </p>
      <p>
        Recording the lesson saves the chat log to Drive, but recording needs a qualifying Workspace
        edition, or a Google One plan with 2 TB or more on a personal account. I went through the
        options in{" "}
        <A href="/blog/save-google-meet-chat">how to save Google Meet chat</A>, and the longer
        version of the classic chat problem is in{" "}
        <A href="/blog/google-meet-chat-disappears">why Google Meet chat disappears</A>.
      </p>

      <h2>Does continuous meeting chat fix it for tutors?</h2>
      <p>
        Mostly not. Continuous meeting chat keeps Meet messages in a Google Chat conversation after
        the call, and the help page lists Business, Enterprise, Enterprise Essentials and Frontline
        editions for it. Education editions and personal accounts aren&apos;t on that list.
      </p>
      <p>
        The bigger catch is your students. Google says external guests only have access to the chat
        while they are in the meeting. Unless your students have accounts in your own Workspace
        domain, they&apos;re external guests, so even on a Business plan you keep the history and
        they don&apos;t. Instant meetings aren&apos;t supported either. I covered the rest of the
        rules in{" "}
        <A href="/blog/google-meet-continuous-chat">who gets continuous meeting chat</A>.
      </p>

      <h2>How should you set up recurring lessons on Google Meet?</h2>
      <p>Two things do most of the work, and neither costs anything.</p>
      <ul>
        <li>
          <strong>One link per student, reused every lesson.</strong> Google&apos;s{" "}
          <A href="https://support.google.com/meet/answer/10710509?hl=en">meeting code page</A>{" "}
          says codes created on the Meet homepage expire 365 days after last use, and codes created
          in Calendar expire once they go 60 days unused with no future events attached. A weekly
          lesson keeps either kind alive. The student bookmarks one link, and you stop sending a new
          one before each lesson.
        </li>
        <li>
          <strong>A shared Google Doc per student.</strong> Homework, links, worked problems, the
          date of each lesson at the top of its section. Drive doesn&apos;t care when the call ends,
          and the student can open it between lessons without joining anything. Put the doc link in
          the calendar invite so it&apos;s one click from the lesson.
        </li>
      </ul>
      <p>
        I&apos;d keep the doc even with an extension installed. It&apos;s where homework belongs,
        and it works on every account your students might have.
      </p>

      <h2>Where does Better Chat fit for tutors?</h2>
      <p>
        In the gap between the doc and the call (I make Better Chat, a Chrome extension that adds a
        chat layer to Google Meet). It stores its chat on its own servers, keyed by the meeting
        code, and shows the last 22 hours of chat for that link, so a student who reloads or joins
        late sees everything you already sent in that lesson. It doesn&apos;t carry chat from one
        week&apos;s lesson to the next; that&apos;s the doc&apos;s job. For tutoring, three parts of
        it matter:
      </p>
      <ul>
        <li>
          Chat history for the whole lesson, which covers a student who reloads or joins late.
        </li>
        <li>
          File sharing for worksheets, PDFs, Word and PowerPoint files, images, audio and video.
          Uploads are deleted one week after upload (the message stays, the file shows as expired),
          so it&apos;s for this week&apos;s worksheet. Anything long-lived goes in the doc.
        </li>
        <li>
          A lobby sound that plays when someone joins the call while you&apos;re still on the
          pre-join screen, handy if you open the lesson link early in another tab.
        </li>
      </ul>
      <p>
        The limit: that extra layer is only visible to people in the call who also run
        Better Chat. If your student doesn&apos;t install it, they see each message as plain text in
        Meet&apos;s own chat, and the history and files only show up on your side. For a tutor
        that&apos;s the question to settle first, whether your students will install a Chrome
        extension. There&apos;s a 30-day free trial (or 30 meetings, whichever comes first) with no
        card, which is enough to try it across a few weeks of lessons.
      </p>
      <p>
        If your tutoring business is on a Business or Enterprise plan and your students have
        accounts in your domain, use continuous meeting chat instead. It&apos;s already in your plan
        and it keeps the conversation in Google Chat for both of you.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
