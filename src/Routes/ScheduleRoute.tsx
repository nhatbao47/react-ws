import React from "react";
import { Route, Routes } from "react-router-dom";
import ScheduleDetailPage from "../Pages/ScheduleDetailPage";
import ScheduleEditPage from "../Pages/ScheduleEditPage";
import SchedulePage from "../Pages/SchedulePage";

const ScheduleRoute = () => (
    <Routes>
        <Route index element={<SchedulePage />} />
        <Route path="/:id/detail" element={<ScheduleDetailPage />} />
        <Route path="/:id/edit" element={<ScheduleEditPage/>} />
    </Routes>
);

export default ScheduleRoute;