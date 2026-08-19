import {
  ArrowLeft,
  ChevronRight,
} from 'lucide-react';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import './GroupSettings.css';

const GroupSettings = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  return (
    <main className="group-settings">
      <header className="group-settings__header">
        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={22} />
        </button>

        <h1>Group Settings</h1>
      </header>

      <section className="group-settings__menu">
        <button type="button">
          <span>Edit Group</span>
          <ChevronRight size={18} />
        </button>

        <button type="button">
          <span>Manage Members</span>
          <ChevronRight size={18} />
        </button>

        <button type="button">
          <span>Export Transactions</span>
          <ChevronRight size={18} />
        </button>

        <button
          type="button"
          className="group-settings__danger"
          onClick={() =>
            console.log(
              'Delete group:',
              groupId,
            )
          }
        >
          Delete Group
        </button>
      </section>
    </main>
  );
};

export default GroupSettings;