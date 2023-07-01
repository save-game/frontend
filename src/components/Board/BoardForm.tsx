import { FormEvent, MouseEventHandler, useRef } from "react";
import { GrClose } from "react-icons/gr";
import axios from "../../api/axiosInterceptors";
import ImgUpLoad from "./ImgUpload";
import TextUpload from "./TextUpload";
import { useRecoilState } from "recoil";
import {
  showImgState,
  textLengthState,
  textState,
} from "../../Recoil/boardAtom";
import DialogModal from "../Common/Dialog";
import { SHOW_MODAL_DELAY } from "../../constants/modalTime";
import { postBoard } from "../../api/boardAPI";
import { useMutation, useQueryClient } from "react-query";

interface NewBoardFormProp {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function NewBoardForm({ onClick }: NewBoardFormProp) {
  const [showImg, setShowImg] = useRecoilState(showImgState);
  const [text, setText] = useRecoilState(textState);
  const [, setTextLength] = useRecoilState(textLengthState);
  const contentsDialogRef = useRef<HTMLDialogElement>(null);

  //게시판 구현위해 useMutation으로 변경함 아래 1은 실제 챌린지 id로 변경필요
  const queryClient = useQueryClient();
  const { mutate: postCreateMutate } = useMutation(
    () => postBoard(text, showImg),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["challengeBoard", 1]);
      },
    }
  );

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    if (showImg.length === 0 && text === "") {
      e.preventDefault();
      if (!contentsDialogRef.current) return;
      contentsDialogRef.current.showModal();
      setTimeout(() => {
        if (!contentsDialogRef.current) return;
        contentsDialogRef.current.close();
      }, SHOW_MODAL_DELAY);
      return false;
    } else {
      // postBoard(text, showImg);
      postCreateMutate();
      setShowImg([]);
      setText("");
      setTextLength(0);
    }
  };

  return (
    <div>
      <form
        id="newBoardDialog"
        onSubmit={onSubmitHandler}
        method="dialog"
        className="flex flex-col relative p-10 rounded-lg shadow-lg text-neutral-600modal-box"
      >
        <button
          type="button"
          onClick={onClick}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          <GrClose />
        </button>
        <h1 className="text-xl mb-10">새 글 작성</h1>
        <span className="mb-2">본문 입력</span>
        <TextUpload />
        <span className="mb-2">사진 추가</span>
        <ImgUpLoad />
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-accent text-white btn-small w-80 "
          >
            등록
          </button>
          <DialogModal
            loading={false}
            dialogRef={contentsDialogRef}
            inform={"내용이 없습니다."}
          />
        </div>
      </form>
    </div>
  );
}
