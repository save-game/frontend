import { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

interface ExpenseData {
  category: string;
  amount: number;
}

export default function ExpenseGraph() {
  const [monthlyExpenseData, setMonthlyExpenseData] = useState<ExpenseData[]>();

  const getMonthlyExpenseData = async () => {
    try {
      const response = await axios.get("./src/test/graphTest.json");
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
        callbacks: {},
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

  return <Pie data={data} options={options} width={300} height={300} />;
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
