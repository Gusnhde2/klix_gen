"use client";

import { useState } from "react";

import {
  Alert,
  AlertColor,
  Button,
  Card,
  IconButton,
  Snackbar,
} from "@mui/material";
import { useUser } from "@clerk/nextjs";
import useComment from "@/hooks/useComment";
import { FavoriteBorder, Favorite } from "@mui/icons-material";

interface CommentCardProps {
  comment: string;
  article: string;
  createdAt?: string;
  userName?: string;
  postId?: string;
  deleteComment?: (event: any) => void;
  variant?: "generate" | "saved" | "home";
}

export default function CommentCard({
  comment,
  article,
  variant,
  userName,
  createdAt,
  postId,
  deleteComment,
}: CommentCardProps) {
  const [commentLiked, setCommentLiked] = useState<boolean>(false);
  const user = useUser();

  const { message, open, severity, setOpen, saveComment, copyText } =
    useComment();

  const saveCommentHandler = async () => {
    saveComment(comment, article, user.user?.fullName ?? "");
  };

  const copyTextHandler = () => {
    copyText(comment);
  };

  return (
    <>
      <Card className="flex flex-col md:flex-row justify-between items-center justify-center gap-1 p-3 md:px-10 md:py-5 dark:text-white dark:bg-gray-800 w-11/12">
        <div className="flex flex-col">
          {variant === "saved" ||
            ("home" && <h4 className="text-left">{article}</h4>)}
          <p>{comment}</p>

          <div>
            {variant === "home" && <p className="text-sm">{userName}</p>}
            {variant === "saved" ||
              ("home" && <p className="text-sm">{createdAt}</p>)}
          </div>
        </div>
        <div className="flex gap-5">
          {variant === "home" && (
            <IconButton
              aria-label="like"
              size="large"
              onClick={() => setCommentLiked(!commentLiked)}
            >
              {commentLiked ? (
                <Favorite fontSize="inherit" sx={{ color: "#FFC0CB" }} />
              ) : (
                <FavoriteBorder fontSize="inherit" sx={{ color: "#FFF" }} />
              )}
            </IconButton>
          )}
          <Button variant="outlined" onClick={copyTextHandler}>
            Kopiraj
          </Button>
          {variant === "saved" && (
            <Button variant="outlined" onClick={deleteComment}>
              Izbriši
            </Button>
          )}
          {variant === "generate" && (
            <Button variant="outlined" onClick={saveCommentHandler}>
              Spremi
            </Button>
          )}
        </div>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={severity as AlertColor}>{message}</Alert>
      </Snackbar>
    </>
  );
}
