import { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseData {
  category: string;
  amount: number;
}

export default function ExpenseGraph() {
  const [monthlyExpenseData, setMonthlyExpenseData] = useState<ExpenseData[]>(
    []
  );
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
    console.log(monthlyTotalAmount);
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
      toolTip: {
        titleFont: { size: 40, color: "#000" },
        bodyFont: { size: 40, color: "#000" },
      },
      legend: {
        display: false,
      },
    },
    parsing: {
      key: "amount",
    },
    layout: {
      autoPadding: true,
      padding: 40,
    },
  };

  return (
    <>
      <div className="relative w-full overflow-visible">
        <Pie data={data} options={options} />
        <div className="absolute top-10">
          <p>{currentMonth}월 지출</p>
          <p>{monthlyTotalAmount.toLocaleString()}원</p>
        </div>
      </div>
      <button className="btn btn-accent w-full ">지출입력</button>
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
