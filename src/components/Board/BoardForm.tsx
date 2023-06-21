import { MouseEventHandler } from "react";
import { GrClose } from "react-icons/gr";

import ImgUpLoad from "./ImgUpload";
import TextUpload from "./TextUpload";
import { useRecoilState } from "recoil";
import {
  showImgState,
  textLengthState,
  textState,
} from "../../Recoil/boardAtom";

interface NewBoardFormProp {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function NewBoardForm({ onClick }: NewBoardFormProp) {
  const [showImg, setShowImg] = useRecoilState(showImgState);
  const [text, setText] = useRecoilState(textState);
  const [, setTextLength] = useRecoilState(textLengthState);

  const onSubmitHandler = () => {
    console.log(`text:${text}, imgURLLists:${showImg.map((d) => d)}`);
    setShowImg([]);
    setText("");
    setTextLength(0);
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
        </div>
      </form>
    </div>
  );
}
