import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout/MainLayout';

import Dashboard from './pages/Dashboard/Dashboard';
import Groups from './pages/Groups/Groups';
import CreateGroup from './pages/CreateGroup/CreateGroup';
import GroupDetails from './pages/GroupDetails/GroupDetails';

import AddCollection from './pages/AddCollection/AddCollection';
import AddContribution from './pages/AddContribution/AddContribution';
import AddExpense from './pages/AddExpense/AddExpense';

import Activity from './pages/Activity/Activity';
import Settlement from './pages/Settlement/Settlement';
import MemberSummary from './pages/MemberSummary/MemberSummary';
import GroupSettings from './pages/GroupSettings/GroupSettings';

import Profile from './pages/Profile/Profile';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

          {/* Dashboard */}
          <Route
            path="/"
            element={<Dashboard />}
          />

          {/* Groups */}
          <Route
            path="/groups"
            element={<Groups />}
          />

          <Route
            path="/groups/create"
            element={<CreateGroup />}
          />

          {/* Group */}
          <Route
            path="/groups/:groupId"
            element={<GroupDetails />}
          />

          {/* Transactions */}
          <Route
            path="/groups/:groupId/collection"
            element={<AddCollection />}
          />

          <Route
            path="/groups/:groupId/contribution"
            element={<AddContribution />}
          />

          <Route
            path="/groups/:groupId/expense"
            element={<AddExpense />}
          />

          <Route
            path="/activity"
            element={<Activity />}
          />

          {/* Group information */}
          <Route
            path="/groups/:groupId/activity"
            element={<Activity />}
          />

          <Route
            path="/groups/:groupId/settlement"
            element={<Settlement />}
          />

          <Route
            path="/groups/:groupId/members/:memberId"
            element={<MemberSummary />}
          />

          <Route
            path="/groups/:groupId/settings"
            element={<GroupSettings />}
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;