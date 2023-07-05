import { useState, useEffect } from "react";

import ExpenseGraph from "./ExpenseGraph";
import { getRecordedeExpenseForAnalyze } from "../../api/expenseAPI";
import { ExpenseDataForAnalyze } from "../../interface/interface";
import {
  CategoryType,
  categoryColorList,
} from "../../constants/expenseCategory";
import { FcCalendar } from "react-icons/Fc";
import { IoChatbubbleEllipsesOutline } from "react-icons/Io5";

export default function ExpenseGraphContainer() {
  const [monthlyExpenseData, setMonthlyExpenseData] = useState<
    ExpenseDataForAnalyze[] | null
  >(null);
  const [monthlyTotalAmount, setMonthlyTotalAmount] = useState<number>(0);
  const currentMonth: number = new Date().getMonth() + 1;

  const getExpenseData = async () => {
    try {
      const response = await getRecordedeExpenseForAnalyze(
        new Date().getFullYear(),
        new Date().getMonth() + 1
      );
      if (response.data.length === 0) return;
      setMonthlyTotalAmount(
        response.data.reduce(
          (acc: number, cur: ExpenseDataForAnalyze) => acc + cur.total,
          0
        )
      );
      const formattedExpenseData = response.data
        .map((data: ExpenseDataForAnalyze) => {
          const category: CategoryType = data.category;
          const categoryColor = categoryColorList[category];
          return { ...data, bgColor: categoryColor };
        })
        .sort(
          (a: ExpenseDataForAnalyze, b: ExpenseDataForAnalyze) =>
            b.total - a.total
        );
      setMonthlyExpenseData(formattedExpenseData);
    } catch (error) {
      console.error(`getExpenseData Error: Time(${new Date()}) ERROR ${error}`);
    }
  };

  useEffect(() => {
    getExpenseData();
  }, []);

  return (
    <>
      <div className="relative w-full text-cyan-950">
        {!monthlyExpenseData ? (
          <div className=" h-36 flex flex-col justify-center items-center text-[15px] bg-base-100 rounded-lg shadow my-2">
            <IoChatbubbleEllipsesOutline
              size={23}
              className="mb-2 text-accent-focus"
            />
            <p>{currentMonth}월 지출 내역이 없습니다.</p>
            <p>지출등록을 해주세요.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-2 ">
            <div className="w-full flex rounded-lg ">
              <div className="flex w-1/3 mr-1 justify-center items-center text-left p-2 rounded-lg bg-base-100 shadow">
                <FcCalendar size={17} className="mr-1 text-accent-focus" />
                <p className="text-[16px]  pt-1 ">{currentMonth}월</p>
              </div>
              <div className="flex w-2/3 justify-center items-center text-left  p-2 rounded-lg bg-base-100 shadow">
                <p className="text-[16px] pt-1">
                  {monthlyTotalAmount.toLocaleString()}원
                </p>
              </div>
            </div>
            <ExpenseGraph
              list={monthlyExpenseData}
              total={monthlyTotalAmount}
            />
          </div>
        )}
      </div>
    </>
  );
}
