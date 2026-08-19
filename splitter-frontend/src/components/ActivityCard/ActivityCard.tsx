import { ArrowDownLeft, ChevronRight } from 'lucide-react';

import './ActivityCard.css';

interface ActivityCardProps {
  title: string;
  groupName: string;
  amount: number;
  type: 'collection' | 'contribution' | 'expense';
}

const ActivityCard = ({
  title,
  groupName,
  amount,
  type,
}: ActivityCardProps) => {
  const sign = type === 'expense' ? '-' : '+';
  const amountClass =
    type === 'expense'
      ? 'activity-card__amount activity-card__amount--expense'
      : 'activity-card__amount';

  return (
    <button
      type="button"
      className="activity-card"
    >
      <div className="activity-card__content">
        <div className="activity-card__icon">
          <ArrowDownLeft size={20} />
        </div>

        <div className="activity-card__details">
          <div className="activity-card__title">
            {title}
          </div>
          <div className="activity-card__group">
            {groupName}
          </div>
        </div>
      </div>

      <div className="activity-card__right">
        <span className={amountClass}>
          {sign}₹{amount.toLocaleString('en-IN')}
        </span>
        <ChevronRight size={18} />
      </div>
    </button>
  );
};

export default ActivityCard;