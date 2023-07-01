import { atom, selector } from "recoil";

import {
  FIXED_MIN_VALUE,
  FIXED_MAX_VALUE,
} from "../constants/challengeSliderFilter";

export const textCategoryState = atom({
  key: "text_category",
  default: "total",
});

export const searchTextState = atom({ key: "searchText", default: "" });

export const minSearchAmountState = atom({
  key: "min_amount",
  default: FIXED_MIN_VALUE,
});
export const maxSearchAmountState = atom({
  key: "max_amount",
  default: FIXED_MAX_VALUE,
});
export const searchCategoryState = atom({ key: "category", default: "all" });

export const filterParameterSelector = selector({
  key: "filter_parameter",
  get: ({ get }) => {
    const textCategory = get(textCategoryState);
    const searchText = get(searchTextState);
    const minSearchAmount = get(minSearchAmountState);
    const maxSearchAmount = get(maxSearchAmountState);
    const searchCategory = get(textCategoryState);

    return {
      text_category: textCategory,
      search_text: searchText,
      min_search_amount: minSearchAmount,
      max_search_amount: maxSearchAmount,
      search_category: searchCategory,
    };
  },
});
