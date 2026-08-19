import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { groups, transactions } from '../../data/mockData';

import ActivityCard from '../ActivityCard/ActivityCard';

import './ActivitySection.css';

const ActivitySection = () => {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');

  const sortedTransactions = useMemo(
    () =>
      [...transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [],
  );

  const filteredTransactions = useMemo(() => {
    return sortedTransactions.filter((transaction) => {
      const groupMatch =
        selectedGroup === 'all' || transaction.groupId === selectedGroup;

      const dateMatch =
        selectedDate === 'all' || transaction.date === selectedDate;

      return groupMatch && dateMatch;
    });
  }, [selectedDate, selectedGroup, sortedTransactions]);

  const recentTransactions = filteredTransactions.slice(0, 4);

  return (
    <section className="activity-section">
      <div className="activity-section__header">
        <h2 className="activity-section__title">Recent Activity</h2>

        <button type="button" onClick={() => navigate('/activity')}>
          View all
        </button>
      </div>

      <div className="activity-section__filters">
        <label>
          <span>Date</span>
          <select
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
          >
            <option value="all">All dates</option>
            {[...new Set(transactions.map((transaction) => transaction.date))].map(
              (date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ),
            )}
          </select>
        </label>

        <label>
          <span>Group</span>
          <select
            value={selectedGroup}
            onChange={(event) => setSelectedGroup(event.target.value)}
          >
            <option value="all">All groups</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="activity-section__list">
        {recentTransactions.length === 0 ? (
          <div className="activity-section__empty">No recent activity.</div>
        ) : (
          recentTransactions.map((transaction) => {
            const group = groups.find((item) => item.id === transaction.groupId);

            return (
              <ActivityCard
                key={transaction.id}
                title={transaction.description}
                groupName={group?.name ?? 'Group'}
                amount={transaction.amount}
                type={transaction.type}
              />
            );
          })
        )}
      </div>

    </section>
  );
};

export default ActivitySection;