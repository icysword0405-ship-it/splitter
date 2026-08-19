import { Outlet } from 'react-router-dom';

import Header from '../../components/Header/Header';
import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';

import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />

      <main className="main-layout__content">
        <Outlet />
      </main>

      <BottomNavigation />
    </div>
  );
};

export default MainLayout;