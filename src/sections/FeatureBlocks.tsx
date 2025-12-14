import { ReactNode } from "react";

import { Card } from "../components/Card";
import { Details } from "../components/Details";
import { GradientText } from "../components/GradientText";
import { Section } from "../components/Section";
import { Title } from "../components/Title";


const BlockTitle = ({ children }: { children: ReactNode }) => {
  return <h3 className="text-xl font-bold text-strong">{children}</h3>;
};

const BlockText = ({ children }: { children: ReactNode }) => {
  return <p className="text-light">{children}</p>;
};

const BlockIcon = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-16 h-16 p-1 mb-2 -mt-1 flex items-center justify-center text-4xl">
      {children}
    </div>
  );
};

const Block = ({ children }: { children: ReactNode }) => {
  return (
    <Card grayer className="items-center gap-1 p-6 col">
      {children}
    </Card>
  );
};

export const FeatureBlocks = () => {
  return (
    <Section className="gap-16 text-center">
      {/* Header */}
      <div className="gap-4 col">
        <Title size="md">
          Everything you need for{" "}
          <GradientText className="purple-teal">better meetings</GradientText>
        </Title>
        <Details>
          GM Pro is packed with features designed to enhance your Google Meet
          experience.
        </Details>
      </div>
      {/* Blocks */}
      <div className="grid items-start gap-6 lg:grid-cols-3 md:grid-cols-2">
        {/* Block 1 - Enhanced Chat */}
        <Block>
          <BlockIcon>💬</BlockIcon>
          <BlockTitle>Enhanced Chat Interface</BlockTitle>
          <BlockText>
            Feature-rich chat window with persistent chat history, even for late
            joiners
          </BlockText>
        </Block>
        {/* Block 2 - Dark Mode */}
        <Block>
          <BlockIcon>🌙</BlockIcon>
          <BlockTitle>Dark Mode for Chat</BlockTitle>
          <BlockText>
            Easily switch to dark mode for more comfort during long meetings
          </BlockText>
        </Block>
        {/* Block 3 - Auto Mic Muting */}
        <Block>
          <BlockIcon>🎤</BlockIcon>
          <BlockTitle>Auto Mic Muting</BlockTitle>
          <BlockText>
            Automatically mute your mic when entering a meeting for privacy
          </BlockText>
        </Block>
        {/* Block 4 - Auto Camera Disabling */}
        <Block>
          <BlockIcon>📷</BlockIcon>
          <BlockTitle>Auto Camera Disabling</BlockTitle>
          <BlockText>
            Automatically turn off your camera when you join to prevent
            unintentional exposure
          </BlockText>
        </Block>
        {/* Block 5 - Auto Join */}
        <Block>
          <BlockIcon>⏱️</BlockIcon>
          <BlockTitle>Auto Join Meetings</BlockTitle>
          <BlockText>
            Auto join scheduled meetings at the exact start time, or a few
            minutes later
          </BlockText>
        </Block>
        {/* Block 6 - Transcription */}
        <Block>
          <BlockIcon>📝</BlockIcon>
          <BlockTitle>Transcription Tab</BlockTitle>
          <BlockText>
            Scroll back through full realtime meeting transcriptions anytime
          </BlockText>
        </Block>
        {/* Block 7 - Lobby Notifier */}
        <Block>
          <BlockIcon>🔔</BlockIcon>
          <BlockTitle>Lobby Notifier</BlockTitle>
          <BlockText>
            Get a notification chime whenever someone joins the call
          </BlockText>
        </Block>
        {/* Block 8 - Reactions */}
        <Block>
          <BlockIcon>👍</BlockIcon>
          <BlockTitle>Message Reactions</BlockTitle>
          <BlockText>
            React to and see reactions on messages for more interactive chats
          </BlockText>
        </Block>
        {/* Block 9 - Mentions & Replies */}
        <Block>
          <BlockIcon>✉️</BlockIcon>
          <BlockTitle>Mention & Reply</BlockTitle>
          <BlockText>
            Quote and reply to messages for clearer, threaded communication
          </BlockText>
        </Block>
        {/* Block 10 - Image Sharing */}
        <Block>
          <BlockIcon>🖼️</BlockIcon>
          <BlockTitle>Image Sharing</BlockTitle>
          <BlockText>
            Send and receive images directly in the chat during meetings
          </BlockText>
        </Block>
        {/* Block 11 - GIF Search */}
        <Block>
          <BlockIcon>🎉</BlockIcon>
          <BlockTitle>GIF Search & Send</BlockTitle>
          <BlockText>
            Easily search for and send GIFs to add fun and expression to your
            chats
          </BlockText>
        </Block>
        {/* Block 12 - Attendee Shuffling */}
        <Block>
          <BlockIcon>🔄</BlockIcon>
          <BlockTitle>Attendee Shuffling</BlockTitle>
          <BlockText>
            Pick one person or shuffle the entire list — perfect for standups
            and retros
          </BlockText>
        </Block>
      </div>
    </Section>
  );
};
