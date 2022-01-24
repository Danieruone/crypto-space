import { FC, useState } from "react";

// mui
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

// components
import { AuthUserForm } from "../AuthUserForm";

interface Props {
  loginModal: boolean;
  handleClose: any;
}

export const LoginUserModal: FC<Props> = ({ loginModal, handleClose }) => {
  const [isLoginForm, setIsLoginForm] = useState(false);
  return (
    <Dialog
      open={loginModal}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{isLoginForm ? "Login" : "Register"}</DialogTitle>
      <DialogContent>
        <AuthUserForm
          isLoginForm={isLoginForm}
          setIsLoginForm={setIsLoginForm}
          handleClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};
