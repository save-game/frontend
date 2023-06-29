import axios from "./axiosInterceptors";
import { API } from "../constants/api";

import { FieldValues } from "react-hook-form";
//지우기

export const postChallenge = async (data: FieldValues) => {
  try {
    const response = await axios.post(`${API}/challenges`, {
      title: data.title,
      content: data.content,
      start_date: data.start_date,
      end_date: data.end_date,
      goal_amount: data.goal_amount,
      category: data.category,
      maxPeople: data.member_count,
    });
    return response.data;
  } catch (error) {
    console.error(`postBoard Error : Time(${new Date()}) ERROR ${error}`);
  }
};
