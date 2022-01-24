import { defaultApiClient } from "./HttpClientInterceptor";
import { LoginParams } from "../interface/Auth";

export async function loginService(params: LoginParams) {
  return await defaultApiClient.post(`login`, params);
}
