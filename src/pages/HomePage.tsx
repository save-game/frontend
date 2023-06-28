import { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";
import { useNavigate } from "react-router";

import ExpenseGraphContainer from "../components/Expenses/ExpenseGraphContainer";
import MyChallengeCard from "../components/Challenge/MyChallengeCard";
import ExpenseFormButton from "../components/Expenses/ExpenseFormButton";
import { useUser } from "../api/member";
import { UserData } from "../interface/interface";
import { UseQueryResult } from "react-query";
import { BsPersonFill } from "react-icons/Bs";

interface MyChallengeList {
  challengeId: number;
  title: string;
  endDate: string;
}

export default function Home() {
  const { data: userInfo }: UseQueryResult<UserData> = useUser();
  const [myChallengeList, setMyChallengeList] = useState<MyChallengeList[]>();

  const navigate = useNavigate();

  const handleMoveChallengeHome = () => {
    navigate("/challenge");
  };

  const getMyChallengeList = async () => {
    try {
      const response = await axios.get("./test/homeTest.json");
      setMyChallengeList(response.data);
    } catch (error) {
      console.error(
        `getMyChallengeList Error: Time(${new Date()}) ERROR ${error}`
      );
    }
  };

  useEffect(() => {
    getMyChallengeList();
  }, []);

  return (
    <>
      <Container>
        <ProfileContainer>
          <ProfileImgContainer>
            {userInfo?.profileImageUrl ? (
              <img src={userInfo.profileImageUrl} />
            ) : (
              <BsPersonFill size={80} className="mt-2" />
            )}
          </ProfileImgContainer>
          <p className="ml-4 text-accent text-lg">{userInfo?.nickname}</p>
        </ProfileContainer>
        <ExpenseGraphContainer />
        <ExpenseFormButton size={"normal"} />
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
            <button
              className="btn btn-accent w-full h-20 "
              onClick={handleMoveChallengeHome}
            >
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
  ${tw`h-20 w-full flex items-center px-4 pb-2 shadow-md rounded-md`}
`;

const ProfileImgContainer = styled.div`
  ${tw`w-20 h-20  rounded-full overflow-hidden bg-[#f0f8f6] text-accent shadow-lg`}
`;
