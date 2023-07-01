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

export const reviseExpense = async (data: {
  data: ExpenseFormProps;
  recordId: number;
}) => {
  const record = { ...data.data, amount: Number(data.data.amount) };
  try {
    const response = await axios.put(`${API}/records/${data.recordId}`, record);
    return response.data;
  } catch (error) {
    console.error(`reviseExpense Error: Time(${new Date()}) ERROR ${error}`);
  }
};

export const deleteExpense = async (recordId: number) => {
  try {
    const response = await axios.delete(`${API}/records/${recordId}`);
    return response.data;
  } catch (error) {
    console.error(`deleteExpense Error: Time(${new Date()}) ERROR ${error}`);
  }
};
