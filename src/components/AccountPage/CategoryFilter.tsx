import { ChangeEvent } from "react";
import { categoryList } from "../../constants/expenseCategory";
import { useRecoilState } from "recoil";
import { checkedListState, isCheckedState } from "../../Recoil/index";
import { MdCategory } from "react-icons/Md";
import { FcFolder } from "react-icons/Fc";

const CategoryFilter = () => {
  const [checkedList, setCheckedList] = useRecoilState(checkedListState);
  const [isChecked, setIsChecked] = useRecoilState(isCheckedState);
  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }
    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item != value));
      return;
    }
    return;
  };
  const checkHandler = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  };

  return (
    <div className=" w-11/12">
      <div className="relative w-full text-center mb-2 text-sm text-cyan-950 font-bold">
        <FcFolder
          size={19}
          className="absolute top-1/2 -translate-y-1/2 left-5"
        />
        <p className="pt-0.5 ml-1">카테고리 선택</p>
      </div>
      <div className="grid grid-cols-4 p-3 border border-cyan-950 rounded-lg shadow-md ">
        {categoryList.map((list) => (
          <div className="flex w-full justify-center" key={list.name}>
            <input
              id={list.name}
              className="hidden"
              type="checkbox"
              checked={checkedList.includes(list.name)}
              onChange={(e) => checkHandler(e, list.name)}
            />
            <label className="w-full" htmlFor={list.name}>
              <div
                className={` m-1 py-2 text-xs border text-center rounded-full text-cyan-950 bg-slate-100 ${
                  checkedList.includes(list.name)
                    ? "text-base-100 bg-slate-300"
                    : ""
                }`}
              >
                {list.name}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
