import axios from "axios";
import { FieldValues } from "react-hook-form";

export const login = async (formData: FieldValues) => {
  const response = await axios.post(
    // "http://13.124.58.137/auth/login",
    "/api/auth/login",
    formData
  );
  if (response.data.success) {
    const token = response.headers["authorization"];
    const refreshToken = response.headers["refreshtoken"];

    // axios.defaults.headers.common["authorization"] = token;
    // axios.defaults.headers.common["refreshtoken"] = refreshToken;
    console.log(response.data);
    return { token, refreshToken };
  } else {
    console.log(response.data.data);
  }
};
