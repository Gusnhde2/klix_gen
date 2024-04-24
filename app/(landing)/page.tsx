"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import CommentCard from "@/components/comment-card";
import { useUser } from "@clerk/nextjs";
import {
  Button,
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
  const [openSorting, setOpenSorting] = useState<boolean>(false);

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

  const handleClose = () => {
    setOpenSorting(false);
  };

  const handleOpen = () => {
    setOpenSorting(true);
  };

  return (
    <ThemeProvider theme={darkTheme(darkMode)}>
      <CssBaseline />
      <div className="flex flex-col gap-5 px-3 mb-10 justify-start align-start md:w-3/4 min-h-screen">
        <div className="flex align-center justify-between">
          <h4 className=" block md:text-lg w-1/2 md:w-auto self-center">
            Postani prosjecni Klix komentator kroz par klikova!
          </h4>
          <div className="self-center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/generate")}
              size="small"
            >
              Generiši komentar
            </Button>
          </div>
        </div>
        <div className="text-justify">
          <p>
            Ova stranica pokazuje moć umjetne inteligencije kroz humorističan
            prikaz komentara s portala klix.ba. Klikom na &quot;Generiraj
            komentar&quot; odaberite članak, generirajte komentar, kopirajte i
            zalijepite ga na članak jednostavnim klikom na poveznicu.
          </p>
        </div>
        <div className="md:w-3/4 flex align-center justify-between">
          <FormControl>
            <InputLabel id="sorting-label">Sortiraj</InputLabel>
            <Select
              labelId="sorting-label"
              id="sorting"
              onChange={sortingHandler}
              value={sorting}
              open={openSorting}
              onClose={handleClose}
              onOpen={handleOpen}
              label="Sortiraj"
            >
              <MenuItem value="asc">Od najstarijeg</MenuItem>
              <MenuItem value="desc">Od najnovijeg</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex flex-col w-full gap-3">
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
        </div>
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
