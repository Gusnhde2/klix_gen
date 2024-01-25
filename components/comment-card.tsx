"use client";

import { useState } from "react";

import useComment from "@/hooks/useComment";
import { useUser } from "@clerk/nextjs";
import {
  ContentCopy,
  DeleteForever,
  Favorite,
  FavoriteBorder,
  SaveAlt,
} from "@mui/icons-material";
import {
  Alert,
  AlertColor,
  Button,
  IconButton,
  Snackbar,
  useMediaQuery,
} from "@mui/material";

interface CommentCardProps {
  comment: string;
  article: string;
  createdAt?: string;
  userName?: string;
  postId?: string;
  deleteComment?: (event: any) => void;
  variant?: "generate" | "saved" | "home" | "upgrade";
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

  const darkTheme = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between w-full items-center justify-center gap-1 p-3 md:px-10 md:py-5 dark:text-white dark:bg-gray-800 bg-slate-300 w-11/12 rounded-lg border-slate-800">
        <div className="flex flex-col">
          {variant !== "generate" && <h4 className="text-left">{article}</h4>}
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
                <Favorite fontSize="inherit" sx={{ color: "#FF4033" }} />
              ) : (
                <FavoriteBorder
                  fontSize="inherit"
                  sx={{ color: `${darkTheme ? "#FFF" : "#000"}` }}
                />
              )}
            </IconButton>
          )}
          <Button variant="outlined" onClick={copyTextHandler}>
            <ContentCopy />
          </Button>

          {variant === "saved" && (
            <Button variant="outlined" onClick={deleteComment}>
              <DeleteForever />
            </Button>
          )}
          {variant === "generate" && (
            <Button variant="outlined" onClick={saveCommentHandler}>
              <SaveAlt />
            </Button>
          )}
        </div>
      </div>
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
