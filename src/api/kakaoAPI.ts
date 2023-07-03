import axios from "./axiosInterceptors";

export const kakaoLogin = async (code: string) => {
  try {
    const response = await axios.get(`/api/auth/kakaologin${code}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error(`kakaoLogin Error: Time(${new Date()}) ERROR ${error}`);
  }
};

export const kakaoLogout = async (code: string) => {
  try {
    const { data } = await axios.post(`/api/auth/kakaologout${code}`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(`kakaoSignOut Error: Time(${new Date()}) ERROR ${error}`);
  }
};
