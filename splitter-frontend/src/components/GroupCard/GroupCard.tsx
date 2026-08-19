import { ChevronRight, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import type { Group } from '../../types';

import './GroupCard.css';

interface GroupCardProps {
  group: Group;
}

const GroupCard = ({ group }: GroupCardProps) => {
  const navigate = useNavigate();

  const balance = group.totalCollection - group.totalExpense;

  const handleExpenseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigate(`/groups/${group.id}/expense`);
  };

  return (
    <div className="group-card">
      <button
        type="button"
        className="group-card__main"
        onClick={() => navigate(`/groups/${group.id}`)}
      >
        <div className="group-card__icon">👥</div>

        <div className="group-card__content">
          <div className="group-card__top">
            <h3>{group.name}</h3>

            <ChevronRight size={18} />
          </div>

          <div className="group-card__bottom">
            <span>
              <Users size={14} />
              {group.members.length} members
            </span>

            <strong>
              ₹{balance.toLocaleString('en-IN')}
            </strong>
          </div>
        </div>
      </button>

      <button
        type="button"
        className="group-card__expense"
        onClick={handleExpenseClick}
      >
        Expense
      </button>
    </div>
  );
};

export default GroupCard;