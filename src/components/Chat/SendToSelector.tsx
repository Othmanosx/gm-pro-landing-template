import * as React from "react";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const MUIFormControl = styled(FormControl)(() => ({
  display: "flex",
  flexDirection: "row",
  gap: "8px",
  alignItems: "center",
  "& .MuiSelect-select": { padding: "4px 8px" },
  "& .MuiSvgIcon-root": { fontSize: "16px" },
  "& fieldset": { border: "none" },
}));

export default function SendToSelector() {
  return (
    <MUIFormControl>
      <span style={{ opacity: 0.6 }}>To:</span>
      <Select
        value={"all"}
        MenuProps={{ disablePortal: true }}
        sx={{
          fontSize: "11px",
          backgroundColor: "rgba(255, 255, 255, 0.09)",
        }}
        IconComponent={ExpandMoreRoundedIcon}
        disabled
      >
        <MenuItem value={"all"} title="All users in this call">
          All
        </MenuItem>
        <MenuItem value={"gm-pro"} title="users of the GM Pro extension">
          GM Pro users
        </MenuItem>
      </Select>
    </MUIFormControl>
  );
}
