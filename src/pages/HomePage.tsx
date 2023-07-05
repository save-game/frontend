import { useState, useEffect, useCallback } from "react";
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
import { FcSearch } from "react-icons/Fc";

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
    remove,
  } = useInfiniteQuery(
    ["getChallengeData"],
    ({ pageParam = 0 }) => getMyChallengeList(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.isLast) return lastPage.number + 1;
      },
    }
  );

  const updateData = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  useEffect(() => {
    remove();
    updateData();
  }, [isIng]);

  useEffect(() => {
    if (myChallengeList?.pages[0].empty) {
      setIsHavingChallenge(false);
    } else {
      setIsHavingChallenge(true);
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
        {ishavingChallenge || !isIng ? (
          <div className="mt-4 w-full mb-4 pb-3 overflow-hidden text-cyan-950 bg-slate-100 rounded-lg shadow">
            <div className="bg-base-100">
              <div className="flex justify-start items-center bg-base-100 text-[15px] px-5 pt-3 ">
                <img src={Logo} alt="mainLogo" className="w-5 mr-1" />
                <p className="pt-1 text-cyan-800">나의 챌린지</p>
              </div>
              <div className=" w-full h-7 flex justify-end items-center pr-3">
                <label className="label cursor-pointer">
                  <span className="label-text font-semibold text-cyan-950 text-xs mr-1 pt-0.5">
                    {isIng ? "진행 중" : "종료"}
                  </span>
                  <input
                    type="checkbox"
                    className="toggle toggle-sm"
                    defaultChecked
                    onChange={() => setIsIng(!isIng)}
                    value={isIng ? "진행 중" : "종료"}
                  />
                </label>
              </div>
            </div>
            {isIng ? (
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
            )}
          </div>
        ) : (
          <div className="text-cyan-950 mt-2 p-2 py-5 w-full rounded-lg bg-base-100">
            <div className="flex justify-start items-center mb-4 px-3">
              <img src={Logo} alt="mainLogo" className="w-5 mr-1" />
              <p className="">새로운 챌린지에 도전해 보세요!</p>
            </div>
            <div className="flex justify-center ">
              <button
                className="btn  w-full shadow"
                onClick={handleMoveChallengeHome}
              >
                <p className="pt-0.5">챌린지 둘러보러 가기</p>
                <FcSearch size={17} />
              </button>
            </div>
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
