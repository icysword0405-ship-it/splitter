import { useNavigate } from 'react-router-dom';

import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import GroupCard from '../../components/GroupCard/GroupCard';
import CreateGroupButton from '../../components/CreateGroupButton/CreateGroupButton';
import ActivitySection from '../../components/ActivitySection/ActivitySection';

import { groups } from '../../data/mockData';

import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <WelcomeSection />

      <section className="dashboard__groups">
        <SectionHeader
          title="Your Groups"
          action="See all"
          onAction={() => navigate('/groups')}
        />

        <div className="dashboard__group-list">
          {groups.slice(0, 2).map((group) => (
            <GroupCard
              key={group.id}
              group={group}
            />
          ))}
        </div>

        <div className="dashboard__create">
          <CreateGroupButton />
        </div>
      </section>

      <ActivitySection />
    </div>
  );
};

export default Dashboard;