import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRecoilValue } from "recoil";
import ExpenseGraph from "../Expenses/ExpenseGraph";
import { ExpenseDataForAnalyze } from "../../interface/interface";

import { startDateState } from "../../Recoil";
import { getRecordedeExpenseForAnalyze } from "../../api/expenseAPI";
import NoDisplayData from "../Common/NoDisplayData";

interface AnalyzeProps {
  analyze: Dispatch<SetStateAction<boolean>>;
}

export default function AnalyzeForm({ analyze }: AnalyzeProps) {
  const [lists, setLists] = useState<ExpenseDataForAnalyze[]>([]);
  const startDateForAnalyze = useRecoilValue(startDateState);

  const getExpenseData = useCallback(async () => {
    try {
      const response = await getRecordedeExpenseForAnalyze(
        startDateForAnalyze?.getFullYear() as number,
        (startDateForAnalyze?.getMonth() as number) + 1
      );
      setLists(
        response.data.sort(
          (a: ExpenseDataForAnalyze, b: ExpenseDataForAnalyze) =>
            b.total - a.total
        )
      );
    } catch (error) {
      console.error(`getExpenseData Error: Time(${new Date()}) ERROR ${error}`);
    }
  }, [startDateForAnalyze]);

  const total = lists.reduce(
    (acc: number, cur: ExpenseDataForAnalyze) => acc + cur.total,
    0
  );

  useEffect(() => {
    getExpenseData();
  }, [getExpenseData]);

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
      <div className="relative flex flex-col items-center">
        {!(lists.length === 0) ? (
          <>
            <div className="flex justify-center p-4 border-b-4">
              <ExpenseGraph total={total} list={lists} />
            </div>
            <div className="w-full">
              {lists.map((list, idx) => (
                <div
                  key={idx}
                  className="flex w-full justify-between mb-2 text-lg"
                >
                  <div className="w-1/3 ml-4">{list.category}</div>
                  <p className="w-1/3 text-center">
                    {list.total.toLocaleString("ko-KR")}원
                  </p>
                  <p className="w-1/3 text-end mr-4">
                    {((list.total / total) * 100).toFixed(2)}%
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <NoDisplayData />
        )}
      </div>
    </div>
  );
}
