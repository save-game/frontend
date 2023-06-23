import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import ChallengeForm from "../../components/Challenge/ChallengeForm";
import { FilterDropDown } from "../Common/Dropdown";
import Slider from "../Common/Slider";

const Container = styled.div`
  ${tw`mx-auto w-11/12 pt-8 text-neutral-600 font-bold text-sm`}
`;

export default function ChallengeHome() {
  const [filterCategory, setFilterCategory] = useState<string>("total");
  const [filterText, setFilterText] = useState<string>("");
  const [filterAmount, setFilterAmount] = useState<number>(0);

  const ChallengeFilterList = [
    { value: "total", name: "전체" },
    { value: "title", name: "제목" },
    { value: "content", name: "부제" },
  ];

  const handleGetFilterCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
    console.log(filterCategory);
  };
  const handleGetFilterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
    console.log(filterText);
  };
  const handleGetFilterAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterAmount(Number(e.target.value));
    console.log(filterAmount);
  };

  return (
    <>
      <Container>
        <div className="rounded-md shadow-xl h-28 grid grid-cols-3 grid-rows-3 items-center pr-2 gap-y-2">
          <div className="col-span-1 mx-auto">
            <FilterDropDown
              optionList={ChallengeFilterList}
              handleGetOptionValue={handleGetFilterCategory}
            />
          </div>
          <input
            type="text"
            value={filterText}
            className="text-lg input col-span-2 h-8 w-full max-w-xs border border-l-[0.4px] border-neutral-400 mx-auto"
            onChange={handleGetFilterText}
          />
          <span className="col-span-1 row-span-2 mx-auto">금액</span>
          <div className="w-full col-span-2 row-span-2">
            <Slider />
          </div>
          {/* <div className="flex justify-around items-center text-sm">
            <span className="w-16 text-center">금액</span>
            <div className="w-9/12">
              <input
                type="range"
                min={0}
                max={200}
                value={filterAmount}
                onChange={handleGetFilterAmount}
                className="range range-xs range-accent"
              />
            </div>
          </div> */}
        </div>
        <label
          htmlFor="challenge_form"
          className="btn btn-accent w-11/12 absolute bottom-20"
        >
          + 챌린지 등록하기
        </label>
        <ChallengeForm />
      </Container>
    </>
  );
}
