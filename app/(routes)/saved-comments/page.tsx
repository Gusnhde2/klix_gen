"use client";

import { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";
import { DeleteForeverOutlined } from "@mui/icons-material";
import {
  Alert,
  AlertColor,
  Button,
  CircularProgress,
  createTheme,
  Pagination,
  Snackbar,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";

const darkTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

export default function SavedComments() {
  const [comments, setComments] = useState<any[]>([]);
  const [paginatedComments, setPaginatedComments] = useState<any[]>([]);
  const [deleteMessage, setDeleteMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const severity =
    deleteMessage === "Komentar je izbrisan!" ? "success" : "error";

  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const user = useUser();

  const getComments = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/comments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
        setLoading(false);
      } else {
        const errorMessage = await response.json();
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getComments();
  }, []);

  const deleteCommentHandler = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const postId = event.currentTarget.id;

    try {
      const response = await fetch("/api/comments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });
      if (response.ok) {
        getComments();
        setDeleteMessage("Komentar je izbrisan!");
        setOpenSnackbar(true);
      } else {
        const errorMessage = await response.json();
        setDeleteMessage(errorMessage.message);
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error(error);
      setDeleteMessage("Greška prilikom brisanja komentara!");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    const startIndex = (page - 1) * 10;
    const endIndex = page * 10;
    setPaginatedComments(comments.slice(startIndex, endIndex));
  }, [page, comments]);

  return (
    <ThemeProvider theme={darkTheme(darkMode)}>
      <div className="flex flex-col items-center gap-10 dark:bg-neutral-900 dark:text-white md:p-10 p-3 min-h-screen">
        <h3 className="w-full text-left">
          Zdravo {user.user?.firstName}! Ovo je stranica Vaših spremljenih
          komentara.
        </h3>

        {paginatedComments.map((comment: any) => {
          return (
            <div
              key={comment.postId}
              className="flex flex-col w-11/12 md:w-full md:flex-row items-center justify-between px-5 pb-3 dark:bg-neutral-700 dark:text-white"
            >
              <div>
                <h4>{comment.article}</h4>
                <p>{comment.comment}</p>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col w-full">
                  <p className="m-0">Komentar kreiran:</p>
                  <span>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <Button
                  id={comment.postId}
                  variant="contained"
                  color="primary"
                  onClick={deleteCommentHandler}
                >
                  <DeleteForeverOutlined />
                </Button>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center items-center gap-5">
          <Pagination
            count={Math.ceil(comments.length / 10)}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        </div>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={1500}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={severity as AlertColor}>{deleteMessage}</Alert>
        </Snackbar>
        {loading && <CircularProgress />}
      </div>
    </ThemeProvider>
  );
}
