import { Dispatch, RefObject, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SHOW_MODAL_DELAY } from "../../constants/modalTime";
import { useSetRecoilState } from "recoil";
import { loadingAtom } from "../../Recoil/loading";
import { useMutation } from "react-query";
import { passwordChange } from "../../api/membersAPI";

interface Props {
  readonly formEditor: Dispatch<SetStateAction<boolean>>;
  readonly informChangeRef: RefObject<HTMLDialogElement>;
}

const PasswordForm = ({ formEditor, informChangeRef }: Props) => {
  const setIsLoading = useSetRecoilState(loadingAtom);
  const passwordRegExp =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-~])(?=.*[0-9]).{8,25}$/;

  const passwordSchema = Yup.object({
    prevPassword: Yup.string()
      .min(8, "최소 8자 이상 작성해주세요.")
      .required("현재 비밀번호를 입력해주세요."),
    newPassword: Yup.string()
      .min(8, "최소 8자 이상 작성해주세요.")
      .matches(
        passwordRegExp,
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요"
      )
      .required("변경할 비밀번호를 입력해주세요."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "비밀번호가 일치하지 않습니다.")
      .required("필수 입력 항목입니다."),
  });
  type PasswordFormData = Yup.InferType<typeof passwordSchema>;
  const {
    register,
    formState: { errors },
    handleSubmit: onSubmit,
  } = useForm<PasswordFormData>({
    resolver: yupResolver(passwordSchema),
    mode: "onSubmit",
  });
  const { mutate: passwordMutate } = useMutation(passwordChange, {
    onSuccess: () => {
      setIsLoading(false);
      setTimeout(() => {
        if (!informChangeRef.current) return;
        informChangeRef.current.close();
      }, SHOW_MODAL_DELAY);
    },
  });

  const handlePasswordChange = ({
    prevPassword,
    newPassword,
  }: PasswordFormData) => {
    setIsLoading(true);
    if (!informChangeRef.current) return;
    informChangeRef.current.showModal();

    const password = {
      prevPassword: prevPassword,
      newPassword: newPassword,
    };
    passwordMutate(password);
    formEditor(false);
  };

  return (
    <>
      <form
        onSubmit={onSubmit(handlePasswordChange)}
        className="text-xs bg-base-100 px-1 pb-4 rounded-lg"
      >
        <div className="flex flex-col items-start w-full h-16 px-2 border-b border-accent-focus/60">
          <div className="leading-6">
            비밀번호 <span className="text-error text-sm align-middle">*</span>{" "}
          </div>
          <input
            type="password"
            placeholder="현재 비밀번호를 입력해주세요."
            maxLength={25}
            spellCheck={false}
            autoFocus
            className="outline-none w-full h-10 my-1 placeholder:text-xs placeholder:font-light "
            {...register("prevPassword")}
          />
        </div>
        <p className="text-[11px] h-4 font-light text-error text-right bg-base-100">
          {errors.prevPassword?.message ?? null}
        </p>
        <div className="flex flex-col items-start w-full h-16 px-2 border-b border-accent-focus/60">
          <div className="leading-6">
            변경 비밀번호{" "}
            <span className="text-error text-sm align-middle">*</span>{" "}
          </div>
          <input
            type="password"
            placeholder="숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
            maxLength={25}
            spellCheck={false}
            className="outline-none w-full h-10 my-1 placeholder:text-xs placeholder:font-light "
            {...register("newPassword")}
          />
        </div>
        <p className="text-[11px] h-4 font-light text-error text-right bg-base-100">
          {errors.newPassword?.message ?? null}
        </p>
        <div className="flex flex-col items-start w-full h-16 px-2 border-b border-accent-focus/60">
          <div className="leading-6">
            변경 비밀번호 확인{" "}
            <span className="text-error text-sm align-middle">*</span>{" "}
          </div>
          <input
            type="password"
            placeholder="변경할 비밀번호를 다시 한번 입력해주세요."
            maxLength={25}
            spellCheck={false}
            className="outline-none w-full h-10 my-1 placeholder:text-xs placeholder:font-light "
            {...register("confirmPassword")}
          />
        </div>
        <p className="text-[11px] h-4 font-light text-error text-right bg-base-100">
          {errors.confirmPassword?.message ?? null}
        </p>
        <button className="btn btn-neutral w-full mt-6 mb-3">
          비밀번호 변경
        </button>
        <button
          type="button"
          onClick={() => formEditor(false)}
          className="btn btn-outline w-full  "
        >
          취소
        </button>
      </form>
    </>
  );
};

export default PasswordForm;
