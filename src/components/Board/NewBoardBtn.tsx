import { useRef } from "react";
import { TiPlus } from "react-icons/ti";
import NewBoardForm from "./BoardForm";
import { useRecoilState } from "recoil";
import {
  showImgState,
  textLengthState,
  textState,
} from "../../Recoil/boardAtom";

export default function NewBoardBtn() {
  const [, setText] = useRecoilState(textState);
  const [, setTextLength] = useRecoilState(textLengthState);
  const [, setShowImg] = useRecoilState(showImgState);
  const boardDialogRef = useRef<HTMLDialogElement>(null);
  const confirmDialogRef = useRef<HTMLDialogElement>(null);

  const confirmWithdrawal = () => {
    if (confirmDialogRef.current) {
      confirmDialogRef.current.showModal();
    }
  };

  const Open = () => {
    boardDialogRef.current?.showModal();
  };
  const OnAllClose = () => {
    boardDialogRef.current?.close();
    setText("");
    setTextLength(0);
    setShowImg([]);
    confirmDialogRef.current?.close();
  };
  const OnConfirmModalClose = () => {
    confirmDialogRef.current?.close();
  };

  return (
    <>
      <button
        onClick={Open}
        className="fixed bottom-20 right-6 border-4 rounded-full hover:bg-accent hover:text-white hover:border-accent p-2 bg-base-100"
      >
        <TiPlus size={32} />
      </button>
      <dialog ref={boardDialogRef} className="w-full p-0 rounded-lg shadow-lg">
        <NewBoardForm onClick={confirmWithdrawal} />
      </dialog>
      <dialog
        className="relative w-10/12 py-16 rounded-lg shadow-lg text-neutral-600"
        ref={confirmDialogRef}
      >
        <div className="text-sm font-bold text-center">닫으시겠습니까?</div>
        <div className="flex justify-center space-x-2 mt-6">
          <button
            onClick={OnConfirmModalClose}
            className="btn btn-sm btn-outline w-1/3"
          >
            취소
          </button>
          <button onClick={OnAllClose} className="btn btn-sm w-1/3">
            확인
          </button>
        </div>
        <button className="fixed top-0 bottom-0 left-0 right-0 -z-10"></button>
      </dialog>
    </>
  );
}
