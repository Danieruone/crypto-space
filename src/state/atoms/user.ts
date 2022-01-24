import { atom } from "recoil";

const userInfo = localStorage.getItem("user_info");

export const userInfoState = atom({
  key: "userInfoState",
  default: userInfo ? JSON.parse(userInfo) : { name: "" },
});
