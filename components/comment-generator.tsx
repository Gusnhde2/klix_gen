"use client";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import { CircularProgress, FormControl } from "@mui/material";

export default function CommentGenerator({
  selectedArticle,
}: {
  selectedArticle: string;
}) {
  const [open, setOpen] = useState(false);
  const [article, setArticle] = useState<string>("");
  const [comment, setComment] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setArticle(selectedArticle);
  }, [selectedArticle]);

  const generateCommentHandler = async () => {
    setComment(null);
    setLoading(true);
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: article }),
      });
      if (response.ok) {
        const data = await response.json();
        setComment(data.message.content);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        Zatvori
      </Button>
    </>
  );

  return (
    <Box
      className="flex flex-col items-center w-full"
      component="form"
      noValidate
      autoComplete="off"
    >
      <div className="flex flex-col gap-10 items-center w-full ">
        <Card className="flex flex-col p-5 md:p-10 gap-5 w-11/12">
          <FormControl fullWidth>
            <TextField
              id="outlined-multiline-static"
              label="Članak"
              multiline
              value={article}
              defaultValue={article}
              placeholder="Unesi naslov članka ili odaberi jedan od ponuđenih."
              onChange={(event) => setArticle(event.target.value)}
            />
          </FormControl>
          <div className="flex justify-end">
            <Button
              onClick={generateCommentHandler}
              variant="contained"
              color="success"
              size="large"
            >
              Generiši komentar
            </Button>
          </div>
        </Card>
        {loading && <CircularProgress />}
        {comment && (
          <Card className="flex flex-col md:flex-row justify-between items-center justify-center gap-1 p-5 md:px-10 dark:text-white dark:bg-gray-800 w-11/12">
            <CardContent>{comment}</CardContent>
            <Button variant="outlined" onClick={copyTextHandler}>
              Copy
            </Button>
          </Card>
        )}
      </div>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        message="Komentar je kopiran."
        action={action}
      />
    </Box>
  );
}
