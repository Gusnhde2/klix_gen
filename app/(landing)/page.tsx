"use client";
import CommentCard from "@/components/comment-card";
import { useUser } from "@clerk/nextjs";
import { Button, ButtonGroup, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [comments, setComments] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const user = useUser();

  const router = useRouter();

  const getCommentsHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/comments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const comments = await response.json();
        setComments(comments.comments);
        setLoading(false);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCommentsHandler();
  }, []);

  return (
    <div className="flex flex-col gap-5 px-3">
      <ButtonGroup variant="text" aria-label="text button group">
        <Button onClick={() => router.push("/generate")}>
          Generiši komentar
        </Button>
        {user.isSignedIn && (
          <Button onClick={() => router.push("/saved-comments")}>
            Moji komentari
          </Button>
        )}
      </ButtonGroup>
      {loading && (
        <div className="flex justify-center w-full">
          <CircularProgress />
        </div>
      )}
      {comments.map((comments: any) => (
        <CommentCard
          key={comments.postId}
          variant="home"
          comment={comments.comment}
          article={comments.article}
          createdAt={new Date(comments.createdAt).toLocaleDateString()}
          userName={comments.userName}
        />
      ))}
    </div>
  );
}
