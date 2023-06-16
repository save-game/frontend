import { RefObject } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Dialog = styled.dialog`
  ${tw`relative w-10/12 py-16 rounded-lg shadow-lg text-neutral-600 `}
`;

interface Props {
  readonly dialogRef: RefObject<HTMLDialogElement>;
  readonly confirm: string;
  readonly onConfirm: () => void;
}

const ConfirmModal = ({ dialogRef, confirm, onConfirm }: Props) => {
  return (
    <Dialog ref={dialogRef}>
      <form method="dialog" className="">
        <div className="text-sm font-bold text-center">{confirm}</div>
        <div className="flex justify-center space-x-2 mt-6">
          <button className="btn btn-sm btn-outline w-1/3">취소</button>
          <button onClick={onConfirm} className="btn btn-sm w-1/3">
            확인
          </button>
        </div>
        <button className="fixed top-0 bottom-0 left-0 right-0 -z-10"></button>
      </form>
    </Dialog>
  );
};

export default ConfirmModal;
