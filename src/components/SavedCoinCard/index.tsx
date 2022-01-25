import { FC, useState } from "react";
import { toast } from "react-toastify";

// mui
import { Typography, Grid } from "@mui/material";

// styles
import { Container, Button } from "./style";

// recoil
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginUserModalState } from "../../state/atoms/modal";
import { isLoggedState } from "../../state/atoms/auth";

// services
import { putCryptoCurrency } from "../../services/CryptoCurrencyApi";

interface Props {
  name: string;
  alias: string;
  enabled: boolean;
  _id: string;
}

export const SavedCoinCard: FC<Props> = ({ name, alias, enabled, _id }) => {
  // recoil
  const isLogedUser = useRecoilValue(isLoggedState);
  const setLoginModal = useSetRecoilState(loginUserModalState);

  const [enabledState, setEnabledState] = useState(enabled);

  const handleEnabledChange = () => {
    if (isLogedUser) {
      setEnabledState(!enabledState);
      if (!enabledState) {
        putCryptoCurrency(_id, { enabled: true }).then(({ data }) => {
          if (data.ok) {
            toast.success("Currency successfully updated");
          }
        });
      } else {
        putCryptoCurrency(_id, { enabled: false }).then(({ data }) => {
          if (data.ok) {
            toast.success("Currency successfully updated");
          }
        });
      }
    } else {
      setLoginModal(true);
    }
  };

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
          {enabledState ? "Enabled" : "Disabled"}
        </Button>
      </Grid>
    </Container>
  );
};
