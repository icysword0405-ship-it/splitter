import Settlement from "../pages/Settlement/Settlement";

export type GroupType =
  | 'trip'
  | 'festival';

export type MemberRole =
  | 'admin'
  | 'member';

export type TransactionType =
  | 'collection'
  | 'contribution'
  | 'expense';

export interface Member {
  id: string;
  name: string;
  initials: string;
  role: MemberRole;
}

export interface Group {
  id: string;
  name: string;
  type: GroupType;
  members: Member[];
  totalCollection: number;
  totalContribution: number;
  totalExpense: number;
}

export interface Transaction {
  id: string;
  groupId: string;
  type: TransactionType;
  amount: number;
  description: string;
  memberId?: string;
  date: string;
}

export interface Settlement {
  fromMemberId: string;
  toMemberId: string;
  amount: number;
}