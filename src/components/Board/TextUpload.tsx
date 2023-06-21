import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { textLengthState, textState } from "../../Recoil/boardAtom";

export default function TextUpload() {
  const [textLength, setTextLength] = useRecoilState(textLengthState);
  const [text, setText] = useRecoilState(textState);
  const MAX_LENGTH = 200;
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setTextLength(e.target.value.replace(/<br\s*\/?>/gm, "$&$1$2").length);
    setText(e.target.value);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center mb-10 border p-4">
      <textarea
        onChange={onChange}
        value={text}
        maxLength={MAX_LENGTH}
        rows={10}
        placeholder="내용을 입력하세요"
        className="w-full p-4 text-center"
      />
      <p className="w-full text-end">
        <span>{textLength} / 200</span>
      </p>
    </div>
  );
}
