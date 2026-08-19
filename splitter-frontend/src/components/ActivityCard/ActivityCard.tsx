import { ArrowDownLeft, ChevronRight } from "lucide-react";
import './ActivityCard.css';

interface ActivityCardProps {
    title: string;
    groupName: string;
    amount: number;
}

const ActivityCard = ({
    title, groupName, amount
}: ActivityCardProps) => {
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
                    {title}
                </div>
                <div className="activity-card__group">
                    {groupName}
                </div>
            </div>

            <div className="activity-card__right">
                <span className="activity-card__amount">
                    +₹{amount.toLocaleString('en-In')}
                </span>
                <ChevronRight size={18} />
            </div>
        </button>
    )
}

export default ActivityCard;