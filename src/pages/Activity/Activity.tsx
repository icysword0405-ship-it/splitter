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

  const group = groups.find(
    (item) => item.id === groupId,
  );

  if (!group) {
    return <h1>Group not found</h1>;
  }

  const groupTransactions =
    transactions.filter(
      (transaction) =>
        transaction.groupId === groupId,
    );

  const getMemberName = (
    memberId?: string,
  ) => {
    if (!memberId) {
      return 'Group';
    }

    return (
      group.members.find(
        (member) => member.id === memberId,
      )?.name ?? 'Unknown'
    );
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

        <h1>Activity</h1>
      </header>

      <div className="activity-page__list">
        {groupTransactions.length === 0 ? (
          <div className="activity-page__empty">
            No activity yet.
          </div>
        ) : (
          groupTransactions.map(
            (transaction) => (
              <div
                className="activity-page__item"
                key={transaction.id}
              >
                <div className="activity-page__info">
                  <strong>
                    {transaction.description}
                  </strong>

                  <span>
                    {getMemberName(
                      transaction.memberId,
                    )}
                  </span>

                  <small>
                    {transaction.date}
                  </small>
                </div>

                <strong
                  className={`activity-page__amount activity-page__amount--${transaction.type}`}
                >
                  {transaction.type ===
                  'expense'
                    ? '-'
                    : '+'}
                  ₹
                  {transaction.amount.toLocaleString(
                    'en-IN',
                  )}
                </strong>
              </div>
            ),
          )
        )}
      </div>
    </main>
  );
};

export default Activity;