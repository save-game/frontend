import { useState } from "react";

import DateFilter from "../AccountPage/DateFilter";
import CategoryFilter from "../AccountPage/CategoryFilter";
import { useRecoilState } from "recoil";
import {
  checkedListState,
  endDateState,
  filterFormState,
  isSubmitState,
  startDateState,
} from "../../Recoil";
import { ExpenseData } from "./Account";

export default function SubmitForm() {
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [checkedList] = useRecoilState(checkedListState);
  const [, setIsSubmit] = useRecoilState(isSubmitState);
  const [, setFilterForm] = useRecoilState(filterFormState);
  const [data] = useState<ExpenseData[]>([]);

  const onSubmit = () => {
    setFilterForm(false);
    setIsSubmit(true);
    if (endDate === null) {
      setEndDate(new Date());
    }
    if (startDate === null) {
      setStartDate(endDate);
    }
    if (checkedList.length === 0) {
      data.map;
    }
  };
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-base-100 z-[999] py-4 shadow-lg text-neutral-600">
        <div className="w-full">
          <DateFilter />
          <CategoryFilter />
          <div className="flex justify-center items-center m-12">
            <button
              onClick={onSubmit}
              type="submit"
              className="mr-5 btn btn-sm btn-accent text-base-100"
            >
              적용
            </button>
            <button
              onClick={() => setFilterForm(false)}
              className="ml-5 btn btn-sm btn-accent text-base-100"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
