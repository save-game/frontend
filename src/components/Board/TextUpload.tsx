import { ChangeEvent } from "react";
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
    <div className="w-full bg-slate-50 flex flex-col justify-center items-center rounded-lg mb-5 border p-3">
      <textarea
        onChange={onChange}
        value={text}
        maxLength={MAX_LENGTH}
        rows={10}
        placeholder="내용을 입력하세요"
        spellCheck={false}
        className="w-full bg-slate-50 font-light placeholder:font-light outline-none"
      />
      <p className="w-full text-end text-xs font-light">
        <span>{textLength} / 200</span>
      </p>
    </div>
  );
}
