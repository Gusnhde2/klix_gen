"use client";
import { useEffect, useState } from "react";

import { CircularProgress, FormControl } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

import CommentCard from "./comment-card";
import Modal from "./modal";

export default function CommentGenerator({
  selectedArticle,
  generating,
}: {
  selectedArticle: string;
  generating: () => void;
}) {
  const [article, setArticle] = useState<string>("");
  const [comment, setComment] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<{ error: string; message: string }>({
    error: "",
    message: "",
  });

  useEffect(() => {
    setArticle(selectedArticle);
  }, [selectedArticle]);

  const generateCommentHandler = async () => {
    setLoading(true);
    setModalOpen(false);
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
        if (data && data.message && data.message.content) {
          setComment(data.message.content);
          setLoading(false);
          generating();
        } else {
          setError(data.body);
          setModalOpen(true);
          setLoading(false);
        }
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
      {error.error && <Modal open={modalOpen} title={error.error} message="" />}

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
              Generiši komentar <KeyboardArrowRightIcon />
            </Button>
          </div>
        </Card>
        {loading && <CircularProgress />}
        {!loading && comment && (
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
