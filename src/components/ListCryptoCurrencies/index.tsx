import { FC } from "react";

// mui
import { Grid } from "@mui/material";

// components
import { TrendingCoins } from "../TrendingCoins";
import { YourCoins } from "../YourCoins";

interface Props {
  currentOption: number;
}

export const ListCryptoCurrencies: FC<Props> = ({ currentOption }) => {
  return (
    <Grid item xs={12}>
      {currentOption === 0 && <TrendingCoins />}
      {currentOption === 1 && <YourCoins />}
    </Grid>
  );
};
