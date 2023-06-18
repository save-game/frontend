import ChallengeForm from "../components/Challenge/ChallengeForm";

export default function ChallengeHome() {
  return (
    <>
      <label htmlFor="challenge_form" className="btn btn-accent">
        + 챌린지 등록하기
      </label>
      <ChallengeForm />
    </>
  );
}
