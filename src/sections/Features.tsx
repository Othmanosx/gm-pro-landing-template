import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Demo } from "../components/Demo";
import { Details } from "../components/Details";
import { GradientText } from "../components/GradientText";
import { Section } from "../components/Section";
import { Title } from "../components/Title";


const FeatureSection = ({
  children,
  grayer,
  right,
  center,
}: {
  children: ReactNode;
  grayer?: boolean;
  right?: boolean;
  center?: boolean;
}) => (
  <Section
    id="features"
    grayer={grayer}
    fullWidth
    className={`col items-center ${
      center ? "" : right ? "md:flex-row-reverse" : "md:flex-row"
    }`}
  >
    {children}
  </Section>
);

const FeatureDemo = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    imageSrc: string;
    bumpLeft?: boolean;
    center?: boolean;
    className: string;
    alt: string;
  }
) => {
  const { imageSrc, bumpLeft, center, alt, className, ...divProps } = props;
  return (
    <div
      {...divProps}
      className={twMerge(
        `w-5/6 md:w-1/2 p-4 md:p-12 bg-gradient-to-br rounded-xl ${
          center ? "" : bumpLeft ? "md:-translate-x-14" : "md:translate-x-14"
        }`,
        className
      )}
    >
      <Demo
        data-aos={`${
          center ? "zoom-y-out" : bumpLeft ? "fade-right" : "fade-left"
        }`}
        data-aos-delay="300"
        imageSrc={imageSrc}
        alt={alt}
      />
    </div>
  );
};

const Text = ({
  children,
  center,
}: {
  children: ReactNode;
  center?: boolean;
}) => (
  <div
    className={`w-5/6 col gap-4 text-center mb-8 mx-auto ${
      center ? "md:w-2/3" : "md:w-2/5 md:text-left md:my-auto"
    }`}
  >
    {children}
  </div>
);

export const Features = () => {
  return (
    <>
      {/* Feature 1 - Enhanced Chat */}
      <FeatureSection grayer center>
        <Text center>
          <Title size="md">
            <GradientText className="amber-red">Enhanced Chat</GradientText>{" "}
            Experience
          </Title>
          <Details>
            Take Google Meet chat to a whole new level with persisted messages,
            emoji reactions, replies, GIFs, and much more.
          </Details>
        </Text>
        <FeatureDemo
          imageSrc="https://lh3.googleusercontent.com/Vn3qQlegazqzvJlriBP3j1RUJfQVaIqMScbKqIf8RWum_tydkntTMiFo24WUsnHT3XbzgXGV9H7zSneOcjFDm5Aw=s1280-w1280-h800"
          center
          className="amber-red"
          alt="GM Pro enhanced chat interface showing persisted messages, emoji reactions, replies, and GIFs"
        />
      </FeatureSection>
      {/* Feature 2 - Light & Dark Mode */}
      <FeatureSection right>
        <Text>
          <Title size="md">
            <GradientText className="pink-blue">Light & Dark</GradientText>
            <br /> Mode Support
          </Title>
          <Details>
            Switch seamlessly between light and dark themes to match your
            existing setup and reduce eye strain.
          </Details>
        </Text>
        <FeatureDemo
          imageSrc="https://lh3.googleusercontent.com/AtFpWiyavyWsEquTwi-qgT69EG-j5zjBU6uwQSxVUlTQ3MBZJuoMWwC1HqY7SOxsNQKabqEiviGzyZHK3qIlrUO5nPk=s1280-w1280-h800"
          bumpLeft
          className="pink-blue"
          alt="GM Pro light and dark mode options to match your setup"
        />
      </FeatureSection>
      {/* Feature 3 - Mic & Camera Preferences */}
      <FeatureSection grayer>
        <Text>
          <Title size="md">
            <GradientText className="green-sky">Mic & Camera</GradientText>
            <br /> Preferences
          </Title>
          <Details>
            Automatically mute your mic and disable your camera when entering a
            meeting to ensure privacy and prevent unintentional interruptions.
          </Details>
        </Text>
        <FeatureDemo
          imageSrc="https://lh3.googleusercontent.com/m0Qmw2H644m7fS33yPGwoXSfkM75Td1GMS9b_Z18amOcay-2D9oZYscXWIp2uWgeZ-T9wfxjq4J_AkTgesvwCAKM=s1280-w1280-h800"
          className="green-sky"
          alt="GM Pro mic and camera preferences for automatic muting and camera disable"
        />
      </FeatureSection>
      {/* Feature 4 - Real Time Transcriptions */}
      <FeatureSection right>
        <Text>
          <Title size="md">
            <GradientText className="purple-teal">Real Time</GradientText>
            <br /> Transcriptions
          </Title>
          <Details>
            Scroll back through full live meeting transcriptions and don&apos;t
            let anything miss you... even AFTER the meeting has ended.
          </Details>
        </Text>
        <FeatureDemo
          imageSrc="https://lh3.googleusercontent.com/gmqmXfl9Q7TVwLohOKRdrx1DlTrudu-4SonnK_juRy1WOdEcDWdQ5563MXI5nIBbCfQ0W73V9UbiQ2dkZuPcgB1p=s1280-w1280-h800"
          bumpLeft
          className="purple-teal"
          alt="GM Pro real-time transcription feature showing live meeting transcriptions"
        />
      </FeatureSection>
      {/* Feature 5 - Participants List Shuffler */}
      <FeatureSection grayer>
        <Text>
          <Title size="md">
            <GradientText className="amber-red">Participants</GradientText>
            <br /> List Shuffler
          </Title>
          <Details>
            Randomly pick or shuffle attendees for seamless turn-taking in
            meetings like standups and retrospectives.
          </Details>
        </Text>
        <FeatureDemo
          imageSrc="https://lh3.googleusercontent.com/n0b56kch-N8fU1nDux908bHbp3H4to6hQ3DNbLxpym4uNusJCIrmt--fFzNFIpHAcT82DwrUePNj0O2LiJHZRjZX=s1280-w1280-h800"
          className="amber-red"
          alt="GM Pro participants list shuffler for random attendee selection"
        />
      </FeatureSection>
    </>
  );
};
