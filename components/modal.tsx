"use client";
// import { Backdrop } from "@mui/material";
import { use, useEffect, useState } from "react";
import { Box, Typography, Modal, Button, Snackbar, Alert } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ModalComponent({
  open,
  title,
  message,
}: {
  open: boolean;
  title: string;
  message: string;
}) {
  const [openModal, setOpen] = useState(true);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    setOpen(open);
  }, [open]);
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {message}
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setOpenSnack(true);
              setOpen(false);
            }}
          >
            Doplati
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={openSnack}
        autoHideDuration={1500}
        onClose={() => setOpenSnack(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="warning">Nije dostupno, u izradi!</Alert>
      </Snackbar>
    </>
  );
}
