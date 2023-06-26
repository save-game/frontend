import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import KakaoIcon from "../assets/kakao_login_large_wide.png";
import Logo from "../assets/savegame_512x512.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { refreshToken, token } from "../Recoil/token";
import { login } from "../api/api";

export interface LoginData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [accessToken, setAccessToken] = useRecoilState(token);
  const [accessRefreshToken, setrefreshAccessToken] =
    useRecoilState(refreshToken);

  const handleLogin: SubmitHandler<FieldValues> = async (
    formData: FieldValues
  ) => {
    try {
      const response = await login(formData);
      setAccessToken(response?.token);
      setrefreshAccessToken(response?.refreshToken);
      localStorage.setItem("token", response?.token);
      localStorage.setItem("refreshToken", response?.refreshToken);
      //   // axios.defaults.headers.common["authorization"] = token;
      //   // axios.defaults.headers.common["refreshtoken"] = refreshToken;
      navigate("/home");
    } catch (error) {
      console.log(`handleLogin Error: Time(${new Date()}) ERROR ${error}`);
    }
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
          <button className=" shadow-sm rounded-md">
            <img src={KakaoIcon} />
          </button>
        </div>
      </div>
    </>
  );
}
