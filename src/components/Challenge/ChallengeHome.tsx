import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import tw from "twin.macro";
import axios from "axios";

import ChallengeForm from "../../components/Challenge/ChallengeForm";
import ChallengeFilter from "./ChallengeFilter";
import ChallengeCard from "./ChallengeCard";
import { ChallengeDataProps } from "../../interface/interface";
import { openFormState } from "../../Recoil/challengeFormAtom";
import { getSearchChallenge } from "../../api/challengeAPI";
import { filterParameterSelector } from "../../Recoil/challengeHomeFilterAtom";

const Container = styled.div`
  ${tw`mx-auto relative w-11/12 h-screen max-h-screen pt-8 text-neutral-600 font-bold text-sm overflow-hidden`}
`;

export default function ChallengeHome() {
  const [challengeData, setChallengeData] = useState<ChallengeDataProps[]>([]);
  const [, setOpenForm] = useRecoilState(openFormState);
  const params = useRecoilValue(filterParameterSelector);

  const getChallengeData = useCallback(async () => {
    try {
      const response = await axios.get("/test/challengeHomeTest.json");
      const result = response.data;
      setChallengeData(result.challengeList);
    } catch (error) {
      console.error(
        `getChallengeData Error: Time(${new Date()}) ERROR ${error}`
      );
    }
  }, []);

  useEffect(() => {
    getChallengeData();
  }, [getChallengeData]);
  const page = 0;
  const onApplyFilter = async () => {
    await getSearchChallenge(
      params.search_text,
      params.text_category,
      params.min_search_amount,
      params.max_search_amount,
      params.search_category,
      page
    );
  };
  return (
    <>
      <Container>
        <ChallengeFilter onClick={onApplyFilter} />
        <ChallengeCardWarp>
          {challengeData.map((item) => (
            <div key={item.challengeId} className="mb-4">
              <ChallengeCard challengeData={item} />
            </div>
          ))}
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
