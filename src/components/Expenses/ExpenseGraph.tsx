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

  const categoryColor = monthlyExpenseData.map((data) => data.bgColor);

  const data = {
    datasets: [
      {
        data: monthlyExpenseData.map((data) => {
          const record = {
            category: data.category,
            total: data.total,
          };
          return record;
        }),
        backgroundColor: categoryColor,
        borderColor: categoryColor,
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 14,
        },
        backgroundColor: "rgba(66, 84, 82, 0.7)",
        usePointStyle: true,
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

  return (
    <div className="-mt-2">
      <Pie data={data} options={options} width={300} height={300} />
    </div>
  );
}
