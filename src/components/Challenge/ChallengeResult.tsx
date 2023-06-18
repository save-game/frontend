import styled from "styled-components";
import tw from "twin.macro";
import { BsFire } from "react-icons/Bs";

const ArticleContainer = styled.article`
  ${tw`pt-3 pb-20 bg-base-color rounded-t-2xl`};
  min-height: calc(100vh - 136px);
`;

const ChallengeResult = () => {
  return (
    <ArticleContainer>
      <div className="w-11/12 mx-auto">
        <div className="flex items-center justify-center bg-base-100  rounded-lg h-10 shadow mb-2 ">
          <BsFire size={16} className="text-amber-400" />
          <div className="mx-2 mt-1 text-cyan-950 text-base leading-6">
            도전 종료!!
          </div>
          <BsFire size={16} className="text-amber-400" />
        </div>
      </div>
    </ArticleContainer>
  );
};

export default ChallengeResult;
