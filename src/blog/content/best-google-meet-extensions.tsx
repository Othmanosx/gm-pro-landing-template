import { A, Faq, Table, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "best-google-meet-extensions",
  title: "Best Google Meet Extensions in 2026, Grouped by Job",
  headline: "The best Google Meet extensions in 2026, by the job you need done",
  description:
    "The best Google Meet extensions for notes, attendance, controls and chat, with users, ratings and prices at the time of writing, from a maker who has a bias.",
  kicker: "comparison",
  publishDate: "2026-12-07",
  readingMin: 6,
  keywords: [
    "best google meet extensions",
    "google meet chrome extensions",
    "google meet extensions for teachers",
    "google meet transcription extension",
  ],
  faq: [
    {
      q: "What is the most popular Google Meet extension?",
      a: "Of the ones I checked on October 26, 2026, Tactiq and Google Meet Enhanced Experience both showed 1,000,000 users in the Chrome Web Store. Tactiq had a 4.9 rating from 4.5K ratings. Enhanced Experience, which adds video effects, had 3.0 from 2.1K and was last updated in June 2025.",
    },
    {
      q: "Do Google Meet extensions cost money?",
      a: "Many have a no-cost tier with limits. When I checked, Tactiq's free plan had 10 transcripts a month, Otter's Basic plan 300 minutes, and Scribbl's free plan 10 meetings. Enhancement Suite starts at $5 a month for one license, and Meet Plus doesn't publish its PRO price. Better Chat is paid after a 30-day free trial.",
    },
    {
      q: "Does everyone in the call need the same extension?",
      a: "Usually only the person who wants the feature installs it, since an extension runs in your own Chrome tab. Some say otherwise on their listing: Google Meet Breakout says only the teacher needs to install. Chat extensions are different, because Better Chat's extra chat is only visible to other Better Chat users in the call.",
    },
    {
      q: "Is the Featured badge in the Chrome Web Store a good sign?",
      a: "It was, but Google said in August 2026 that it is sunsetting the Featured badge program later this year and has closed self-nominations. Listings now show a line saying the publisher has a good record with no history of violations. Rating count, recent reviews and the last update date tell you more.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        I make Better Chat, a Chrome extension that adds a chat layer to Google Meet, so I&apos;m on
        this list and you should read it with that bias in mind. Better Chat is also tiny next to
        almost everything here: 137 users, against a million for the biggest one. These are the best
        Google Meet extensions I&apos;d point someone to, grouped by the job they do. Users, ratings
        and update dates come from each Chrome Web Store listing on October 26, 2026, and prices
        from each vendor&apos;s site the same day. They&apos;ll drift, so treat every number as
        &quot;at the time of writing&quot;.
      </p>

      <Takeaway>
        Pick a Google Meet extension by the job you need done. For transcripts and AI notes,
        Tactiq has the biggest install base (1,000,000 users, 4.9 stars) and a free plan. For
        attendance, Google Meet Attendance List has 400,000 users and a 4.8 rating. For controls,
        Google Meet Enhancement Suite bundles about 40 tweaks for $5 a month. For chat, Meet Plus and
        Better Chat each add their own chat layer.
      </Takeaway>

      <h2>Which Google Meet extensions are best for notes and transcripts?</h2>
      <ul>
        <li>
          <strong>
            <A href="https://chromewebstore.google.com/detail/tactiq-chatgpt-meeting-tr/fggkaccpbmombhnjkjokndojfgagejfb">
              Tactiq
            </A>
          </strong>{" "}
          (1,000,000 users, 4.9 from 4.5K) transcribes Meet, Zoom and Teams in the browser and writes
          AI notes afterwards. Its <A href="https://tactiq.io/pricing">pricing page</A> lists a free
          plan with 10 transcripts a month and Pro at $8 per user per month, billed annually. For
          anyone who wants a transcript and summary of every call. I compared it with my own thing in{" "}
          <A href="/blog/tactiq-vs-better-chat">Tactiq vs Better Chat</A>.
        </li>
        <li>
          <strong>
            <A href="https://chromewebstore.google.com/detail/lknmjhcajhfbbglglccadlfdjbaiifig">
              tl;dv
            </A>
          </strong>{" "}
          (500,000 users, 4.6 from 598) records and transcribes calls. There&apos;s a free plan, and
          its <A href="https://tldv.io/pricing/">pricing page</A> puts Pro at €29 a month, or €18 a
          month billed annually. For teams that want recordings to go back to.
        </li>
        <li>
          <strong>
            <A href="https://chromewebstore.google.com/detail/bnmojkbbkkonlmlfgejehefjldooiedp">
              Otter.ai
            </A>
          </strong>{" "}
          (300,000 users, 4.6 from 139) does live transcription. Its{" "}
          <A href="https://otter.ai/pricing">pricing page</A> lists Basic at no cost with 300 minutes
          a month and Pro at $16.99 a month, or $8.33 a month billed annually. Its{" "}
          <A href="https://help.otter.ai/hc/en-us/articles/14288936562199">help center</A> says the
          Otter Notetaker auto-joins your calendar meetings, so expect it in the participant list.
          For people who already use Otter outside Meet.
        </li>
        <li>
          <strong>
            <A href="https://chromewebstore.google.com/detail/kmjmlilenakedodldceipdnmmnfkahni">
              Scribbl
            </A>
          </strong>{" "}
          (50,000 users, 4.9 from 3.3K) writes AI notes, and its listing says it does so &quot;with
          no bot in the call&quot;. Its <A href="https://scribbl.co/pricing">pricing page</A> lists 10
          meetings a month on the free plan and Pro at $20 a month, or $13 billed annually. For
          people who want notes without an extra name in the call.
        </li>
      </ul>

      <h2>Which extensions help with attendance and classrooms?</h2>
      <ul>
        <li>
          <strong>
            <A href="https://chromewebstore.google.com/detail/appcnhiefcidclcdjeahgklghghihfok">
              Google Meet Attendance List
            </A>
          </strong>{" "}
          (400,000 users, 4.8 from 2.4K, updated July 24, 2026) saves who attended automatically. For
          teachers who take attendance every lesson.
        </li>
        <li>
          <strong>
            <A href="https://chromewebstore.google.com/detail/kogfdlbehkaeoafmgaecphlnhohpabig">
              Google Meet Breakout by Robert Hudek
            </A>
          </strong>{" "}
          (400,000 users, 4.4 from 132, updated April 17, 2026) runs breakout rooms, and the listing
          says &quot;Only the teacher needs to install.&quot; For teachers who split a class into
          groups.
        </li>
      </ul>

      <h2>Which extensions change Meet&apos;s controls and layout?</h2>
      <ul>
        <li>
          <strong>
            <A href="https://chromewebstore.google.com/detail/google-meet-enhancement-s/ljojmlmdapmnibgflmmminacbjebjpno">
              Google Meet Enhancement Suite
            </A>
          </strong>{" "}
          (100,000 users, 4.4 from 259, updated September 22, 2026) has about 40 controls, including
          mute all, auto admit and auto join. Its{" "}
          <A href="https://www.meetenhancementsuite.com/meetpro">pricing page</A> lists a single
          license at $5 a month or $60 a year, with a 7-day trial. For people who want lots of small
          changes from one install. More in{" "}
          <A href="/blog/google-meet-enhancement-suite-alternatives">my Enhancement Suite post</A>.
        </li>
        <li>
          <strong>
            <A href="https://chromewebstore.google.com/detail/pappcjmimkmjekiaiedkhfogpclanicb">
              Call Timer for Meet
            </A>
          </strong>{" "}
          (60,000 users, 3.8 from 54, updated January 13, 2026) adds a call timer and alerts. For
          anyone running meetings with a hard stop.
        </li>
      </ul>

      <h2>What about chat extensions?</h2>
      <p>This is my category, so the bias is strongest here.</p>
      <ul>
        <li>
          <strong>
            <A href="https://chromewebstore.google.com/detail/meet-plus-for-google-meet/lbfjgknkjfjmnjdgdhbbmmbkoddgpdoc">
              Meet Plus
            </A>
          </strong>{" "}
          (200,000 users, 3.7 from 300, updated May 28, 2025) adds its own messenger plus breakouts,
          attendance and polls. The basic version costs nothing; the PRO subscription price
          isn&apos;t published on its site. For people who want several classroom tools and a chat
          in one extension. I went through it in{" "}
          <A href="/blog/better-chat-vs-meet-plus">Better Chat vs Meet Plus</A>.
        </li>
        <li>
          <strong>Better Chat</strong> (137 users, 5.0 from 3 ratings, updated October 25, 2026) is
          mine. It keeps chat history per meeting link, so a reload, a late join or next week&apos;s
          call on the same link shows what was already sent, and adds replies, reactions, file
          sharing and a captions tab. The extra chat is only visible to other Better Chat users in
          the call; everyone else sees each message in Meet&apos;s own chat as plain text. It&apos;s
          $9.99 a month, $7.99 billed annually or $149 lifetime, after a 30-day free trial. Three
          ratings tell you very little. For recurring meetings and lessons where the chat should
          carry over.
        </li>
      </ul>
      <p>
        If you&apos;re on a Business or Enterprise plan and schedule calls in Calendar, check
        Google&apos;s own continuous meeting chat before installing anything for chat. It&apos;s
        covered in <A href="/blog/google-meet-continuous-chat">who gets continuous chat</A>.
      </p>

      <h2>How do they compare side by side?</h2>
      <Table
        head={["Extension", "Job", "Users", "Rating", "Price (when I checked)"]}
        rows={[
          ["Tactiq", "Transcripts, AI notes", "1,000,000", "4.9 (4.5K)", "Free plan; Pro $8/user/mo yearly"],
          ["tl;dv", "Recording, transcripts", "500,000", "4.6 (598)", "Free plan; Pro €29/mo, €18 yearly"],
          ["Otter.ai", "Live transcription", "300,000", "4.6 (139)", "Basic $0; Pro $16.99/mo, $8.33 yearly"],
          ["Scribbl", "AI notes", "50,000", "4.9 (3.3K)", "Free plan; Pro $20/mo, $13 yearly"],
          ["Google Meet Attendance List", "Attendance", "400,000", "4.8 (2.4K)", "See listing"],
          ["Google Meet Breakout", "Breakout rooms", "400,000", "4.4 (132)", "See listing"],
          ["Enhancement Suite", "Controls", "100,000", "4.4 (259)", "$5/mo or $60/yr"],
          ["Call Timer for Meet", "Timer", "60,000", "3.8 (54)", "See listing"],
          ["Meet Plus", "Chat, classroom tools", "200,000", "3.7 (300)", "Basic $0; PRO not published"],
          ["Better Chat", "Chat", "137", "5.0 (3)", "$9.99/mo, $7.99 yearly, $149 lifetime"],
        ]}
      />

      <h2>What should you check before installing one?</h2>
      <p>
        Look at the rating count before the stars. A 5.0 from three ratings, like mine, says much
        less than a 4.8 from 2.4K. Google&apos;s{" "}
        <A href="https://developer.chrome.com/blog/cws-review-updates-2026">
          August 2026 store update
        </A>{" "}
        says ratings now weight recent reviews more heavily, which helps.
      </p>
      <p>
        Then look at the last updated date next to a low rating. Meet Attendance shows 500,000 users
        but a 2.3 rating and a last update in February 2023. Grid View for Google Meet shows 3.5 and
        March 2022. Neither number proves anything is broken, since an extension that edits
        Meet&apos;s page only keeps working while it matches how that page is built, but I&apos;d read
        the recent reviews first.
      </p>
      <p>
        Don&apos;t lean on badges. The same Google post says the Featured badge program is being
        sunset later this year and self-nominations are closed, so plenty of good extensions will
        never carry one. Listings now show &quot;The publisher has a good record with no history of
        violations&quot; where an Established publisher badge used to be.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
