import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import InformModal from "./InformModal";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  inputEditor: Dispatch<SetStateAction<boolean>>;
}

const NicknameForm = ({ inputEditor }: Props) => {
  const [duplicationCheck, setDuplicationCheck] = useState(false);
  const nicknameSchema = Yup.object({
    nickname: Yup.string()
      .max(10, "10자 이내로 작성해주세요.")
      .test("isDuplicated", "중복 확인해주세요.", () => duplicationCheck)
      .required("변경할 닉네임을 입력해주세요."),
  });
  type NicknameFormData = Yup.InferType<typeof nicknameSchema>;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const {
    register,
    formState: { errors },
    handleSubmit: onSubmit,
    clearErrors,
    watch,
  } = useForm<NicknameFormData>({
    resolver: yupResolver(nicknameSchema),
    mode: "onSubmit",
  });
  const nicknameInput = watch("nickname");

  useEffect(() => {
    setDuplicationCheck(false);
  }, [nicknameInput]);

  const handleNicknameCheck = () => {
    //서버와중복체크
    const isPassed = true;
    if (isPassed) {
      setDuplicationCheck(true);
      clearErrors("nickname");
    }
  };

  const handleNicknameChange = () => {
    //서버에 닉넴수정 요청 useMutation으로
    //onSuccess에 완료모달
    if (dialogRef.current) {
      dialogRef.current.showModal();
      setTimeout(() => {
        if (dialogRef.current) {
          dialogRef.current.close();
        }
        inputEditor(false);
      }, 1000);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit(handleNicknameChange)} className="flex">
        <div className="relative">
          <input
            type="text"
            placeholder="10자이내로 적어주세요."
            maxLength={11}
            spellCheck={false}
            autoFocus
            className="outline-none pl-2 h-10 my-1 placeholder:text-xs placeholder:font-light"
            {...register("nickname")}
          />
          {duplicationCheck ? (
            <p className="absolute right-3 bottom-0.5 text-[11px] font-light text-success text-center bg-base-100">
              사용가능한 닉네임입니다.
            </p>
          ) : null}
          {errors ? (
            <p className="absolute right-3 bottom-0.5 text-[11px] font-light text-error text-center bg-base-100">
              {errors.nickname?.message}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col space-y-3">
          <button
            type="button"
            onClick={handleNicknameCheck}
            className="btn btn-xs btn-ghost text-xs px-1 bg-light-color hover:bg-[#dff1ed] shadow mr-2"
          >
            중복확인
          </button>
          <button className="btn btn-xs btn-accent text-base-100 text-xs px-1  shadow mr-2">
            수정완료
          </button>
        </div>
      </form>
      <InformModal
        dialogRef={dialogRef}
        loading={false}
        inform="등록되었습니다!"
      />
    </>
  );
};

export default NicknameForm;
