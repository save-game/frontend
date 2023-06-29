import { RefObject } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { CgSpinner } from "react-icons/Cg";

const Dialog = styled.dialog`
  ::backdrop {
    background: transparent;
  }
  ${tw`w-10/12 py-20 rounded-lg bg-light-color shadow-lg text-neutral-600 outline-none`}
`;

interface Props {
  readonly dialogRef: RefObject<HTMLDialogElement>;
  readonly inform: string;
  readonly loading: boolean;
}

const DialogModal = ({ dialogRef, loading, inform }: Props) => {
  return (
    <Dialog ref={dialogRef}>
      <div className="flex justify-center items-center">
        {loading ? (
          <div>
            <CgSpinner size={35} className="animate-spin text-accent-focus" />
          </div>
        ) : (
          <div>{inform}</div>
        )}
      </div>
    </Dialog>
  );
};

export default DialogModal;
