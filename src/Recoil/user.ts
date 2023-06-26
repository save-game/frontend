import { atom } from "recoil";
import { UserData } from "../interface/interface";

export const user = atom<UserData | null>({
  key: "user",
  default: null,
});
