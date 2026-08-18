import { Plus } from 'lucide-react';

import GroupCard from '../../components/GroupCard/GroupCard';
import './Groups.css';

const Groups = () => {
  return (
    <main className="groups-page">
      <div className="groups-page__header">
        <div>
          <h1 className="groups-page__title">
            Your Groups
          </h1>

          <p className="groups-page__subtitle">
            Manage your trips and festivals
          </p>
        </div>

        <button
          type="button"
          className="groups-page__add-button"
          aria-label="Create group"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="groups-page__list">
        <GroupCard
          name="Goa Trip 2026"
          type="Trip"
          memberCount={5}
          balance={2350}
        />

        <GroupCard
          name="Ganesh Festival 2026"
          type="Festival"
          memberCount={5}
          balance={-500}
        />
      </div>
    </main>
  );
};

export default Groups;