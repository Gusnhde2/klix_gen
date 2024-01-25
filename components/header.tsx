"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import Logo from "@/public/logo-dark.svg";
import { useUser } from "@clerk/nextjs";
import { Button } from "@mui/material";

import ProfileButton from "./profile-button";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useUser();

  return (
    <>
      <div className="flex justify-between items-center text-white px-5 py-5 md:px-10 md:py-5  border-x-0 border-y-0 border-b-2 border-solid border-gray-700 dark:border-gray-200 bg-gray-500 dark:bg-gray-800">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          <div className="flex flex-col md:flex-row items-start justify-center gap-5">
            <Image src={Logo} alt="Klix.ba" width={150} />
            <div className="hidden md:flex justify-center m-0 text-xs md:text-xl">
              <h4>Generiši komentar za Klix.ba</h4>
            </div>
          </div>
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
      <div className="md:m-10 mx-3 my-5">
        {pathname !== "/" && (
          <Button variant="outlined" onClick={() => router.back()}>
            Nazad
          </Button>
        )}
      </div>
    </>
  );
}
