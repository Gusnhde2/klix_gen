"use client";
import { useEffect, useState } from "react";

import { CircularProgress, FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

import CommentCard from "./comment-card";

export default function CommentGenerator({
  selectedArticle,
}: {
  selectedArticle: string;
}) {
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
      console.error(error);
      setLoading(false);
    }
  };

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
          <div className="w-11/12">
            <CommentCard
              comment={comment}
              article={article}
              variant="generate"
            />
          </div>
        )}
      </div>
    </Box>
  );
}
