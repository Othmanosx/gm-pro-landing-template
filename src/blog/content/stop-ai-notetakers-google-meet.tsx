import { A, Faq, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "stop-ai-notetakers-google-meet",
  title: "How to Stop AI Notetaker Bots Joining Your Google Meet",
  headline: "How do you stop AI notetaker bots from joining your Google Meet?",
  description:
    "How to stop an AI notetaker in Google Meet: deny it, remove it, or lock the meeting so bots that ask to join get denied. What hosts, admins and guests can do.",
  kicker: "how-to",
  publishDate: "2026-12-03",
  readingMin: 6,
  keywords: [
    "stop ai notetaker google meet",
    "block notetaker bot google meet",
    "remove bot from google meet",
    "google meet ask to join bots",
  ],
  faq: [
    {
      q: "How do I remove an AI notetaker from a Google Meet call?",
      a: "Treat it like any participant. Open the People list, find the bot, and choose Remove from the call from its More actions menu. Google then offers Remove, report abuse or Block. If host management is on, only the host or a co-host can remove people, so ask them if the option is missing.",
    },
    {
      q: "Can I block notetaker bots automatically in Google Meet?",
      a: "On Workspace accounts, set the meeting access type to Trusted or Restricted and turn off the option that lets anyone ask to join. Google's Learning Center says third-party bots, like note takers, that try Ask to join are then denied automatically. Restricted isn't available to consumer accounts, so personal Gmail hosts deny bots by hand.",
    },
    {
      q: "Why does a notetaker bot show up in a meeting nobody invited it to?",
      a: "Someone on the invite usually connected a notetaker to their calendar. Vendors document auto-join settings that send the bot to that person's calendar meetings, and some join when the bot's own email address is added as a guest. Either way it arrives as a separate participant asking to join, so the host can deny it.",
    },
    {
      q: "Does Google's Take notes for me feature tell other people?",
      a: "Yes. Google's help page says Meet notifies all participants when Take notes for me starts, and a pencil icon appears. With host management on, only hosts and co-hosts can start or stop it. Admins can also require participant consent, which is off by default. The notes go to the organizer's Google Drive.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        Part of building Better Chat (I make Better Chat, a Chrome extension that adds a chat layer
        to Google Meet) is reading Google&apos;s help pages to know what Meet does on its own. Most
        of the access-control pages are about strangers with a meeting link. Then, on one Learning
        Center page, there&apos;s a sentence about AI notetaker bots, and it&apos;s the closest thing
        Google has to an answer for how to stop an AI notetaker in Google Meet. The other controls
        are scattered across half a dozen pages, so I put them in one place, cheapest first.
      </p>

      <Takeaway>
        To stop an AI notetaker bot in Google Meet, deny it when it asks to join, or remove it from
        the call from the People list. To keep bots out by default on a Workspace account, set the
        meeting access type to Trusted or Restricted and turn off the option that lets anyone ask to
        join: Google says third-party bots, like note takers, that try Ask to join are then denied
        automatically. If the bot belongs to an attendee, removing its email from the invite or
        changing its auto-join setting stops it at the source.
      </Takeaway>

      <h2>How do AI notetaker bots get into a Google Meet?</h2>
      <p>
        Usually through someone&apos;s calendar. Vendor help pages describe two routes. In one, an
        attendee connects the notetaker to their calendar and it auto-joins their meetings;{" "}
        <A href="https://help.otter.ai/hc/en-us/articles/14288936562199">Otter&apos;s help page</A>{" "}
        describes that. In the other, the bot&apos;s own address is a guest on the event:{" "}
        <A href="https://guide.fireflies.ai/articles/7098191513">Fireflies&apos; docs</A> describe
        its bot joining when fred@fireflies.ai is on the invite, and{" "}
        <A href="https://guide.fireflies.ai/articles/9554534786">another Fireflies page</A> says it
        shows as &quot;Fireflies.ai Notetaker&quot; and is always visible in the participant list.
      </p>
      <p>
        Either way it arrives as a participant, and it generally has to ask to join like any guest
        outside your rules.{" "}
        <A href="https://www.read.ai/articles/how-to-stop-read-ai-from-joining-my-meetings">
          Read AI&apos;s page
        </A>{" "}
        says its bot asks to join, appears as a participant, and posts a chat message naming who
        added it. So the host sees it coming, and that&apos;s where most of the controls sit.
      </p>

      <h2>How do you deny or remove a notetaker bot?</h2>
      <p>
        The cheapest option is to say no. When someone knocks, Google&apos;s{" "}
        <A href="https://support.google.com/meet/answer/9303164">help page on adding people</A> shows
        an Admit or Deny prompt to the organizer. If a bot gets in anyway, the same page covers
        removal: More options, then Remove from the call, or from the People list, More actions,
        Remove from the call. Google then lets you remove, report abuse, or block.
      </p>
      <p>
        Since March 2026 there&apos;s a second line of defence. Google&apos;s{" "}
        <A href="https://workspaceupdates.googleblog.com/2026/02/safeguarded-guest-admit-flow-in-google-meet.html">
          safeguarded guest admit flow
        </A>{" "}
        splits knock requests into two queues, and the new one, for connections where the host is
        more likely to need a closer look, defaults to deny. It covers all Workspace customers,
        Workspace Individual and personal accounts, with no admin control. Google&apos;s post
        doesn&apos;t mention bots, so I wouldn&apos;t count on every notetaker landing there, but
        Fireflies&apos;{" "}
        <A href="https://guide.fireflies.ai/articles/9554534786">own docs</A> tell hosts to look for
        its bot in that queue. If knocks pile up while you&apos;re in another tab, I wrote about{" "}
        <A href="/blog/google-meet-lobby-notification">what Meet does and doesn&apos;t play a sound for</A>.
      </p>

      <h2>How do you block notetaker bots before the meeting starts?</h2>
      <p>
        Change the meeting access type. Google&apos;s{" "}
        <A href="https://support.google.com/a/users/answer/12172260">access types page</A> lists
        three. Open lets anyone with the link in without knocking. Trusted lets your organization and
        external guests on the Calendar invite in without knocking. Restricted only lets in Calendar
        invitees and people invited from inside the meeting. For Trusted and Restricted, turning off
        the ask-to-join option declines everyone else automatically. The Learning Center page calls
        it &quot;Anyone with the meeting link can ask to join&quot; for Trusted and &quot;Anyone can
        ask to join, including people who dial in&quot; for Restricted.
      </p>
      <p>
        That&apos;s the setting the{" "}
        <A href="https://support.google.com/a/users/answer/11989526">Learning Center page</A> means:
        with knocking off, third-party bots, like note takers, that try Ask to join are denied
        without the host doing anything. On that page the steps sit under &quot;Host must join
        before anyone else&quot;, so I&apos;d turn that on as well. The same page says Restricted is
        not available for consumer
        users, which is one of several gaps I listed in{" "}
        <A href="/blog/google-meet-personal-account">what a personal account gets</A>. One thing
        I couldn&apos;t confirm in Google&apos;s docs is what happens when the bot&apos;s address is
        itself on the invite, since invitees skip the knock. Taking that address off the invite
        settles it.
      </p>

      <h2>Do host management, co-hosts and waiting rooms help?</h2>
      <p>
        <A href="https://support.google.com/meet/answer/16229038">Host management</A> is on every
        Workspace edition but off by default in Calendar. With it on, only the host and co-hosts can
        remove people, and you get chat moderation, View only roles and co-hosts. Co-hosts help
        on busy calls: Google allows up to 25 on{" "}
        <A href="https://support.google.com/meet/answer/10885841">eligible editions</A>, and any of
        them can watch the People list while you talk.
      </p>
      <p>
        <A href="https://support.google.com/meet/answer/16523457">Waiting rooms</A>, set in the
        Calendar event&apos;s Waiting room tab, hold everyone, invitees included, until you bring
        them in. That&apos;s the strictest option, because a bot on the invite waits there too, and
        you just don&apos;t bring it in. Google&apos;s page doesn&apos;t say which editions get it.
      </p>

      <h2>What can Workspace admins set?</h2>
      <p>
        Admins set the defaults in the Admin console under Apps, Google Workspace, Google Meet, Meet
        safety settings, per{" "}
        <A href="https://knowledge.workspace.google.com/admin/meet/manage-meet-settings">
          Google&apos;s admin guide
        </A>
        . That includes the default access type, the host management default, waiting rooms, and
        &quot;Warn for external participants&quot;, which marks outside participants as External in
        the People list. A bot from outside your domain stands out more with that on. I couldn&apos;t
        find an admin setting aimed at third-party notetaker bots specifically.
      </p>

      <h2>What can attendees and bot owners do?</h2>
      <p>
        If the bot belongs to someone in the call, vendor docs list a few ways out. These are
        examples of what vendors document, and the commands change, so check the current page:
      </p>
      <ul>
        <li>Otter says typing &quot;stop otter&quot; in the chat removes its notetaker.</li>
        <li>
          Fireflies lists <code>/ff leave</code>, and stopping it for good by removing
          fred@fireflies.ai from the invite or setting it to join only when invited.
        </li>
        <li>Read AI says typing &quot;Opt Out&quot; in chat makes it leave with nothing saved.</li>
        <li>
          <A href="https://intercom.help/tldv/en/articles/9093792-how-to-stop-tl-dv">tl;dv</A> says
          you can deny or remove it like any participant, and turn auto-recording off in its
          Preferences.
        </li>
      </ul>
      <p>
        The owner fixes it at the source by changing auto-join; Otter&apos;s setting for that is
        &quot;Meetings I manually select&quot;. As the organizer, you can also remove the bot&apos;s
        email from the Calendar invite.
      </p>

      <h2>What about Google&apos;s own Take notes for me?</h2>
      <p>
        Google&apos;s{" "}
        <A href="https://support.google.com/meet/answer/14754931">Take notes for me</A> is different
        enough to mention. Meet notifies all participants when it starts and shows a pencil icon.
        With host management on, only hosts and co-hosts can start or stop it, and admins can require
        participant consent, which is off by default. If what bothers you is notes being taken
        without people knowing, that design at least tells everyone.
      </p>
      <p>
        For what it&apos;s worth, Better Chat isn&apos;t a notetaker and doesn&apos;t join the call.
        It runs in the Meet tab of whoever installed it, so none of the controls above apply to it.
        Its extra chat is only visible to other Better Chat users in the call, and it posts each
        message into Meet&apos;s own chat as plain text, so everyone else still sees what was
        said.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
