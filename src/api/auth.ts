import { FieldValues } from "react-hook-form";
import axios from "./axios";

export const login = async (formData: FieldValues) => {
  const response = await axios.post(
    "http://13.124.58.137/auth/login",
    formData
  );
  return response;
};

export const tokenRefresh = async () => {
  try {
    const response = await axios.get("http://13.124.58.137/auth/reissue");
    if (response.data.success) {
      const token = response.headers["authorization"];
      const refreshToken = response.headers["refreshtoken"];
      // axios.defaults.headers.common["authorization"] = token;
      // axios.defaults.headers.common["refreshtoken"] = refreshToken;
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
    const { data } = await axios.post("http://13.124.58.137/auth/logout");
    console.log(data);
    return data;
  } catch (error) {
    console.error(`signOut Error: Time(${new Date()}) ERROR ${error}`);
  }
};
export const withdrawal = async () => {
  try {
    const { data } = await axios.delete("http://13.124.58.137/auth/withdrawal");
    console.log(data);
    return data;
  } catch (error) {
    console.error(`withdrawal Error: Time(${new Date()}) ERROR ${error}`);
  }
};
