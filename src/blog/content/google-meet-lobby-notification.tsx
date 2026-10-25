import { A, Faq, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "google-meet-lobby-notification",
  title: "Google Meet Knock Notification: Is There a Sound?",
  headline: "Does Google Meet make a sound when someone asks to join?",
  description:
    "What Google Meet documents about join chimes and knock requests, how hosts limit who can ask to join, and what extensions can and can't add.",
  kicker: "how-to",
  publishDate: "2026-11-29",
  readingMin: 5,
  keywords: [
    "google meet knock notification",
    "google meet ask to join sound",
    "google meet waiting room notification",
    "google meet join chime",
  ],
  faq: [
    {
      q: "Does Google Meet play a sound when someone asks to join?",
      a: "Google's help pages don't say. They document the join chime, which plays for the first five participants, and they describe the Admit and Deny prompt for join requests, but I couldn't find any page that says whether a request to join plays its own sound.",
    },
    {
      q: "Why did the Google Meet join sound stop after a few people?",
      a: "Google's help page says you hear a chime when the first five participants join, and after that you get a silent notification for new participants. I couldn't find a Meet setting that changes this, so if you want a sound for every arrival, you need an extension.",
    },
    {
      q: "Who can admit people into a Google Meet call?",
      a: "Google's help page says only the meeting organizer can find or approve requests to join, and that the organizer should stay in the meeting to approve them. With several people waiting, the organizer can view all requests or admit or deny everyone at once.",
    },
    {
      q: "Can I stop people from asking to join my Google Meet?",
      a: "Yes, on Workspace accounts. Since June 2025, hosts can turn off the option that lets anyone with the meeting link ask to join, when the meeting access type is Trusted or Restricted. You change it in the Calendar event's video call options or from Host controls during the meeting.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        Better Chat (a Chrome extension I make that adds a chat layer to Google Meet) has a lobby
        notifier that plays a sound when someone joins a call while you wait on the pre-join
        screen, so I read Google&apos;s help pages to see what Meet does on its own when someone
        knocks. The pages are clear about the join chime and the Admit button, and quiet on the one
        thing I wanted to know, which is whether a knock makes a sound.
      </p>

      <Takeaway>
        Google documents a join chime for the first five participants, after which new arrivals get
        a silent notification. Requests to join show an Admit or Deny prompt for the organizer, but
        Google&apos;s help pages don&apos;t say whether a knock request plays its own sound. Hosts
        can cut down on knocks with the meeting access type, and extensions can add sounds for
        people joining, but I don&apos;t know of one that chimes on knock requests.
      </Takeaway>

      <h2>What sounds does Google Meet play when people join?</h2>
      <p>
        Google&apos;s{" "}
        <A href="https://support.google.com/meet/answer/9303069?hl=en&amp;co=GENIE.Platform%3DDesktop">
          join a meeting help page
        </A>{" "}
        says you hear a chime when the first five participants join. After that, you get a silent
        notification for new participants. That makes sense for a 30-person all-hands, and it means
        the sixth person to arrive doesn&apos;t make a sound.
      </p>

      <h2>How do knock requests work in Google Meet?</h2>
      <p>
        Some people have to ask before they can join. Google&apos;s{" "}
        <A href="https://support.google.com/meet/answer/9303164">help page on adding people</A>{" "}
        says only the meeting organizer can find or approve requests to join, and that the organizer
        should stay in the meeting to approve them. Each request gets Admit or Deny; with several
        people waiting, you can view all of them, or admit or deny everyone at once.
      </p>
      <p>
        What the page doesn&apos;t cover is sound. I couldn&apos;t find any Google help page that
        says whether a request to join plays its own sound, so I won&apos;t claim it does or
        doesn&apos;t. What I can say is that the request is something you respond to in the Meet
        window, and if you&apos;re in another tab or another app, you need some cue to go back.
      </p>

      <h2>Can you limit who can ask to join?</h2>
      <p>
        Yes, if fewer knocks is the goal. In{" "}
        <A href="https://workspaceupdates.googleblog.com/2025/06/google-meet-host-management-control-for-asking-to-join-a-meeting.html">
          June 2025
        </A>{" "}
        Google gave hosts a control over who can ask to join. When the meeting access type is
        Trusted or Restricted, the host can clear the &quot;Anyone with the meeting link can ask to
        join&quot; option, either in the Calendar event (Video call options, then Host controls) or
        from Host controls during the call. Google lists it as available to all Workspace customers,
        with no admin setting. That cuts down on strangers knocking. It doesn&apos;t help you notice
        the student you&apos;re actually waiting for.
      </p>

      <h2>Can an extension add a sound?</h2>
      <p>
        For related things, yes. Two I know of, from their Chrome Web Store listings (checked
        October 25, 2026), and neither is a knock alert:
      </p>
      <p>
        <strong>Better Chat&apos;s lobby notifier.</strong> This one is mine (
        <A href="https://chromewebstore.google.com/detail/better-chat-chat-power-up/bfmgohplnhblcajmjhmcimjlikohiomh">
          Better Chat
        </A>
        ), and it covers a different moment: if you&apos;re sitting on Meet&apos;s pre-join screen
        waiting for a call to start, it plays a sound when someone joins. It doesn&apos;t alert a
        host to knock requests, and it stops once you click Join.
      </p>
      <p>
        <strong>Google Meet Enhancement Suite&apos;s chimes.</strong> Its{" "}
        <A href="https://chromewebstore.google.com/detail/google-meet-enhancement-s/ljojmlmdapmnibgflmmminacbjebjpno">
          listing
        </A>{" "}
        puts an &quot;Always Play Chimes&quot; feature in its Basic tier, for chime sounds when
        participants join and leave or when a new chat message arrives, though its own{" "}
        <A href="https://www.meetenhancementsuite.com/meetpro">pricing page</A> lists entry and join
        chimes as Pro. That&apos;s aimed at people
        who are already in, past Meet&apos;s five-person chime limit, rather than people waiting to
        be let in. Its Pro tier also lists automatic admit and deny for new entrants, if you&apos;d
        rather not handle knocks at all. I compared it with other options in{" "}
        <A href="/blog/google-meet-enhancement-suite-alternatives">
          Enhancement Suite alternatives
        </A>
        .
      </p>

      <h2>What can a host do in the meantime?</h2>
      <p>
        Keep the Meet tab where you can see it. A tutor who starts the meeting a few minutes before
        a lesson and answers email meanwhile can put Meet in its own window next to the inbox, so
        the Admit prompt stays in view; I wrote about that setup in{" "}
        <A href="/blog/tutoring-on-google-meet">tutoring on Google Meet</A>. Same for a host who
        opens a client call early, or anyone running office hours where people drop in at random
        times.
      </p>
      <p>
        If you open the call early to be on time, you might also want{" "}
        <A href="/blog/google-meet-join-muted">to join muted</A> so the waiting student doesn&apos;t
        hear your keyboard while you finish that email.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
