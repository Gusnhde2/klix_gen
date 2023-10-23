"use client";

import { useUser } from "@clerk/nextjs";
import { Button, Card, Paper } from "@mui/material";

export default function SavedComments() {
  const user = useUser();

  return (
    <Paper className="flex flex-col gap-10 dark:bg-neutral-900 dark:text-white md:p-10 p-3">
      <h3>
        Zdravo {user.user?.firstName}! Ovo je stranica spremljenih komentara.
      </h3>
      <Card className="flex flex-col md:flex-row items-center justify-between px-5 pb-3 dark:bg-neutral-700 dark:text-white">
        <div>
          <h4>Ronaldo poručio gledateljima u zenici: nikad više aman</h4>
          <p>
            Ovdje će se nalaziti svi komentari koje ste spremili na bilo kojoj
            stranici.
          </p>
        </div>
        <div className="flex">
          <p>
            komentar kreiran: <span>12.10.2021.</span>
          </p>
          <Button variant="contained" color="primary">
            Izbriši komentar
          </Button>
        </div>
      </Card>
    </Paper>
  );
}
