import { CMCApiClient } from "./HttpClientInterceptor";
import { CryptoCurrencyListParams } from "../interface/CryptoCurrencyListParams";

export async function getOrders(params: CryptoCurrencyListParams) {
  return await CMCApiClient.get(
    `cryptocurrency/listings/latest?start=${params.start}&limit=${params.limit}&convert=${params.convert}`
  );
}
