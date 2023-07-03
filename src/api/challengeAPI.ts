import axios from "./axiosInterceptors";
import { ChallengeFilterProps } from "../interface/interface";
import { FieldValues } from "react-hook-form";

export const postChallenge = async ({
  data,
  memberCount,
}: {
  data: FieldValues;
  memberCount: number;
}) => {
  try {
    const response = await axios.post(`/api/challenges`, {
      title: data.title,
      content: data.content,
      startDate: data.start_date,
      endDate: data.end_date,
      goalAmount: data.goal_amount,
      category: data.category,
      maxPeople: memberCount,
    });
    return response.data;
  } catch (error) {
    console.error(`postChallenge Error : Time(${new Date()}) ERROR ${error}`);
  }
};

export const getChallengeList = async (
  filterParameter: ChallengeFilterProps,
  pageParam: number
) => {
  try {
    const response = await axios.get(`/api/challenges/search`, {
      params: {
        keyword: filterParameter.keyword,
        searchType: filterParameter.searchType,
        minAmount: filterParameter.minAmount,
        maxAmount: filterParameter.maxAmount,
        category: filterParameter.category,
        page: pageParam,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`getChallengeList : Time(${new Date()}) ERROR ${error}`);
  }
};

export const postJoinChallenge = async (challengeId: number) => {
  try {
    const response = await axios.post(
      `/api/challenges/join?challengeId=${challengeId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `postJoinChallenge Error : Time(${new Date()}) ERROR ${error}`
    );
  }
};

export const deleteChallenge = async (challengeId: number) => {
  try {
    const response = await axios.delete(`/api/challenges/${challengeId}`);
    return response.data;
  } catch (error) {
    console.error(`deleteChallenge Error : Time(${new Date()}) ERROR ${error}`);
  }
};

export const getChallengeStatus = async (challengeId: number) => {
  try {
    const response = await axios.get(`/api/challenges/${challengeId}`);
    return response.data;
  } catch (error) {
    console.error(
      `getChallengeStatus Error : Time(${new Date()}) ERROR ${error}`
    );
  }
};
