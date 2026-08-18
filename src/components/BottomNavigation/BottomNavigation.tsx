import {
  Activity,
  Home,
  Plus,
  User,
  Users,
} from 'lucide-react';

import { NavLink, useNavigate } from 'react-router-dom';

import './BottomNavigation.css';

const BottomNavigation = () => {
  const navigation = useNavigate();
  return (
    <nav className="bottom-navigation">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `bottom-navigation__item ${
            isActive
              ? 'bottom-navigation__item--active'
              : ''
          }`
        }
      >
        <Home size={20} />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/groups"
        className={({ isActive }) =>
          `bottom-navigation__item ${
            isActive
              ? 'bottom-navigation__item--active'
              : ''
          }`
        }
      >
        <Users size={20} />
        <span>Groups</span>
      </NavLink>

      <button
        type="button"
        className="bottom-navigation__create"
        aria-label="Create group"
        onClick={() => navigation('/groups/create')}
      >
        <Plus size={28} />
      </button>

      <NavLink
        to="/activity"
        className={({ isActive }) =>
          `bottom-navigation__item ${
            isActive
              ? 'bottom-navigation__item--active'
              : ''
          }`
        }
      >
        <Activity size={20} />
        <span>Activity</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `bottom-navigation__item ${
            isActive
              ? 'bottom-navigation__item--active'
              : ''
          }`
        }
      >
        <User size={20} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNavigation;