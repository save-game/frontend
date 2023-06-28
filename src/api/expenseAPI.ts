import axios from "axios";

import { API } from "../constants/api";
import { expenseFormProps } from "../interface/interface";

export const postExpense = async (data: expenseFormProps) => {
  try {
    const response = await axios.post(
      `${API}/record`,
      {
        amount: Number(data.amount),
        category: data.category,
        memo: data.memo,
        paidFor: data.paidFor,
        payType: data.payType,
        useDate: data.useDate,
      },
      {
        // headers는 로그인 시 recoil 등에 추가해 놓아야할 것 같음.
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjg3ODc2OTc1fQ.xyjz9cUjNCQe3TbIsBm6c8rDUmU5fjzJm9hsrNQTthQ",
          Refreshtoken:
            "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODg0Nzk5NzV9.UwtSXO-27OuFamj_STT-le78iK9f8EuQuamzsqaXJ-A",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`postExpense Error: Time(${new Date()}) ERROR ${error}`);
  }
};

export const getRecordedExpense = async (
  startDate: string,
  endDate: string,
  headers: { Authorization: string; Refreshtoken: string }
) => {
  try {
    const response = await axios.get(`${API}/record`, {
      params: { startDate: startDate, endDate: endDate },
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error(`getRecordAccount Error: Time(${new Date()}) ERROR ${error}`);
  }
};
