import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

// components
import { CoinCard } from "../CoinCard";

// recoil
import { useRecoilValue } from "recoil";
import { isLoggedState } from "../../state/atoms/auth";

// services
import { getCryptoCurrenciesListFromCMC } from "../../services/CryptoCurrencyApi";

export const TrendingCoins = () => {
  // recoil
  const isLogedUser = useRecoilValue(isLoggedState);

  const [coinList, setcoinList] = useState([]);
  const [savedCoins, setSavedCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCryptoCurrenciesListFromCMC({
      start: 1,
      limit: 20,
      convert: "USD",
    })
      .then(({ data }) => {
        if (data.savedCurrencies) {
          setSavedCoins(data.savedCurrencies);
        }
        setcoinList(data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [isLogedUser]);

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
        coinList?.map((coin: any) => (
          <CoinCard
            key={coin.id}
            {...coin}
            savedCoins={savedCoins}
            setSavedCoins={setSavedCoins}
          />
        ))
      )}
    </div>
  );
};
