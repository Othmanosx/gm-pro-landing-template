import React, { RefObject } from "react";
import { useTextTransform } from "../useTextTransform";
import SendToSelector from "../SendToSelector";
import { Divider, IconButton, Tooltip } from "@mui/material";
import { FormatBold, FormatItalic } from "@mui/icons-material";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";

interface Props {
  inputRef: RefObject<HTMLTextAreaElement | null>;
}

const ShortcutButton = ({
  title,
  onClick,
  Icon,
}: {
  title: React.ReactNode;
  onClick: () => void;
  Icon: React.ElementType;
}) => (
  <Tooltip
    title={<div style={{ textAlign: "center" }}>{title}</div>}
    placement="top"
    PopperProps={{ style: { zIndex: 9 }, disablePortal: true }}
    arrow
  >
    <IconButton onClick={onClick} sx={{ p: 0 }}>
      <Icon
        sx={{
          color: "#fff",
          // input background color
          stroke: "#202124",
          strokeWidth: 1,
        }}
      />
    </IconButton>
  </Tooltip>
);

const InputHeader = ({ inputRef }: Props) => {
  const { handleBoldToggle, handleItalicToggle, handleStrikethroughToggle } =
    useTextTransform(inputRef as RefObject<HTMLTextAreaElement>);

  const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const boldShortcut = isMac ? "⌘ + B" : "Ctrl + B";
  const italicShortcut = isMac ? "⌘ + I" : "Ctrl + I";
  const strikethroughShortcut = isMac ? "⌘ + Shift + X" : "Ctrl + Shift + X";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        margin: "8px",
        gap: "12px",
        marginBottom: "0px",
      }}
    >
      <SendToSelector />
      <Divider orientation="vertical" flexItem />
      <ShortcutButton
        title={
          <>
            Bold
            <br />({boldShortcut})
          </>
        }
        onClick={handleBoldToggle}
        Icon={FormatBold}
      />
      <ShortcutButton
        title={
          <>
            Italic
            <br />({italicShortcut})
          </>
        }
        onClick={handleItalicToggle}
        Icon={FormatItalic}
      />
      <ShortcutButton
        title={
          <>
            Strikethrough
            <br />({strikethroughShortcut})
          </>
        }
        onClick={handleStrikethroughToggle}
        Icon={StrikethroughSIcon}
      />
    </div>
  );
};

export default InputHeader;
