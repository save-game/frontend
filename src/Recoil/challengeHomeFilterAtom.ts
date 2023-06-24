import { atom } from "recoil";

import {
  FIXED_MIN_VALUE,
  FIXED_MAX_VALUE,
} from "../constants/challengeSliderFilter";

export const textCategoryState = atom({
  key: "text_category",
  default: "total",
});

export const searchTextState = atom({ key: "title", default: "" });

export const minSearchAmount = atom({
  key: "min_amount",
  default: FIXED_MIN_VALUE,
});
export const maxSearchAmount = atom({
  key: "max_amount",
  default: FIXED_MAX_VALUE,
});
export const searchCategoryState = atom({ key: "category", default: "" });
