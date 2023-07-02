import axios from "./axiosInterceptors";
import { API } from "../constants/api";
import { ChallengeFilterProps } from "../interface/interface";
import { FieldValues } from "react-hook-form";

//지우기

export const postChallenge = async (data: FieldValues, memberCount: number) => {
  try {
    const response = await axios.post(`${API}/challenges`, {
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
  filterParameter: ChallengeFilterProps
) => {
  try {
    const response = await axios.get(`${API}/challenges/search`, {
      params: {
        keyword: filterParameter.keyword,
        searchType: filterParameter.searchType,
        minAmount: filterParameter.minAmount,
        maxAmount: filterParameter.maxAmount,
        category: filterParameter.category,
        page: 0,
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
      `${API}/challenges/join?challengeId=${challengeId}`
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
    const response = await axios.delete(`${API}/challenges/${challengeId}`);
    return response.data;
  } catch (error) {
    console.error(`deleteChallenge Error : Time(${new Date()}) ERROR ${error}`);
  }
};

export const getChallengeStatus = async (challengeId: number) => {
  try {
    const response = await axios.get(`${API}/challenges/${challengeId}`);
    return response.data;
  } catch (error) {
    console.error(
      `getChallengeStatus Error : Time(${new Date()}) ERROR ${error}`
    );
  }
};
