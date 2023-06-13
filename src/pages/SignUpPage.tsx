import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useNavigation } from "react-router-dom";

interface ValidationForm {
  email: string;
  nickName: string;
  pw: string;
  checkPw: string;
  checkBox: boolean;
}

const validate = yup.object({
  email: yup
    .string()
    .email("이메일형식에 맞게 입력해 주세요")
    .matches(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
      "이메일을 정확히 입력해 주세요."
    )
    .required("이메일을 입력해 주세요."),
  nickName: yup
    .string()
    .min(2, "닉네임을 2글자 이상 입력해주세요.")
    .max(10, "닉네임을 10글자 이하로 입력해주세요.")
    .matches(
      /^[A-Za-z0-9ㄱ-힣]{2,10}$/,
      "닉네임은 영어, 한글, 숫자만 가능합니다."
    )
    .required(),
  pw: yup
    .string()
    .min(8, "최소 8자 이상 작성해야 합니다.")
    .max(14, "최대 14자까지 작성 가능합니다.")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,14}$/,
      "비밀번호는 영어, 숫자, 특수문자를 조합해서 작성해야합니다."
    )
    .required(),
  checkPw: yup
    .string()
    .oneOf([yup.ref("pw"), undefined], "비밀번호가 일치하지 않습니다")
    .required("비밀번호를 한번 더 입력해 주세요"),
  checkBox: yup.boolean().oneOf([true], "동의해야 가입이 가능합니다"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationForm>({
    mode: "onChange",
    resolver: yupResolver(validate),
  });
  const onSubmit: SubmitHandler<ValidationForm> = (data) => {
    console.log(data);
    navigate("/");
  };
  return (
    <>
      <div className=" w-11/12 ml-auto mr-auto flex flex-col justify-center items-center mt-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-center items-center mt-10 mb-4"
        >
          <h2 className="text-xl mb-10">회원가입</h2>
          <div className="form-control w-full max-w-xs border-b border-accent-focus">
            <label htmlFor="email" className="label">
              <span className="label-text text-xs">
                이메일
                <span className="text-red-400 text-xs ml-1">*</span>
              </span>
            </label>
            <div className="flex w-full">
              <input
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                className=" input h-8 text-sm mr-4 mb-2 max-w-xs"
                {...register("email")}
              />

              <button
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
              <span className="label-text text-xs">
                닉네임
                <span className="text-red-400 text-xs ml-1">*</span>
              </span>
            </label>
            <div className="flex w-full">
              <input
                id="nickName"
                type="text"
                placeholder="닉네임을 입력해주세요"
                className=" input h-8 text-sm mr-4 mb-2 max-w-xs"
                {...register("nickName")}
              />
              <button
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
                  <li className="ml-2">
                    - 필수항목 : 이메일 주소, 이름(닉네임), 비밀번호, 전화번호
                  </li>
                  <li className="ml-2">- 선택항목 : 프로필 사진</li>
                </li>
                <li className="mt-2 ml-2">
                  (2) 소셜 계정을 통해 회원가입 시 아래와 같은 정보들이 추가로
                  수집될 수 있습니다.
                  <li className="ml-2">- 네이버 : 프로필 사진, 나이</li>
                  <li className="ml-2">- 페이스북 : 프로필 사진</li>
                  <li className="ml-2">- 구글 : 프로필 사진</li>
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
              className="h-8 rounded-lg btn-accent w-1/6 mr-10 text-base shadow-lg"
            >
              회원가입
            </button>
            <button
              type="button"
              className="h-8 rounded-lg btn-accent w-1/6 text-base shadow-lg"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
