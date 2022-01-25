import { defaultApiClient } from "./HttpClientInterceptor";
import { LoginParams, RegisterParams } from "../interface/Auth";

export async function loginService(params: LoginParams) {
  return await defaultApiClient.post(`login`, params);
}

export async function registerService(params: RegisterParams) {
  return await defaultApiClient.post(`user`, params);
}
