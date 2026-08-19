import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import GroupCard from '../../components/GroupCard/GroupCard';
import { groups } from '../../data/mockData';

import './Groups.css';

const Groups = () => {
  const navigate = useNavigate();

  return (
    <main className="groups-page">
      <header className="groups-page__header">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={22} />
        </button>

        <h1>Groups</h1>
      </header>

      <div className="groups-page__list">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
          />
        ))}
      </div>
    </main>
  );
};

export default Groups;