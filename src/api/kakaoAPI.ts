import axios from "./axiosInterceptors";

export const kakaoLogin = async (code: string) => {
  try {
    const { data } = await axios.get(`/api/auth/kakaologin${code}`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(`kakaoLogin Error: Time(${new Date()}) ERROR ${error}`);
  }
};

export const kakaoSignOut = async () => {
  try {
    const { data } = await axios.get(`/api/auth/kakaologout`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(`kakaoSignOut Error: Time(${new Date()}) ERROR ${error}`);
  }
};
