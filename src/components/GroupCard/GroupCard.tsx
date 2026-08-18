import { ChevronRight, Users } from "lucide-react";
import './GroupCard.css';
import { useNavigate } from "react-router-dom";

interface GroupCardProps {
    name: string;
    type: 'Trip' | 'Festival';
    memberCount: number;
    balance: number;
}

const GroupCard = ({
    name, type, memberCount, balance
}: GroupCardProps) => {
    const navigate = useNavigate();
    const isPositive = balance >= 0;
    return (
        <button 
            type="button" 
            className="group-card"
            onClick={() => navigate(`/groups/${name}`)}>
            <div className="group-card__content">
                <div className="group-card__icon">
                    <Users size={22} />
                </div>

                <div className="group-card__details">
                    <h3 className="group-card__name">
                        {name}
                    </h3>

                    <div className="group-card__meta">
                        <span>{type}</span>
                        <span>.</span>
                        <span>{memberCount} members </span>
                    </div>
                </div>

                <div className="group-card__right">
                    <span 
                        className={`group-card__balance ${isPositive ? 'group-card__balance--positive' : 'group-card__balace--negative'}`}>
                        {isPositive ? "+" : "-"}₹
                        {Math.abs(balance).toLocaleString('en-In')}
                    </span>
                    <ChevronRight size={20} />
                </div>
            </div>
        </button>
    )
}

export default GroupCard;