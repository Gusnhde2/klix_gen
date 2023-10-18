"use client";
import CommentGenerator from "@/components/comment-generator";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function Home() {
  const isSystemDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <ThemeProvider theme={isSystemDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="flex gap-20">
        <CommentGenerator />
      </div>
    </ThemeProvider>
  );
}
