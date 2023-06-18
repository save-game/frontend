import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  CoreScaleOptions,
  Scale,
  Tick,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChallengeData } from "../../interface/interface";
import { dateRangeCalculator } from "../../helpers/helper";
import MembersStatus from "./MembersStatus";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

interface Props {
  challengeData: ChallengeData;
}

const ChallengeChart = ({ challengeData }: Props) => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(66, 84, 82, 0.7)",
        usePointStyle: true,
        callbacks: {
          title: (context) => {
            const title = context[0].label + " 누적금액";
            return title;
          },
        },
        titleFont: {
          size: 11,
        },
      },
    },
    scales: {
      x: {
        afterTickToLabelConversion: (
          scaleinstance: Scale<CoreScaleOptions>
        ) => {
          const ticks = scaleinstance.ticks;
          const newTicks = ticks.map((tick) => {
            if (tick.label && typeof tick.label === "string") {
              const newlabel = tick.label.split("");
              newlabel.splice(-5);
              return { ...tick, label: newlabel.join("") };
            }
          }) as Tick[];
          scaleinstance.ticks = newTicks;
        },
        grid: {
          display: false,
        },
        ticks: {
          padding: -2,
        },
      },
      y: {
        afterDataLimits: (scale: { max: number }) => {
          scale.max = challengeData.goal_amount;
        },
        afterTickToLabelConversion: (
          scaleinstance: Scale<CoreScaleOptions>
        ) => {
          const ticks = scaleinstance.ticks;
          const newTicks = ticks.map((tick) => {
            if (tick.label && typeof tick.label === "string") {
              const labelInNumber = Number(tick.label.replace(/,/g, ""));
              if (labelInNumber > 9999) {
                const formattedAmount = labelInNumber / 10000;
                return { ...tick, label: formattedAmount.toString() };
              } else {
                return { ...tick };
              }
            }
          }) as Tick[];
          scaleinstance.ticks = newTicks;
        },
      },
    },
  };

  const labels = dateRangeCalculator(
    challengeData.start_date,
    challengeData.end_date
  );

  const expenseData = challengeData.challengeMemberList.map((data, idx) => {
    let accumulatedAmount = 0;
    const dataset = {
      label: data.nickName,
      data: data.recordList.map((record) => {
        accumulatedAmount += record.amount;
        const dailyAmount = {
          x: new Date(record.date).toLocaleDateString("en-US"),
          y: accumulatedAmount,
        };
        return dailyAmount;
      }),
      borderColor: bgColor[idx],
      backgroundColor: bgColor[idx],
    };

    return dataset;
  });

  // console.log("expenseData", expenseData);

  const data = {
    labels,
    datasets: expenseData,
  };

  return (
    <>
      <div className="bg-base-100 rounded-lg mt-3">
        <div className="text-[9px] font-light text-neutral-500 text-left -my-1 pl-0.5">
          만원
        </div>
        <Line data={data} options={options} />
      </div>
      <div className="flex items-center bg-base-100 rounded-lg mt-3 text-xs p-2 font-light">
        <div className="mr-1">참가자 : </div>
        <div>{expenseData.length} 명</div>
      </div>
      <div className="bg-base-100 rounded-lg mt-3 text-xs p-2 font-light">
        {challengeData.challengeMemberList.map((challengersData) => (
          <div key={challengersData.memberId}>
            <MembersStatus data={challengersData} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ChallengeChart;

const bgColor = ["#e787d5", "#348bdc", "#c4dc6f"];
