import { ArrowLeft, MoreVertical, Users } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import './GroupDetails.css';

const GroupDetails = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  return (
    <main className="group-details">
      <header className="group-details__header">
        <button
          type="button"
          className="group-details__back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="group-details__heading">
          <h1>Ganesh Festival 2026</h1>
          <span>Festival • 5 members</span>
        </div>

        <button
          type="button"
          className="group-details__menu"
          aria-label="More options"
        >
          <MoreVertical size={22} />
        </button>
      </header>

      <section className="group-details__balance">
        <span className="group-details__balance-label">
          Mandal Fund
        </span>

        <strong className="group-details__balance-amount">
          ₹45,750
        </strong>
      </section>

      <section className="group-details__summary">
        <div className="group-details__summary-card">
          <span>Collections</span>
          <strong>₹75,000</strong>
        </div>

        <div className="group-details__summary-card">
          <span>Member Contributions</span>
          <strong>₹15,000</strong>
        </div>
      </section>

      <section className="group-details__members">
        <div className="group-details__section-header">
          <h2>Members</h2>

          <button type="button">
            <Users size={18} />
            Add
          </button>
        </div>

        <div className="group-details__member-list">
          <div className="group-details__member">
            <div className="group-details__member-avatar">
              PT
            </div>

            <div>
              <strong>Prasad</strong>
              <span>Admin</span>
            </div>

            <strong>₹5,000</strong>
          </div>

          <div className="group-details__member">
            <div className="group-details__member-avatar">
              AM
            </div>

            <div>
              <strong>Member 2</strong>
              <span>Member</span>
            </div>

            <strong>₹3,000</strong>
          </div>

          <div className="group-details__member">
            <div className="group-details__member-avatar">
              RK
            </div>

            <div>
              <strong>Member 3</strong>
              <span>Member</span>
            </div>

            <strong>₹2,000</strong>
          </div>
        </div>
      </section>

      <section className="group-details__actions">
        <button type="button">
          Add Collection
        </button>

        <button type="button">
          Add Contribution
        </button>

        <button type="button">
          Add Expense
        </button>
      </section>
    </main>
  );
};

export default GroupDetails;