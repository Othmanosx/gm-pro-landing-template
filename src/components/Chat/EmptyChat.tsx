import { Stack } from "@mui/system";
import ChatBubblesImg from "@root/public/empty-chat.png";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

const MessageText = styled(motion.button)(({ theme }) => ({
  maxWidth: 250,
  margin: 0,
  position: "relative",
  padding: theme.spacing(1.5),
  border: "none",
  borderRadius: theme.spacing(1.5),
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  fontSize: 18,
  backgroundColor: "#35383b",
  color: "#ffffff",
  cursor: "pointer",
}));

type Props = {
  setMessage?: (message: string) => void;
  isTranscriptions?: boolean;
  location?: {
    ip: string;
    network: string;
    version: string;
    city: string;
    region: string;
    region_code: string;
    country: string;
    country_name: string;
    country_code: string;
    country_code_iso3: string;
    country_capital: string;
    country_tld: string;
    continent_code: string;
    in_eu: boolean;
    latitude: number;
    longitude: number;
    timezone: string;
    utc_offset: string;
    country_calling_code: string;
    currency: string;
    currency_name: string;
    languages: string;
    country_area: number;
    country_population: number;
    asn: string;
    org: string;
  };
};

const EMPTY_TITLES = [
  "It's so quiet here, I can hear my own code compiling.",
  "This chat is quieter than a library on a Friday night!",
  "It's so quiet here, you can hear a pin drop.",
  "Looks like everyone's playing hide and seek and forgot to come back!",
  "This chat is as empty as a movie theater on a Monday morning.",
  "I've seen ghost towns that are busier than this chat!",
  "This chat is as empty as my coffee cup on a Monday morning.",
  "It's so quiet here, even the crickets are bored.",
  "This chat is as empty as a vending machine after a lunch break.",
  "It's so quiet here, you can hear the digital tumbleweeds rolling by.",
  "This chat is as empty as my mind during a math test.",
  "It's so quiet here, even the echo is starting to feel lonely.",
  "This chat is as empty as a gym in the first week of February.",
  "It's so quiet here, I can hear the bytes shuffling in the memory.",
  "Chat's as lively as a deserted island.",
  "Quieter than a mouse's whisper in here!",
  "It's a ghost town in here!",
  "It's tumbleweed central here!",
  "It's a digital desert in here!",
  "It's as lively as a graveyard here!",
  "It's quieter than a mime's rehearsal in here!",
  "Chat's as empty as a politician's promises.",
  "Chat's as empty as a broken piggy bank.",
  "It's as lively as a chess tournament here!",
  "No one's home in this chat!",
  "Seems like everyone's on mute in here!",
  "What's the sound of one hand clapping? This chat!",
  "I wonder if the chat's on mute?",
  "I can hear the crickets in this chat!",
  "Could've sworn I heard an echo in here!",
  "Deafening silence in this chat!",
  "Where is everyone?",
  "Is this thing on?",
  "Yawwwwnnnn!",
  "Y u so quiet?",
  "Do you hear that? Me neither!",
  "Human.exe is not responding!",
  "Can I get a sound check?",
  "Poor chat, so lonely!",
  "Poof! Chat vanished!",
  "Don't be shy, say hi!",
  "Haha, very funny, guys!",
  "ahem... *taps mic*",
  "well, this is awkward...",
  "I'm talking to myself, aren't I?",
  "beep... boop... beep..., no response!",
  "Ah! The sweet sound of silence!",
  "I'm listening, but I don't hear anything!",
  "Gotta love the sound of silence!",
  "Dogs barking, birds chirping, chat... nothing!",
  "Gotcha! You're all playing hide and seek!",
  "I was told there'd be chat!",
  "Zero, zilch, nada!",
  "Shhh... I'm trying to listen to the chat!",
  "I'm all ears, but I don't hear anything!",
  "Code 404: speakers not found!",
  "Mornin' chat! ...chat?",
  "Sorry, I can't hear you over the silence!",
  "Goal: chat, reality: silence!",
  "What did you expect? A list of messages?",
  "Slow down, chat! You're too fast!",
  "Stares at chat... *tumbleweed rolls by*",
  "Chat's on vacation!",
];

const getLocationText = (location: Props["location"]) => {
  if (!location) return "Hello World 🌍";
  const { country_name, country_code } = location;

  // Get the country flag emoji from the country code
  const countryFlag = getCountryFlagEmoji(country_code);

  return `Hello from ${country_name} ${countryFlag}`;
};

const getCountryFlagEmoji = (countryCode: string) => {
  // Convert country code to regional indicator symbols
  // Each letter is represented by a regional indicator symbol emoji (127462 is the base codepoint for 'A')
  if (!countryCode || countryCode.length !== 2) return "🌍";

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
};

const EmptyChat = ({ setMessage, isTranscriptions, location }: Props) => {
  const locationText = getLocationText(location);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100%"
      textAlign="center"
      gap={2}
      mb={isTranscriptions ? 20 : 0}
    >
      <img
        src={ChatBubblesImg.src}
        style={{ maxWidth: 100 }}
        alt="chat-bubbles"
      />
      <div>
        <Typography mb={1} variant="h5" color={"white"}>
          {isTranscriptions
            ? EMPTY_TITLES[Math.floor(Math.random() * EMPTY_TITLES.length)]
            : "Chat is empty"}
        </Typography>
        <Typography
          mb={2}
          variant="h6"
          fontSize={20}
          fontWeight={300}
          color={"#919191"}
        >
          Be the one to break the ice
        </Typography>
      </div>
      {!isTranscriptions && (
        <>
          <MessageText
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMessage?.("Good morning 🌞")}
          >
            Good morning 🌞
          </MessageText>
          <MessageText
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMessage?.("Hey! 👋")}
          >
            Hey! 👋
          </MessageText>
          <MessageText
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMessage?.(locationText)}
          >
            {locationText}
          </MessageText>
        </>
      )}
    </Stack>
  );
};

export default EmptyChat;
