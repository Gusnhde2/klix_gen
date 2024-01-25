"use client";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useMediaQuery } from "@mui/material";

export default function SignInPage() {
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <SignIn
      appearance={{
        baseTheme: darkMode ? dark : undefined,
      }}
    />
  );
}
