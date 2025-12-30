import { useEffect } from "react";
import { useZustandStore } from "@root/src/shared/hooks/useGeneralZustandStore";
import { useCallback } from "react";

const STRIKE_DATA = {
  uppercase: {
    A: "𝘈",
    B: "𝘉",
    C: "𝘊",
    D: "𝘋",
    E: "𝘌",
    F: "𝘍",
    G: "𝘎",
    H: "𝘏",
    I: "𝘐",
    J: "𝘑",
    K: "𝘒",
    L: "𝘓",
    M: "𝘔",
    N: "𝘕",
    O: "𝘖",
    P: "𝘗",
    Q: "𝘘",
    R: "𝘙",
    S: "𝘚",
    T: "𝘛",
    U: "𝘜",
    V: "𝘝",
    W: "𝘞",
    X: "𝘟",
    Y: "𝘠",
    Z: "𝘡",
  },
  lowercase: {
    a: "𝘢",
    b: "𝘣",
    c: "𝘤",
    d: "𝘥",
    e: "𝘦",
    f: "𝘧",
    g: "𝘨",
    h: "𝘩",
    i: "𝘪",
    j: "𝘫",
    k: "𝘬",
    l: "𝘭",
    m: "𝘮",
    n: "𝘯",
    o: "𝘰",
    p: "𝘱",
    q: "𝘲",
    r: "𝘳",
    s: "𝘴",
    t: "𝘵",
    u: "𝘶",
    v: "𝘷",
    w: "𝘸",
    x: "𝘹",
    y: "𝘺",
    z: "𝘻",
  },
  digits: {
    "0": "𝟢",
    "1": "𝟣",
    "2": "𝟤",
    "3": "𝟥",
    "4": "𝟦",
    "5": "𝟧",
    "6": "𝟨",
    "7": "𝟩",
    "8": "𝟪",
    "9": "𝟫",
  },
  diacritic: "̶",
};

const isStrike = (text: string): boolean => {
  return text.includes(STRIKE_DATA.diacritic);
};

const addStrike = (text: string): string => {
  return [...text]
    .map((char) => {
      if (char === " " || char === "\n") return char;

      const chicChar =
        STRIKE_DATA.uppercase[char] ||
        STRIKE_DATA.lowercase[char] ||
        STRIKE_DATA.digits[char] ||
        char;

      return chicChar + STRIKE_DATA.diacritic;
    })
    .join("");
};

const removeStrike = (text: string): string => {
  const reverseMap = new Map(
    [
      ...Object.entries(STRIKE_DATA.uppercase),
      ...Object.entries(STRIKE_DATA.lowercase),
      ...Object.entries(STRIKE_DATA.digits),
    ].map(([k, v]) => [v, k])
  );

  return text
    .replace(new RegExp(STRIKE_DATA.diacritic, "g"), "")
    .split("")
    .map((char) => reverseMap.get(char) || char)
    .join("");
};

const normalizeText = (text: string): string => {
  // Remove  strike first
  if (isStrike(text)) {
    text = removeStrike(text);
  }

  // Remove bold
  if (isStyled(text, BOLD_MAP)) {
    text = removeStyle(text, BOLD_MAP);
  }

  // Remove italic
  if (isStyled(text, ITALIC_MAP)) {
    text = removeStyle(text, ITALIC_MAP);
  }

  return text;
};

const toggleChicStrike = (text: string): string => {
  const normalText = normalizeText(text);
  return isStrike(text) ? normalText : addStrike(normalText);
};

const BOLD_MAP = {
  uppercase: {
    A: "𝗔",
    B: "𝗕",
    C: "𝗖",
    D: "𝗗",
    E: "𝗘",
    F: "𝗙",
    G: "𝗚",
    H: "𝗛",
    I: "𝗜",
    J: "𝗝",
    K: "𝗞",
    L: "𝗟",
    M: "𝗠",
    N: "𝗡",
    O: "𝗢",
    P: "𝗣",
    Q: "𝗤",
    R: "𝗥",
    S: "𝗦",
    T: "𝗧",
    U: "𝗨",
    V: "𝗩",
    W: "𝗪",
    X: "𝗫",
    Y: "𝗬",
    Z: "𝗭",
    0: "𝟬",
    1: "𝟭",
    2: "𝟮",
    3: "𝟯",
    4: "𝟰",
    5: "𝟱",
    6: "𝟲",
    7: "𝟳",
    8: "𝟴",
    9: "𝟵",
  },
  lowercase: {
    a: "𝗮",
    b: "𝗯",
    c: "𝗰",
    d: "𝗱",
    e: "𝗲",
    f: "𝗳",
    g: "𝗴",
    h: "𝗵",
    i: "𝗶",
    j: "𝗷",
    k: "𝗸",
    l: "𝗹",
    m: "𝗺",
    n: "𝗻",
    o: "𝗼",
    p: "𝗽",
    q: "𝗾",
    r: "𝗿",
    s: "𝘀",
    t: "𝘁",
    u: "𝘂",
    v: "𝘃",
    w: "𝘄",
    x: "𝘅",
    y: "𝘆",
    z: "𝘇",
  },
};

const ITALIC_MAP = {
  uppercase: {
    A: "𝘈",
    B: "𝘉",
    C: "𝘊",
    D: "𝘋",
    E: "𝘌",
    F: "𝘍",
    G: "𝘎",
    H: "𝘏",
    I: "𝘐",
    J: "𝘑",
    K: "𝘒",
    L: "𝘓",
    M: "𝘔",
    N: "𝘕",
    O: "𝘖",
    P: "𝘗",
    Q: "𝘘",
    R: "𝘙",
    S: "𝘚",
    T: "𝘛",
    U: "𝘜",
    V: "𝘝",
    W: "𝘞",
    X: "𝘟",
    Y: "𝘠",
    Z: "𝘡",
  },
  lowercase: {
    a: "𝘢",
    b: "𝘣",
    c: "𝘤",
    d: "𝘥",
    e: "𝘦",
    f: "𝘧",
    g: "𝘨",
    h: "𝘩",
    i: "𝘪",
    j: "𝘫",
    k: "𝘬",
    l: "𝘭",
    m: "𝘮",
    n: "𝘯",
    o: "𝘰",
    p: "𝘱",
    q: "𝘲",
    r: "𝘳",
    s: "𝘴",
    t: "𝘵",
    u: "𝘶",
    v: "𝘷",
    w: "𝘸",
    x: "𝘹",
    y: "𝘺",
    z: "𝘻",
  },
};

const addStyle = (
  text: string,
  styleMap: typeof BOLD_MAP | typeof ITALIC_MAP
): string => {
  return [...text]
    .map((char) => {
      if (char === " " || char === "\n") return char;
      return styleMap.uppercase[char] || styleMap.lowercase[char] || char;
    })
    .join("");
};

const removeStyle = (
  text: string,
  styleMap: typeof BOLD_MAP | typeof ITALIC_MAP
): string => {
  const reverseMap = new Map(
    [
      ...Object.entries(styleMap.uppercase),
      ...Object.entries(styleMap.lowercase),
    ].map(([k, v]) => [v, k])
  );

  return [...text].map((char) => reverseMap.get(char) || char).join("");
};

const isStyled = (
  text: string,
  styleMap: typeof BOLD_MAP | typeof ITALIC_MAP
): boolean => {
  const styledChars = new Set([
    ...Object.values(styleMap.uppercase),
    ...Object.values(styleMap.lowercase),
  ]);
  return [...text].some((char) => styledChars.has(char));
};

const toggleBold = (text: string): string => {
  const normalText = normalizeText(text);
  return isStyled(text, BOLD_MAP) ? normalText : addStyle(normalText, BOLD_MAP);
};

const toggleItalic = (text: string): string => {
  const normalText = normalizeText(text);
  return isStyled(text, ITALIC_MAP)
    ? normalText
    : addStyle(normalText, ITALIC_MAP);
};

const STYLE_MARKERS = {
  bold: { start: "*", end: "*" },
  italic: { start: "_", end: "_" },
  strikethrough: { start: "~", end: "~" },
} as const;

const hasCompleteStyleMarkers = (
  text: string,
  style: keyof typeof STYLE_MARKERS
) => {
  const { start, end } = STYLE_MARKERS[style];
  // Must be at least 3 chars (start marker, content, end marker)
  if (text.length < 3) return false;
  return text.startsWith(start) && text.endsWith(end);
};

const transformMarkedText = (text: string): string => {
  // Must be at least 3 chars (start marker, content, end marker)
  if (text.length < 3) return text;

  if (hasCompleteStyleMarkers(text, "bold")) {
    const innerText = text.slice(1, -1);
    const normalText = normalizeText(innerText);
    return addStyle(normalText, BOLD_MAP);
  }
  if (hasCompleteStyleMarkers(text, "italic")) {
    const innerText = text.slice(1, -1);
    const normalText = normalizeText(innerText);
    return addStyle(normalText, ITALIC_MAP);
  }
  if (hasCompleteStyleMarkers(text, "strikethrough")) {
    const innerText = text.slice(1, -1);
    const normalText = normalizeText(innerText);
    return addStrike(normalText);
  }
  return text;
};

const handleToggle = (inputRef, message, setMessage, toggleFunction) => {
  const textarea = inputRef.current;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = message.substring(start, end);

  if (selectedText) {
    const toggledText = toggleFunction(selectedText);
    const newText =
      message.substring(0, start) + toggledText + message.substring(end);
    setMessage(newText);

    // Restore selection
    setTimeout(() => {
      textarea.selectionStart = start;
      textarea.selectionEnd = start + toggledText.length;
      textarea.focus();
    }, 0);
  }
};

const applyBoldToText = (text: string): string => addStyle(text, BOLD_MAP);

export const useTextTransform = (inputRef) => {
  const message = useZustandStore((state) => state.message);
  const setMessage = useZustandStore((state) => state.setMessage);

  const handleStrikethroughToggle = useCallback(
    () => handleToggle(inputRef, message, setMessage, toggleChicStrike),
    [inputRef, message, setMessage]
  );
  const handleBoldToggle = useCallback(
    () => handleToggle(inputRef, message, setMessage, toggleBold),
    [inputRef, message, setMessage]
  );
  const handleItalicToggle = useCallback(
    () => handleToggle(inputRef, message, setMessage, toggleItalic),
    [inputRef, message, setMessage]
  );

  const handleTextTransform = (text) => {
    const words = text.split(" ");
    const transformedWords = words.map((word) => transformMarkedText(word));
    setMessage(transformedWords.join(" "));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "b" || e.key === "B") {
          e.preventDefault();
          handleBoldToggle();
        } else if (e.key === "i" || e.key === "I") {
          e.preventDefault();
          handleItalicToggle();
        } else if (e.shiftKey && (e.key === "x" || e.key === "X")) {
          e.preventDefault();
          handleStrikethroughToggle();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleBoldToggle, handleItalicToggle, handleStrikethroughToggle]);

  return {
    handleBoldToggle,
    handleItalicToggle,
    handleStrikethroughToggle,
    handleTextTransform,
    applyBoldToText,
  };
};
