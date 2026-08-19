import {
  ArrowLeft,
  MoreVertical,
  Users,
} from 'lucide-react';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import { groups } from '../../data/mockData';

import './GroupDetails.css';

const GroupDetails = () => {
  const navigate = useNavigate();

  const { groupId } = useParams();

  const group = groups.find(
    (item) => item.id === groupId
  );

  if (!group) {
    return (
      <main className="group-details">
        <h1>Group not found</h1>
      </main>
    );
  }

  const fund =
    group.totalCollection +
    group.totalContribution -
    group.totalExpense;

  return (
    <main className="group-details">
      <header className="group-details__header">
        <button
          type="button"
          className="group-details__back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={22} />
        </button>

        <div className="group-details__heading">
          <h1>{group.name}</h1>

          <span>
            {group.type === 'festival'
              ? 'Festival'
              : 'Trip'}
            {' • '}
            {group.members.length} members
          </span>
        </div>

        <button
          type="button"
          className="group-details__menu"
        >
          <MoreVertical size={22} />
        </button>
      </header>

      <section className="group-details__balance">
        <span>
          {group.type === 'festival'
            ? 'Mandal Fund'
            : 'Trip Balance'}
        </span>

        <strong>
          ₹{fund.toLocaleString('en-IN')}
        </strong>
      </section>

      <section className="group-details__summary">
        {group.type === 'festival' && (
          <div className="group-details__summary-card">
            <span>Collections</span>

            <strong>
              ₹
              {group.totalCollection.toLocaleString(
                'en-IN'
              )}
            </strong>
          </div>
        )}

        <div className="group-details__summary-card">
          <span>Contributions</span>

          <strong>
            ₹
            {group.totalContribution.toLocaleString(
              'en-IN'
            )}
          </strong>
        </div>

        <div className="group-details__summary-card">
          <span>Expenses</span>

          <strong>
            ₹
            {group.totalExpense.toLocaleString(
              'en-IN'
            )}
          </strong>
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
          {group.members.map((member) => (
            <button
              key={member.id}
              type='button'
              className="group-details__member"
              onClick={() => navigate(`/groups/${group.id}/members/${member.id}`)}
            >
              <div className="group-details__member-avatar">
                {member.initials}
              </div>

              <div className='group_details__member-info'>
                <strong>{member.name}</strong>

                <span>
                  {member.role === 'admin'
                    ? 'Admin'
                    : 'Member'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="group-details__actions">
        {group.type === 'festival' && (
          <button
            type="button"
            onClick={() =>
              navigate(
                `/groups/${group.id}/collection`,
              )
            }
          >
            Add Collection
          </button>
        )}

        <button
          type="button"
          onClick={() =>
            navigate(
              `/groups/${group.id}/contribution`,
            )
          }
        >
          Add Contribution
        </button>

        <button
          type="button"
          onClick={() =>
            navigate(
              `/groups/${group.id}/activity`,
            )
          }
        >
          View Activity
        </button>

        <button
          type="button"
          onClick={() =>
            navigate(
              `/groups/${group.id}/settlement`,
            )
          }
        >
          Settlement
        </button>
      </section>
    </main>
  );
};

export default GroupDetails;
