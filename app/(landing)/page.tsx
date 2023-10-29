"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import CommentCard from "@/components/comment-card";
import { useUser } from "@clerk/nextjs";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  createTheme,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";

const darkTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

export default function Home() {
  const [comments, setComments] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sorting, setSorting] = useState<string>("desc");
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const user = useUser();

  const router = useRouter();

  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const getCommentsHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/all-comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order: sorting, page: page }),
      });
      if (response.ok) {
        const comments = await response.json();
        setCommentsCount(comments.count);
        setComments(comments.comments);
        setLoading(false);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCommentsHandler();
  }, [sorting, page]);

  const sortingHandler = (event: { target: { value: string } }) => {
    setSorting(event.target.value);
    setPage(1);
  };

  return (
    <ThemeProvider theme={darkTheme(darkMode)}>
      <CssBaseline />
      <div className="flex flex-col gap-5 px-3 mb-10">
        <ButtonGroup variant="text" aria-label="text button group">
          <Button onClick={() => router.push("/generate")}>
            Generiši komentar
          </Button>
          {user.isSignedIn && (
            <Button onClick={() => router.push("/saved-comments")}>
              Moji komentari
            </Button>
          )}
        </ButtonGroup>
        <div>
          <FormControl>
            <InputLabel id="sorting-label">Sortiraj</InputLabel>
            <Select
              labelId="sorting-label"
              onChange={sortingHandler}
              value={sorting}
            >
              <MenuItem value="asc">Od najstarijeg</MenuItem>
              <MenuItem value="desc">Od najnovijeg</MenuItem>
            </Select>
          </FormControl>
        </div>
        {loading && (
          <div className="flex justify-center w-full">
            <CircularProgress />
          </div>
        )}
        {comments.map((comments: any) => (
          <CommentCard
            key={comments.postId}
            variant="home"
            comment={comments.comment}
            article={comments.article}
            createdAt={new Date(comments.createdAt).toLocaleDateString()}
            userName={comments.userName}
          />
        ))}
        <div className="flex justify-center w-full">
          <Pagination
            count={Math.ceil(commentsCount / 10)}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
