import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import KakaoIcon from "../assets/kakao_login_large_wide.png";
import Logo from "../assets/savegame_512x512.png";
import { useLocation, useNavigate } from "react-router-dom";
import { login, tokenRefresh } from "../api/authAPI";
import { useEffect, useState } from "react";
import { kakaoLogin } from "../api/kakaoAPI";
import { KAKAO_LOGIN_URL } from "../constants/api";
import { AxiosResponse } from "axios";

export interface LoginData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { search: kakaoCode } = useLocation();
  const { register, handleSubmit } = useForm();
  const [errorMsg, setErrorMsg] = useState("");

  console.log("kakaoCode", kakaoCode);

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
    <>
      <div className=" w-11/12 ml-auto mr-auto flex flex-col justify-center items-center mt-10">
        <img className="w-9/12 rounded-lg" src={Logo} />
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-full flex flex-col justify-center items-center mt-10 mb-4"
        >
          <input
            type="email"
            placeholder="이메일을 입력해주세요."
            className=" w-full h-10 text-sm pl-1 rounded-lg mb-4 shadow-lg"
            {...register("email")}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className=" w-full h-10 text-sm pl-1 rounded-lg mb-4 shadow-lg"
            {...register("password")}
          />
          <p className="w-full h-5 text-xs text-right text-error">{errorMsg}</p>
          <button
            type="submit"
            className="h-10 rounded-lg btn-accent w-full text-xl shadow-lg"
          >
            로그인
          </button>
        </form>
        <button
          className="h-10 rounded-lg border border-accent w-full text-xl shadow-lg focus:bg-accent mb-4"
          onClick={() => navigate("/signup")}
        >
          회원가입
        </button>
        <div className="flex w-full justify-around">
          <button onClick={handleKakaoLogin} className=" shadow-sm rounded-md">
            <img src={KakaoIcon} />
          </button>
        </div>
      </div>
    </>
  );
}
