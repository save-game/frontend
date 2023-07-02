import { atom, selector } from "recoil";

import {
  FIXED_MIN_VALUE,
  FIXED_MAX_VALUE,
} from "../constants/challengeSliderFilter";

export const textCategoryState = atom({
  key: "text_category",
  default: "ALL",
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
export const searchCategoryState = atom({ key: "category", default: "" });

export const filterParameterSelector = selector({
  key: "filter_parameter",
  get: ({ get }) => {
    const textCategory = get(textCategoryState);
    const searchText = get(searchTextState);
    const minSearchAmount = get(minSearchAmountState);
    const maxSearchAmount = get(maxSearchAmountState);
    const searchCategory = get(searchCategoryState);

    if (searchCategory === "") {
      return {
        searchType: textCategory,
        keyword: searchText,
        minAmount: minSearchAmount,
        maxAmount: maxSearchAmount,
        category: null,
      };
    }

    return {
      searchType: textCategory,
      keyword: searchText,
      minAmount: minSearchAmount,
      maxAmount: maxSearchAmount,
      category: searchCategory,
    };
  },
  set: ({ set, reset }) => {
    reset(textCategoryState);
    reset(searchTextState);
    reset(minSearchAmountState);
    reset(maxSearchAmountState);
    reset(searchCategoryState);
  },
});
