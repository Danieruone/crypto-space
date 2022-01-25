import { useState } from "react";

// mui
import { Typography, Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// recoil
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedState } from "../../state/atoms/auth";
import { userInfoState } from "../../state/atoms/user";

export const UserInfoBLock = () => {
  const setUserInfo = useSetRecoilState(userInfoState);
  const setLogedState = useSetRecoilState(isLoggedState);
  const userInfo = useRecoilValue(userInfoState);

  // menu item
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear();
    setUserInfo({ user: "" });
    setLogedState(false);
    handleClose();
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar style={{ marginRight: 10 }}>{userInfo.name.split("")[0]}</Avatar>
      <Typography variant={"h5"}>{userInfo.name}</Typography>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
