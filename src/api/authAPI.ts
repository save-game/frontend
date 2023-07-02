import { FieldValues } from "react-hook-form";
import axios from "./axiosInterceptors";

export const login = async (formData: FieldValues) => {
  const response = await axios.post(`/api/auth/login`, formData);
  return response;
};

export const tokenRefresh = async () => {
  try {
    const response = await axios.get(`/api/auth/reissue`);
    if (response.data.success) {
      const token = response.headers["authorization"];
      const refreshToken = response.headers["refreshtoken"];
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
    } else {
      throw new Error(response.data.data);
    }
  } catch (error) {
    console.error(`tokenRefresh Error: Time(${new Date()}) ERROR ${error}`);
  }
};

export const signOut = async () => {
  try {
    const { data } = await axios.post(`/api/auth/logout`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(`signOut Error: Time(${new Date()}) ERROR ${error}`);
  }
};
export const withdrawal = async () => {
  try {
    const { data } = await axios.delete(`/api/auth/withdrawal`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(`withdrawal Error: Time(${new Date()}) ERROR ${error}`);
  }
};

export const checkNickname = async (nicknameInput: string) => {
  try {
    const { data } = await axios.get(
      `/api/auth/checknickname?value=${nicknameInput}`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error(`checkNickname Error: Time(${new Date()}) ERROR ${error}`);
  }
};
