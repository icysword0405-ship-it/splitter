import { Outlet } from "react-router-dom";

import './MainLayout.css';
import Header from "../../components/Header/Header";
import BottomNavigation from "../../components/BottomNavigation/BottomNavigation";

const MainLayout = () => {
    return (
        <div className="main-layout">
            <Header />
            <div className="main-layout__content">
                <Outlet />
            </div>
            <BottomNavigation />
        </div>
    )
}

export default MainLayout;