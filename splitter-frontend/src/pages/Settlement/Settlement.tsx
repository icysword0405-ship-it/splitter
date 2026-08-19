import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  groups,
  transactions,
} from '../../data/mockData';

import {
  calculateSettlements,
} from '../../utils/calculations';

import './Settlement.css';

const Settlement = () => {
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

  const settlements =
    calculateSettlements(
      group,
      groupTransactions,
    );

  const getMemberName = (id: string) =>
    group.members.find(
      (member) => member.id === id,
    )?.name ?? 'Unknown';

  return (
    <main className="settlement-page">
      <header className="settlement-page__header">
        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={22} />
        </button>

        <h1>Settlement</h1>
      </header>

      <div className="settlement-page__intro">
        <h2>Who owes whom?</h2>

        <p>
          Based on the expenses recorded for
          this group.
        </p>
      </div>

      {settlements.length === 0 ? (
        <div className="settlement-page__empty">
          <div>🎉</div>

          <h2>All Settled</h2>

          <p>
            No member needs to pay another
            member.
          </p>
        </div>
      ) : (
        <div className="settlement-page__list">
          {settlements.map(
            (settlement, index) => (
              <div
                className="settlement-card"
                key={`${settlement.fromMemberId}-${settlement.toMemberId}-${index}`}
              >
                <div className="settlement-card__members">
                  <strong>
                    {getMemberName(
                      settlement.fromMemberId,
                    )}
                  </strong>

                  <span>pays</span>

                  <strong>
                    {getMemberName(
                      settlement.toMemberId,
                    )}
                  </strong>
                </div>

                <strong className="settlement-card__amount">
                  ₹
                  {settlement.amount.toLocaleString(
                    'en-IN',
                  )}
                </strong>
              </div>
            ),
          )}
        </div>
      )}
    </main>
  );
};

export default Settlement;