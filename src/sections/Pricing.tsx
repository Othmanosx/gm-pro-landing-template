import { useState } from "react";
import Link from "next/link";

import { Details } from "../components/Details";
import { GradientText } from "../components/GradientText";
import { Section } from "../components/Section";
import { Title } from "../components/Title";

const MONTHLY_PRICE = 9.99;
const ANNUAL_PRICE_PER_MONTH = 7.99;
const ANNUAL_TOTAL = (ANNUAL_PRICE_PER_MONTH * 12).toFixed(2);
const LIFETIME_ORIGINAL = 249;
const LIFETIME_PRICE = 149;
const LIFETIME_SAVE = LIFETIME_ORIGINAL - LIFETIME_PRICE;
const LIFETIME_OFF_PCT = Math.round((LIFETIME_SAVE / LIFETIME_ORIGINAL) * 100);

const PRO_FEATURES = [
  "Enhanced chat with reactions & replies",
  "Image & GIF sharing",
  "Persistent chat history",
  "Dark & light mode",
  "Auto mute mic & camera",
  "Auto open chat on join",
  "Lobby notifier alerts",
  "Real-time transcriptions",
  "Priority support",
];

const LIFETIME_FEATURES = [...PRO_FEATURES, "All future updates included"];

const CheckIcon = ({ gradient }: { gradient?: boolean }) => (
  <span
    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-black ${
      gradient
        ? "bg-green-100 dark:bg-green-900/30 text-green-600"
        : "bg-green-100 dark:bg-green-900/30 text-primary-600"
    }`}
  >
    ✓
  </span>
);

export const Pricing = () => {
  const [annual, setAnnual] = useState(true);

  const currentPrice = annual ? ANNUAL_PRICE_PER_MONTH : MONTHLY_PRICE;

  return (
    <Section id="pricing" gradients className="items-center gap-16 py-32">
      {/* Heading */}
      <div
        className="col items-center gap-5 max-w-2xl text-center"
        data-aos="zoom-y-out"
      >
        <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 border border-green-300 dark:border-green-700/40 text-green-700 dark:text-green-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest w-fit">
          ✦ Pro Plans
        </span>

        <Title size="md">
          One price.{" "}
          <GradientText className="pink-blue">All the power.</GradientText>
        </Title>

        <Details>
          Supercharge your Google Meet experience. No feature caps, no
          surprises. Upgrade or cancel anytime.
        </Details>

        {/* Billing toggle — animated sliding pill */}
        <div
          className="relative mt-2 select-none bg-gray-100 dark:bg-gray-700/80 rounded-full p-1 shadow-inner"
          style={{ minWidth: "260px" }}
        >
          {/* Sliding pill */}
          <span
            aria-hidden="true"
            className="absolute rounded-full bg-white dark:bg-gray-900"
            style={{
              top: "4px",
              bottom: "4px",
              left: annual ? "50%" : "4px",
              width: "calc(50% - 4px)",
              transition: "left 280ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
          <div className="grid grid-cols-2">
            <button
              onClick={() => setAnnual(false)}
              className={`relative z-10 py-1.5 text-sm font-semibold text-center transition-colors duration-200 focus:outline-none ${
                !annual ? "text-strong" : "text-light hover:text-medium"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`relative z-10 py-1.5 text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-1.5 focus:outline-none ${
                annual ? "text-strong" : "text-light hover:text-medium"
              }`}
            >
              Annual
              <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                −28%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl">
        {/* ── Pro subscription card ── */}
        <div
          data-aos="fade-right"
          className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl p-8 col gap-7"
        >
          {/* Price */}
          <div className="col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-light">
              Pro
            </span>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-black tracking-tight text-strong leading-none">
                ${currentPrice}
              </span>
              <span className="text-light text-sm mb-1">/ mo</span>
            </div>
            {annual && (
              <span className="text-xs text-light">
                Billed annually · ${ANNUAL_TOTAL} / yr
              </span>
            )}
            <p className="text-sm text-light mt-1">Cancel anytime.</p>
          </div>

          {/* CTA */}
          <a
            href="https://www.gm-pro.online/pricing?plan=pro"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-6 rounded-xl border-2 border-primary-600 text-primary-600 font-bold text-center text-sm hover:bg-primary-600 hover:text-white transition-all duration-200"
          >
            Start Pro Plan
          </a>

          {/* Features */}
          <ul className="col gap-3.5">
            {PRO_FEATURES.map((f) => (
              <li
                key={f}
                className="flex items-center gap-3 text-sm text-medium"
              >
                <CheckIcon />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Lifetime card (gradient border) ── */}
        <div
          data-aos="fade-left"
          data-aos-delay="100"
          className="relative p-px rounded-2xl shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #32D873 0%, #138E94 100%)",
          }}
        >
          {/* Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
            <span
              className="text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #32D873 0%, #138E94 100%)",
              }}
            >
              🔥 Best Value · {LIFETIME_OFF_PCT}% Off
            </span>
          </div>

          {/* Inner card */}
          <div className="rounded-[15px] bg-white dark:bg-gray-800 p-8 col gap-7 h-full">
            {/* Price */}
            <div className="col gap-2 mt-2">
              <span className="text-xs font-bold uppercase tracking-widest text-light">
                Lifetime
              </span>
              <div className="flex items-end gap-3">
                <span className="text-5xl font-black tracking-tight text-strong leading-none">
                  ${LIFETIME_PRICE}
                </span>
                <div className="col mb-1 gap-0.5">
                  <span className="text-light line-through text-sm">
                    ${LIFETIME_ORIGINAL}
                  </span>
                  <span className="text-xs font-bold text-green-500">
                    Save ${LIFETIME_SAVE}
                  </span>
                </div>
              </div>
              <p className="text-sm text-light mt-1">
                One-time payment. Yours forever.
              </p>
            </div>

            {/* CTA */}
            <a
              href="https://www.gm-pro.online/pricing?plan=lifetime"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-6 rounded-xl font-bold text-center text-sm text-white hover:opacity-90 transition-opacity duration-200"
              style={{
                background: "linear-gradient(135deg, #32D873 0%, #138E94 100%)",
              }}
            >
              Get Lifetime Access
            </a>

            {/* Features */}
            <ul className="col gap-3.5">
              {LIFETIME_FEATURES.map((f) => (
                <li
                  key={f}
                  className={`flex items-center gap-3 text-sm ${
                    f === "All future updates included"
                      ? "text-strong font-medium"
                      : "text-medium"
                  }`}
                >
                  <CheckIcon gradient />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Trust signals */}
      <div
        className="col items-center gap-2"
        data-aos="zoom-y-out"
        data-aos-delay="200"
      >
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-light">
          <span className="flex items-center gap-1.5">
            <span className="text-yellow-400">⭐</span> 5.0 Chrome Store rating
          </span>
          <span className="hidden md:block text-gray-300 dark:text-gray-600">
            |
          </span>
          <span className="flex items-center gap-1.5">
            <span>🔒</span> Secure checkout
          </span>
        </div>
        <p className="text-xs text-extra-light mt-1">
          Trusted by Google Meet users worldwide
        </p>
      </div>

      {/* ── Support CTA ── */}
      <div
        className="w-full max-w-3xl"
        data-aos="zoom-y-out"
        data-aos-delay="250"
      >
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="col gap-1 text-center md:text-left">
            <p className="font-semibold text-strong text-base">
              Have questions before buying?
            </p>
            <p className="text-sm text-light">
              Our team is happy to help you find the right plan — or answer any
              questions you might have.
            </p>
          </div>
          <Link
            href="/support"
            className="flex-shrink-0 inline-flex items-center gap-2 border border-gray-300 dark:border-gray-600 bg-strong hover:bg-medium text-strong font-semibold text-sm rounded-xl px-5 py-2.5 transition-colors duration-200 shadow-sm whitespace-nowrap"
          >
            <span>✉️</span>
            Contact Support
          </Link>
        </div>
      </div>
    </Section>
  );
};
