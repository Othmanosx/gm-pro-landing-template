import { A, Faq, Takeaway } from "../prose";
import type { PostMeta } from "../site";

export const meta: PostMeta = {
  slug: "google-workspace-marketplace-review",
  title: "What Google's Workspace Marketplace Review Asked Me For",
  headline: "What Google's Workspace Marketplace review asked me to change",
  description:
    "My Meet add-on went through Workspace Marketplace review in 2026: name, icons, screenshots and a long wait. What Google asked for, and what I'd do first now.",
  kicker: "behind the build",
  publishDate: "2026-12-15",
  readingMin: 6,
  keywords: [
    "google workspace marketplace review",
    "google meet add-on review",
    "workspace marketplace app review",
    "publish google meet add-on",
  ],
  faq: [
    {
      q: "How long does Google Workspace Marketplace review take?",
      a: "Google's app review page says review typically takes several days, depending on how many apps were submitted recently and how much work your app needs. My thread ran from a re-review email on March 23 to a final reply on May 5, 2026, mostly because each round surfaced a new issue and replies took weeks.",
    },
    {
      q: "Does a Google Meet add-on need OAuth verification?",
      a: "Yes, for a public listing. Google's review criteria say the app must have passed OAuth verification and use the narrowest OAuth scopes possible. Sensitive scopes typically take a few business days to verify, and restricted scopes also need a security assessment that has to be repeated at least every 12 months.",
    },
    {
      q: "Can an already published Marketplace app be reviewed again?",
      a: "It happened to mine. My add-on was already listed when I got an email saying a re-review process had found it non-compliant with the Marketplace guidelines, with a list of issues to fix. Until it passes, the listing shows that the app hasn't been approved for Google Meet yet.",
    },
    {
      q: "What should a Google Meet add-on be called?",
      a: "In my review, Google wanted the name to make clear the app is an add-on for Google Meet, rather than a standalone product. The name also has to match exactly on the Marketplace listing, the OAuth consent screen, and the app itself, and Google's page caps it at 50 characters.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        I started building a Google Meet add-on version of Better Chat in December 2025, next to
        the Chrome extension I&apos;d been running since 2023. The code was the easy part. Getting
        it through Google Workspace Marketplace review is a thread in my inbox that started on
        March 23, 2026, and as I write this in October 2026 the listing still says it hasn&apos;t
        been approved for Meet.
      </p>

      <Takeaway>
        Google Workspace Marketplace review checked four things on my Meet add-on: the app name had
        to match on the listing, the OAuth consent screen and the app; icons had to be the right
        sizes, square, transparent and identical everywhere; screenshots had to show the add-on
        inside Google Meet; and the name had to say it&apos;s a Meet add-on, not a separate chat
        app. Google says review typically takes several days. Mine took weeks per round.
      </Takeaway>

      <h2>What did the first review email ask for?</h2>
      <p>
        The add-on was already listed when the first email arrived. It said a re-review process had
        found the app non-compliant and listed two issues:
      </p>
      <ol>
        <li>
          <strong>The name.</strong> It had to match across the Marketplace listing, the OAuth
          consent screen, and the Google product the app integrates with. Mine didn&apos;t, and the
          reviewer attached a screenshot showing where.
        </li>
        <li>
          <strong>The icons.</strong> At least a 128 by 128 and a 32 by 32 pixel icon, plus 96 by 96
          and 48 by 48 for apps that include a web app. Square, transparent background, and the
          same icon on the store listing, the consent screen and in the app.
        </li>
      </ol>
      <p>
        Both match what Google publishes on its{" "}
        <A href="https://developers.google.com/workspace/marketplace/about-app-review">
          app review page
        </A>
        , which also asks for icons in color and a name of 50 characters or less. If I&apos;d read
        that page line by line before the first submission, this round wouldn&apos;t have happened.
      </p>

      <h2>Why did the listing still say &quot;not approved&quot; after I fixed it?</h2>
      <p>
        I fixed both and republished through the Marketplace SDK on April 2. The listing kept
        showing the same banner:{" "}
        <em>&quot;This app hasn&apos;t been approved for Google Meet yet.&quot;</em> I wrote back to
        ask why. On April 6 the reviewer asked if the issue continued, I sent a screenshot showing
        it did, and on April 8 they said they had inquired about it. Then nothing until I asked for
        an update on April 23.
      </p>
      <p>
        That gap is the part nobody warns you about. The fixes were small, a name and a set of
        icons. Waiting for the next reply took weeks, and I found no status page that shows where
        your app is in the queue.
      </p>

      <h2>What did the second round ask for?</h2>
      <p>
        On April 29 the reply raised two new issues. The name didn&apos;t fit a Google Meet add-on,
        and the listing&apos;s screenshots didn&apos;t show the add-on being used inside Meet. I
        didn&apos;t get the first one, and said so:
      </p>
      <blockquote>
        <p>
          Apologies, I still don&apos;t understand, the app itself is a chat widget, a better
          alternative to what Meet offers, which is why I simply called it &quot;better chat&quot;.
          What could be a better more aligned name for such addon?
        </p>
      </blockquote>
      <p>
        The answer on May 5 cleared it up. &quot;Better Chat&quot; reads like a standalone chat
        app, and for Meet add-ons Google wants the name to show the integration with Meet. My
        Chrome extension&apos;s store name already does this (&quot;Better
        Chat: Chat Power-Ups for Google Meet&quot;), and I just hadn&apos;t carried it over.
      </p>

      <h2>What about OAuth scopes?</h2>
      <p>
        Google&apos;s review criteria say the app must have passed OAuth verification and use the
        narrowest scopes possible, and{" "}
        <A href="https://developers.google.com/identity/protocols/oauth2/production-readiness/sensitive-scope-verification">
          sensitive scope verification
        </A>{" "}
        typically takes a few business days on its own. My commit history shows the back and forth:
        in January 2026 I added a Meet scope and removed it again the same day once it turned out I
        didn&apos;t need it, and in March I opted the add-on into granular OAuth permissions. Every
        scope you drop is one less thing to justify.
      </p>

      <h2>What I&apos;d do first next time</h2>
      <ol>
        <li>
          Pick a name that says &quot;for Google Meet&quot; and use it, character for character, on
          the listing, the OAuth consent screen and inside the add-on.
        </li>
        <li>Make the icon set once, in every required size, and use the same file everywhere.</li>
        <li>Take the listing screenshots inside a real Meet call, with the add-on open.</li>
        <li>Request the fewest scopes that work, and verify OAuth before submitting.</li>
        <li>Expect each review round to take longer than the fix did, and plan launches around it.</li>
      </ol>
      <p>
        As of late October 2026, the listing hasn&apos;t changed since April 2 and still shows the
        not-approved banner. Better Chat runs as a Chrome extension in the meantime, which goes
        through a different review: the Chrome Web Store&apos;s, for every update (I wrote about{" "}
        <A href="/blog/google-meet-addons-vs-extensions">how add-ons and extensions differ</A> and{" "}
        <A href="/blog/why-google-meet-extensions-break">why extensions break when Meet changes</A>
        ). If you&apos;re publishing a Meet add-on and want to compare notes, I can share more if
        people are curious.
      </p>

      <Faq items={meta.faq} />
    </>
  );
}
