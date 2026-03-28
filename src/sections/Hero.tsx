import Link from "next/link";
import { ScatteredSpheres } from "../svg/ScatteredSpheres";
import { Title } from "../components/Title";
import { Details } from "../components/Details";
import { Demo } from "../components/Demo";
import { Section } from "../components/Section";
import { GradientText } from "../components/GradientText";
import { Button } from "../components/Button";

const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/GM%20Pro:%20Supercharge%20Your%20Google%20Meet%20Experience/bfmgohplnhblcajmjhmcimjlikohiomh";

const Background = () => (
  <div
    className="absolute inset-0 translate-y-32 pointer-events-none dark:invert dark:brightness-90"
    aria-hidden="true"
  >
    <ScatteredSpheres />
  </div>
);

export const Hero = () => {
  return (
    <Section
      gradients
      className="items-center justify-center min-h-screen 2xl:min-h-[1000px] h-fit gap-16 col md:flex-row"
    >
      <Background />
      {/* Text */}
      <div className="z-10 gap-5 text-center col md:text-left">
        <Title size="lg">
          <GradientText className="pink-blue">Supercharge</GradientText>
          <br />
          Your <GradientText className="green-teal">Google Meet</GradientText>
        </Title>

        <Details>
          Persistent chat history, emoji reactions, image sharing, auto-mute,
          real-time transcriptions — and more. All in one free extension.
        </Details>

        <div
          className="flex flex-wrap gap-3 justify-center md:justify-start"
          data-aos="zoom-y-out"
          data-aos-delay="300"
        >
          <Button onClick={() => window.open(CHROME_STORE_URL, "_blank")}>
            Add to Chrome
          </Button>
        </div>

        <div
          className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-center md:justify-start text-xs text-light"
          data-aos="zoom-y-out"
          data-aos-delay="400"
        >
          <span className="flex items-center gap-1">✓ No account needed</span>
          <span className="flex items-center gap-1">✓ Works instantly</span>
        </div>
      </div>
      {/* Image */}
      <Demo
        data-aos="fade-left"
        imageSrc="https://lh3.googleusercontent.com/Vn3qQlegazqzvJlriBP3j1RUJfQVaIqMScbKqIf8RWum_tydkntTMiFo24WUsnHT3XbzgXGV9H7zSneOcjFDm5Aw=s1280-w1280-h800"
        alt="Better Chat enhanced chat interface showing persisted messages, emoji reactions, replies, and GIFs"
      />
    </Section>
  );
};
