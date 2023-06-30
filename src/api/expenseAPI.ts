import axios from "./axiosInterceptors";

import { API } from "../constants/api";
import { ExpenseFormProps } from "../interface/interface";

export const postExpense = async (data: ExpenseFormProps) => {
  try {
    const response = await axios.post(`${API}/records`, {
      amount: Number(data.amount),
      category: data.category,
      memo: data.memo,
      paidFor: data.paidFor,
      payType: data.payType,
      useDate: data.useDate,
    });
    return response.data;
  } catch (error) {
    console.error(`postExpense Error: Time(${new Date()}) ERROR ${error}`);
  }
};

export const getRecordedExpense = async (
  startDate: string,
  endDate: string
) => {
  try {
    const response = await axios.get(`${API}/records`, {
      params: { startDate: startDate, endDate: endDate },
    });
    return response.data;
  } catch (error) {
    console.error(`getRecordAccount Error: Time(${new Date()}) ERROR ${error}`);
  }
};

export const getRecordedeExpenseForAnalyze = async (
  year: number,
  month: number
) => {
  try {
    const response = await axios.get(`${API}/records/analysis`, {
      params: {
        year: year,
        month: month,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `getRecordedeExpenseForGraph Error: Time(${new Date()}) ERROR ${error}`
    );
  }
};
