"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center text-white px-5 py-5 md:px-10 md:py-5 mb-10 md:mb-20 bg-black">
      <div>
        <h1 className="m-0 text-sm md:text-4xl">KLIX COMMENT GEN</h1>
        <h4 className="m-0 text-xs md:text-xl">Generiši komentar za Klix.ba</h4>
      </div>
      <Button variant="contained" color="primary">
        Login
      </Button>
    </div>
  );
}
