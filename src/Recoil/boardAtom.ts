import { atom } from "recoil";

export const textState = atom<string>({
  key: "text",
  default: "",
});

export const textLengthState = atom<number>({
  key: "textLength",
  default: 0,
});

export const showImgState = atom<string[]>({
  key: "showImage",
  default: [],
});
