import { A, Faq, Table, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "google-meet-addons-vs-extensions",
  title: "Google Meet Add-ons vs Chrome Extensions: Which to Use",
  headline: "Google Meet add-ons vs Chrome extensions: what's the difference?",
  description:
    "Google Meet add-ons run inside the call and install from the Workspace Marketplace. Chrome extensions run in your tab. How they differ and which to pick.",
  kicker: "how-to",
  publishDate: "2026-12-13",
  readingMin: 6,
  keywords: [
    "google meet add-ons",
    "google meet add-ons vs extensions",
    "google workspace marketplace meet",
    "how to install google meet add-on",
  ],
  faq: [
    {
      q: "How do I install a Google Meet add-on?",
      a: "On a computer, open Tools and then Marketplace inside a Meet call, or install it from the Google Workspace Marketplace site. If your admin pre-installed an add-on, it's already there. Your admin can also block Marketplace installs, in which case you'll need to ask them.",
    },
    {
      q: "Do other participants need the add-on too?",
      a: "To join a shared activity, yes. When someone starts one, participants who have the add-on can join, and the rest are prompted to install it. Add-ons aren't available to signed-out users, View only roles, or in client-side encrypted meetings and live streams, and only one add-on can run at a time.",
    },
    {
      q: "Do Google Meet add-ons work on phones?",
      a: "On phones, yes. Google's help page has Android and iPhone & iPad steps for joining an add-on activity from the Meet app, but a non-host on mobile can't start one. Google's Chrome help describes extensions as a desktop Chrome feature; from a phone you can only send one to your desktop.",
    },
    {
      q: "Is Better Chat available as a Google Meet add-on?",
      a: "It's listed on the Google Workspace Marketplace, but on October 26, 2026 the listing said the app hasn't been approved for Google Meet yet, and that it will appear in Meet once it is. Until then, the Chrome extension is the version that works, on Chrome on a computer.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        I make Better Chat (a Chrome extension that adds a chat layer to Google Meet), and I&apos;ve
        also put a Better Chat add-on on the Google Workspace Marketplace, so I build both kinds of
        thing. Google Meet add-ons and Chrome extensions both put extra tools in a
        call, but they run in different places, install differently, and go through different
        reviews. Here&apos;s how they compare, from Google&apos;s docs and from shipping both.
      </p>

      <Takeaway>
        A Google Meet add-on is a web app that Meet loads inside the call, in a side panel or the
        main stage. You install it from the Google Workspace Marketplace, it works on computers and
        phones, and admins control it. A Chrome extension runs in your own Chrome tab on a computer,
        each person installs it, and it can change Meet&apos;s page itself. Add-ons suit shared
        activities; extensions suit changes to your own Meet.
      </Takeaway>

      <h2>What is a Google Meet add-on?</h2>
      <p>
        Google&apos;s{" "}
        <A href="https://developers.google.com/workspace/meet/add-ons/guides/overview">
          add-ons overview
        </A>{" "}
        describes an app embedded in Meet: a side panel on the right, and the main stage when the
        content needs more room. Add-ons are listed in the Google Workspace Marketplace, and the{" "}
        <A href="https://support.google.com/meet/answer/13961388">Meet help page</A> says you install
        them from Tools &gt; Marketplace in a call on a computer.
      </p>
      <p>
        The point of an add-on is doing something together. When one person starts an activity,
        the{" "}
        <A href="https://developers.google.com/workspace/meet/add-ons/guides/collaborate-in-the-add-on">
          collaboration guide
        </A>{" "}
        says other participants are notified; those with the add-on can join, and the rest are
        prompted to install it. The{" "}
        <A href="https://support.google.com/meet/answer/13961388">Meet help page</A> adds that you
        can only collaborate on one add-on at a time. Add-ons aren&apos;t available to
        signed-out users, Family Link accounts, View only roles, users under the age of consent, or
        in client-side encrypted meetings and live streams, and hosts can turn off &quot;Let
        contributors share add-on activities&quot;.
      </p>
      <p>
        On phones, Google{" "}
        <A href="https://workspaceupdates.googleblog.com/2024/06/google-meet-add-ons-available-on-android-devices.html">
          brought add-ons to Android
        </A>{" "}
        in June 2024, and the Meet help page now has Android and iPhone and iPad steps for joining
        an activity from the Meet app. A non-host on mobile can&apos;t start one.
      </p>
      <p>
        Admins have real control here. The{" "}
        <A href="https://knowledge.workspace.google.com/admin/meet/manage-meet-settings">
          Meet admin settings
        </A>{" "}
        include supplemental add-ons, which admins can pre-install, block or hide, and a separate{" "}
        <A href="https://knowledge.workspace.google.com/admin/apps/set-whether-users-can-install-marketplace-apps">
          Marketplace policy
        </A>{" "}
        decides whether users can install any apps, only allowlisted ones, or none.
      </p>

      <h2>What is a Chrome extension for Google Meet?</h2>
      <p>
        An extension runs in desktop Chrome (Google&apos;s{" "}
        <A href="https://support.google.com/chrome_webstore/answer/2664769?hl=en">extensions help</A>{" "}
        covers adding them on your desktop, and from a phone you can only send one there). It works
        on Meet&apos;s own page through content scripts, which{" "}
        <A href="https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts">
          run in the context of web pages
        </A>{" "}
        and can read and change them. That&apos;s how an extension can auto-mute you on join, add a
        panel next to the call, or rearrange the grid.
        Each person installs it for themselves from the Chrome Web Store, and the other people in
        the call don&apos;t need it unless the feature is shared. Better Chat is one of those: its
        extra chat is only visible to other Better Chat users in the call, and everyone else sees
        each message in Meet&apos;s chat as plain text.
      </p>
      <p>
        Workspace admins only see extensions if they manage Chrome, where they can{" "}
        <A href="https://support.google.com/chrome/a/answer/6177431">allow or block them</A>. The
        trade-off for editing Meet&apos;s page is that the extension depends on how that page is
        built, which I covered in{" "}
        <A href="/blog/why-google-meet-extensions-break">why Google Meet extensions break</A>.
      </p>

      <h2>How do Google Meet add-ons and extensions compare?</h2>
      <Table
        head={["", "Meet add-on", "Chrome extension"]}
        rows={[
          ["Where it runs", "Inside Meet, side panel or main stage", "In your Chrome tab, on Meet's page"],
          ["Installed from", "Google Workspace Marketplace, or Tools > Marketplace in Meet", "Chrome Web Store"],
          ["Devices", "Computer, Android and iOS (non-hosts on mobile can join, not start)", "Chrome on a computer"],
          ["Who installs it", "Each participant who joins an activity; others get prompted", "Each person who wants it"],
          ["Changes Meet's own interface", "Shows its own panel", "Can read and change the page"],
          ["Admin control", "Supplemental add-ons and Marketplace policy", "Only if the admin manages Chrome"],
          ["Review", "Public add-ons reviewed by Google, OAuth verification", "Chrome Web Store review on every update"],
          ["Limits", "One at a time; no signed-out users, encrypted meetings or live streams", "Whatever the extension supports"],
        ]}
      />

      <h2>How are they published and reviewed?</h2>
      <p>
        Differently, and I&apos;m going through both. For Meet add-ons, the{" "}
        <A href="https://developers.google.com/workspace/meet/add-ons/guides/publish">
          publishing guide
        </A>{" "}
        says public add-ons are reviewed by Google, private ones limited to your own domain
        aren&apos;t, and the visibility choice can&apos;t be changed later. Google&apos;s{" "}
        <A href="https://developers.google.com/workspace/marketplace/about-app-review">
          app review page
        </A>{" "}
        adds that an app must pass OAuth verification and use the narrowest scopes it can, and that
        review typically takes several days. Chrome extensions go through{" "}
        <A href="https://developer.chrome.com/docs/webstore/review-process">
          Chrome Web Store review
        </A>{" "}
        for the first version and for every update after it, usually within a few days.
      </p>
      <p>
        Here&apos;s where mine stands. The{" "}
        <A href="https://workspace.google.com/marketplace/app/a/464731456038">
          Better Chat add-on listing
        </A>{" "}
        is live on the Marketplace, but as of October 26, 2026 it says the app hasn&apos;t been
        approved for Google Meet yet, and that it will show up in Meet once it is. So today the
        Chrome extension is the version that works. I&apos;ll write up how the review goes in a
        separate post.
      </p>

      <h2>Which should you pick?</h2>
      <p>
        Pick an add-on when the whole call should share the same thing, like a whiteboard, a game or
        a playlist, when some people join from their phones, or when your organization only allows apps
        an admin approved. Pick an extension when you want Meet itself to behave differently for
        you, such as auto-muting on join, a timer, or a chat that keeps its history, and you&apos;re
        on Chrome on a computer. If you go the extension route, my{" "}
        <A href="/blog/are-google-meet-extensions-safe">extension safety checklist</A> covers what to
        look at before installing, and{" "}
        <A href="/blog/best-google-meet-extensions">my roundup</A> lists the ones I&apos;d start
        with.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
