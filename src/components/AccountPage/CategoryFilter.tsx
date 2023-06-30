import { ChangeEvent } from "react";
import { categoryList } from "../../constants/expenseCategory";
import { useRecoilState } from "recoil";
import { checkedListState, isCheckedState } from "../../Recoil/index";

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
      <div className="text-center m-2">카테고리 선택</div>
      <div className="grid grid-cols-4 border">
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
                className={` m-2 p-1 text-xs border text-center rounded-full ${
                  checkedList.includes(list.name) ? "text-white bg-accent" : ""
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
