import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";

// mui
import { Typography, Grid } from "@mui/material";

// styles
import { Container, Button } from "./style";

// recoil
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginUserModalState } from "../../state/atoms/modal";
import { isLoggedState } from "../../state/atoms/auth";
import { userInfoState } from "../../state/atoms/user";

// services
import { postCryptoCurrency } from "../../services/CryptoCurrencyApi";

interface Props {
  name: string;
  alias: string;
  enabled: boolean;
}

export const SavedCoinCard: FC<Props> = ({ name, alias, enabled }) => {
  // recoil
  const isLogedUser = useRecoilValue(isLoggedState);
  const userInfo = useRecoilValue(userInfoState);
  const setLoginModal = useSetRecoilState(loginUserModalState);

  const [enabledState, setEnabledState] = useState(enabled);

  const handleEnabledChange = () => {
    if (isLogedUser) {
      setEnabledState(!enabledState);
    } else {
      setLoginModal(true);
    }
  };

  useEffect(() => {
    // if (added) {
    //   postCryptoCurrency({
    //     user_id: userInfo._id,
    //     name: name,
    //     alias: symbol,
    //     enabled: true,
    //   }).then((data) => toast.success("Successfull coin added"));
    // }
  }, [enabledState]);

  return (
    <Container>
      <Grid item xs={6} style={{ display: "flex" }}>
        <Typography style={{ marginRight: 20 }}>
          <strong>Name:</strong>
        </Typography>
        <Typography>{name}</Typography>
      </Grid>

      <Grid item xs={4} style={{ display: "flex" }}>
        <Typography style={{ marginRight: 20 }}>
          <strong>Alias:</strong>
        </Typography>
        <Typography>{alias}</Typography>
      </Grid>

      <Grid item xs={4} style={{ display: "flex", justifyContent: "end" }}>
        <Button enabled={enabledState} onClick={handleEnabledChange}>
          {enabled ? "Enabled" : "Disabled"}
        </Button>
      </Grid>
    </Container>
  );
};
