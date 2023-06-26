import { atom } from "recoil";

export const token = atom({
  key: "accessToken",
  default: "",
});

export const refreshToken = atom({
  key: "refreshToken",
  default: "",
});
