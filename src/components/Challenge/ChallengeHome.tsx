import { useEffect, useCallback } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import tw from "twin.macro";

import ChallengeForm from "../../components/Challenge/ChallengeForm";
import ChallengeFilter from "./ChallengeFilter";
import ChallengeCard from "./ChallengeCard";
import { ChallengeDataProps } from "../../interface/interface";
import { openFormState } from "../../Recoil/challengeFormAtom";
import { getChallengeList } from "../../api/challengeAPI";
import { filterParameterSelector } from "../../Recoil/challengeHomeFilterAtom";
import { ChallengeFilterProps } from "../../interface/interface";
import { useInView } from "react-intersection-observer";
import { CgSpinner } from "react-icons/Cg";
import { useInfiniteQuery } from "react-query";
import { IoCreateOutline } from "react-icons/Io5";
import { TiPlus } from "react-icons/ti";

const Container = styled.div`
  ${tw`mx-auto relative w-full px-2  pt-4 text-neutral-600 font-bold text-sm overflow-hidden`}
`;

export default function ChallengeHome() {
  const [, setOpenForm] = useRecoilState(openFormState);
  const filterValues = useRecoilValue(filterParameterSelector);
  const resetSaerchFilter = useResetRecoilState(filterParameterSelector);
  const [observeTarget, inView] = useInView({ threshold: 0.9 });

  const handleGetFilteredChallengeData = useCallback(
    async (value: ChallengeFilterProps, pageParam: number) => {
      try {
        const response = await getChallengeList(value, pageParam);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(
          `handleGetFilteredChallengeData Error: Time(${new Date()}) ERROR ${error}`
        );
      }
    },
    []
  );

  const {
    data: challengeData,
    isFetchingNextPage,
    fetchNextPage,
    remove,
  } = useInfiniteQuery(
    ["getChallengeData", filterValues],
    ({ pageParam = 0 }) =>
      handleGetFilteredChallengeData(filterValues, pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.isLast) return lastPage.number + 1;
      },
    }
  );

  const handleResetFilter = () => {
    resetSaerchFilter();
    handleGetFilteredChallengeData(
      {
        searchType: "ALL",
        keyword: "",
        minAmount: 0,
        maxAmount: 10000000,
        category: null,
      },
      0
    );
  };
  useEffect(() => {
    remove();
  }, []);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <main>
      <Container>
        <ChallengeFilter handleResetFilter={handleResetFilter} />
        <ChallengeCardWarp>
          {challengeData?.pages.map((page) =>
            page.content.map((item: ChallengeDataProps) => (
              <div key={item.challengeId} className="mb-1">
                <ChallengeCard challengeData={item} />
              </div>
            ))
          )}

          <div ref={observeTarget} className=" h-14">
            {isFetchingNextPage ? (
              <CgSpinner
                size={25}
                className="animate-spin mx-auto text-accent-focus"
              />
            ) : null}
          </div>
        </ChallengeCardWarp>
        <ChallengeForm />
      </Container>
      <label
        onClick={() => setOpenForm(true)}
        className="btn btn-circle flex justify-center items-center fixed btn-neutral text-base-100 bottom-20 mb-2 right-5 shadow"
      >
        {/* <IoCreateOutline size={23} className="ml-1 -mt-1" /> */}
        <TiPlus size={25} />
      </label>
    </main>
  );
}

const ChallengeCardWarp = styled.div`
  height: 70%;
  ${tw`mt-4 overflow-scroll overscroll-contain`};
`;
