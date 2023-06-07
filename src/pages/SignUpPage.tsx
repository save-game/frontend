import { ChangeEvent, useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");

  const [isname, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const currentName = e.target.value;
    setName(currentName);

    if (currentName.length < 1 || currentName.length > 6) {
      setNameMessage("닉네임은 1글자 이상 6글자 이하로 입력해주세요!");
      setIsName(false);
    } else {
      setNameMessage("사용가능한 닉네임 입니다.");
      setIsName(true);
    }
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };
  const onChangePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 같지 않습니다.");
      setIsPasswordConfirm(false);
    } else setIsPasswordConfirm(true);
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다!");
      setIsEmail(false);
    } else {
      setEmailMessage("사용 가능한 이메일 입니다.");
      setIsEmail(true);
    }
  };

  return (
    <>
      <div className=" w-11/12 ml-auto mr-auto flex flex-col justify-center items-center mt-10">
        <form className="w-full flex flex-col justify-center items-center mt-10 mb-4">
          <h2 className="text-xl mb-10">회원가입</h2>
          <div className="flex w-full ">
            <label
              htmlFor="email"
              className=" w-1/5 h-10 text-sm pl-1 rounded-lg mb-4 flex justify-center items-center"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              className=" w-3/5 h-10 text-sm pl-1 rounded-lg mb-4 shadow-lg"
              value={email}
              onChange={onChangeEmail}
            />
            <button
              type="button"
              className=" w-1/10 ml-10 btn btn-outline text-sm text-white rounded-lg btn-ghost  shadow-md mr-2 mb-4 btn-sm"
            >
              중복확인
            </button>
          </div>
          <p className="message text-sx text-error">{emailMessage}</p>
          <div className="flex w-full ">
            <label
              htmlFor="pwd"
              className=" w-1/5 h-10 text-sm pl-1 rounded-lg mb-4 flex justify-center items-center"
            >
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              className=" w-3/5 h-10 text-sm pl-1 rounded-lg mb-4 shadow-lg"
              value={password}
              onChange={onChangePassword}
            />
          </div>
          <p className="message text-error">{passwordMessage}</p>
          <div className="flex w-full ">
            <label
              htmlFor="pwdConfirm"
              className=" w-1/5 h-10 text-sm pl-1 rounded-lg mb-4 flex justify-center items-center"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              className=" w-3/5 h-10 text-sm pl-1 rounded-lg mb-4 shadow-lg"
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
            />
          </div>
          <p className="message text-error">{passwordConfirmMessage}</p>
          <div className="flex w-full items-center">
            <label
              htmlFor="nickName"
              className=" w-1/5 h-10 text-sm pl-1 rounded-lg mb-4 flex justify-center items-center"
            >
              닉네임
            </label>
            <input
              type="text"
              placeholder="닉네임을 입력해주세요"
              className=" w-3/5 h-10 text-sm pl-1 rounded-lg mb-4 shadow-lg"
              value={name}
              onChange={onChangeName}
            />
            <button
              type="button"
              className=" w-1/10 ml-10 btn btn-outline text-sm text-white rounded-lg btn-ghost  shadow-md mr-2 mb-4 btn-sm"
            >
              중복확인
            </button>
          </div>
          <p className="message text-error">{nameMessage}</p>
          <div className="flex w-full justify-center">
            <button
              type="submit"
              className="h-10 rounded-lg btn-accent w-1/4 mr-10 text-xl shadow-lg"
            >
              회원가입
            </button>
            <button
              type="button"
              className="h-10 rounded-lg btn-accent w-1/4 text-xl shadow-lg"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
