import axios from "./axiosInterceptors";
import { API } from "../constants/api";

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
    console.error(`postBoard Error : Time(${new Date()}) ERROR ${error}`);
  }
};
