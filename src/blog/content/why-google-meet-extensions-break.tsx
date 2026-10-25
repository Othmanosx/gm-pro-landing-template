import { A, Faq, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "why-google-meet-extensions-break",
  title: "Why Google Meet Extensions Break After Meet Updates",
  headline: "Why do Google Meet extensions break every time Meet changes?",
  description:
    "Google Meet extensions break when Meet changes its page, because they hook into markup Google never promised to keep. Lessons from maintaining one since 2023.",
  kicker: "behind the build",
  publishDate: "2026-12-11",
  readingMin: 6,
  keywords: [
    "google meet extension not working",
    "google meet extension broke",
    "why extensions break",
    "chrome extension meet update",
  ],
  faq: [
    {
      q: "Why did my Google Meet extension suddenly stop working?",
      a: "Most likely Google changed part of Meet's page that the extension relied on, like a class name, a button's attributes, or how chat messages are laid out. Extensions find Meet's buttons and messages by matching that markup, and Google doesn't promise to keep it stable. The fix usually has to come from the developer.",
    },
    {
      q: "What can I do when a Meet extension breaks?",
      a: "Reload the Meet tab first, then check the extension's store listing for a recent update and its support link. Report what broke and what language your Meet interface uses, since some breakages only hit non-English interfaces. If the listing hasn't been updated in years, the extension may simply be abandoned.",
    },
    {
      q: "Can an extension fix itself without a Chrome Web Store update?",
      a: "Partly. Manifest V3 doesn't allow extensions to run code loaded from a server, but Chrome's docs say data such as JSON isn't remotely hosted code. So an extension can fetch updated settings, like which page elements to look for, while real code changes still go through store review.",
    },
    {
      q: "Do Google Meet add-ons break the same way?",
      a: "Less often for this reason. Add-ons run inside a frame that Meet provides through Google's add-ons SDK, so they don't depend on Meet's internal page markup. The tradeoff is that they can only do what the SDK allows, while an extension can change Meet's own interface.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        I&apos;ve been keeping a Google Meet extension working since November 2023. One of the
        first commits put a chat panel inside Meet&apos;s chat window. The repo has a few hundred
        commits now, and a lot of the ones that start with &quot;fix&quot; have the same cause:
        Google changed something in Meet&apos;s page, and my code was looking for the old version.
      </p>

      <Takeaway>
        Google Meet extensions break because they work by finding Meet&apos;s buttons, panels and
        messages in the page and hooking into them. That markup is Google&apos;s internal detail:
        generated class names, attributes and labels that can change in any Meet release, with no
        notice to extension developers. When one changes, the extension can&apos;t find what it
        needs until its developer ships a fix.
      </Takeaway>

      <h2>How does a Google Meet extension hook into Meet?</h2>
      <p>
        Through a content script, which Chrome&apos;s docs describe as code that runs{" "}
        <A href="https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts">
          in the context of web pages
        </A>{" "}
        and can read and change the page. To mute your mic on join, the extension has to find
        Meet&apos;s mic button. To show chat history, it has to find the chat panel and read the
        messages in it. It finds them with selectors, small patterns that describe an element.
      </p>
      <p>
        Meet&apos;s markup isn&apos;t written for anyone outside Google to
        read. Mine looks for things like a chat container with the class{" "}
        <code>beTDc</code> or a button with a <code>jsname</code> of <code>A5il2e</code>. Those
        names are generated, they mean nothing to a human, and there&apos;s no public list of them.
        Google can rename them in any release, and from the outside you find out when users do.
      </p>

      <h2>What actually breaks? A few real examples</h2>
      <p>From my own commit history, all within a few months of 2025:</p>
      <ul>
        <li>
          <strong>August 2025.</strong> The shuffler stopped working. Meet had changed the People
          tab, and my selector for it no longer matched. The fix was one changed line, plus a
          release.
        </li>
        <li>
          <strong>Also August 2025.</strong> I rewrote several selectors that matched English
          labels, like the chat button&apos;s &quot;Chat with everyone&quot; and the
          &quot;People&quot; tab. They worked fine in English and failed for anyone whose Meet
          interface is in another language. Generated attributes are ugly, but at least they
          don&apos;t change with the user&apos;s language.
        </li>
        <li>
          <strong>September 2025.</strong> Meet introduced a new empty-chat view, and messages
          started showing up without their sender&apos;s name.
        </li>
        <li>
          <strong>November 2025.</strong> The code that reads Meet&apos;s chat messages failed to
          parse them after a layout change.
        </li>
      </ul>

      <h2>Why can&apos;t the developer just push a fix right away?</h2>
      <p>
        Because extension updates go through review. Chrome&apos;s{" "}
        <A href="https://developer.chrome.com/docs/webstore/review-process">review process page</A>{" "}
        says new items and updates go through the same review, most finish within a few days, and
        some take up to a few weeks. Extensions with broad permissions can take longer. So even a
        one-line fix spends time in a queue while users see a broken feature.
      </p>
      <p>
        There is a partial way around it. Manifest V3 bans running code loaded from a server, but
        Chrome&apos;s{" "}
        <A href="https://developer.chrome.com/docs/extensions/develop/migrate/remote-hosted-code">
          remote code guidance
        </A>{" "}
        says remotely hosted code doesn&apos;t include data like JSON. Selectors are data. My
        extension ships with a default set and, when Meet loads, fetches the current set from my
        database and uses that instead. When a selector breaks, I can update one document and
        users get the fix the next time they open Meet. Anything that needs new logic still waits
        for a store release.
      </p>

      <h2>How do I find out something broke before users tell me?</h2>
      <p>
        Error reporting. The extension waits for each element it needs with a timeout, and when an
        element never shows up, that gets reported. Several of my 2025 fixes started as a report
        that a specific selector timed out, sometimes for a single element like the lobby status
        text. Some reports are noise, like waiting for the scheduled-time label on a meeting that
        was never scheduled, so part of the work is teaching the code which timeouts matter.
      </p>

      <h2>What can you do when your Meet extension breaks?</h2>
      <ol>
        <li>Reload the Meet tab. Some breakages are timing issues that a reload clears.</li>
        <li>
          Check the store listing&apos;s &quot;Updated&quot; date. A recent date means someone is
          maintaining it. An extension last updated years ago may never be fixed.
        </li>
        <li>
          Report it through the listing&apos;s support link, and say which language your Meet is in.
          Language-specific breakages are easy to miss for a developer who only tests in English.
        </li>
        <li>
          If you rely on a feature, ask whether Google now does it natively. A lot has changed:{" "}
          <A href="/blog/google-meet-caption-history">caption history</A> and{" "}
          <A href="/blog/google-meet-continuous-chat">continuous meeting chat</A> both arrived in the
          last two years.
        </li>
      </ol>
      <p>
        For anyone building one: prefer attributes that don&apos;t depend on the interface
        language, keep selectors in data you can update without a release, and report timeouts so
        you hear about breakage before the reviews do. Or look at Meet add-ons, which run in a
        frame Google supports and don&apos;t depend on Meet&apos;s markup at all, at the cost of only
        doing what the add-ons SDK allows. I build both (I make Better Chat, which started as the
        extension in this post), and the extension is the one that needs fixing when Meet ships a
        redesign.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
