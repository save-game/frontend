import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import KakaoIcon from "../assets/kakao_icon.png";
import Logo from "../assets/save_game_512x512.png";
import { useLocation, useNavigate } from "react-router-dom";
import { login, tokenRefresh } from "../api/authAPI";
import { useEffect, useState } from "react";
import { kakaoLogin } from "../api/kakaoAPI";
import { KAKAO_LOGIN_URL } from "../constants/api";
import { AxiosResponse } from "axios";
import { IoIosClose } from "react-icons/Io";
import { BiSolidErrorCircle } from "react-icons/Bi";

export interface LoginData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { search: kakaoCode } = useLocation();
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [errorMsg, setErrorMsg] = useState("");
  const emailInput = watch("email");
  const passwordInput = watch("password");

  useEffect(() => {
    const loginCheck = localStorage.getItem("isLogin");
    if (loginCheck) {
      navigate("/home");
    }
  });

  useEffect(() => {
    if (kakaoCode === "") return;
    const isCode = kakaoCode.slice(1, 5) === "code" ? true : false;
    console.log(kakaoCode);
    console.log(isCode);
    if (isCode) {
      const redirectToKakao = async () => {
        const response = await kakaoLogin(kakaoCode);
        console.log(response);
        if (!response) return;
        await handleToken(response, "kakao");
        navigate("/");
      };
      redirectToKakao();
    }
  }, [kakaoCode]);

  const handleToken = async (response: AxiosResponse, type: string) => {
    if (response.data.success) {
      const token = response.headers["authorization"];
      const refreshToken = response.headers["refreshtoken"];
      console.log(response.data);

      localStorage.setItem("isLogin", type);
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/home");
    } else if (!response.data.success) {
      if (response.data.data === "이미 로그인되어 있습니다.") {
        await tokenRefresh();
        navigate("/home");
      } else if (response.data.data === "틀린 비밀번호입니다.") {
        setErrorMsg(response.data.data);
      } else if (response.data.data === "사용자를 찾을 수 없습니다") {
        setErrorMsg(response.data.data);
      }
    }
  };

  const handleLogin: SubmitHandler<FieldValues> = async (
    formData: FieldValues
  ) => {
    try {
      const response = await login(formData);
      await handleToken(response, "email");
    } catch (error) {
      console.log(`handleLogin Error: Time(${new Date()}) ERROR ${error}`);
    }
  };

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_LOGIN_URL;
  };

  return (
    <main className="h-screen bg-base-color text-neutral-600 pt-10">
      <div className=" w-11/12 ml-auto mr-auto flex flex-col justify-center items-center">
        <img className="w-52 rounded-lg" src={Logo} />
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-full flex flex-col justify-center items-center mt-7 mb-3"
        >
          <div className="relative w-full mb-2">
            <input
              type="email"
              placeholder="이메일을 입력해주세요."
              className="input w-full text-sm placeholder:text-xs rounded-lg   shadow"
              {...register("email")}
            />
            {emailInput === "" ? null : (
              <button
                type="button"
                onClick={() => setValue("email", "")}
                className="w-3 h-3 border rounded-full text-xs flex justify-center items-center bg-neutral-400 text-base-100 absolute top-1/2 -translate-y-1/2 right-4"
              >
                <IoIosClose />
              </button>
            )}
          </div>
          <div className="relative w-full mb-1">
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              className=" input w-full text-sm placeholder:text-xs rounded-lg shadow"
              {...register("password")}
            />
            {passwordInput === "" ? null : (
              <button
                type="button"
                onClick={() => setValue("password", "")}
                className="w-3 h-3 border rounded-full text-xs flex justify-center items-center bg-neutral-400 text-base-100 absolute top-1/2 -translate-y-1/2 right-4"
              >
                <IoIosClose />
              </button>
            )}
          </div>

          <div className="w-full flex justify-end items-center h-5 text-[11px] mb-1 pr-1 text-right text-red-500">
            {errorMsg ? (
              <>
                <BiSolidErrorCircle size={12} className="mr-1 " />
                <p className="pt-1">{errorMsg}</p>
              </>
            ) : null}
          </div>
          <button
            type="submit"
            className="btn  btn-ghost bg-teal-500 hover:bg-teal-500 text-base-100 w-full shadow"
          >
            로그인
          </button>
        </form>
        <button
          className="btn btn-neutral w-full shadow"
          onClick={() => navigate("/signup")}
        >
          회원가입
        </button>
        <div className="divider my-2 text-[10px]">OR</div>
        <div className="flex w-full justify-center mt-1">
          <button
            onClick={handleKakaoLogin}
            className="btn btn-ghost bg-[#FEE500] hover:bg-[#FEE500] w-full shadow"
          >
            <img src={KakaoIcon} className="w-10" />
            <span className="-translate-x-3">카카오 로그인</span>
          </button>
        </div>
      </div>
    </main>
  );
}
