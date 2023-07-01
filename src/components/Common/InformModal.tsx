import { RefObject } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { CgSpinner } from "react-icons/Cg";
import { BsCheckCircleFill } from "react-icons/Bs";

const Dialog = styled.dialog`
  ::backdrop {
    background: transparent;
  }
  ${tw`w-10/12 py-20 rounded-lg bg-light-color shadow-lg text-neutral-600 outline-none`}
`;

interface Props {
  readonly dialogRef: RefObject<HTMLDialogElement>;
  readonly loading: boolean;
  readonly inform: string;
}

const InformModal = ({ dialogRef, loading, inform }: Props) => {
  return (
    <Dialog ref={dialogRef}>
      <form method="dialog" className="flex justify-center items-center">
        {loading ? (
          <div>
            <CgSpinner size={35} className="animate-spin text-accent-focus" />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <BsCheckCircleFill size={20} className="text-accent mb-3" />
            <div>{inform}</div>
          </div>
        )}
      </form>
    </Dialog>
  );
};

export default InformModal;
