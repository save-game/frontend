import KakaoIcon from '../assets/kakao_icon.png';
import NaverIcon from '../assets/naver_icon.png';
import GoogleIcon from '../assets/google_icon.svg';

export default function LoginPage() {
  return (
    <>
      <div className=" w-11/12 ml-auto mr-auto flex flex-col justify-center items-center mt-10">
        <img className=" rounded-lg shadow-2xl" src="https://picsum.photos/250" />
        <form className="w-full flex flex-col justify-center items-center mt-10 mb-4">
          <input type="email" placeholder="이메일을 입력해주세요." className=" w-full h-10 text-sm pl-1 rounded-lg mb-4 shadow-lg" />
          <input type="password" placeholder="비밀번호를 입력해주세요." className=" w-full h-10 text-sm pl-1 rounded-lg mb-4 shadow-lg" />
          <button type="submit" className="h-10 rounded-lg btn-accent w-full text-xl shadow-lg">
            로그인
          </button>
        </form>
        <button className="h-10 rounded-lg border border-accent w-full text-xl shadow-lg focus:bg-accent mb-4">회원가입</button>
        <div className="flex w-2/3 justify-around">
          <button className=" shadow-sm w-10">
            <img src={KakaoIcon} />
          </button>
          <button className=" shadow-sm w-10">
            <img src={NaverIcon} />
          </button>
          <button className=" shadow-lg w-10">
            <img src={GoogleIcon} />
          </button>
        </div>
      </div>
    </>
  );
}
