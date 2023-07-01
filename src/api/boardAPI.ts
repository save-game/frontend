import axios from "./axiosInterceptors";
import { API } from "../constants/api";
//지우기
const challengeId = 1;
export const postBoard = async (text: string, showImage: string[]) => {
  try {
    const response = await axios.post(
      `${API}/posts?challengeId=${challengeId}`,
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

export const getPosts = async (challengeId: number, page: number) => {
  try {
    const response = await axios.get(
      `${API}/posts/challenges/${challengeId}?page=${page}&size=1`
    );
    return response.data.data;
  } catch (error) {
    console.error(`getPosts Error : Time(${new Date()}) ERROR ${error}`);
  }
};

export const deletePost = async (postId: number) => {
  try {
    const response = await axios.delete(`${API}/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`getPosts Error : Time(${new Date()}) ERROR ${error}`);
  }
};

export const heartPost = async (postId: number) => {
  try {
    const response = await axios.post(`${API}/hearts?postId=${postId}`);
    return response.data;
  } catch (error) {
    console.error(`heartPost Error : Time(${new Date()}) ERROR ${error}`);
  }
};

export const heartDelete = async (postId: number) => {
  try {
    const response = await axios.delete(`${API}/hearts?postId=${postId}`);
    return response.data;
  } catch (error) {
    console.error(`heartDelete Error : Time(${new Date()}) ERROR ${error}`);
  }
};
