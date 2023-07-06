import { FormEvent, MouseEventHandler, useEffect, useRef } from "react";
import { GrClose } from "react-icons/gr";
import ImgUpLoad from "./ImgUpload";
import TextUpload from "./TextUpload";
import { useRecoilState } from "recoil";
import {
  showImgState,
  textLengthState,
  textState,
  thumbImgState,
} from "../../Recoil/boardAtom";
import DialogModal from "../Common/Dialog";
import { SHOW_MODAL_DELAY } from "../../constants/modalTime";
import { postBoard } from "../../api/boardAPI";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { getBoardUrl } from "../../api/firebaseAPI";

interface NewBoardFormProp {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function NewBoardForm({ onClick }: NewBoardFormProp) {
  const [showImg, setShowImg] = useRecoilState(showImgState);
  const [, setThumbnail] = useRecoilState(thumbImgState);
  const [text, setText] = useRecoilState(textState);
  const [, setTextLength] = useRecoilState(textLengthState);
  const contentsDialogRef = useRef<HTMLDialogElement>(null);

  const challengeId = Number(useParams().challengeId);

  const queryClient = useQueryClient();
  const { mutate: postCreateMutate } = useMutation(postBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries(["challengeBoard", challengeId]);
    },
  });

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
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
      const urlList = await getBoardUrl(challengeId, showImg);
      console.log(urlList);

      const postData = {
        text: text,
        showImg: urlList ? urlList : [],
        challengeId,
      };
      postCreateMutate(postData);
      setShowImg([]);
      setThumbnail([]);
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
        className=" flex flex-col relative py-10 px-7 rounded-lg shadow-lg text-neutral-600modal-box"
      >
        <button
          type="button"
          onClick={onClick}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          <GrClose />
        </button>
        <h1 className="text-[16px] text-cyan-950 my-5">새 게시물</h1>
        <TextUpload />
        <ImgUpLoad />
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-neutral text-white btn-sm w-full h-10 "
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
