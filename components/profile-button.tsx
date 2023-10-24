"use client";

import { Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ProfileButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useUser();
  const auth = useAuth();
  const router = useRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoToProfile = () => {
    router.push("/profile");
    setAnchorEl(null);
  };

  const handleGoToComments = () => {
    router.push("/saved-comments");
    setAnchorEl(null);
  };

  return (
    <div>
      <div onClick={handleClick}>
        <Avatar alt={`${user.user?.fullName}`} src={user.user?.imageUrl} />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleGoToProfile}>Profil</MenuItem>
        <MenuItem onClick={handleGoToComments}>Spremljeni komentari</MenuItem>
        <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
