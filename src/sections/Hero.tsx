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
      <div className="z-10 gap-4 text-center col md:text-left">
        <Title size="lg">
          <GradientText className="pink-blue">Supercharge</GradientText>
          <br />
          Your <GradientText className="purple-teal">Google Meet</GradientText>
        </Title>
        <Details>
          Enhance chat functionality, streamline communication, and unlock
          powerful tools for your meetings with GM Pro.
        </Details>
        <div
          className="flex gap-4 justify-center md:justify-start"
          data-aos="zoom-y-out"
          data-aos-delay="300"
        >
          <Button onClick={() => window.open(CHROME_STORE_URL, "_blank")}>
            Add to Chrome — It&apos;s Free
          </Button>
        </div>
        <p className="text-sm text-light">
          ⭐ 5.0 rating • Trusted by users worldwide
        </p>
      </div>
      {/* Image */}
      <Demo
        data-aos="fade-left"
        imageSrc="https://lh3.googleusercontent.com/Vn3qQlegazqzvJlriBP3j1RUJfQVaIqMScbKqIf8RWum_tydkntTMiFo24WUsnHT3XbzgXGV9H7zSneOcjFDm5Aw=s1280-w1280-h800"
        alt="GM Pro enhanced chat interface showing persisted messages, emoji reactions, replies, and GIFs"
      />
    </Section>
  );
};
