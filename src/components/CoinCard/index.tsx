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
import {
  postCryptoCurrency,
  deleteCryptoCurrency,
} from "../../services/CryptoCurrencyApi";

interface Props {
  name: string;
  symbol: string;
  quote: any;
  savedCoins: any;
  setSavedCoins: any;
}

export const CoinCard: FC<Props> = ({
  name,
  symbol,
  quote,
  savedCoins,
  setSavedCoins,
}) => {
  // recoil
  const isLogedUser = useRecoilValue(isLoggedState);
  const setLoginModal = useSetRecoilState(loginUserModalState);

  const [added, setAdded] = useState(
    savedCoins ? savedCoins.some((coin: any) => coin.alias === symbol) : false
  );

  const handleAdded = () => {
    if (isLogedUser) {
      setAdded(!added);
      if (!added) {
        postCryptoCurrency({
          name: name,
          alias: symbol,
          enabled: true,
        })
          .then(({ data }) => {
            if (data.ok) {
              setSavedCoins([...savedCoins, data.currency]);
              toast.success("Currency successfully added");
            }
          })
          .catch((err) => {
            setAdded(false);
            toast.error(err.response.data.err.message);
          });
      } else {
        deleteCryptoCurrency(
          savedCoins.find((coin: any) => coin.alias === symbol)._id
        ).then(({ data }) => {
          if (data.ok) {
            setSavedCoins(
              savedCoins.filter(
                (coin: any) => coin._id !== data.deletedCurrency._id
              )
            );
            toast.success("Currency successfully removed");
          }
        });
      }
    } else {
      setLoginModal(true);
    }
  };

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
