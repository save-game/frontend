import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ExpenseGraph from "../Expenses/ExpenseGraph";
import { ExpenseData } from "./Account";
import { addComma } from "../../helpers/helper";
import { axiosData } from "./getApi";

interface AnalyzeProps {
  analyze: Dispatch<SetStateAction<boolean>>;
}

export default function AnalyzeForm({ analyze }: AnalyzeProps) {
  const [lists, setLists] = useState<ExpenseData[]>([]);

  const dataLists = async () => {
    try {
      const res = await axiosData;
      setLists(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const total = lists.reduce(
    (acc: number, cur: ExpenseData) => acc + cur.amount,
    0
  );

  useEffect(() => {
    dataLists();
  }, []);

  return (
    <div className="w-full">
      <div className="flex w-full justify-end">
        <button
          type="button"
          onClick={() => {
            analyze(false);
          }}
          className="btn btn-sm btn-accent text-base-100"
        >
          월별 지출 보기
        </button>
      </div>
      <div className="flex justify-center p-4 border-b-4">
        <ExpenseGraph />
      </div>
      <div>
        {lists
          .sort((a, b) => b.amount - a.amount)
          .map((list, idx) => (
            <div key={idx} className="flex w-full justify-between">
              <div className="w-1/3 ml-4">{list.category}</div>
              <p className="w-1/3 text-center"> {addComma(list.amount)}원</p>
              <p className="w-1/3 text-end mr-4">
                {((list.amount / total) * 100).toFixed(2)}%
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
