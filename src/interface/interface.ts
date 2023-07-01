export interface ExpenseRecord {
  readonly date: string;
  readonly amount: number;
}

export interface ChallengeMemberResultData {
  readonly memberId: number;
  readonly nickName: string;
  readonly color: string;
  readonly status: 0 | 1;
  readonly total_amount: number;
}

export interface ChallengeMemberData extends ChallengeMemberResultData {
  readonly recordList: ExpenseRecord[];
  readonly isFirst: boolean;
}

export interface ChallengeData {
  readonly title: string;
  readonly content: string;
  readonly challenge_status: 0 | 1;
  readonly start_date: string;
  readonly end_date: string;
  readonly goal_amount: number;
  readonly category: string;
  readonly d_day: number;
  readonly challengeMemberList: ChallengeMemberData[];
}
export interface ChallengeResultData {
  readonly title: string;
  readonly content: string;
  readonly challenge_status: 0 | 1;
  readonly start_date: string;
  readonly end_date: string;
  readonly goal_amount: number;
  readonly category: string;
  readonly challengeMemberList: ChallengeMemberResultData[];
}

export interface UserInfo {
  readonly email: string;
  readonly nickname: string;
  readonly imageUrl: string;
}

export interface UserData {
  email: string;
  memberId: number;
  nickname: string;
  profileImageUrl: string | null;
}

export interface RangeCalendarProps {
  readonly startDate: Date;
  readonly endDate: Date;
  readonly handleSelectedDate: (date: Date) => void;
}

export interface SelectOptionProps {
  readonly value: string;
  readonly name: string;
}

export interface SliderBarProps {
  readonly rangeMinPercent: number;
  readonly rangeMaxPercent: number;
}

export interface ChallengeDataProps {
  readonly challengeId: number;
  readonly title: string;
  readonly content: string;
  readonly goal_amount: number;
  readonly startDate: string;
  readonly endDate: string;
  readonly maxPeople: number;
  readonly cnt: number;
}

export interface ExpenseFormProps {
  readonly amount: number | string;
  readonly payType: string;
  readonly category: string;
  readonly paidFor: string;
  readonly useDate: string;
  readonly memo?: string | null;
}

export interface ValidationFormProps {
  readonly email: string;
  readonly nickName: string;
  readonly pw: string;
  readonly checkPw: string;
  readonly checkBox: boolean;
}

export interface ExpenseDataForAnalyze {
  readonly category: string;
  readonly total: number;
}

export interface ChallengeFilterProps {
  readonly keyword: string;
  readonly searchType: string;
  readonly minAmount: number;
  readonly maxAmount: number;
  readonly category: string | null;
}
