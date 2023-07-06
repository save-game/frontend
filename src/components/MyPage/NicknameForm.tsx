import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SHOW_MODAL_DELAY } from "../../constants/modalTime";
import { IoCloseOutline } from "react-icons/Io5";
import { checkNickname } from "../../api/authAPI";
import { useMutation, useQueryClient } from "react-query";
import { nicknameChange } from "../../api/membersAPI";
import { useSetRecoilState } from "recoil";
import { loadingAtom } from "../../Recoil/loading";

interface Props {
  readonly formEditor: Dispatch<SetStateAction<boolean>>;
  readonly informChangeRef: RefObject<HTMLDialogElement>;
}

const NicknameForm = ({ formEditor, informChangeRef }: Props) => {
  const queryClient = useQueryClient();
  const setIsLoading = useSetRecoilState(loadingAtom);
  const [duplicationCheck, setDuplicationCheck] = useState<{
    check: boolean;
    result: true | string;
  }>({
    check: false,
    result: "",
  });
  const nicknameSchema = Yup.object({
    nickname: Yup.string()
      .min(1, "입력된 내용이 없습니다.")
      .max(10, "10자 이내로 작성해주세요.")
      .test(
        "isDuplicated",
        "중복 확인해주세요.",
        () => duplicationCheck.result === true
      )
      .required("변경할 닉네임을 입력해주세요."),
  });
  type NicknameFormData = Yup.InferType<typeof nicknameSchema>;
  const { mutate: nicknameMutate } = useMutation(nicknameChange, {
    onSuccess: () => {
      queryClient.invalidateQueries(["userInfo"]);
      setIsLoading(false);
      setTimeout(() => {
        if (!informChangeRef.current) return;
        informChangeRef.current.close();
      }, SHOW_MODAL_DELAY);
    },
  });
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
      result: "",
    });
  }, [nicknameInput]);

  const handleNicknameCheck = async () => {
    if (nicknameInput === "") return;

    const res = await checkNickname(nicknameInput);
    const isPassed = res.success;
    const msg =
      res.data === "중복된 닉네임 입니다."
        ? res.data
        : "공백, 특수문자는 제외해주세요.";

    if (isPassed) {
      setDuplicationCheck({
        check: true,
        result: true,
      });
    } else {
      setDuplicationCheck({
        check: true,
        result: msg,
      });
    }
    clearErrors("nickname");
  };

  const handleNicknameChange = ({ nickname }: NicknameFormData) => {
    setIsLoading(true);
    if (!informChangeRef.current) return;
    informChangeRef.current.showModal();

    nicknameMutate(nickname);
    formEditor(false);
  };
  return (
    <>
      <form
        onSubmit={onSubmit(handleNicknameChange)}
        className="flex w-3/4 ml-2 justify-around"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="10자이내로 적어주세요."
            maxLength={11}
            spellCheck={false}
            autoFocus
            className="outline-none rounded-lg border w-full indent-2 h-10 mt-5 placeholder:text-xs placeholder:font-light"
            {...register("nickname")}
          />
          {duplicationCheck.check ? (
            <div>
              {duplicationCheck.result === true ? (
                <p className="absolute right-3 bottom-0.5 text-[11px] font-light text-success text-center ">
                  사용가능한 닉네임입니다.
                </p>
              ) : (
                <p className="absolute right-3 bottom-0.5 text-[11px] font-light text-error text-center ">
                  {duplicationCheck.result}
                </p>
              )}
            </div>
          ) : null}
          {errors ? (
            <p className="absolute right-3 bottom-0.5 text-[11px] font-light text-error text-center ">
              {errors.nickname?.message}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col space-y-2.5">
          <button
            type="button"
            onClick={() => formEditor(false)}
            className="btn btn-xs btn-ghost text-xs px-1 -mt-2"
          >
            <IoCloseOutline size={22} />
          </button>
          <button
            type="button"
            onClick={handleNicknameCheck}
            className="btn btn-xs btn-ghost text-xs px-1 bg-light-color hover:bg-[#dff1ed] shadow"
          >
            중복확인
          </button>
          <button className="btn btn-xs btn-ghost bg-teal-500 hover:bg-teal-500 text-base-100 text-xs px-1  shadow">
            수정완료
          </button>
        </div>
      </form>
    </>
  );
};

export default NicknameForm;
