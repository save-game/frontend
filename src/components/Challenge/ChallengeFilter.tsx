import { useRecoilState, useResetRecoilState } from "recoil";

import { FilterDropDown } from "../Common/Dropdown";
import Slider from "../Common/Slider";
import ChallengeCategoryFilter from "./ChallengeCategoryFilter";
import {
  searchTextState,
  searchCategoryState,
} from "../../Recoil/challengeHomeFilterAtom";
import { Category } from "../../constants/expenseCategory";

const ChallengeFilterList = [
  { value: "ALL", name: "전체" },
  { value: "TITLE", name: "제목" },
  { value: "CONTENT", name: "부제" },
];
export default function ChallengeFilter({
  handleGetChallengeList,
}: {
  handleGetChallengeList: () => void;
}) {
  const [searchText, setSearchText] = useRecoilState(searchTextState);
  const [searchCategory, setSearchCategory] =
    useRecoilState(searchCategoryState);
  const handleGetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleGetCategory = (item: Category) => {
    setSearchCategory(item.category);
  };

  const handleResetCategory = useResetRecoilState(searchCategoryState);

  return (
    <>
      <div className="collapse collapse-plus shadow-xl bg-white">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">챌린지 검색</div>
        <div className="collapse-content rounded-md shadow-xl grid grid-cols-3 grid-rows-5 items-center px-2 gap-y-2">
          <div className="col-span-1 mx-auto">
            <FilterDropDown optionList={ChallengeFilterList} />
          </div>
          <input
            type="text"
            className="text-lg input col-span-2 h-8 w-full max-w-xs border border-l-[0.4px] border-neutral-400 mx-auto"
            value={searchText}
            onChange={handleGetTitle}
          />
          <span className="col-span-1 row-span-2 mx-auto">금액</span>
          <div className="w-full col-span-2 row-span-2">
            <Slider />
          </div>
          <label
            htmlFor="category_filter"
            className="btn h-8 btn-outline col-span-3"
          >
            카테고리
          </label>
          <input
            type="checkbox"
            id="category_filter"
            className=" modal-toggle"
          />
          <div className="modal">
            <div className="modal-box">
              <ChallengeCategoryFilter
                selected={searchCategory}
                handleGetCategory={handleGetCategory}
              />
              <div className="w-full flex justify-center items-center mt-2">
                <label
                  className="btn btn-accent mr-4 z-10"
                  htmlFor="category_filter"
                >
                  적용
                </label>
                <label
                  className="btn z-10"
                  htmlFor="category_filter"
                  onClick={handleResetCategory}
                >
                  초기화
                </label>
              </div>
            </div>
            <label
              className=" modal-backdrop"
              htmlFor="category_filter"
              onClick={handleResetCategory}
            ></label>
          </div>
          <button
            className="btn btn-accent col-span-3 z-10"
            onClick={handleGetChallengeList}
          >
            적용
          </button>
        </div>
      </div>
    </>
  );
}
