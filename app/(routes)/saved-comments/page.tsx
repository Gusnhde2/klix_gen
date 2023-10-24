"use client";

import { useUser } from "@clerk/nextjs";
import { Button, Card, Paper } from "@mui/material";
import { get } from "https";
import { use, useEffect, useState } from "react";

// const comments = await fetch("/api/comments", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export default function SavedComments() {
  const [comments, setComments] = useState<any[]>([]);
  const user = useUser();

  const getComments = async () => {
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getComments();
  }, []);

  return (
    <Paper className="flex flex-col gap-10 dark:bg-neutral-900 dark:text-white md:p-10 p-3">
      <h3>
        Zdravo {user.user?.firstName}! Ovo je stranica Vaših spremljenih
        komentara.
      </h3>

      {comments.map((comment: any) => {
        return (
          <Card
            key={comment.postId}
            className="flex flex-col md:flex-row items-center justify-between px-5 pb-3 dark:bg-neutral-700 dark:text-white"
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
              <Button variant="contained" color="primary">
                Izbriši komentar
              </Button>
            </div>
          </Card>
        );
      })}
    </Paper>
  );
}
