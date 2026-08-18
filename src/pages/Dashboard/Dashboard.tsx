import ActivityCard from '../../components/ActivityCard/ActivityCard';
import ActivitySection from '../../components/ActivitySection/ActivitySection';
import CreateGroupButton from '../../components/CreateGroupButton/CreateGroupButton';
import GroupCard from '../../components/GroupCard/GroupCard';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <main className='dashboard'>
            <WelcomeSection />
            <SectionHeader />
            <GroupCard 
                name="Goa Trip 2026"
                type="Trip"
                memberCount={5}
                balance={2350}
            />
            <GroupCard
                name="Ganesh Festival"
                type="Festival"
                memberCount={10}
                balance={-500}
            />
            <ActivitySection />
            <ActivityCard 
                title="Daily Collection"
                groupName="Ganesh Festival"
                amount={9750}
            />
            <CreateGroupButton />
        </main>
    )
}

export default Dashboard;