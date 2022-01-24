import { useEffect, useState } from "react";
import { Skeleton, Typography } from "@mui/material";

// components
import { SavedCoinCard } from "../SavedCoinCard";

// services
import { getCryptoCurrenciesList } from "../../services/CryptoCurrencyApi";

export const YourCoins = () => {
  const [coinList, setcoinList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCryptoCurrenciesList()
      .then(({ data }) => setcoinList(data.currencies))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <Skeleton animation="wave" height={80} />
          <Skeleton animation="wave" height={80} />
          <Skeleton animation="wave" height={80} />
          <Skeleton animation="wave" height={80} />
          <Skeleton animation="wave" height={80} />
          <Skeleton animation="wave" height={80} />
          <Skeleton animation="wave" height={80} />
          <Skeleton animation="wave" height={80} />
        </div>
      ) : coinList.length > 0 ? (
        coinList?.map((coin: any) => <SavedCoinCard key={coin.id} {...coin} />)
      ) : (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 100 }}
        >
          <Typography style={{ color: "gray" }}>No coins yet</Typography>
        </div>
      )}
    </div>
  );
};
