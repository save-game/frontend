interface ExpenseRecord {
  readonly date: string;
  readonly amount: number;
}

interface ChallengeMemberData {
  readonly memberId: number;
  readonly nickName: string;
  readonly status: 0 | 1;
  readonly recordList: ExpenseRecord[];
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
