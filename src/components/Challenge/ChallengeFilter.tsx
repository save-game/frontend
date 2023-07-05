import { useRecoilState, useResetRecoilState } from "recoil";
import Logo from "../../assets/save_game_300x300.png";
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
  handleResetFilter,
}: {
  handleResetFilter: () => void;
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
      <div className="collapse collapse-plus shadow  border bg-teal-50">
        <input type="checkbox" />
        <div className="collapse-title text-[16px] flex items-center font-bold text-cyan-950 px-4 after:pt-1.5">
          <img src={Logo} alt="mainLogo" className="w-7 mr-2" />
          <p className="pt-0.5">챌린지 검색</p>
        </div>
        <div className="collapse-content rounded-lg items-center px-2 mx-2 pt-2">
          <div className="flex gap-1">
            <div className="w-1/4">
              <FilterDropDown optionList={ChallengeFilterList} />
            </div>
            <input
              type="text"
              className="text-xs input h-8 w-3/4 max-w-xs border bg-base-100 pt-1 border-gray-300"
              value={searchText}
              onChange={handleGetTitle}
            />
          </div>
          <div className="text-xs pt-3 pb-2 w-full text-center">금액 범위</div>
          <div className="w-full ">
            <Slider />
          </div>
          <label
            htmlFor="category_filter"
            className="btn btn-sm text-xs my-3 h-9 w-full btn-neutral text-base-100"
          >
            카테고리 선택하기
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
              <div className="w-full flex justify-center items-center mt-7">
                <label
                  className="btn btn-sm w-1/2 z-10 mr-0.5"
                  htmlFor="category_filter"
                  onClick={handleResetCategory}
                >
                  취소
                </label>
                <label
                  className="btn btn-sm w-1/2 btn-neutral text-base-100 z-10 ml-0.5"
                  htmlFor="category_filter"
                >
                  적용
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
            className=" btn btn-sm h-9 w-full z-10 btn-outline bg-base-100 "
            onClick={handleResetFilter}
          >
            초기화
          </button>
        </div>
      </div>
    </>
  );
}
