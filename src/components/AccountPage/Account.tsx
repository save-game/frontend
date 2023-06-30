import { useEffect, useState, useCallback } from "react";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useRecoilState } from "recoil";
import {
  checkedListState,
  endDateState,
  isfilteredState,
  isSubmitState,
  startDateState,
} from "../../Recoil/index.js";
import { addComma, getDayFunc } from "../../helpers/helper.js";
import MonthPicker from "../../components/AccountPage/MonthPicker.js";
import AnalyzeForm from "../../components/AccountPage/AnalyzeForm.js";
import { categoryList } from "../../constants/expenseCategory.js";

import ExpenseFormButton from "../Expenses/ExpenseFormButton.js";
import { MonthPickerWrapper } from "../../styles/DateRange.js";
import { getRecordedExpense } from "../../api/expenseAPI.js";
import { ExpenseFormProps } from "../../interface/interface.js";
import NoDisplayData from "../Common/NoDisplayData.js";
import SubmitForm from "./Submit.js";

export default function Account() {
  const [isSubmit, setIsSubmit] = useRecoilState(isSubmitState);
  const [isFiltered, setisFilterd] = useRecoilState(isfilteredState);
  const [endDate, setEndDate] = useRecoilState(endDateState);
  const [startDate, setStartDate] = useRecoilState(startDateState);
  const [categoryFilterList, setCategoryFilterList] =
    useRecoilState(checkedListState);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [analyze, setAnalyze] = useState(false);
  const [data, setData] = useState<ExpenseFormProps[]>([]);

  const getUseData = useCallback(async () => {
    try {
      const response = await getRecordedExpense(
        startDate?.toLocaleDateString("en-US") as string,
        endDate?.toLocaleDateString("en-US") as string
      );
      console.log(categoryFilterList);
      if (categoryFilterList.length === 0) {
        setData(response.data);
        return;
      }
      const filteredList = response.data.filter((v: ExpenseFormProps) =>
        categoryFilterList.includes(v.category)
      );
      setData(filteredList);
    } catch (error) {
      console.error(`getUseData Error: Time(${new Date()}) ERROR ${error}`);
    }
  }, [startDate, endDate, categoryFilterList]);

  useEffect(() => {
    getUseData();
  }, [getUseData]);

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

  const onChangeMonth = (date: Date) => {
    setSelectedDate(date);
    setStartDate(new Date(date.getFullYear(), date.getMonth(), 1));
    setEndDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
  };

  const onClickPrev = () => {
    setSelectedDate(new Date(year, prevMonth - 1));
    setStartDate(new Date(year, prevMonth - 1, 1));
    setEndDate(new Date(year, prevMonth, 0));
  };
  const onClickNext = () => {
    setSelectedDate(new Date(year, nextMonth));
    setStartDate(new Date(year, nextMonth, 1));
    setEndDate(new Date(year, nextMonth + 1, 0));
  };
  const handleFilterReset = () => {
    setStartDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    setEndDate(new Date());
    setCategoryFilterList([]);
    setisFilterd(false);
  };

  return (
    <div className=" w-11/12 ml-auto mr-auto flex flex-col items-center mt-4 mb-20">
      <div className=" w-full ml-auto mr-auto flex flex-col items-center mt-4 mb-4">
        <div className="w-full flex flex-col items-center">
          <MonthPickerWrapper
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
              handleSelectedDate={onChangeMonth}
            />
            <SlArrowRight
              size={14}
              className="cursor-pointer hover:text-accent"
              onClick={onClickNext}
            />
          </MonthPickerWrapper>

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
                  <button
                    type="button"
                    onClick={() => {
                      setAnalyze(true);
                    }}
                    className="btn btn-sm btn-accent text-base-100"
                  >
                    분석
                  </button>
                </div>
              </div>
              <div className="flex justify-around w-full mb-4">
                <label
                  htmlFor="account_filter"
                  className="w-32 btn btn-sm btn-accent mr-10 text-base-100"
                >
                  필터선택
                </label>
                <SubmitForm />
                <div className="w-32">
                  <ExpenseFormButton size={"small"} />
                </div>
              </div>

              <div className="w-full relative flex flex-col items-center">
                {isFiltered ? (
                  <div className="w-full flex bg-gray-100 rounded-lg p-4 mb-2">
                    <div className="mr-auto">
                      <div className="flex">
                        <div className="text-sm">{`${startDate?.getFullYear()}.${
                          (startDate?.getMonth() as number) + 1
                        }.${startDate?.getDate()}`}</div>
                        <span className="mx-2">-</span>
                        <div className="text-sm">{`${endDate?.getFullYear()}.${
                          (endDate?.getMonth() as number) + 1
                        }.${endDate?.getDate()}`}</div>
                      </div>
                      <div>
                        {categoryFilterList.map((v, idx) =>
                          idx > 4 ? (
                            <></>
                          ) : (
                            <span className="bg-emerald-200 rounded-md p-1 mr-1">
                              {v}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                    <button className="btn w-20" onClick={handleFilterReset}>
                      초기화
                    </button>
                  </div>
                ) : (
                  <></>
                )}
                {filterDate.length > 0 ? (
                  filterDate.map((d) => (
                    <div key={d.amount} className="w-full border p-4 mb-2">
                      <div className="flex w-full justify-between mb-4 pb-2 border-b-4">
                        <div>{getDayFunc(d.useDate, 2)}</div>
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
                          <div className="w-2/6 text-right">
                            {d.amount.toLocaleString("ko-KR")} 원
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <NoDisplayData />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
