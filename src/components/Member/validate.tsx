import * as yup from "yup";

export const validate = yup.object({
  email: yup
    .string()
    .email("이메일형식에 맞게 입력해 주세요")
    .matches(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
      "이메일을 정확히 입력해 주세요."
    )
    .required("이메일을 입력해 주세요."),
  nickName: yup
    .string()
    .min(2, "닉네임을 2글자 이상 입력해주세요.")
    .max(10, "닉네임을 10글자 이하로 입력해주세요.")
    .matches(
      /^[A-Za-z0-9ㄱ-힣]{2,10}$/,
      "닉네임은 영어, 한글, 숫자만 가능합니다."
    )
    .required(),
  pw: yup
    .string()
    .min(8, "최소 8자 이상 작성해야 합니다.")
    .max(14, "최대 14자까지 작성 가능합니다.")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,14}$/,
      "비밀번호는 영어, 숫자, 특수문자를 조합해서 작성해야합니다."
    )
    .required(),
  checkPw: yup
    .string()
    .oneOf([yup.ref("pw"), undefined], "비밀번호가 일치하지 않습니다")
    .required("비밀번호를 한번 더 입력해 주세요"),
  checkBox: yup.boolean().oneOf([true], "동의해야 가입이 가능합니다"),
});
