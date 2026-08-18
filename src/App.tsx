import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Groups from "./pages/Groups/Groups";
import CreateGroup from "./pages/CreateGroup/CreateGroup";
import GroupDetails from "./pages/GroupDetails/GroupDetails";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/groups" element={<Groups />} />
                    <Route path="/groups/create" element={<CreateGroup />} />
                    <Route path="/groups/:groupId" element={<GroupDetails />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;