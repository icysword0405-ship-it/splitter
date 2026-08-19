import type { Group, Member, Transaction, Settlement } from '../types';

// Personal money given by a member (used for settlements)
export const calculateMemberContribution = (
  memberId: string,
  transactions: Transaction[],
): number => {
  return transactions
    .filter((t) => t.type === 'contribution' && t.memberId === memberId)
    .reduce((total, t) => total + t.amount, 0);
};

// Mandal fund money spent/managed by a member (for auditing)
export const calculateMemberMandalSpending = (
  memberId: string,
  transactions: Transaction[],
): number => {
  return transactions
    .filter((t) => t.type === 'expense' && t.memberId === memberId)
    .reduce((total, t) => total + t.amount, 0);
};

// Overall Mandal Cash Pool Summary
export const calculateFundSummary = (transactions: Transaction[]) => {
  const totalCollection = transactions
    .filter((t) => t.type === 'collection')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalContribution = transactions
    .filter((t) => t.type === 'contribution')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalCollection,
    totalContribution,
    totalExpense,
    remainingBalance: totalCollection + totalContribution - totalExpense,
  };
};

export const calculateSettlements = (
  group: Group,
  transactions: Transaction[],
): Settlement[] => {
  const groupTransactions = transactions.filter((t) => t.groupId === group.id);
  const balances: Record<string, number> = {};

  group.members.forEach((member) => {
    balances[member.id] = 0;
  });

  // 1. Credit members for personal contributions
  groupTransactions.forEach((transaction) => {
    if (transaction.type === 'contribution' && transaction.memberId) {
      balances[transaction.memberId] += transaction.amount;
    }
  });

  // 2. Calculate equal share of contributions
  const totalContribution = groupTransactions
    .filter((t) => t.type === 'contribution')
    .reduce((sum, t) => sum + t.amount, 0);

  const share = group.members.length > 0 ? totalContribution / group.members.length : 0;

  // 3. Subtract equal share
  group.members.forEach((member) => {
    balances[member.id] -= share;
  });

  // 4. Match creditors and debtors
  const creditors = group.members
    .map((m) => ({ id: m.id, amount: Math.max(balances[m.id], 0) }))
    .filter((m) => m.amount > 0.01);

  const debtors = group.members
    .map((m) => ({ id: m.id, amount: Math.max(-balances[m.id], 0) }))
    .filter((m) => m.amount > 0.01);

  const settlements: Settlement[] = [];
  let creditorIndex = 0;
  let debtorIndex = 0;

  while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
    const creditor = creditors[creditorIndex];
    const debtor = debtors[debtorIndex];
    const amount = Math.min(creditor.amount, debtor.amount);

    settlements.push({
      fromMemberId: debtor.id,
      toMemberId: creditor.id,
      amount: Math.round(amount),
    });

    creditor.amount -= amount;
    debtor.amount -= amount;

    if (creditor.amount < 0.01) creditorIndex++;
    if (debtor.amount < 0.01) debtorIndex++;
  }

  return settlements;
};