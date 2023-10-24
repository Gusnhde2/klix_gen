"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { Button } from "@mui/material";
import ProfileButton from "./profile-button";

export default function Header() {
  const router = useRouter();
  const user = useUser();
  return (
    <div className="flex justify-between items-center text-white px-5 py-5 md:px-10 md:py-5 mb-10 md:mb-20 border-x-0 border-y-0 border-b-2 border-solid border-gray-700 dark:border-gray-200 bg-gray-500 dark:bg-gray-800">
      <div onClick={() => router.push("/")} className="cursor-pointer">
        <h1 className="m-0 text-sm md:text-4xl">KLIX COMMENT GEN</h1>
        <h4 className="m-0 text-xs md:text-xl">Generiši komentar za Klix.ba</h4>
      </div>
      {user.isSignedIn ? (
        <ProfileButton />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/sign-in")}
        >
          Login
        </Button>
      )}
    </div>
  );
}
