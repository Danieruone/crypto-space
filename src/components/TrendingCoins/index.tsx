import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

// components
import { CoinCard } from "../CoinCard";

// services
import { getCryptoCurrenciesListFromCMC } from "../../services/CryptoCurrencyApi";

export const TrendingCoins = () => {
  const [coinList, setcoinList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCryptoCurrenciesListFromCMC({
      start: 1,
      limit: 20,
      convert: "USD",
    })
      .then(({ data }) => setcoinList(data.data))
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
      ) : (
        coinList?.map((coin: any) => <CoinCard key={coin.id} {...coin} />)
      )}
    </div>
  );
};
