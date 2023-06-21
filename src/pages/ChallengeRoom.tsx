import axios from "axios";
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
  const goalAmount = challengeData?.goal_amount.toLocaleString("ko-KR");

  // challengeId로 정보 서버에서 받아오기
  const getMyChallengeList = async () => {
    let minAmount = 0;
    try {
      const { data } = await axios.get("/src/test/challengeStatus.json");
      if (data.challenge_status === 1) {
        const listWithTotalAmount = data.challengeMemberList
          .map((info: ChallengeMemberData, idx: number) => {
            const ttlAmount = info.recordList
              .map((record) => record.amount)
              .reduce((pre, cur) => pre + cur);
            return {
              ...info,
              total_amount: ttlAmount,
              color: challengersColor[idx],
            };
          })
          .sort((a: ChallengeMemberData, b: ChallengeMemberData) => {
            if (!a.total_amount || !b.total_amount) return;
            return a.total_amount - b.total_amount;
          })
          .map((info: ChallengeMemberData, idx: number) => {
            if (idx === 0) {
              minAmount = info.total_amount;
            }
            const ranking =
              info.total_amount === minAmount && info.status === 1
                ? true
                : false;
            return { ...info, isFirst: ranking };
          });
        const daysDiff = dDayCalculator(data.end_date);
        const addedData = {
          ...data,
          d_day: daysDiff,
          challengeMemberList: listWithTotalAmount,
        };
        setChallengeData(addedData);
        console.log(addedData);
      } else {
        //실제로는 위에 data를 바로 setChallengeData하면 된다
        //아래는 별도 fake data적용하기 위한 임시 코드임
        const { data } = await axios.get("/src/test/challengeResult.json");
        const sortedMemberList = data.challengeMemberList.sort(
          (a: ChallengeMemberResultData, b: ChallengeMemberResultData) => {
            if (!a.total_amount || !b.total_amount) return;
            return a.total_amount - b.total_amount;
          }
        );
        const sortedData = { ...data, challengeMemberList: sortedMemberList };
        setChallengeData(sortedData);
        console.log(sortedData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyChallengeList();
  }, [challengeId]);

  useEffect(() => {
    if (challengeData?.challenge_status === 1) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [challengeData]);

  if (!challengeData) {
    //로딩 컴포넌트도 필요
    return (
      <>
        <div className="text-center mt-20">잘못된 접근입니다.</div>
      </>
    );
  }

  return (
    <main className="">
      <Container>
        <h2 className="text-base mb-3">{challengeData.title}</h2>
        <p className="text-xs font-light text-neutral-500 mb-4">
          {challengeData.content}
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
              <ChallengeStatus data={challengeData as ChallengeData} />
            ) : (
              <>
                <div>게시판</div>
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
            <ChallengeResult
              data={
                challengeData.challengeMemberList as ChallengeMemberResultData[]
              }
            />
          </>
        )}
      </Container>
    </main>
  );
};

export default ChallengeRoom;
