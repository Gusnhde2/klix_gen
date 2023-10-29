"use client";
import { useState } from "react";

import Articles from "@/components/articles";
import CommentGenerator from "@/components/comment-generator";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const darkTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

export default function Home() {
  const [article, setArticle] = useState<string>("");

  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");

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
    <ThemeProvider theme={darkTheme(darkMode)}>
      <CssBaseline />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0">
        <CommentGenerator selectedArticle={article} />
        <Articles selectedArticle={selectedArticleHandler} />
      </div>
    </ThemeProvider>
  );
}
