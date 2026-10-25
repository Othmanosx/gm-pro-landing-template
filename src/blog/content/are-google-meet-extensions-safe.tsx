import { A, Faq, Table, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "are-google-meet-extensions-safe",
  title: "Are Google Meet Extensions Safe? How to Check One",
  headline: "Are Google Meet extensions safe? What to check before you install",
  description:
    "Are Google Meet extensions safe? Read the install warnings, limit site access to Meet, check the publisher and update date, and know how to remove one fast.",
  kicker: "how-to",
  publishDate: "2026-12-09",
  readingMin: 6,
  keywords: [
    "are google meet extensions safe",
    "google meet extension permissions",
    "chrome extension read and change all your data",
    "chrome extension site access",
  ],
  faq: [
    {
      q: "What does \"Read and change all your data on all websites\" mean?",
      a: "It's the warning Chrome shows when an extension asks for access to every site, and for a few powerful permissions such as debugger, proxy and tabCapture. The extension can then read and change pages you visit anywhere, not only on Meet. For a tool that only works in Google Meet, ask why it needs every site.",
    },
    {
      q: "Can I limit an extension to Google Meet only?",
      a: "Yes, for host access. Open Manage extensions, click Details on the extension, and find \"Allow this extension to read and change all your data on websites you visit\". Choose \"On specific sites\" and add meet.google.com. Some features may stop working if they need other sites.",
    },
    {
      q: "Why did Chrome disable an extension after an update?",
      a: "If an update asks for a permission that comes with a warning, Chrome disables the extension until you accept the new permission. Changes to the sites an extension can access trigger this too. Read the new prompt before accepting: if a Meet tool suddenly wants all your data on all websites, it's fair to ask why.",
    },
    {
      q: "Can my Workspace admin block Chrome extensions?",
      a: "Yes, if your organization manages Chrome. Admins can allow everything and keep a blocklist, or block everything and keep an allowlist, and they can block extensions by the permissions they request. Settings apply per organizational unit or group, so a colleague in another team may see different rules than you.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        I make Better Chat, a Chrome extension for Google Meet, so I see this question from the
        other side: I write the code that asks Chrome for permissions, and every update I ship waits
        in Chrome Web Store review before it reaches anyone. Whether Google Meet extensions are safe
        depends on which one and what it asks for, so here&apos;s the checklist I&apos;d use as a
        user, built from Chrome&apos;s own documentation.
      </p>

      <Takeaway>
        Most Google Meet extensions can read and change the Meet page in your tab, so check what else it
        asks for before you install. Read the permission prompt, prefer an extension that only needs
        Google Meet over one that wants &quot;all your data on all websites&quot;, and look at the
        publisher line, the rating count and the last update. Afterwards you can limit its site
        access or remove it from Manage extensions.
      </Takeaway>

      <h2>What can a Google Meet extension see?</h2>
      <p>
        Extensions that work inside Meet usually do it with content scripts, which Chrome&apos;s docs
        say{" "}
        <A href="https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts">
          run in the context of web pages
        </A>{" "}
        and can read and change the page. On meet.google.com, that page holds names, the chat and
        any captions you turn on. The sites a content script runs on are{" "}
        <A href="https://chromium.googlesource.com/chromium/src/+/HEAD/extensions/docs/security_faq.md">
          shown in the install prompt
        </A>
        , so you see them before you install.
      </p>

      <h2>What do the install warnings mean?</h2>
      <p>
        These strings come from Chrome&apos;s{" "}
        <A href="https://developer.chrome.com/docs/extensions/reference/permissions-list">
          permissions list
        </A>
        :
      </p>
      <Table
        head={["Warning you see", "What asks for it"]}
        rows={[
          [
            "Read and change all your data on all websites",
            "Access to every site, or permissions such as debugger, pageCapture, proxy, tabCapture",
          ],
          ["Read your browsing history", "The tabs permission"],
          ["Know your email address", "identity.email"],
          ["No warning", "storage, activeTab, identity"],
        ]}
      />
      <p>
        An extension limited to a few sites shows those sites instead of &quot;all websites&quot;.
        The{" "}
        <A href="https://support.google.com/chrome_webstore/answer/186213">Chrome Web Store help</A>{" "}
        puts both &quot;Your data on all the websites you visit&quot; and &quot;Your data on a list of
        websites&quot; at a Medium alert level, so a site list isn&apos;t harmless by itself. What
        matters is whether the list matches what the extension does. A Meet tool that names
        meet.google.com makes sense. A Meet tool that wants every site should explain why.
      </p>

      <h2>How do you limit an extension to Google Meet?</h2>
      <p>
        Chrome lets you narrow access after installing. Per Google&apos;s{" "}
        <A href="https://support.google.com/chrome_webstore/answer/2664769">extension help page</A>,
        open Manage extensions, click Details on the extension, and find &quot;Allow this extension
        to read and change all your data on websites you visit&quot;. The options are &quot;On
        select&quot;, &quot;On specific sites&quot; and &quot;On all sites&quot;. Choose &quot;On
        specific sites&quot; and add meet.google.com. If a feature breaks, it probably needed another
        site, and you can decide whether that&apos;s worth allowing.
      </p>

      <h2>What happens when an update asks for more?</h2>
      <p>
        Chrome&apos;s{" "}
        <A href="https://developer.chrome.com/docs/extensions/develop/concepts/permission-warnings">
          permission warnings guide
        </A>{" "}
        says that if an update adds a permission with a warning, Chrome disables the extension until
        you accept. Changing which sites it runs on{" "}
        <A href="https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions">
          triggers a warning too
        </A>
        . So if your Meet extension goes grey one morning with a new prompt, read the new line before
        you click accept.
      </p>

      <h2>What does the Chrome Web Store require?</h2>
      <p>
        New extensions and every update go through{" "}
        <A href="https://developer.chrome.com/docs/webstore/review-process">review</A>, most within a
        few days, and broad or sensitive permissions can slow it down. On data, the{" "}
        <A href="https://developer.chrome.com/docs/webstore/program-policies/limited-use">
          Limited Use policy
        </A>{" "}
        restricts what developers do with your data to the extension&apos;s single purpose, bans
        using it for personalized ads or selling it to data brokers, and doesn&apos;t let humans read
        it except with your consent, for security, or to comply with law. The{" "}
        <A href="https://developer.chrome.com/docs/webstore/program-policies/user-data-faq">
          user data FAQ
        </A>{" "}
        adds a privacy policy, privacy practices disclosures, and HTTPS or WSS for data in transit.
        Review is a filter, though, and the privacy policy is still worth five minutes of your time.
      </p>

      <h2>Which store signals still mean something?</h2>
      <p>
        The publisher line. Google&apos;s{" "}
        <A href="https://developer.chrome.com/blog/cws-review-updates-2026">August 2026 update</A>{" "}
        says listings now show &quot;The publisher has a good record with no history of
        violations&quot; instead of an Established publisher badge. The same post says the Featured
        badge program is being sunset later this year, so its absence will soon mean nothing.
        Developers could never{" "}
        <A href="https://developer.chrome.com/docs/webstore/discovery">pay for either badge</A>.
      </p>
      <p>
        After that, the rating count and the last updated date. Ratings now weight recent reviews.
        An extension with a low rating and no update in years deserves a look at the recent reviews
        before you install it, as I did in{" "}
        <A href="/blog/best-google-meet-extensions">my roundup of Meet extensions</A>.
      </p>

      <h2>Can your Workspace admin control extensions?</h2>
      <p>
        If your organization manages Chrome, yes. Google&apos;s{" "}
        <A href="https://support.google.com/chrome/a/answer/6177431">admin help</A> describes two
        modes, &quot;Allow all apps, admin manages blocklist&quot; and &quot;Block all apps, admin
        manages allowlist&quot;, plus blocking by permission, set per organizational unit or group.
        If an install is blocked on your work account, that&apos;s usually why, and your admin is the
        person to ask. On a{" "}
        <A href="/blog/google-meet-personal-account">personal Google account</A> nobody manages this
        for you, so the checks above are yours to do.
      </p>

      <h2>How do you remove an extension?</h2>
      <p>
        Right-click its icon next to the address bar and choose &quot;Remove from Chrome&quot;. If the
        icon is hidden, open Manage extensions from Chrome&apos;s menu and click Remove on the
        extension. Both steps are on the same{" "}
        <A href="https://support.google.com/chrome_webstore/answer/2664769">help page</A>.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
