import styled from "styled-components";
import tw from "twin.macro";
import { ChallengeMemberResultData } from "../../interface/interface";
import { useEffect, useState } from "react";
import MembersStatus from "./MembersStatus";

const ArticleContainer = styled.article`
  ${tw`pt-3 pb-20 bg-base-color rounded-t-2xl`};
  min-height: calc(100vh - 136px);
`;

const ListContainer = styled.ul`
  ${tw`bg-base-100 text-cyan-950  rounded-lg shadow py-5 mb-3`};
`;

interface ChallengeDataProps {
  data: ChallengeMemberResultData[];
}
interface SortedChallengeData {
  topRecord?: ChallengeMemberResultData[];
  successGroup?: ChallengeMemberResultData[];
  failureGroup?: ChallengeMemberResultData[];
}

const ChallengeResult = ({ data }: ChallengeDataProps) => {
  const [sortedData, setSortedData] = useState<SortedChallengeData | null>(
    null
  );

  useEffect(() => {
    let minAmount = 0;
    const topRecord = data.filter((record) => {
      if (data[0].status !== 1) return;
      minAmount = data[0].total_amount;
      return record.total_amount === minAmount;
    });
    const successGroup = data.filter(
      (record) => record.total_amount !== minAmount && record.status === 1
    );
    const failureGroup = data.filter((record) => record.status === 0);
    const dataGroup = {
      topRecord: topRecord,
      successGroup: successGroup,
      failureGroup: failureGroup,
    };
    console.log("dataGroup", dataGroup);
    setSortedData(dataGroup);
  }, [data]);

  return (
    <ArticleContainer>
      <div className="w-11/12 mx-auto">
        <div className="flex items-center justify-center bg-base-100  rounded-lg h-12 shadow mb-3 ">
          <div className="mx-2 mt-1 text-cyan-950 text-base leading-6">
            도전 종료!!
          </div>
        </div>

        {sortedData?.topRecord ? (
          <ListContainer>
            <p className="mb-1.5">가장 적게 쓰셨네요!</p>
            {sortedData?.topRecord.map((record) => (
              <li key={record.memberId}>
                <MembersStatus data={record} top={true} />
              </li>
            ))}
          </ListContainer>
        ) : null}
        {sortedData?.successGroup ? (
          <ListContainer>
            <p className="mb-1.5">성공 하셨어요!</p>
            {sortedData?.successGroup.map((record) => (
              <li key={record.memberId}>
                <MembersStatus data={record} top={false} />
              </li>
            ))}
          </ListContainer>
        ) : null}
        {sortedData?.failureGroup ? (
          <ListContainer>
            <p className="mb-1.5">다음에는 꼭 성공해봐요!</p>
            {sortedData?.failureGroup.map((record) => (
              <li key={record.memberId}>
                <MembersStatus data={record} top={false} />
              </li>
            ))}
          </ListContainer>
        ) : null}
      </div>
    </ArticleContainer>
  );
};

export default ChallengeResult;
