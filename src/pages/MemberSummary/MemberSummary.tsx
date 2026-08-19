import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { groups, transactions } from '../../data/mockData';
import {
  calculateMemberContribution,
  calculateMemberMandalSpending,
} from '../../utils/calculations';

import './MemberSummary.css';

const MemberSummary = () => {
  const navigate = useNavigate();
  const { groupId, memberId } = useParams();

  const group = groups.find((item) => item.id === groupId);
  if (!group) return <h1>Group not found</h1>;

  const member = group.members.find((item) => item.id === memberId);
  if (!member) return <h1>Member not found</h1>;

  const groupTransactions = transactions.filter(
    (transaction) => transaction.groupId === groupId,
  );

  const contribution = calculateMemberContribution(
    member.id,
    groupTransactions,
  );

  const mandalSpending = calculateMemberMandalSpending(
    member.id,
    groupTransactions,
  );

  const memberHistory = groupTransactions.filter(
    (t) => (t.type === 'contribution' || t.type === 'expense') && t.memberId === member.id,
  );

  return (
    <main className="member-summary">
      <header className="member-summary__header">
        <button type="button" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <h1>Member Summary</h1>
      </header>

      <section className="member-summary__profile">
        <div className="member-summary__avatar">{member.initials}</div>
        <h2>{member.name}</h2>
        <span>{member.role === 'admin' ? 'Admin' : 'Member'}</span>
      </section>

      <section className="member-summary__cards">
        <div className="member-summary__card member-summary__card--total">
          <span>Personal Contribution</span>
          <strong>₹{contribution.toLocaleString('en-IN')}</strong>
        </div>

        <div className="member-summary__card">
          <span>Mandal Fund Spent</span>
          <strong>₹{mandalSpending.toLocaleString('en-IN')}</strong>
        </div>
      </section>

      <section className="member-summary__history">
        <h3>Activity History</h3>

        {memberHistory.length === 0 ? (
          <p className="member-summary__empty">No activity recorded yet.</p>
        ) : (
          <ul className="member-summary__list">
            {memberHistory.map((t) => (
              <li key={t.id} className="member-summary__list-item">
                <div>
                  <span className="member-summary__item-desc">
                    {t.description}
                  </span>
                  <small className="member-summary__item-date">
                    {t.date} • <strong className={`badge badge--${t.type}`}>{t.type}</strong>
                  </small>
                </div>
                <strong>₹{t.amount.toLocaleString('en-IN')}</strong>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default MemberSummary;