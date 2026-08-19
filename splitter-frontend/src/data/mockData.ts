import type {
  Group,
  Member,
  Transaction,
} from '../types';

export const members: Member[] = [
  {
    id: '1',
    name: 'Prasad',
    initials: 'PT',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Rahul',
    initials: 'RK',
    role: 'member',
  },
  {
    id: '3',
    name: 'Amit',
    initials: 'AM',
    role: 'member',
  },
  {
    id: '4',
    name: 'Sneha',
    initials: 'SK',
    role: 'member',
  },
  {
    id: '5',
    name: 'Ravi',
    initials: 'RV',
    role: 'member',
  },
];

export const groups: Group[] = [
  {
    id: 'ganesh-2026',
    name: 'Ganesh Festival 2026',
    members,
    totalCollection: 75000,
    totalContribution: 15000,
    totalExpense: 45000,
  },
  {
    id: 'goa-2026',
    name: 'Goa Trip 2026',
    members,
    totalCollection: 0,
    totalContribution: 50000,
    totalExpense: 35000,
  },
];

export const transactions: Transaction[] = [
  {
    id: '1',
    groupId: 'ganesh-2026',
    type: 'collection',
    amount: 75000,
    description: 'Public collection',
    memberId: '1',
    date: '2026-08-18',
  },
  {
    id: '2',
    groupId: 'ganesh-2026',
    type: 'contribution',
    amount: 5000,
    description: 'Prasad contribution',
    memberId: '1',
    date: '2026-08-18',
  },
  {
    id: '3',
    groupId: 'ganesh-2026',
    type: 'contribution',
    amount: 3000,
    description: 'Rahul contribution',
    memberId: '2',
    date: '2026-08-18',
  },
  {
    id: '4',
    groupId: 'ganesh-2026',
    type: 'expense',
    amount: 20000,
    description: 'Decoration',
    memberId: '1',
    date: '2026-08-18',
  },
  {
    id: '5',
    groupId: 'ganesh-2026',
    type: 'contribution',
    amount: 15000,
    description: 'Food',
    memberId: '2',
    date: '2026-08-18',
  },
  {
    id: '6',
    groupId: 'goa-2026',
    type: 'contribution',
    amount: 10000,
    description: 'Prasad contribution',
    memberId: '1',
    date: '2026-08-18',
  },
  {
    id: '7',
    groupId: 'goa-2026',
    type: 'contribution',
    amount: 20000,
    description: 'Hotel',
    memberId: '1',
    date: '2026-08-18',
  },
];