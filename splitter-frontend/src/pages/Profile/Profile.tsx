
import {
  LogOut,
  Settings,
  User,
} from 'lucide-react';

import './Profile.css';

const Profile = () => {
  return (
    <main className="profile-page">
      <h1>Profile</h1>

      <section className="profile-page__user">
        <div className="profile-page__avatar">
          PT
        </div>

        <div>
          <h2>Prasad</h2>
          <span>Group Administrator</span>
        </div>
      </section>

      <section className="profile-page__menu">
        <button type="button">
          <User size={20} />
          <span>Account</span>
        </button>

        <button type="button">
          <Settings size={20} />
          <span>Settings</span>
        </button>

        <button type="button">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </section>
    </main>
  );
};

export default Profile;