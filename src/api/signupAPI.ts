import axios from "./axiosInterceptors";
import { ValidationFormProps } from "../interface/interface";

export const postMember = async (data: ValidationFormProps) => {
  try {
    const response = await axios.post(`/api/auth/signup`, {
      email: data.email,
      password: data.pw,
      nickname: data.nickName,
    });
    return response.data;
  } catch (error) {
    console.error(`postMember Error : Time(${new Date()}) ERROR ${error}`);
  }
};
