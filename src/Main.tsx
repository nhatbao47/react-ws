import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import SchedulePage from "./Pages/SchedulePage";
import UserPage from "./Pages/UserPage";

const Main = () => (
    <React.Fragment>
        <Routes>
            <Route index element={<DashboardPage />}></Route>
            <Route path="/dashboard/*" element={<DashboardPage/>}></Route>
            <Route path="/users/*" element={<UserPage />}></Route>
            <Route path="/schedules/" element={<SchedulePage/>}></Route>
        </Routes>
    </React.Fragment>
);

export default Main;