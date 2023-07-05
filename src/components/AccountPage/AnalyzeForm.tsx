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
import {
  CategoryType,
  categoryColorList,
  categoryList,
} from "../../constants/expenseCategory";

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

      setLists(formattedExpenseData);
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
      <div className="flex w-full justify-end px-3">
        <button
          type="button"
          onClick={() => {
            analyze(false);
          }}
          className="btn btn-sm btn-neutral text-base-100 px-6"
        >
          월별 지출 보기
        </button>
      </div>
      <div className="relative flex flex-col items-center">
        {!(lists.length === 0) ? (
          <>
            <div className="w-full flex justify-center border-b-4">
              <ExpenseGraph total={total} list={lists} />
            </div>
            <div className="w-full bg-base-100 rounded-lg px-3">
              {lists.map((list, idx) => (
                <div
                  key={idx}
                  className="flex w-full justify-between items-center py-1.5 mb-1 border-b"
                >
                  {categoryList.map((category) => {
                    if (category.name === list.category) {
                      return (
                        <div
                          className="w-1/6 flex flex-col items-center justify-center translate-y-0.5"
                          key={list.category}
                        >
                          <div
                            className={`${category.color} w-8 h-8 mx-auto text-base-100 rounded-full flex justify-center items-center`}
                          >
                            {category.icon}
                          </div>
                          <p className="font-normal text-xs text-neutral-600 text-center mt-1">
                            {category.name}
                          </p>
                        </div>
                      );
                    }
                  })}
                  <p className="w-2/4 text-end font-bold">
                    {list.total.toLocaleString("ko-KR")}원
                  </p>
                  <p className="w-1/4 text-end text-sm mr-4">
                    {((list.total / total) * 100).toFixed(0)}%
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
