"use client";
import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
// import CloseIcon from '@mui/icons-material/Close';

export default function CommentGenerator() {
  const [open, setOpen] = useState(false);

  const copyTextHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const cardContent = event.currentTarget.parentNode?.querySelector(
      ".MuiCardContent-root"
    ) as HTMLElement;
    const text = cardContent?.textContent?.trim();
    if (text) {
      navigator.clipboard.writeText(text);
      setOpen(true);
    }
  };
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        Zatvori
      </Button>
    </>
  );

  return (
    <Box
      className="flex flex-col justify-center items-center w-full"
      component="form"
      noValidate
      autoComplete="off"
    >
      <div className="flex flex-col gap-10 items-center w-full ">
        <TextField
          label="Unos naslova članka"
          multiline
          rows={2}
          placeholder="Unesi naslov članka ovdje ili klikni na neki od ponuđenih naslova."
          variant="standard"
          style={{ width: "91.66%", color: "white" }}
        />

        <Card className="flex justify-between items-center justify-center gap-3 px-2 dark:text-white dark:bg-gray-800 w-11/12">
          <CardContent className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatum, quibusdam, quia, quod voluptates voluptatem
          </CardContent>
          <Button variant="outlined" onClick={copyTextHandler}>
            Copy
          </Button>
        </Card>
      </div>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        message="Komentar je kopiran."
        action={action}
      />
    </Box>
  );
}
