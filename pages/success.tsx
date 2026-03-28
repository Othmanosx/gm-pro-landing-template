import Link from "next/link";
import { NextSeo } from "next-seo";

import { Footer } from "../src/sections/Footer";
import { Header } from "../src/sections/Header";
import { GradientText } from "../src/components/GradientText";
import { Section } from "../src/components/Section";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/GM%20Pro:%20Supercharge%20Your%20Google%20Meet%20Experience/bfmgohplnhblcajmjhmcimjlikohiomh";

const steps = [
  {
    icon: "🧩",
    title: "Install the extension",
    description:
      "If you haven't already, add Better Chat to Chrome from the Web Store.",
    cta: { label: "Add to Chrome", href: CHROME_STORE_URL, external: true },
  },
  {
    icon: "📹",
    title: "Start or join a Google Meet",
    description:
      "Open any Google Meet call — Better Chat activates automatically.",
    cta: {
      label: "Open Google Meet",
      href: "https://meet.google.com",
      external: true,
    },
  },
  {
    icon: "💬",
    title: "Enjoy Pro features",
    description:
      "Persistent chat history, emoji reactions, image sharing, transcriptions, and more — all unlocked.",
    cta: null,
  },
];

const SuccessPage = ({
  isDarkMode,
  toggleDarkMode,
}: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  return (
    <>
      <NextSeo
        title="Payment Successful — Better Chat for Google Meet"
        description="Your Better Chat Pro plan is now active. Start a meeting and enjoy all Pro features."
      />
      <div className="overflow-hidden col text-strong">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          <Section
            gradients
            className="items-center justify-center min-h-screen gap-16 text-center"
          >
            {/* Success badge */}
            <div className="col items-center gap-6 max-w-xl">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #32D873 0%, #0D9488 100%)",
                }}
              >
                ✓
              </div>

              <div className="col gap-3">
                <h1 className="font-black tracking-tight text-4xl md:text-5xl text-strong leading-tight">
                  You&apos;re all set!{" "}
                  <GradientText className="pink-blue">
                    Pro is active.
                  </GradientText>
                </h1>
                <p className="text-light text-lg md:text-xl">
                  Your payment was successful. Welcome to Better Chat Pro — your
                  Google Meet experience just got a whole lot better.
                </p>
              </div>
            </div>

            {/* Steps */}
            <div className="grid md:grid-cols-3 gap-6 w-full max-w-3xl">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="col gap-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-6 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{step.icon}</span>
                    <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest">
                      Step {i + 1}
                    </span>
                  </div>
                  <div className="col gap-1.5">
                    <h3 className="font-bold text-strong text-base">
                      {step.title}
                    </h3>
                    <p className="text-sm text-light">{step.description}</p>
                  </div>
                  {step.cta && (
                    <a
                      href={step.cta.href}
                      target={step.cta.external ? "_blank" : undefined}
                      rel={
                        step.cta.external ? "noopener noreferrer" : undefined
                      }
                      className="mt-auto text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-1"
                    >
                      {step.cta.label} →
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Footer note */}
            <p className="text-sm text-light max-w-md">
              Have a question?{" "}
              <Link
                href="/support"
                className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                Contact support
              </Link>{" "}
              and we&apos;ll get back to you quickly.
            </p>
          </Section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default SuccessPage;
