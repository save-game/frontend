import axios from "./axiosInterceptors";
import { API } from "../constants/api";
//지우기
const challengeId = 1;
export const postBoard = async (text: string, showImage: string[]) => {
  try {
    const response = await axios.post(
      `${API}/posts?challengId=${challengeId}`,
      {
        content: text,
        imageUrlList: showImage,
      }
    );
    return response.data;
  } catch (error) {
    console.error(`postBoard Error : Time(${new Date()}) ERROR ${error}`);
  }
};
