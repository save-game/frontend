import axios from "axios";
import { signOut, tokenRefresh } from "./auth";

axios.interceptors.request.use(
  (config) => {
    const refreshToken = localStorage.getItem("refreshToken");
    const token = localStorage.getItem("token");
    if (token && refreshToken) {
      config.headers.Authorization = token;
      config.headers.Refreshtoken = refreshToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;
    console.log(response);
    if (response.status === 400) {
      if (response.data.errorCode === "EXPIRED_TOKEN") {
        const originalRequest = response.config;

        await tokenRefresh();
        console.log("토큰 리프레쉬");
        const refreshToken = localStorage.getItem("refreshToken");
        const token = localStorage.getItem("token");
        originalRequest.headers.Authorization = token;
        originalRequest.headers.Refreshtoken = refreshToken;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
