import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useMediaQuery } from "@mui/material";

export default function SignUpPage() {
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <SignUp
      appearance={{
        baseTheme: darkMode ? dark : undefined,
      }}
    />
  );
}
