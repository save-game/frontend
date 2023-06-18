import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import { dDayCalculator } from "../helpers/helper";
import ChallengeStatus from "../components/ChallengeRoom/ChallengeStatus";
import { ChallengeData, ChallengeMemberData } from "../interface/interface";

const Container = styled.div`
  ${tw`mx-auto pt-8 text-neutral-600 font-bold text-sm text-center`}
`;

const ChallengeRoom = () => {
  const { challengeId } = useParams();
  const [challengeData, setChallengeDate] = useState<ChallengeData | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [tabMenu, setTabMenu] = useState("챌린지 현황");

  // challengeId로 정보 서버에서 받아오기
  const getMyChallengeList = async () => {
    try {
      const { data } = await axios.get("/src/test/challengeStatus.json");
      const listWithTotalAmount = data.challengeMemberList
        .map((info: ChallengeMemberData) => {
          const ttlAmount = info.recordList
            .map((record) => record.amount)
            .reduce((pre, cur) => pre + cur)
            .toLocaleString("ko-KR");
          return { ...info, ttlAmount: ttlAmount };
        })
        .sort((a: ChallengeMemberData, b: ChallengeMemberData) => {
          if (!a.ttlAmount || !b.ttlAmount) return;
          const toNumber = (nbr: string) => {
            return Number(nbr.replace(/,/g, ""));
          };
          return toNumber(a.ttlAmount) - toNumber(b.ttlAmount);
        });
      const daysDiff = dDayCalculator(data.end_date);
      const addedData = {
        ...data,
        d_day: daysDiff,
        challengeMemberList: listWithTotalAmount,
      };
      setChallengeDate(addedData);
      console.log(addedData);
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
              <ChallengeStatus data={challengeData} />
            ) : (
              <div>게시판</div>
            )}
          </>
        ) : (
          <div> 도전종료</div>
        )}
      </Container>
    </main>
  );
};

export default ChallengeRoom;
