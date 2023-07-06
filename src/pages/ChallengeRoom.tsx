import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { dDayCalculator } from "../helpers/helper";
import {
  ChallengeData,
  ChallengeMemberData,
  ChallengeMemberResultData,
  ChallengeResultData,
} from "../interface/interface";
import ChallengeStatus from "../components/Challenge/ChallengeStatus";
import ChallengeResult from "../components/Challenge/ChallengeResult";
import { BiWon } from "react-icons/Bi";
import { GiTwoCoins } from "react-icons/Gi";
import { challengersColor } from "../constants/challengersColor";
import NewBoardBtn from "../components/Board/NewBoardBtn";
import BoardList from "../components/Board/BoardList";
import { useQuery } from "react-query";
import { getChallengeStatus } from "../api/challengeAPI";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { ChanllegeCategoryList } from "../constants/expenseCategory";

const Container = styled.div`
  ${tw`mx-auto pt-8 text-neutral-600 font-bold text-sm text-center`}
`;

const ChallengeRoom = () => {
  const { challengeId } = useParams();
  const [challengeData, setChallengeData] = useState<
    ChallengeData | ChallengeResultData | null
  >(null);
  const [isOpen, setIsOpen] = useState(false);
  const [tabMenu, setTabMenu] = useState("챌린지 현황");
  const goalAmount = challengeData?.goalAmount.toLocaleString("ko-KR");
  const category = ChanllegeCategoryList.find(
    (item) => item.category === challengeData?.category.toLocaleLowerCase()
  );

  const { data: statusData, isLoading } = useQuery(
    ["challengeStatus", challengeId],
    () => getChallengeStatus(Number(challengeId))
  );

  useEffect(() => {
    console.log("challengeStatusData", statusData);
    if (!statusData) return;
    getChallengeList();
  }, [statusData]);

  useEffect(() => {
    if (challengeData?.challengeStatus === 1) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [challengeData]);

  const getChallengeList = () => {
    let minAmount = 0;
    const listWithAddedInfo = statusData.data.challengeMemberList
      .map((info: ChallengeMemberData, idx: number) => {
        return {
          ...info,
          color: challengersColor[idx],
        };
      })
      .map((info: ChallengeMemberData, idx: number) => {
        if (idx === 0) {
          minAmount = info.totalAmount;
        }
        const ranking =
          info.totalAmount === minAmount && info.status === 1 ? true : false;
        return { ...info, isFirst: ranking };
      });
    const daysDiff = dDayCalculator(statusData.data.endDate);
    const addedData = {
      ...statusData.data,
      // challengeStatus: 0,
      d_day: daysDiff,
      challengeMemberList: listWithAddedInfo,
    };
    setChallengeData(addedData);
    console.log(addedData);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="bg-base-100">
      <Container>
        <h2 className="text-base mb-3 text-cyan-950">{challengeData?.title}</h2>
        <p className="text-xs font-light text-neutral-500 mb-4">
          {challengeData?.content}
        </p>
        {isOpen ? (
          <>
            <div className="tabs">
              {["챌린지 현황", "게시판"].map((menu) => (
                <button
                  key={menu}
                  className={`tab tab-bordered w-1/2  ${
                    tabMenu === menu ? `text-accent-focus border-current` : null
                  }`}
                  onClick={() => setTabMenu(menu)}
                >
                  {menu}
                </button>
              ))}
            </div>
            {tabMenu === "챌린지 현황" ? (
              <ChallengeStatus
                data={challengeData as ChallengeData}
                category={category}
              />
            ) : (
              <>
                <BoardList challengeId={challengeId} />
                <NewBoardBtn />
              </>
            )}
          </>
        ) : (
          <>
            <div className="text-cyan-950 text-sm flex justify-center items-center bg-base-color  rounded-lg  shadow py-3 mx-2 mb-2">
              <GiTwoCoins size={17} className="text-yellow-400 mr-1" />
              <div className="mr-2">목표금액</div>
              <BiWon size={13} className="mr-0.5" />
              <div>{goalAmount}</div>
            </div>
            <div className="text-cyan-950 text-sm flex flex-col justify-center items-center bg-base-color  rounded-lg  shadow py-1 mx-2 mb-2">
              <div
                className={`w-8 h-8 flex justify-center items-center overflow-hidden rounded-full text-base-100 ${category?.color}`}
              >
                {category?.icon}
              </div>
              <div className="text-xs">{category?.name}</div>
            </div>
            <ChallengeResult
              data={
                challengeData?.challengeMemberList as ChallengeMemberResultData[]
              }
            />
          </>
        )}
      </Container>
    </main>
  );
};

export default ChallengeRoom;
