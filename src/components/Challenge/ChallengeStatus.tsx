import { ChallengeData } from "../../interface/interface";
import { FcClock } from "react-icons/Fc";
import ChallengeChart from "./ChallengeChart";
import tw, { styled } from "twin.macro";
import { useEffect, useState } from "react";
import { dDayCalculator } from "../../helpers/helper";
import ChallengeRegistration from "./ChallengeRegistration";
import { BiWon } from "react-icons/Bi";
import { GiTwoCoins } from "react-icons/Gi";

const ArticleContainer = styled.article`
  ${tw`pt-2 pb-20 bg-base-color`};
  min-height: calc(100vh - 168px);
`;

interface ChallengeDataProps {
  data: ChallengeData;
}

const ChallengeStatus = ({ data }: ChallengeDataProps) => {
  const [isStart, setIsStart] = useState<boolean | null>(null);
  const [startDday, setStartDday] = useState<number | null>(null);
  const goalAmount = data.goal_amount.toLocaleString();

  useEffect(() => {
    const today = new Date();
    const start = new Date(data.start_date);
    if (start > today) {
      setIsStart(false);
      const d_day = dDayCalculator(data.start_date);
      setStartDday(d_day);
    } else {
      setIsStart(true);
    }
  }, [data]);

  return (
    <ArticleContainer>
      <div className="w-11/12 mx-auto">
        <div className="text-cyan-950 text-sm flex justify-center items-center bg-teal-50  rounded-lg  shadow py-3 mb-2">
          <GiTwoCoins size={17} className="text-yellow-400 mr-1" />
          <div className="mr-2">목표금액</div>
          <BiWon size={13} className="mr-0.5" />
          <div>{goalAmount}</div>
        </div>
        {isStart ? (
          <div className="text-xs flex justify-around items-center bg-base-100  rounded-lg h-10 shadow mb-2">
            <div className="pt-0.5">
              {data.start_date} - {data.end_date}
            </div>
            <div className="text-cyan-950 flex justify-center items-center">
              <FcClock size={14} className="mr-1" />

              <p className="pt-0.5">종료까지 D-{data.d_day}</p>
            </div>
          </div>
        ) : (
          <div className="text-xs flex flex-col justify-around items-center bg-base-100  rounded-lg py-6 space-y-3 shadow mb-2">
            <div className="pt-0.5 text-sm">
              {data.start_date} - {data.end_date}
            </div>
            <div className="text-cyan-950 text-base flex justify-center items-center">
              <FcClock size={20} className="mr-1" />

              <p className="pt-0.5">시작까지 D-{startDday}</p>
            </div>
          </div>
        )}

        {isStart ? (
          <ChallengeChart challengeData={data} />
        ) : (
          <ChallengeRegistration challengeData={data} />
        )}
      </div>
    </ArticleContainer>
  );
};

export default ChallengeStatus;
