import { useQuery } from "react-query";
import axios from "./axiosInterceptors";
import { API } from "../constants/api";

export const useUser = () => {
  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(`${API}/members/detail`);
      return data.data;
    } catch (error) {
      console.error(`getUserInfo Error: Time(${new Date()}) ERROR ${error}`);
    }
  };
  return useQuery(["userInfo"], () => getUserInfo());
};

export const uploadProfileImage = async (url: string) => {
  try {
    const { data } = await axios.put(`${API}/members/detail/image`, {
      profileImageUrl: url,
    });
    return data;
  } catch (error) {
    console.error(
      `uploadProfileImage Error: Time(${new Date()}) ERROR ${error}`
    );
  }
};

export const nicknameChange = async (nickname: string) => {
  try {
    const { data } = await axios.put(`${API}/members/detail/nickname`, {
      nickname: nickname,
    });
    return data;
  } catch (error) {
    console.error(`nicknameChange Error: Time(${new Date()}) ERROR ${error}`);
  }
};

interface PasswordData {
  prevPassword: string;
  newPassword: string;
}

export const passwordChange = async (password: PasswordData) => {
  try {
    const { data } = await axios.put(`${API}/members/detail/password`, {
      oldPassword: password.prevPassword,
      newPassword: password.newPassword,
    });
    return data;
  } catch (error) {
    console.error(`passwordChange Error: Time(${new Date()}) ERROR ${error}`);
  }
};
