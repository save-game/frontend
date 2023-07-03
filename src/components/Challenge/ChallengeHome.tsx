import { useEffect, useState, useCallback } from "react";
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
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
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";

const Container = styled.div`
  ${tw`mx-auto relative w-11/12 h-screen max-h-screen pt-8 text-neutral-600 font-bold text-sm overflow-hidden`}
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
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
      <Container>
        <ChallengeFilter handleResetFilter={handleResetFilter} />
        <ChallengeCardWarp>
          {challengeData?.pages.map((page) =>
            page.content.map((item: ChallengeDataProps) => (
              <div key={item.challengeId} className="mb-4">
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
        <label
          onClick={() => setOpenForm(true)}
          className="btn btn-circle absolute btn-accent bottom-20 mb-2 right-2"
        >
          +
        </label>
        <ChallengeForm />
      </Container>
    </>
  );
}

const ChallengeCardWarp = styled.div`
  height: 70%;
  ${tw`mt-4 overflow-scroll overscroll-contain`};
`;
