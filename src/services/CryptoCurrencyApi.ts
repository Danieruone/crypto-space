import { defaultApiClient } from "./HttpClientInterceptor";
import { CryptoCurrencyListParams } from "../interface/CryptoCurrencyListParams";
import { CryptoCurrencyData } from "../interface/CryptoCurrencyData";

export async function getCryptoCurrenciesListFromCMC(
  params: CryptoCurrencyListParams
) {
  return await defaultApiClient.get(
    `cryptocurrencies/cmc/list?start=${params.start}&limit=${params.limit}&convert=${params.convert}`
  );
}

export async function getCryptoCurrenciesList() {
  return await defaultApiClient.get(`cryptocurrencies/list`);
}

export async function postCryptoCurrency(data: CryptoCurrencyData) {
  return await defaultApiClient.post(`currency`, data);
}

export async function deleteCryptoCurrency(id: string) {
  return await defaultApiClient.delete(`currency/${id}`);
}
