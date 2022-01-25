import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// mui
import { Skeleton, Typography } from "@mui/material";
import { TextField, Button, CircularProgress, Grid } from "@mui/material";

// components
import { SavedCoinCard } from "../SavedCoinCard";

// services
import {
  getCryptoCurrenciesList,
  postCryptoCurrency,
} from "../../services/CryptoCurrencyApi";

export const YourCoins = () => {
  const [coinList, setcoinList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingPost, setIsFetchingPost] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchCoins = () => {
    setIsLoading(true);
    getCryptoCurrenciesList()
      .then(({ data }) => setcoinList(data.currencies))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const createCurrency = (values: any) => {
    setIsFetchingPost(true);
    postCryptoCurrency({
      name: values.name,
      alias: values.alias,
      enabled: true,
    })
      .then(({ data }) => {
        if (data.ok) {
          reset();
          fetchCoins();
          toast.success("Currency successfully added");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.err.message);
      })
      .finally(() => setIsFetchingPost(false));
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div>
      <Grid item xs={12}>
        <form
          onSubmit={handleSubmit(createCurrency)}
          style={{ marginBottom: 20 }}
        >
          <TextField
            label="Name"
            variant="outlined"
            style={{ marginRight: 10 }}
            {...register("name", { required: true })}
            error={errors.name}
          />
          <TextField
            label="Alias"
            variant="outlined"
            style={{ marginRight: 10 }}
            {...register("alias", { required: true })}
            error={errors.alias}
          />

          {isFetchingPost ? (
            <CircularProgress style={{ marginLeft: 30, marginTop: 5 }} />
          ) : (
            <Button variant="outlined" type="submit" style={{ height: 55 }}>
              Create
            </Button>
          )}
        </form>
      </Grid>

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
