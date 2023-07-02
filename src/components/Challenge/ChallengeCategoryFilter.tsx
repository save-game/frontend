import { useState } from "react";
import {
  Category,
  ChanllegeCategoryList,
} from "../../constants/expenseCategory";

export default function ChallengeCategoryFilter({
  selected,
  handleGetCategory,
}: {
  selected: string;
  handleGetCategory: (item: Category) => void;
}) {
  const handleGetCategoryFromList = (item: Category) => {
    handleGetCategory(item);
  };
  return (
    <>
      <div className="w-full grid grid-cols-5">
        {ChanllegeCategoryList.map((item) => (
          <button
            key={item.category}
            type="button"
            onClick={() => handleGetCategoryFromList(item)}
            className={`btn btn-ghost w-full p-0 block col-span-1 h-20 ${
              selected === item.category ? "bg-zinc-300" : "bg-white"
            }`}
          >
            <div
              className={`${item.color} w-4/5 mx-auto text-base-100 mb-1 flex justify-center items-center h-10 rounded-full`}
            >
              {item.icon}
            </div>
            <div className="text-xs font-normal">{item.name}</div>
          </button>
        ))}
      </div>
    </>
  );
}
