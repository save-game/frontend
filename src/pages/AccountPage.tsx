import { useEffect, useState } from "react";
import AnalyzeForm from "../components/AnalyzeForm";
import axios from "axios";
import { addComma, getDay } from "../helpers/helper";
import MonthPicker from "../components/MonthPicker";
import ExpensesForm from "../components/ExpensesForm";
import { FiMeh } from "react-icons/fi";

export interface ExpenseData {
  recordId: number;
  category: string;
  amount: number;
  useDate: string;
  paidFor: string;
  memo: string;
}
export const axiosData = axios.get("./src/test/graphTest.json");
export const useTest = axios.get("./src/test/useTest.json");
export default function Account() {
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
  }, []);

  const filterDate = data.filter((d) => {
    if (getDay(selectedDate.toString(), 1) === getDay(d.useDate, 1)) {
      return d;
    }
  });
  const totalAmount = filterDate.reduce(
    (acc, cur) => acc + Number(cur.amount),
    0
  );

  return (
    <div className=" w-11/12 ml-auto mr-auto flex flex-col items-center mt-10 mb-20">
      <h1 className="text-3xl mt-3 mb-6">가계부</h1>
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex justify-start">
          <MonthPicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
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
            <div className="flex justify-center w-full mb-4">
              <button
                type="button"
                className="w-32 btn btn-sm btn-accent mr-10 text-base-100"
              >
                필터선택
              </button>
              <button
                type="button"
                onClick={() => setExpensesForm(true)}
                className="w-32 btn btn-sm btn-accent text-base-100"
              >
                지출등록
              </button>
              {expensesForm ? (
                <ExpensesForm formEditor={setExpensesForm} />
              ) : null}
            </div>
            {filterDate.length > 0 ? (
              filterDate.map((d) => (
                <div key={d.recordId} className="w-full border p-4">
                  <div className="flex w-full justify-between mb-4 pb-2 border-b-4">
                    <div>{getDay(d.useDate, 2)}</div>
                    <div className="mr-4">{addComma(d.amount)} 원</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="w-2/3 flex justify-start items-center">
                      <div className="w-1/2 ml-4 mr-4">{d.category}</div>
                      <div className="flex flex-col">
                        <div className="text-m">{d.paidFor}</div>
                        <div className="text-xs">{d.memo}</div>
                      </div>
                    </div>
                    <div className="mr-4">{addComma(d.amount)} 원</div>
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
          </>
        )}
      </div>
    </div>
  );
}
