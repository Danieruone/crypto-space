import { useState, useEffect } from "react";

// mui
import { Container, Grid, Typography, Chip, Stack } from "@mui/material";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoggedState } from "../../state/atoms/auth";
import { loginUserModalState } from "../../state/atoms/modal";

// components
import { LoginUserModal } from "../../components/LoginUserModal";
import { UserInfoBLock } from "../../components/UserInfoBLock";
import { ListCryptoCurrencies } from "../../components/ListCryptoCurrencies";

// styles
import { LoginButton } from "./styles";

export const MainPage = () => {
  // recoil
  const isLogedUser = useRecoilValue(isLoggedState);
  const [loginModal, setLoginModal] = useRecoilState(loginUserModalState);

  const [currentOption, setcurrentOption] = useState(0);

  const handleClose = () => {
    setLoginModal(false);
  };

  useEffect(() => {
    if (!isLogedUser) {
      setcurrentOption(0);
    }
  }, [isLogedUser]);

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
              <UserInfoBLock />
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

          <Grid item xs={12} style={{ padding: "3rem 0 3rem 0" }}>
            <ListCryptoCurrencies currentOption={currentOption} />
          </Grid>
        </Grid>
      </Container>

      <LoginUserModal loginModal={loginModal} handleClose={handleClose} />
    </>
  );
};
