import { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";

import ExpenseGraphContainer from "../components/ExpenseGraphContainer";
import MyChallengeCard from "../components/MyChallengeCard";

interface MyChallengeList {
  title: string;
  endDate: string;
}

export default function Home() {
  const [imgSrc, setImgSrc] = useState("https://picsum.photos/70");
  const [nickName, setNickName] = useState("닉네임(기본값)");
  const [myChallengeList, setMyChallengeList] = useState<MyChallengeList[]>();

  const getMyChallengeList = async () => {
    try {
      const response = await axios.get("./src/test/challengeHomeTest.json");
      setMyChallengeList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyChallengeList();
  }, []);

  return (
    <>
      <Container>
        <ProfileContainer>
          <ProfileImg src={imgSrc} />
          <p className="ml-4 text-accent text-lg">{nickName}</p>
        </ProfileContainer>
        <ExpenseGraphContainer />
        <button className="btn btn-accent w-full">지출 입력</button>
        {myChallengeList ? (
          <div className="mt-6 w-full mb-16 text-black">
            도전 중인 챌린지
            {myChallengeList.map((v, i) => {
              return (
                <div key={i}>
                  <MyChallengeCard myChallenge={v} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-black mt-10 w-full">
            <p className="mb-4">새로운 챌린지에 도전해 보세요!</p>
            <button className="btn btn-accent w-full h-20 ">
              챌린지 둘러보러 가기
            </button>
          </div>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  ${tw`mx-auto w-11/12 pt-8 text-neutral-500 font-bold text-sm flex flex-col justify-center items-center`}
`;

const ProfileContainer = styled.div`
  font-weight: 300;
  ${tw`h-20 w-full flex items-center mt-10 px-4 pb-2 shadow-md rounded-md`}
`;

const ProfileImg = styled.img`
  width: 70px;
  height: 70px;
  ${tw` rounded-full`};
`;
