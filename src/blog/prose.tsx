/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";

/** Plain anchors so the feed renders bodies without a router. */
export const A = ({ href, children }: { href: string; children: ReactNode }) =>
  href.startsWith("/") ? (
    <a href={href}>{children}</a>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );

/** The answer box near the top; one per post. The inline CTA lands right after it. */
export const Takeaway = ({
  title = "The short answer",
  children,
}: {
  title?: string;
  children: ReactNode;
}) => (
  <aside className="takeaway">
    <strong>{title}</strong>
    <p>{children}</p>
  </aside>
);

export const Table = ({ head, rows }: { head: string[]; rows: ReactNode[][] }) => (
  <table>
    <thead>
      <tr>
        {head.map((h) => (
          <th key={h}>{h}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((cells, i) => (
        <tr key={i}>
          {cells.map((c, j) => (
            <td key={j}>{c}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export const Figure = ({ caption, children }: { caption: string; children: ReactNode }) => (
  <figure>
    {children}
    <figcaption>{caption}</figcaption>
  </figure>
);

/** `<base>-light.png` and `<base>-dark.png`; the hidden one is never fetched (lazy + display:none). */
export const Shot = ({
  base,
  alt,
  width,
  height,
}: {
  base: string;
  alt: string;
  width: number;
  height: number;
}) => (
  <>
    <img
      className="shot-light"
      src={`${base}-light.png`}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
    />
    <img
      className="shot-dark"
      src={`${base}-dark.png`}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
    />
  </>
);

/** Pass `meta.faq`: the same strings feed FAQPage JSON-LD. */
export const Faq = ({ items }: { items: { q: string; a: string }[] }) => (
  <>
    <h2 id="faq">Frequently asked questions</h2>
    {items.map((it) => (
      <div key={it.q}>
        <h3>{it.q}</h3>
        <p>{it.a}</p>
      </div>
    ))}
  </>
);
