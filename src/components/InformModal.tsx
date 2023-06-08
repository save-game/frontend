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
  dialogRef: RefObject<HTMLDialogElement>;
  loading: boolean;
  inform: string;
}

//loading은 useQuery등을 통해 loading값이 있을때 넘겨준다.

const InformModal = ({ dialogRef, loading, inform }: Props) => {
  return (
    <Dialog ref={dialogRef}>
      <form method="dialog" className="flex justify-center items-center">
        {loading ? (
          <div>
            <CgSpinner size={35} className="animate-spin text-accent-focus" />
          </div>
        ) : (
          <div>{inform}</div>
        )}
      </form>
    </Dialog>
  );
};

export default InformModal;
