"use client";

import { useState } from "react";

import { Button, Card, CardContent, Snackbar } from "@mui/material";

export default function CommentCard({
  comment,
  article,
}: {
  comment: string;
  article: string;
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");

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
        console.log(data, "data");
        setOpen(true);
        setMessage(data.message);
      } else {
        const errorMessage = await response.json();
        console.log(errorMessage, "error");
        setOpen(true);
        setMessage(errorMessage.message);
      }
    } catch (error: any) {
      setOpen(true);
      console.log(error, "aaa");
    }
  };

  const copyTextHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const cardContent = event.currentTarget.parentNode?.querySelector(
      ".MuiCardContent-root"
    ) as HTMLElement;
    const text = cardContent?.textContent?.trim();
    if (text) {
      navigator.clipboard.writeText(text);
      setOpen(true);
      setMessage("Komentar je kopiran!");
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <Button color="secondary" size="small" onClick={handleClose}>
      Zatvori
    </Button>
  );
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
        onClose={handleClose}
        autoHideDuration={3000}
        message={message}
        action={action}
      />
    </>
  );
}
