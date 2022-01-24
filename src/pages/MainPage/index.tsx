import { useState } from "react";

// mui
import {
  Container,
  Grid,
  Typography,
  Chip,
  Stack,
  Avatar,
} from "@mui/material";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoggedState } from "../../state/atoms/auth";
import { loginUserModalState } from "../../state/atoms/modal";
import { userInfoState } from "../../state/atoms/user";

// components
import { LoginUserModal } from "../../components/LoginUserModal";

// styles
import { LoginButton } from "./styles";

// components
import { ListCryptoCurrencies } from "../../components/ListCryptoCurrencies";

export const MainPage = () => {
  // recoil
  const isLogedUser = useRecoilValue(isLoggedState);
  const userInfo = useRecoilValue(userInfoState);
  const [loginModal, setLoginModal] = useRecoilState(loginUserModalState);

  const [currentOption, setcurrentOption] = useState(0);

  const handleClose = () => {
    setLoginModal(false);
  };

  return (
    <>
      <Container style={{ paddingTop: 50 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant={"h4"}>Crypto Space</Typography>
          </Grid>
          <Grid item xs={4} style={{ display: "flex", justifyContent: "end" }}>
            {!isLogedUser ? (
              <LoginButton onClick={() => setLoginModal(true)}>
                Login
              </LoginButton>
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar style={{ marginRight: 10 }}>
                  {userInfo.name.split("")[0]}
                </Avatar>
                <Typography variant={"h5"}>{userInfo.name}</Typography>
              </div>
            )}
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              <Chip
                label="Trending coins 🔥"
                variant={currentOption === 0 ? "filled" : "outlined"}
                onClick={() => setcurrentOption(0)}
              />
              <Chip
                label="Your coins 📘"
                variant={currentOption === 1 ? "filled" : "outlined"}
                onClick={() => {
                  if (isLogedUser) {
                    setcurrentOption(1);
                  } else {
                    setLoginModal(true);
                  }
                }}
              />
            </Stack>
          </Grid>
          <ListCryptoCurrencies currentOption={currentOption} />
        </Grid>
      </Container>

      <LoginUserModal loginModal={loginModal} handleClose={handleClose} />
    </>
  );
};
