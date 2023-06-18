import { ChallengeData } from "../../interface/interface";
import { FcClock } from "react-icons/Fc";
import ChallengeChart from "./ChallengeChart";
import tw, { styled } from "twin.macro";

const ArticleContainer = styled.article`
  ${tw`pt-3 pb-20 bg-base-color`};
  min-height: calc(100vh - 168px);
`;

interface Props {
  data: ChallengeData;
}

const ChallengeStatus = ({ data }: Props) => {
  return (
    <ArticleContainer>
      <div className="w-11/12 mx-auto">
        <div className="text-xs flex justify-around items-center bg-base-100  rounded-lg h-10 shadow mb-2">
          <div className="pt-0.5">
            {data.start_date} - {data.end_date}
          </div>
          <div className="text-cyan-950 flex justify-center items-center">
            <FcClock size={14} className="mr-1" />
            <p className="pt-0.5">종료까지 D-{data.d_day}</p>
          </div>
        </div>
        <ChallengeChart challengeData={data} />
      </div>
    </ArticleContainer>
  );
};

export default ChallengeStatus;
