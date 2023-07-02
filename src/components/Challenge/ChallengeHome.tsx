import { useEffect, useState } from "react";
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

const Container = styled.div`
  ${tw`mx-auto relative w-11/12 h-screen max-h-screen pt-8 text-neutral-600 font-bold text-sm overflow-hidden`}
`;

export default function ChallengeHome() {
  const [challengeData, setChallengeData] = useState<ChallengeDataProps[]>([]);
  const [, setOpenForm] = useRecoilState(openFormState);
  const filterValues = useRecoilValue(filterParameterSelector);

  const handleGetFilteredChallengeData = async () => {
    try {
      const response = await getChallengeList(filterValues);
      console.log(response.data.content);
      setChallengeData(response.data.content);
    } catch (error) {
      console.error(
        `handleGetFilteredChallengeData Error: Time(${new Date()}) ERROR ${error}`
      );
    }
  };

  useEffect(() => {
    handleGetFilteredChallengeData();
  }, []);

  return (
    <>
      <Container>
        <ChallengeFilter
          handleGetChallengeList={handleGetFilteredChallengeData}
        />
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
