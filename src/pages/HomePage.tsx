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
import Logo from "../assets/save_game_300x300.png";

interface MyChallengeList {
  challengeId: number;
  title: string;
  endDate: string;
}

export default function Home() {
  const { data: userInfo }: UseQueryResult<UserData> = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [observeTarget, inView] = useInView({ threshold: 0.9 });
  const [isIng, setIsIng] = useState(true);
  const [ishavingChallenge, setIsHavingChallenge] = useState(true);

  const navigate = useNavigate();

  const handleMoveChallengeHome = () => {
    navigate("/challenge");
  };

  const getMyChallengeList = async (pageParam: number) => {
    try {
      const response = await getMyChallenge(pageParam, isIng);
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <div className="w-11/12">
        <ProfileContainer>
          <ProfileImgContainer>
            {userInfo?.profileImageUrl ? (
              <img src={userInfo.profileImageUrl} />
            ) : (
              <BsPersonFill size={56} className="mt-2" />
            )}
          </ProfileImgContainer>
          <p className="ml-4 pt-1 text-cyan-950 font-bold text-[16px]">
            {userInfo?.nickname}
          </p>
        </ProfileContainer>
        <ExpenseGraphContainer />
        <ExpenseFormButton size={"normal"} />
        {!isEmpty ? (
          <div className="mt-4 w-full mb-16 pb-3 overflow-hidden text-cyan-950 bg-slate-100 rounded-lg shadow">
            <div className="bg-base-100">
              <div className="flex justify-center items-center bg-base-100 text-[15px] pt-4 pb-2  ">
                <img src={Logo} alt="mainLogo" className="w-5 mr-1" />
                <p className="pt-1 text-cyan-800">나의 챌린지</p>
              </div>
              <div className=" w-full flex justify-end items-center pr-3">
                <label className="label cursor-pointer">
                  <span className="label-text font-semibold text-cyan-950 text-xs mr-1 pt-0.5">
                    {ingTab ? "진행 중" : "종료"}
                  </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm"
                    defaultChecked
                    onChange={() => setIngTab(!ingTab)}
                    value={ingTab ? "진행 중" : "종료"}
                  />
                </label>
              </div>
            </div>
            {ingTab ? (
              <div className="w-full p-2 ">
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
              <div>종료된거</div>
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
      </div>
    </Container>
  );
}

const Container = styled.main`
  ${tw`mx-auto bg-base-color pt-7 text-neutral-500 font-bold text-sm flex flex-col justify-center items-center`}
`;

const ProfileContainer = styled.div`
  font-weight: 300;
  ${tw`h-16 w-full flex items-center px-4 p-2 rounded-xl bg-base-100 shadow`}
`;

const ProfileImgContainer = styled.div`
  ${tw`w-14 h-14  rounded-full overflow-hidden bg-[#f0f8f6] text-accent shadow-lg`}
`;
