import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { validate } from "./validate";
import axios from "axios";
import { MouseEventHandler, useRef, useState } from "react";
import { SHOW_MODAL_DELAY } from "../../constants/modalTime";
import { ValidationFormProps } from "../../interface/interface";
import { postMember } from "../../api/signupAPI";
import InformModal from "../Common/InformModal";

export default function SignUp() {
  const [resultEmailMsg, setResultEmailMsg] = useState("");
  const [resultNickNameMsg, setResultNickNameMsg] = useState("");
  const [usableEmail, setUsableEmail] = useState(false);
  const [usableNickName, setUsableNickName] = useState(false);
  const [onChangeEmail, setOnChangeEmail] = useState("");
  const [onChangeNickName, setOnChangeNickName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const emailCheckDialogRef = useRef<HTMLDialogElement>(null);
  const nickNameCheckDialogRef = useRef<HTMLDialogElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationFormProps>({
    mode: "onChange",
    resolver: yupResolver(validate),
  });

  const onSubmit: SubmitHandler<ValidationFormProps> = async (data) => {
    if (usableEmail === false) {
      if (emailCheckDialogRef.current) {
        emailCheckDialogRef.current?.showModal();
      } else {
        return;
      }
      setTimeout(() => {
        if (emailCheckDialogRef.current) {
          emailCheckDialogRef.current.close();
        }
      }, SHOW_MODAL_DELAY);
      return;
    } else if (usableNickName === false) {
      if (nickNameCheckDialogRef.current) {
        nickNameCheckDialogRef.current?.showModal();
      } else {
        return;
      }
      setTimeout(() => {
        if (nickNameCheckDialogRef.current) {
          nickNameCheckDialogRef.current.close();
        }
      }, SHOW_MODAL_DELAY);
      return;
    } else {
      await postMember(data);

      if (dialogRef.current) {
        dialogRef.current.showModal();
        setTimeout(() => setIsLoading(false), 500);
        setIsLoading(true);
      } else {
        return;
      }
      setTimeout(() => {
        if (dialogRef.current) {
          dialogRef.current.close();
        }
        navigate("/");
      }, SHOW_MODAL_DELAY);
    }
  };

  const OnCheckEmail: MouseEventHandler<HTMLButtonElement> = async () => {
    await axios
      .get(`/api/auth/checkemail`, {
        params: { value: onChangeEmail },
      })
      .then((response) => {
        if (response.data.success === false) {
          setResultEmailMsg(response.data.data);
          setUsableEmail(false);
        } else {
          setResultEmailMsg(response.data.data);
          setUsableEmail(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const OnCheckNickName: MouseEventHandler<HTMLButtonElement> = async () => {
    await axios
      .get(`/api/auth/checknickname`, { params: { value: onChangeNickName } })
      .then((response) => {
        if (response.data.success === false) {
          setResultNickNameMsg(response.data.data);
          setUsableNickName(false);
        } else {
          setResultNickNameMsg(response.data.data);
          setUsableNickName(true);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className=" w-11/12 ml-auto mr-auto flex flex-col justify-center items-center mt-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-center items-center mt-10 mb-4"
        >
          <h2 className="text-xl mb-10">회원가입</h2>
          <div className="form-control max-w-xs border-b border-accent-focus">
            <label htmlFor="email" className="label w-full">
              <div className="w-full flex items-center justify-between">
                <div className="label-text text-xs">
                  이메일
                  <span className="text-red-400 text-xs ml-1">*</span>
                </div>
                <div>
                  {usableEmail === false ? (
                    <span className="text-xs text-red-600">
                      {resultEmailMsg}
                    </span>
                  ) : (
                    <span className="text-xs text-blue-600">
                      {resultEmailMsg}
                    </span>
                  )}
                </div>
              </div>
            </label>
            <div className="flex w-full">
              <input
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                className=" input h-8 text-sm mr-4 mb-2 max-w-xs"
                {...register("email", {
                  onChange: (e) => {
                    setOnChangeEmail(e.target.value);
                    setUsableEmail(false);
                    setResultEmailMsg("중복확인을 해 주세요");
                  },
                })}
              />

              <button
                onClick={OnCheckEmail}
                id="usableEmail"
                type="button"
                className="btn join-item btn-outline text-sx btn-ghost  shadow-md mr-2 mb-2 btn-sm"
              >
                중복확인
              </button>
            </div>
          </div>
          {errors.email && (
            <p className="message text-xs text-error text-center">
              {errors.email.message}
            </p>
          )}
          <div className="form-control w-full max-w-xs border-b border-accent-focus">
            <label htmlFor="pw" className="label">
              <span className="label-text text-xs">
                비밀번호
                <span className="text-red-400 text-xs ml-1">*</span>
              </span>
            </label>
            <div className="flex w-full">
              <input
                id="pw"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                className=" input h-8 text-sm mr-4 mb-2 max-w-xs"
                {...register("pw")}
              />
            </div>
          </div>
          {errors.pw && (
            <p className="message text-xs text-error text-center">
              {errors.pw.message}
            </p>
          )}
          <div className="form-control w-full max-w-xs border-b border-accent-focus">
            <label htmlFor="checkPw" className="label">
              <span className="label-text text-xs">
                비밀번호 확인
                <span className="text-red-400 text-xs ml-1">*</span>
              </span>
            </label>
            <div className="flex w-full">
              <input
                id="checkPw"
                type="password"
                placeholder="비밀번호를 다시 입력해주세요."
                className=" input h-8 text-sm mr-4 mb-2 max-w-xs"
                {...register("checkPw")}
              />
            </div>
          </div>
          {errors.checkPw && (
            <p className="message text-error text-xs text-center">
              {errors.checkPw.message}
            </p>
          )}
          <div className="form-control w-full max-w-xs border-b border-accent-focus">
            <label htmlFor="nickName" className="label">
              <div className="w-full flex items-center justify-between">
                <div className="label-text text-xs">
                  닉네임
                  <span className="text-red-400 text-xs ml-1">*</span>
                </div>
                <div>
                  {usableNickName === false ? (
                    <span className="text-xs text-red-600">
                      {resultNickNameMsg}
                    </span>
                  ) : (
                    <span className="text-xs text-blue-600">
                      {resultNickNameMsg}
                    </span>
                  )}
                </div>
              </div>
            </label>
            <div className="flex w-full">
              <input
                id="nickName"
                type="text"
                placeholder="닉네임을 입력해주세요"
                className=" input h-8 text-sm mr-4 mb-2 max-w-xs"
                {...register("nickName", {
                  onChange: (e) => {
                    setOnChangeNickName(e.target.value);
                    setUsableNickName(false);
                    setResultNickNameMsg("중복확인을 해 주세요");
                  },
                })}
              />
              <button
                onClick={OnCheckNickName}
                type="button"
                className=" w-3/10 btn join-item btn-outline text-sx btn-ghost  shadow-md mr-2 mb-2 btn-sm"
              >
                중복확인
              </button>
            </div>
          </div>
          {errors.nickName && (
            <p className="message text-error text-xs text-center">
              {errors.nickName.message}
            </p>
          )}
          <div className="max-w-xs overflow-x-auto h-48 flex flex-col border mt-5 text-xs">
            <h3 className="text-center mb-2 font-bold text-sm">
              개인정보 수집 및 이용 동의
            </h3>
            <div>
              <ul className="flex flex-col justify-center">
                1. 수집하는 개인정보
                <li className="mt-2 ml-2">
                  (1) 회사는 최초 회원 가입시 원활한 고객상담, 서비스 제공을
                  위해 아래와 같은 최소한의 개인정보를 필수항목으로 수집하고
                  있습니다.
                  <div className="ml-2">
                    - 필수항목 : 이메일 주소, 이름(닉네임), 비밀번호, 전화번호
                  </div>
                  <div className="ml-2">- 선택항목 : 프로필 사진</div>
                </li>
                <li className="mt-2 ml-2">
                  (2) 소셜 계정을 통해 회원가입 시 아래와 같은 정보들이 추가로
                  수집될 수 있습니다.
                  <div className="ml-2">- 네이버 : 프로필 사진, 나이</div>
                  <div className="ml-2">- 페이스북 : 프로필 사진</div>
                  <div className="ml-2">- 구글 : 프로필 사진</div>
                </li>
                <li className="mt-2 ml-2">
                  (3) 서비스 이용 과정이나 사업처리 과정에서 아래와 같은
                  정보들이 추가로 수집될 수 있습니다.
                </li>
              </ul>
            </div>
            <div className="flex justify-center items-center mt-2">
              <label htmlFor="agree">동의</label>
              <input
                id="agree"
                type="checkbox"
                className=" h-8 text-sm ml-2 max-w-xs"
                {...register("checkBox")}
              ></input>
            </div>
          </div>
          {errors.checkBox && (
            <p className="message text-error text-xs text-center">
              {errors.checkBox.message}
            </p>
          )}
          <div className="flex w-full join justify-center items-center mt-4">
            <button
              type="submit"
              className="h-8 rounded-lg btn-accent w-1/4 mr-10 text-base shadow-lg"
            >
              회원가입
            </button>
            <button
              type="button"
              className="h-8 rounded-lg btn-accent w-1/4 text-base shadow-lg"
              onClick={() => navigate(-1)}
            >
              취소
            </button>
          </div>
        </form>
        <InformModal
          loading={false}
          dialogRef={emailCheckDialogRef}
          inform="이메일 중복확인을 해주세요."
        />
        <InformModal
          loading={false}
          dialogRef={nickNameCheckDialogRef}
          inform="닉네임 중복확인을 해주세요."
        />
        <InformModal
          loading={isLoading}
          dialogRef={dialogRef}
          inform="회원가입 되었습니다!"
        />
      </div>
    </>
  );
}
