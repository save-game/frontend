import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import tw from "twin.macro";

import {
  FIXED_MIN_VALUE,
  FIXED_MAX_VALUE,
  RANGE_STEP,
} from "../../constants/challengeSliderFilter";
import { SliderBarProps } from "../../interface/interface";
import {
  minSearchAmountState,
  maxSearchAmountState,
} from "../../Recoil/challengeHomeFilterAtom";
import { BiWon } from "react-icons/Bi";

export default function Slider() {
  const [rangeMinValue, setRangeMinValue] =
    useRecoilState<number>(minSearchAmountState);
  const [rangeMaxValue, setRangeMaxValue] =
    useRecoilState<number>(maxSearchAmountState);
  const [rangeMinPercent, setRangeMinPercent] = useState<number>(0);
  const [rangeMaxPercent, setRangeMaxPercent] = useState<number>(100);

  const sliderRangeMinValueHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRangeMinValue(Number(e.target.value));
  };
  const sliderRangeMaxValueHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRangeMaxValue(Number(e.target.value));
  };

  const twoRangeHandler = useCallback(() => {
    if (rangeMaxValue - rangeMinValue < RANGE_STEP) {
      setRangeMaxValue((rangeMinValue) => rangeMinValue + RANGE_STEP);
      setRangeMinValue((rangeMaxValue) => rangeMaxValue - RANGE_STEP);
    } else {
      setRangeMinPercent(() => (rangeMinValue / FIXED_MAX_VALUE) * 100);
      setRangeMaxPercent(() => (rangeMaxValue / FIXED_MAX_VALUE) * 100);
    }
  }, [rangeMaxValue, rangeMinValue, setRangeMinValue, setRangeMaxValue]);

  useEffect(() => {
    twoRangeHandler();
  }, [twoRangeHandler]);

  return (
    <div>
      <FilterSlider>
        <FilterSliderInner
          rangeMinPercent={rangeMinPercent}
          rangeMaxPercent={rangeMaxPercent}
        />
        <FilterSliderRangeWarp>
          <FilterSliderRangeMin
            type="range"
            min={FIXED_MIN_VALUE}
            max={FIXED_MAX_VALUE - RANGE_STEP}
            value={rangeMinValue}
            step={RANGE_STEP}
            onChange={sliderRangeMinValueHandler}
          />
          <FilterSliderRangeMax
            type="range"
            min={FIXED_MIN_VALUE + RANGE_STEP}
            max={FIXED_MAX_VALUE}
            value={rangeMaxValue}
            step={RANGE_STEP}
            onChange={sliderRangeMaxValueHandler}
          />
        </FilterSliderRangeWarp>
      </FilterSlider>
      <div className="flex items-center justify-center">
        {/* 추후에 Input에 입력 가능하도록 변경 예정. */}
        <div className="w-1/2 relative">
          <BiWon className="absolute top-1/2 -translate-y-1/2 left-2" />
          <input
            disabled
            type="text"
            className="text-xs w-full text-center rounded-lg h-8 max-w-xs border bg-base-100 border-gray-300"
            value={rangeMinValue.toLocaleString("ko-KR")}
          />
        </div>
        <span className="text-lg px-2">-</span>
        <div className="w-1/2 relative">
          <BiWon className="absolute top-1/2 -translate-y-1/2 left-2" />
          <input
            disabled
            type="text"
            className="text-xs w-full text-center rounded-lg h-8 max-w-xs border bg-base-100 border-gray-300"
            value={rangeMaxValue.toLocaleString("ko-KR")}
          />
        </div>
      </div>
    </div>
  );
}

const FilterSlider = styled.div`
  background-color: #dddddd;
  height: 4px;
  ${tw`relative w-full rounded-lg mb-3`}
`;

const FilterSliderInner = styled.div.attrs<SliderBarProps>((props) => ({
  style: {
    left: `${props.rangeMinPercent}%`,
    width: `${props.rangeMaxPercent - props.rangeMinPercent}%`,
  },
}))<SliderBarProps>`
  position: absolute;
  height: 4px;
  ${tw`bg-slate-800`};
`;

const FilterSliderRangeWarp = styled.div`
  ${tw`relative`}
`;
const FilterSliderRangeMin = styled.input`
  top: -3px;
  height: 7px;
  -webkit-appearance: none;
  background: none;
  pointer-events: none;
  ${tw`absolute w-full`}

  &::-webkit-slider-thumb {
    height: 19px;
    width: 19px;
    border-radius: 50%;
    border: 2px solid;
    background-color: white;
    -webkit-appearance: none;
    pointer-events: auto;
    ${tw`border-slate-800`}
  }
`;
const FilterSliderRangeMax = styled(FilterSliderRangeMin)``;
