"use client";
import { Snackbar } from "@mui/material";
import { Alert, AlertColor, Color } from "@mui/material";
import { useEffect, useState } from "react";

export default function SnackBar({
  message,
  severity,
  openSnackbar,
}: {
  message: string | null;
  severity: "success" | "error" | "warning" | "info";
  openSnackbar: boolean;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const reset = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(openSnackbar);
  }, [openSnackbar, message]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={severity as AlertColor}>{message}</Alert>
    </Snackbar>
  );
}
