import { useState, useEffect } from "react";

import ExpenseGraph from "./ExpenseGraph";
import { getRecordedeExpenseForAnalyze } from "../../api/expenseAPI";
import { ExpenseDataForAnalyze } from "../../interface/interface";

export default function ExpenseGraphContainer() {
  const [monthlyExpenseData, setMonthlyExpenseData] =
    useState<ExpenseDataForAnalyze[]>();
  const [monthlyTotalAmount, setMonthlyTotalAmount] = useState<number>(0);
  const currentMonth: number = new Date().getMonth() + 1;

  const getExpenseData = async () => {
    try {
      const response = await getRecordedeExpenseForAnalyze(
        new Date().getFullYear(),
        new Date().getMonth() + 1
      );
      setMonthlyTotalAmount(
        response.data.reduce(
          (acc: number, cur: ExpenseDataForAnalyze) => acc + cur.total,
          0
        )
      );
      setMonthlyExpenseData(
        response.data.sort(
          (a: ExpenseDataForAnalyze, b: ExpenseDataForAnalyze) =>
            b.total - a.total
        )
      );
    } catch (error) {
      console.error(`getExpenseData Error: Time(${new Date()}) ERROR ${error}`);
    }
  };

  useEffect(() => {
    getExpenseData();
  }, []);

  return (
    <>
      <div className="relative w-full">
        {!monthlyExpenseData ? (
          <div className=" h-56 flex flex-col justify-center items-center text-xl text-black">
            <p>{currentMonth}월 지출 내역이 없습니다.</p>
            <p>지출등록을 해주세요.</p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <ExpenseGraph
              list={monthlyExpenseData}
              total={monthlyTotalAmount}
            />
            <div className="absolute top-4 left-0 flex flex-col justify-center items-center text-black">
              <p>{currentMonth}월 지출</p>
              <p>{monthlyTotalAmount.toLocaleString()}원</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
