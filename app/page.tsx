"use client";
import Articles from "@/components/articles";
import CommentGenerator from "@/components/comment-generator";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";

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
  const [article, setArticle] = useState<string>("");

  const isSystemDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const selectedArticleHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const articleTitle = (event.target as HTMLDivElement).textContent;
    if (articleTitle) {
      setArticle(articleTitle);
      scrollTo(0, 0);
    } else {
      setArticle("");
    }
  };
  return (
    <ThemeProvider theme={isSystemDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="flex flex-col md:flex-row gap-5 md:gap-0">
        <CommentGenerator selectedArticle={article} />
        <Articles selectedArticle={selectedArticleHandler} />
      </div>
    </ThemeProvider>
  );
}
