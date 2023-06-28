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
