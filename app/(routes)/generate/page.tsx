"use client";
import { useEffect, useState } from "react";

import Articles from "@/components/articles";
import CommentGenerator from "@/components/comment-generator";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProgressBar from "@/components/progress-bar";
import { MAX_FREE_COUNTS } from "@/constants";

const darkTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

const getLimit = async () => {
  const response = await fetch("/api/api-limit", {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export default function Home() {
  const [limit, setLimit] = useState<{ limit: number; count: number }>({
    limit: MAX_FREE_COUNTS,
    count: 0,
  });
  const [article, setArticle] = useState<string>("");
  const [generating, setGenerating] = useState<boolean>(false);

  useEffect(() => {
    getLimit().then((data) => {
      setLimit(data);
    });
  }, [generating]);

  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const generatingHandler = () => {
    setGenerating((prev) => !prev);
  };

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
        <div>
          <ProgressBar
            generationsCount={limit.count}
            availableCount={limit.limit}
          />
          <CommentGenerator
            selectedArticle={article}
            generating={generatingHandler}
          />
        </div>
        <Articles selectedArticle={selectedArticleHandler} />
      </div>
    </ThemeProvider>
  );
}
