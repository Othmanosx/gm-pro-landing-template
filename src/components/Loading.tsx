import { Box, CircularProgress, Typography, Stack, Paper } from "@mui/material";

interface LoadingProps {
  message?: string;
  size?: number;
  fullScreen?: boolean;
}

export default function Loading({
  message = "Loading...",
  size = 48,
}: LoadingProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", pt: 3, pb: 3 }}>
      <Stack
        direction="column"
        spacing={1}
        alignItems="center"
        sx={{ width: "100%", maxWidth: 420 }}
      >
        <CircularProgress size={size} />
        <Typography variant="body2">{message}</Typography>
      </Stack>
    </Box>
  );
}
