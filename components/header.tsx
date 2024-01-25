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
  console.log(pathname);

  return (
    <>
      <div className="flex justify-center w-full border-x-0 border-y-0 border-b-2 border-solid border-gray-700 dark:border-gray-200 bg-gray-500 dark:bg-gray-800 mb-5">
        <div
          className={`flex justify-between items-center text-white md:11/12 w-full px-5 py-5 md:px-10 md:py-5 ${
            pathname === "/" && "md:w-3/4"
          }`}
        >
          <div onClick={() => router.push("/")} className="cursor-pointer">
            <div className="flex flex-col md:flex-row items-start justify-center gap-5">
              <Image src={Logo} alt="Klix.ba" width={100} />
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
      </div>
      <div className="flex w-full justify-start">
        {pathname !== "/" && user.isSignedIn && (
          <div className=" px-5 mb-10">
            <Button variant="outlined" onClick={() => router.back()}>
              Nazad
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
