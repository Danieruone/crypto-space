import { atom } from "recoil";

export const isLoggedState = atom({
  key: "isLoggedState",
  default: localStorage.getItem("token") ? true : false,
});
