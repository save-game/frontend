import { RefObject } from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Dialog = styled.dialog`
  ::backdrop {
    background: transparent;
  }
  ${tw`w-10/12 py-20 rounded-lg bg-light-color shadow-lg text-neutral-600 outline-none`}
`;

interface Props {
  readonly dialogRef: RefObject<HTMLDialogElement>;
  readonly inform: string;
}

const DialogModal = ({ dialogRef, inform }: Props) => {
  return (
    <Dialog ref={dialogRef}>
      <div className="flex justify-center items-center">{inform}</div>
    </Dialog>
  );
};

export default DialogModal;
