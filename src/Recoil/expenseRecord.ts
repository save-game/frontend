import { atom } from "recoil";
import { ExpenseRecord } from "../interface/interface";

export const expenseRecordAtom = atom<ExpenseRecord | null>({
  key: "expenseRecordAtom",
  default: null,
});

export const selectedExpenseDateState = atom<Date>({
  key: "selectedExpenseDateState",
  default: new Date(),
});
