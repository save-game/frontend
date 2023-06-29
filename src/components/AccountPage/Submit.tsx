import React, { useState } from "react";

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
import { expenseFormProps } from "../../interface/interface";

export default function SubmitForm() {
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [checkedList] = useRecoilState(checkedListState);
  const [, setIsSubmit] = useRecoilState(isSubmitState);
  const [, setFilterForm] = useRecoilState(filterFormState);
  const [data] = useState<expenseFormProps[]>([]);

  return (
    <>
      <input type="checkbox" id="account_filter" className="modal-toggle" />
      <div className="modal w-full">
        <div className=" modal-box bg-base-100 z-[999] py-4 shadow-lg text-neutral-600">
          <div className="w-full">
            <DateFilter />
            <CategoryFilter />
            <div className="flex justify-center items-center m-12">
              <button
                type="submit"
                className="w-20 mr-5 btn btn-sm btn-accent text-base-100"
              >
                적용
              </button>
              <label
                htmlFor="account_filter"
                className="w-20 ml-5 btn btn-sm btn-accent text-base-100"
              >
                닫기
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
