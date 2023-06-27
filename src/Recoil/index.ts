import { atom } from "recoil";

export const checkedListState = atom<string[]>({
  key: "categoryCheckedLists",
  default: [],
});

export const startDateState = atom<Date | null>({
  key: "startDate",
  default: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
});

export const endDateState = atom<Date | null>({
  key: "endDate",
  default: new Date(),
});

export const filterFormState = atom<boolean>({
  key: "filterForm",
  default: false,
});

export const isSubmitState = atom<boolean>({
  key: "isSubmit",
  default: false,
});

export const isCheckedState = atom<boolean>({
  key: "isChecked",
  default: false,
});
