import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import { SliderBarProps } from "../../interface/interface";

const FIXED_MIN_VALUE = 0;
const FIXED_MAX_VALUE = 2000000;
const RANGE_STEP = 100000;

export default function Slider() {
  const [rangeMinValue, setRangeMinValue] = useState<number>(FIXED_MIN_VALUE);
  const [rangeMaxValue, setRangeMaxValue] = useState<number>(FIXED_MAX_VALUE);
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
  }, [rangeMaxValue, rangeMinValue]);

  const handleOnblurMaxValue = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) {
      e.target.value = FIXED_MAX_VALUE.toLocaleString("ko-KR");
      twoRangeHandler();
      return;
    }
    const formattedValue = Number(e.target.value).toLocaleString("ko-KR");
    e.target.value = formattedValue;
  };
  const handleOnFocusValue = (e: React.FocusEvent<HTMLInputElement>) => {
    const formattedValue = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = formattedValue;
  };
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
        <input
          disabled
          type="text"
          className="text-xs w-1/3 text-center rounded-lg h-8 max-w-xs border border-l-[0.4px] border-neutral-400"
          value={rangeMinValue.toLocaleString("ko-KR")}
          onChange={sliderRangeMinValueHandler}
          onFocus={handleOnFocusValue}
        />
        <span className="text-lg px-4">-</span>
        <input
          disabled
          type="text"
          className="text-xs w-1/3 text-center rounded-lg h-8 max-w-xs border border-l-[0.4px] border-neutral-400"
          value={rangeMaxValue.toLocaleString("ko-KR")}
          onChange={sliderRangeMaxValueHandler}
          onBlur={handleOnblurMaxValue}
          onFocus={handleOnFocusValue}
        />
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
  ${tw`bg-accent`};
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
    height: 25px;
    width: 25px;
    border-radius: 50%;
    border: 2px solid;
    background-color: white;
    -webkit-appearance: none;
    pointer-events: auto;
    ${tw`border-accent`}
  }
`;
const FilterSliderRangeMax = styled(FilterSliderRangeMin)``;
