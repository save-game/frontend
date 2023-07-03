export const KAKAO_LOGIN_REDIRECT_URI = "http://localhost:5173";
export const KAKAO_LOGOUT_REDIRECT_URI = "http://localhost:5173/mypage";
export const KAKAO_REST_API_KEY = "c6a261701200c2e34deb814d46337935";

export const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_LOGIN_REDIRECT_URI}`;
export const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_LOGOUT_REDIRECT_URI}`;
