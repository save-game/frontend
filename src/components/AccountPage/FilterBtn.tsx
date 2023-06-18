import { MouseEventHandler, ReactNode } from "react";
import { useRecoilState } from "recoil";
import { filterFormState } from "../../Recoil/index.js";
import SubmitForm from "./Submit";

type BtnTypeProps = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default function FilterBtn({ children, onClick }: BtnTypeProps) {
  const [filterForm] = useRecoilState(filterFormState);
  return (
    <>
      <button
        onClick={onClick}
        className="w-32 btn btn-sm btn-accent text-base-100"
      >
        {children}
      </button>
      {filterForm === true ? <SubmitForm /> : null}
    </>
  );
}
