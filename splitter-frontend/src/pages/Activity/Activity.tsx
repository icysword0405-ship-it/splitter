import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  groups,
  transactions,
} from '../../data/mockData';

import './Activity.css';

const Activity = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const group = groupId
    ? groups.find((item) => item.id === groupId)
    : undefined;

  const filteredTransactions = groupId
    ? transactions.filter((transaction) => transaction.groupId === groupId)
    : [...transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

  const getMemberName = (memberId?: string) => {
    if (!memberId) {
      return 'Group';
    }

    const member = groups
      .flatMap((item) => item.members)
      .find((person) => person.id === memberId);

    return member?.name ?? 'Unknown';
  };

  const getGroupName = (transactionGroupId: string) => {
    return groups.find((item) => item.id === transactionGroupId)?.name ?? 'Group';
  };

  return (
    <main className="activity-page">
      <header className="activity-page__header">
        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={22} />
        </button>

        <h1>{group ? `${group.name} Activity` : 'All Activity'}</h1>
      </header>

      <div className="activity-page__list">
        {filteredTransactions.length === 0 ? (
          <div className="activity-page__empty">
            No activity yet.
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div className="activity-page__item" key={transaction.id}>
              <div className="activity-page__info">
                <strong>{transaction.description}</strong>

                <span>
                  {group ? getMemberName(transaction.memberId) : `${getGroupName(transaction.groupId)} • ${getMemberName(transaction.memberId)}`}
                </span>

                <small>{transaction.date}</small>
              </div>

              <strong
                className={`activity-page__amount activity-page__amount--${transaction.type}`}
              >
                {transaction.type === 'expense' ? '-' : '+'}₹
                {transaction.amount.toLocaleString('en-IN')}
              </strong>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Activity;