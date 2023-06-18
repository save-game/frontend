import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import InformModal from "../Common/InformModal";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SHOW_MODAL_DELAY } from "../../constants/modalTime";

interface Props {
  readonly formEditor: Dispatch<SetStateAction<boolean>>;
}

// 취소버튼 필요하지 않나싶다

const NicknameForm = ({ formEditor }: Props) => {
  const [duplicationCheck, setDuplicationCheck] = useState({
    check: false,
    result: false,
  });
  const nicknameSchema = Yup.object({
    nickname: Yup.string()
      .min(1, "입력된 내용이 없습니다.")
      .max(10, "10자 이내로 작성해주세요.")
      .test("isDuplicated", "중복 확인해주세요.", () => duplicationCheck.result)
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
    setDuplicationCheck({
      check: false,
      result: false,
    });
  }, [nicknameInput]);

  const handleNicknameCheck = () => {
    if (nicknameInput === "") return;
    //서버와중복체크
    const isPassed = true;
    if (isPassed) {
      setDuplicationCheck({
        check: true,
        result: true,
      });
    } else {
      setDuplicationCheck({
        check: true,
        result: false,
      });
    }
    clearErrors("nickname");
  };

  const handleNicknameChange = () => {
    //서버에 닉넴수정 요청 useMutation으로
    //onSuccess에 완료모달
    if (!dialogRef.current) return;

    dialogRef.current.showModal();
    setTimeout(() => {
      if (!dialogRef.current) return;
      dialogRef.current.close();

      formEditor(false);
    }, SHOW_MODAL_DELAY);
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
          {duplicationCheck.check ? (
            <div>
              {duplicationCheck.result ? (
                <p className="absolute right-3 bottom-0.5 text-[11px] font-light text-success text-center bg-base-100">
                  사용가능한 닉네임입니다.
                </p>
              ) : (
                <p className="absolute right-3 bottom-0.5 text-[11px] font-light text-error text-center bg-base-100">
                  중복된 닉네임입니다.
                </p>
              )}
            </div>
          ) : null}
          {errors ? (
            <p className="absolute right-3 bottom-0.5 text-[11px] font-light text-error text-center bg-base-100">
              {errors.nickname?.message}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col space-y-2.5">
          <button
            type="button"
            onClick={handleNicknameCheck}
            className="btn btn-xs btn-ghost text-xs px-1 bg-light-color hover:bg-[#dff1ed] shadow"
          >
            중복확인
          </button>
          <button className="btn btn-xs btn-accent text-base-100 text-xs px-1  shadow">
            수정완료
          </button>
        </div>
      </form>
      <InformModal
        dialogRef={dialogRef}
        loading={false}
        inform="닉네임이 변경되었습니다!"
      />
    </>
  );
};

export default NicknameForm;
