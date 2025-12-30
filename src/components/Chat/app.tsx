import ChatRoom from "./ChatRoom";
import Header from "./Header";
import { Divider, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMemo } from "react";

import { useUsers } from "./useUsers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ currentMeetId }: { currentMeetId: string }) {
  useUsers({ currentMeetId });

  const queryClient = new QueryClient();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
        },
        components: {
          MuiAvatarGroup: {
            styleOverrides: {
              root: {
                "& .MuiAvatar-root": {
                  width: 29,
                  height: 29,
                },
              },
            },
          },
          MuiAvatar: {
            styleOverrides: {
              root: {
                width: 29,
                height: 29,
                transition: "all 0.1s ease-in-out",
                "&:hover": {
                  margin: "0 !important",
                },
              },
            },
          },
        },
      }),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack
          style={{
            backgroundColor: "#000",
            colorScheme: "dark",
          }}
          justifyContent="space-between"
          direction="column"
          height="100%"
        >
          <Header />
          <Divider />
          <ChatRoom currentMeetId={currentMeetId} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
