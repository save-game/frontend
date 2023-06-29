import { useState, useEffect } from "react";
import { Chart, ArcElement, Tooltip, TooltipItem } from "chart.js";
import { Pie } from "react-chartjs-2";

import { ExpenseDataForAnalyze } from "../../interface/interface";

Chart.register(ArcElement, Tooltip);

export default function ExpenseGraph({
  total,
  list,
}: {
  total: number;
  list: ExpenseDataForAnalyze[];
}) {
  const [monthlyExpenseData, setMonthlyExpenseData] =
    useState<ExpenseDataForAnalyze[]>(list);
  const [monthlyTotalAmount, setMonthlyTotalAmount] = useState<number>(total);

  useEffect(() => {
    setMonthlyExpenseData(list);
    setMonthlyTotalAmount(total);
  }, [list, total]);

  const data = {
    datasets: [
      {
        data: monthlyExpenseData,
        backgroundColor: bgColor,
        borderColor: bgColor,
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
              monthlyExpenseData && monthlyExpenseData[dataIndex].total;
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
      key: "total",
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
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
  "#aec7e8",
  "#ffbb78",
  "#98df8a",
];
