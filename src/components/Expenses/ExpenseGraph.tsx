import { useState, useEffect } from "react";
import axios from "axios";
import { Chart, ArcElement, Tooltip, TooltipItem } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip);

interface ExpenseData {
  category: string;
  amount: number;
}

export default function ExpenseGraph() {
  const [monthlyExpenseData, setMonthlyExpenseData] = useState<ExpenseData[]>();
  const [monthlyTotalAmount, setMonthlyTotalAmount] = useState<number>(0);

  const getMonthlyExpenseData = async () => {
    try {
      const response = await axios.get("./test/graphTest.json");
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
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 14,
        },
        callbacks: {
          title: (tooltipItems: TooltipItem<"pie">[]) => {
            const dataIndex = tooltipItems[0].dataIndex;
            return monthlyExpenseData && monthlyExpenseData[dataIndex].category;
          },
          label: (tooltipItem: TooltipItem<"pie">) => {
            const dataIndex = tooltipItem.dataIndex;
            const amount =
              monthlyExpenseData && monthlyExpenseData[dataIndex].amount;
            if (!amount) {
              return;
            }
            return `${Math.floor((amount / monthlyTotalAmount) * 100)}%`;
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
