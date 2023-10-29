import { useUser } from "@clerk/nextjs";
import { useState } from "react";

const useComment = () => {
  const [status, setStatus] = useState<number | undefined>();
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const user = useUser();

  const severity = status === 200 ? "success" : "error";

  const saveComment = async (
    comment: string,
    article: string,
    userName: string
  ): Promise<void> => {
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, article, userName }),
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

  const copyText = (comment: string): void => {
    if (comment) {
      navigator.clipboard.writeText(comment);
      setStatus(200);
      setMessage("Komentar je kopiran!");
      setOpen(true);
    }
  };

  return {
    status,
    message,
    open,
    severity,
    setOpen,
    saveComment,
    copyText,
  };
};

export default useComment;
