import { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

import ExpenseGraph from "./ExpenseGraph";

ChartJS.register(ArcElement, Tooltip);

interface ExpenseData {
  category: string;
  amount: number;
}

export default function ExpenseGraphContainer() {
  const [monthlyExpenseData, setMonthlyExpenseData] = useState<ExpenseData[]>();
  const [monthlyTotalAmount, setMonthlyTotalAmount] = useState<number>(0);
  const currentMonth: number = new Date().getMonth() + 1;

  const getMonthlyExpenseData = async () => {
    try {
      const response = await axios.get("./src/test/graphTest.json");
      setMonthlyTotalAmount(
        response.data.reduce((acc: number, cur: ExpenseData) => {
          return acc + cur.amount;
        }, 0)
      );
      setMonthlyExpenseData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMonthlyExpenseData();
  }, []);

  const data = {
    datasets: [
      {
        data: monthlyExpenseData,
        backgroundColor: bgColor,
        borderColor: bdColor,
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          title: function () {
            return 2;
          },
          label: function () {
            return 3;
          },
        },
      },
      legend: {
        display: false,
      },
      hoverOffset: 20,
    },
    parsing: {
      key: "amount",
    },
    layout: {
      autoPadding: true,
      padding: 20,
    },
    maintainAspectRatio: false,
    responsive: false,
  };

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
            <ExpenseGraph />
            <div className="absolute top-4 left-2 flex flex-col justify-center items-center text-black">
              <p>{currentMonth}월 지출</p>
              <p>{monthlyTotalAmount.toLocaleString()}원</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const bgColor = [
  "#86CE98",
  "#E47375",
  "#D97990",
  "#DF9467",
  "#85CBD3",
  "#DF6586",
  "#7CB78C",
];

const bdColor = [
  "#86CE98",
  "#E47375",
  "#D97990",
  "#DF9467",
  "#85CBD3",
  "#DF6586",
  "#7CB78C",
];
