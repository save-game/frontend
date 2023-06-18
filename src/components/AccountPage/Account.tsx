import { useEffect, useState } from "react";

import { FiMeh } from "react-icons/fi";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useRecoilState } from "recoil";
import {
  checkedListState,
  endDateState,
  filterFormState,
  isSubmitState,
  startDateState,
} from "../../Recoil/index.js";
import { addComma, getDayFunc } from "../../helpers/helper.js";
import MonthPicker from "../../components/AccountPage/MonthPicker.js";
import AnalyzeForm from "../../components/AccountPage/AnalyzeForm.js";
import FilterBtn from "../../components/AccountPage/FilterBtn.js";
import ExpensesForm from "../../components/ExpensesForm.js";
import { categoryList } from "../../constants/expenseCategory.js";
import { FilteredDataForm } from "../../components/AccountPage/FilterDataForm.js";
import { useTest } from "../../components/AccountPage/getApi.js";

export interface ExpenseData {
  recordId: number;
  category: string;
  amount: number;
  useDate: string;
  paidFor: string;
  memo: string;
  payType: string;
}

export default function Account() {
  const [isSubmit, setIsSubmit] = useRecoilState(isSubmitState);
  const [, setFilterForm] = useRecoilState(filterFormState);
  const [, setEndDate] = useRecoilState(endDateState);
  const [, setStartDate] = useRecoilState(startDateState);
  const [, setCategoryList] = useRecoilState(checkedListState);
  const [expensesForm, setExpensesForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [analyze, setAnalyze] = useState(false);
  const [data, setData] = useState<ExpenseData[]>([]);

  const getUseData = async () => {
    try {
      const res = await useTest;
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUseData();
    setIsSubmit(false);
    setFilterForm(false);
    setCategoryList([]);
    setStartDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    setEndDate(new Date());
  }, [setFilterForm, setIsSubmit, setCategoryList, setStartDate, setEndDate]);

  const filterDate = data.filter((d) => {
    if (getDayFunc(selectedDate.toString(), 1) === getDayFunc(d.useDate, 1)) {
      return d;
    }
  });
  const totalAmount = filterDate.reduce(
    (acc, cur) => acc + Number(cur.amount),
    0
  );
  const year = new Date(selectedDate).getFullYear();
  const prevMonth = new Date(selectedDate).getMonth();
  const nextMonth = new Date(selectedDate).getMonth() + 1;

  const onClickPrev = () => {
    setSelectedDate(new Date(year, prevMonth - 1));
  };
  const onClickNext = () => {
    setSelectedDate(new Date(year, nextMonth));
  };

  return (
    <div className=" w-11/12 ml-auto mr-auto flex flex-col items-center mt-4 mb-20">
      {isSubmit === false ? (
        <div className=" w-11/12 ml-auto mr-auto flex flex-col items-center mt-4 mb-4">
          <h1 className="text-3xl mt-3 mb-6">가계부</h1>
          <div className="w-full flex flex-col items-center">
            <div
              className="w-full flex items-center justify-start
      mb-4"
            >
              <SlArrowLeft
                size={14}
                className="cursor-pointer hover:text-accent "
                onClick={onClickPrev}
              />
              <MonthPicker
                selectedDate={selectedDate}
                handleSelectedDate={setSelectedDate}
              />
              <SlArrowRight
                size={14}
                className="cursor-pointer hover:text-accent"
                onClick={onClickNext}
              />
            </div>

            {analyze ? (
              <AnalyzeForm analyze={setAnalyze} />
            ) : (
              <>
                <div className="w-full flex flex-col justify-start">
                  <div className="flex w-full justify-center mb-4 pb-2 border-b-4">
                    <div className="w-3/4 flex justify-between">
                      <p className="w-1/4 ">총 지출</p>
                      <span className="w-2/4">{addComma(totalAmount)}원</span>
                    </div>
                    {isSubmit === false ? (
                      <button
                        type="button"
                        onClick={() => {
                          setAnalyze(true);
                        }}
                        className="btn btn-sm btn-accent text-base-100"
                      >
                        분석
                      </button>
                    ) : null}
                  </div>
                </div>
                <div className="flex justify-around w-full mb-4">
                  <FilterBtn onClick={() => setFilterForm(true)}>
                    필터선택
                  </FilterBtn>
                  <FilterBtn onClick={() => setExpensesForm(true)}>
                    지출등록
                  </FilterBtn>
                  <ExpensesForm
                    formStatus={expensesForm}
                    formEditor={setExpensesForm}
                  />
                </div>

                <div className="w-full">
                  {filterDate.length > 0 ? (
                    filterDate.map((d) => (
                      <div key={d.recordId} className="w-full border p-4 mb-2">
                        <div className="flex w-full justify-between mb-4 pb-2 border-b-4">
                          <div>{getDayFunc(d.useDate, 2)}</div>
                          <div className="mr-4">{addComma(d.amount)} 원</div>
                        </div>
                        <div className="flex items-center w-full">
                          <div className="flex items-center w-full">
                            {categoryList.map((list) => {
                              if (list.name === d.category) {
                                return (
                                  <div
                                    className="w-1/6 flex flex-col items-center justify-center"
                                    key={list.category}
                                  >
                                    <div
                                      className={`${list.color} w-9 h-9 mx-auto text-base-100 rounded-full flex justify-center items-center`}
                                    >
                                      {list.icon}
                                    </div>
                                    <p className="font-normal text-xs text-neutral-600 text-center mt-1">
                                      {list.name}
                                    </p>
                                  </div>
                                );
                              }
                            })}
                            <div className="flex flex-col w-2/6 ml-2">
                              <div className="text-m">{d.paidFor}</div>
                              <div className="text-xs">{d.memo}</div>
                            </div>
                            <div className="w-1/6 text-center">{d.payType}</div>
                            <div className="w-2/6 text-center">
                              {addComma(d.amount)} 원
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center p-10 rounded-2xl mt-36 mb-10">
                      <span>
                        <FiMeh size={50} className="mr-4 text-accent" />
                      </span>
                      <p className="text-5xl text-accent">데이터가 없어요 </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <FilteredDataForm />
      )}
    </div>
  );
}
