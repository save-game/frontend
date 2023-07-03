import { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useNavigate } from "react-router";

import ExpenseGraphContainer from "../components/Expenses/ExpenseGraphContainer";
import MyChallengeCard from "../components/Challenge/MyChallengeCard";
import ExpenseFormButton from "../components/Expenses/ExpenseFormButton";
import { useUser } from "../api/membersAPI";
import { UserData } from "../interface/interface";
import { UseQueryResult, useInfiniteQuery } from "react-query";
import { BsPersonFill } from "react-icons/Bs";
import { getMyChallenge } from "../api/membersAPI";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { useInView } from "react-intersection-observer";
import { CgSpinner } from "react-icons/Cg";

interface MyChallengeList {
  challengeId: number;
  title: string;
  endDate: string;
}

export default function Home() {
  const { data: userInfo }: UseQueryResult<UserData> = useUser();
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [observeTarget, inView] = useInView({ threshold: 0.9 });

  const navigate = useNavigate();

  const handleMoveChallengeHome = () => {
    navigate("/challenge");
  };

  const getMyChallengeList = async (pageParam: number) => {
    try {
      const response = await getMyChallenge(pageParam);
      return response.data;
    } catch (error) {
      console.error(
        `getMyChallengeList Error: Time(${new Date()}) ERROR ${error}`
      );
    }
  };
  const {
    data: myChallengeList,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ["getChallengeData"],
    ({ pageParam = 0 }) => getMyChallengeList(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.isLast) return lastPage.number + 1;
      },
    }
  );
  useEffect(() => {
    if (myChallengeList?.pages[0].empty) {
      setIsEmpty(true);
    }
  }, [myChallengeList?.pages]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
          {!isEmpty ? (
            <div className="mt-6 w-full mb-16 text-black">
              도전 중인 챌린지
              {myChallengeList?.pages.map((page) =>
                page.content.map((item: MyChallengeList, i: number) => {
                  return (
                    <div key={i}>
                      <MyChallengeCard myChallenge={item} />
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            <div className="text-black mt-10 w-full">
              <p className="mb-4">새로운 챌린지에 도전해 보세요!</p>
              <button
                className="btn btn-accent text-white w-full h-20 "
                onClick={handleMoveChallengeHome}
              >
                챌린지 둘러보러 가기
              </button>
            </div>
          )}
          <div ref={observeTarget} className=" h-14">
            {isFetchingNextPage ? (
              <CgSpinner
                size={25}
                className="animate-spin mx-auto text-accent-focus"
              />
            ) : null}
          </div>
        </Container>
      )}
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
