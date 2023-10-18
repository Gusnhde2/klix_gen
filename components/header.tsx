"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center dark:text-white px-10 py-5 mb-20 bg-black">
      <div>
        <h1 className="m-0">KLIX COMMENT GEN</h1>
        <h4 className="m-0">
          Generate comments for your favorite Klix.ba articles
        </h4>
      </div>
      <Button variant="contained" color="primary">
        Login
      </Button>
    </div>
  );
}
