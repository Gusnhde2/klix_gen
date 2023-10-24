"use client";

import { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";
import {
  Alert,
  AlertColor,
  Button,
  Card,
  CircularProgress,
  Paper,
  Snackbar,
} from "@mui/material";

export default function SavedComments() {
  const [comments, setComments] = useState<any[]>([]);
  const [deleteMessage, setDeleteMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const severity =
    deleteMessage === "Komentar je izbrisan!" ? "success" : "error";

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
  return (
    <Paper className="flex flex-col items-center gap-10 dark:bg-neutral-900 dark:text-white md:p-10 p-3">
      <h3 className="w-full text-left">
        Zdravo {user.user?.firstName}! Ovo je stranica Vaših spremljenih
        komentara.
      </h3>

      {comments.map((comment: any) => {
        return (
          <Card
            key={comment.postId}
            className="flex flex-col w-11/12 md:w-full md:flex-row items-center justify-between px-5 pb-3 dark:bg-neutral-700 dark:text-white"
          >
            <div>
              <h4>{comment.article}</h4>
              <p>{comment.comment}</p>
            </div>
            <div className="flex">
              <div className="flex flex-col w-full">
                <p className="m-0">Komentar kreiran:</p>
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
              <Button
                id={comment.postId}
                variant="contained"
                color="primary"
                onClick={deleteCommentHandler}
              >
                Izbriši komentar
              </Button>
            </div>
          </Card>
        );
      })}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={severity as AlertColor}>{deleteMessage}</Alert>
      </Snackbar>
      {loading && <CircularProgress />}
    </Paper>
  );
}
