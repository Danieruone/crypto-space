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
  symbol: string;
  quote: any;
}

export const CoinCard: FC<Props> = ({ name, symbol, quote }) => {
  // recoil
  const isLogedUser = useRecoilValue(isLoggedState);
  const userInfo = useRecoilValue(userInfoState);
  const setLoginModal = useSetRecoilState(loginUserModalState);

  const [added, setadded] = useState(false);

  const handleAdded = () => {
    if (isLogedUser) {
      setadded(!added);
    } else {
      setLoginModal(true);
    }
  };

  useEffect(() => {
    if (added) {
      postCryptoCurrency({
        user_id: userInfo._id,
        name: name,
        alias: symbol,
        enabled: true,
      }).then((data) => toast.success("Successfull coin added"));
    }
  }, [added]);

  return (
    <Container>
      <Grid item xs={4} style={{ display: "flex" }}>
        <Typography style={{ marginRight: 20 }}>
          <strong>Name:</strong>
        </Typography>
        <Typography>{name}</Typography>
      </Grid>

      <Grid item xs={4} style={{ display: "flex" }}>
        <Typography style={{ marginRight: 20 }}>
          <strong>Alias:</strong>
        </Typography>
        <Typography>{symbol}</Typography>
      </Grid>

      <Grid item xs={6} style={{ display: "flex" }}>
        <Typography style={{ marginRight: 20 }}>
          <strong>Percent 24h:</strong>
        </Typography>
        <Typography
          style={{
            color:
              parseFloat(quote.USD.percent_change_24h) > 0.0
                ? "#16C784"
                : "#EA3943",
          }}
        >
          {parseFloat(quote.USD.percent_change_24h).toFixed(2)}%
        </Typography>
      </Grid>

      <Grid item xs={2} style={{ display: "flex", justifyContent: "end" }}>
        {added ? (
          <Button added={added} onClick={handleAdded}>
            {added ? "Remove" : "Add"}
          </Button>
        ) : (
          <Button added={added} onClick={handleAdded}>
            {added ? "Remove" : "Add"}
          </Button>
        )}
      </Grid>
    </Container>
  );
};
