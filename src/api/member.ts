import { useQuery } from "react-query";
import axios from "./axios";

export const useUser = () => {
  const getUserInfo = async () => {
    try {
      const { data } = await axios.get("http://13.124.58.137/member/detail");
      return data.data;
    } catch (error) {
      console.error(`getUserInfo Error: Time(${new Date()}) ERROR ${error}`);
    }
  };
  return useQuery(["userInfo"], () => getUserInfo());
};

export const uploadProfileImage = async (url: string) => {
  try {
    const { data } = await axios.put(
      "http://13.124.58.137/member/detail/image",
      {
        profileImageUrl: url,
      }
    );
    return data;
  } catch (error) {
    console.error(
      `uploadProfileImage Error: Time(${new Date()}) ERROR ${error}`
    );
  }
};
