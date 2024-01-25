"use client";
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useMediaQuery } from "@mui/material";

export default function ProfilePage() {
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <UserProfile
      appearance={{
        baseTheme: darkMode ? dark : undefined,
      }}
    />
  );
}
