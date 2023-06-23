import { ReactNode } from "react";
import { BiDotsVerticalRounded } from "react-icons/Bi";

interface Props {
  children: ReactNode;
}

const Dropdown = (props: Props) => {
  const handleFocus = () => {
    const element = document.activeElement;
    if (element) {
      (element as HTMLElement).blur();
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-xs btn-circle avatar">
        <button className="btn btn-square btn-ghost border border-base-300 btn-xs ">
          <BiDotsVerticalRounded size="18" />
        </button>
      </label>
      <ul
        tabIndex={0}
        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-22"
        onClick={handleFocus}
      >
        {props.children}
      </ul>
    </div>
  );
};

import { SelectOptionProps } from "../../interface/interface";

export function FilterDropDown({
  optionList,
  handleGetOptionValue,
}: {
  optionList: SelectOptionProps[];
  handleGetOptionValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <select
      className={`p-2 h-8 w-16 rounded-lg text-sm border border-l-[0.4px] border-neutral-400 `}
      onChange={handleGetOptionValue}
    >
      {optionList.map((value, idx) => (
        <option key={idx} value={value.value}>
          {value.name}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
