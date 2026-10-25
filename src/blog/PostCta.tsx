import { storeLink } from "./site";

/** Most readers leave before the end CTA, so this one sits under the Takeaway. */
export const PostCta = ({ slug, cta }: { slug: string; cta: "inline" | "end" }) => (
  <aside className="post-cta">
    <p>
      <strong>Better Chat</strong> adds chat history, reactions, replies and file sharing to Google
      Meet. 30-day free trial.
    </p>
    <a href={storeLink(cta, slug)} data-cta={`blog_${cta}`} target="_blank" rel="noopener noreferrer">
      Add to Chrome
    </a>
  </aside>
);
