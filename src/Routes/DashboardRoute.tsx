import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../Pages/DashboardPage";
import TaskComposerPage from "../Pages/TaskComposerPage";

const DashboardRoute = () => (
    <Routes>
        <Route index element={<DashboardPage />} />
        <Route path="/task/:id" element={<TaskComposerPage />} />
    </Routes>
);

export default DashboardRoute;
