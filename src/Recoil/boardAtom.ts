import { atom } from "recoil";

export const textState = atom<string>({
  key: "text",
  default: "",
});

export const textLengthState = atom<number>({
  key: "textLength",
  default: 0,
});

export const showImgState = atom<File[]>({
  key: "showImage",
  default: [],
});
export const thumbImgState = atom<string[]>({
  key: "thumbImage",
  default: [],
});
