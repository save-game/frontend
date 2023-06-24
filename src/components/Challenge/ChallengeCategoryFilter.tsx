import {
  Category,
  ChanllegeCategoryList,
} from "../../constants/expenseCategory";

export default function ChallengeCategoryFilter({
  handleSelectCategory,
}: {
  handleSelectCategory: (item: Category) => void;
}) {
  return (
    <>
      <div className="w-full grid grid-cols-5">
        {ChanllegeCategoryList.map((item) => (
          <button
            key={item.category}
            type="button"
            onClick={() => handleSelectCategory(item)}
            className="btn btn-ghost focus:border focus:bg-zinc-300 hover:bg-transparent w-full p-0 block col-span-1 h-20"
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
