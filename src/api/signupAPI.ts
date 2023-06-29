import axios from "./axiosInterceptors";
import { ValidationFormProps } from "../interface/interface";
import { API } from "../constants/api";

export const postMember = async (data: ValidationFormProps) => {
  try {
    const response = await axios.post(`${API}/auth/signup`, {
      email: data.email,
      password: data.pw,
      nickname: data.nickName,
    });
    return response.data;
  } catch (error) {
    console.error(`postMember Error : Time(${new Date()}) ERROR ${error}`);
  }
};
