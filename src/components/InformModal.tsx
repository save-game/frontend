import React, { RefObject, useEffect, useRef } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { CgSpinner } from "react-icons/Cg";

const Dialog = styled.dialog`
  ::backdrop {
    background: transparent;
  }
  ${tw`w-10/12 py-20 rounded-lg bg-medium-color shadow-lg text-neutral-600 `}
`;

interface Props {
  dialogRef: RefObject<HTMLDialogElement>;
  loading: boolean;
  inform: string;
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
          <div>{inform}</div>
        )}

        <button id="popupClose" className="hidden">
          close
        </button>
        <label
          htmlFor="popupClose"
          className="fixed top-0 bottom-0 left-0 right-0 -z-10"
        ></label>
      </form>
    </Dialog>
  );
};

export default InformModal;
