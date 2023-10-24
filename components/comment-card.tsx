"use client";

import { useState } from "react";

import {
  Alert,
  AlertColor,
  Button,
  Card,
  CardContent,
  Snackbar,
} from "@mui/material";

export default function CommentCard({
  comment,
  article,
}: {
  comment: string;
  article: string;
}) {
  const [status, setStatus] = useState<number>();
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const severity = status === 200 ? "success" : "error";

  const saveCommentHandler = async () => {
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, article }),
      });
      if (response.ok) {
        const data = await response.json();
        setStatus(data.status);
        setMessage(data.message);
        setOpen(true);
      } else {
        const errorMessage = await response.json();
        setStatus(errorMessage.status);
        setMessage(errorMessage.message);
        setOpen(true);
      }
    } catch (error: any) {
      setMessage(error.message);
      setOpen(true);
    }
  };

  const copyTextHandler = () => {
    if (comment) {
      navigator.clipboard.writeText(comment);
      setStatus(200);
      setMessage("Komentar je kopiran!");
      setOpen(true);
    }
  };

  return (
    <>
      <Card className="flex flex-col md:flex-row justify-between items-center justify-center gap-1 pb-3 md:px-10 md:py-5 dark:text-white dark:bg-gray-800 w-11/12">
        <CardContent>{comment}</CardContent>
        <div className="flex gap-5">
          <Button variant="outlined" onClick={copyTextHandler}>
            Kopiraj
          </Button>
          <Button variant="outlined" onClick={saveCommentHandler}>
            Spremi
          </Button>
        </div>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={severity as AlertColor}>{message}</Alert>
      </Snackbar>
    </>
  );
}
