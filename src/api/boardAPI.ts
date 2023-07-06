import axios from "./axiosInterceptors";

interface PostData {
  text: string;
  showImg: string[];
  challengeId: number;
}
export const postBoard = async ({ text, showImg, challengeId }: PostData) => {
  try {
    const response = await axios.post(`/api/posts?challengeId=${challengeId}`, {
      content: text,
      imageUrlList: showImg,
    });
    return response.data;
  } catch (error) {
    console.error(`postBoard Error : Time(${new Date()}) ERROR ${error}`);
  }
};

export const getPosts = async (
  challengeId: string | undefined,
  page: number
) => {
  if (!challengeId) return;

  try {
    const response = await axios.get(
      `/api/posts/challenges/${challengeId}?page=${page}&size=5`
    );
    return response.data.data;
  } catch (error) {
    console.error(`getPosts Error : Time(${new Date()}) ERROR ${error}`);
  }
};

interface editProps {
  postId: number;
  text: string;
}

export const editPosts = async ({ postId, text }: editProps) => {
  try {
    const response = await axios.put(`/api/posts/${postId}`, {
      content: text,
    });
    return response.data;
  } catch (error) {
    console.error(`editPosts Error: Time(${new Date()}) ERROR ${error}`);
  }
};

export const deletePost = async (postId: number) => {
  try {
    const response = await axios.delete(`/api/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`getPosts Error : Time(${new Date()}) ERROR ${error}`);
  }
};

export const heartPost = async (postId: number) => {
  try {
    const response = await axios.post(`/api/hearts?postId=${postId}`);
    return response.data;
  } catch (error) {
    console.error(`heartPost Error : Time(${new Date()}) ERROR ${error}`);
  }
};

export const heartDelete = async (postId: number) => {
  try {
    const response = await axios.delete(`/api/hearts?postId=${postId}`);
    return response.data;
  } catch (error) {
    console.error(`heartDelete Error : Time(${new Date()}) ERROR ${error}`);
  }
};
