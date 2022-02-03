import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const DashboardRoute = lazy(() => import("./Routes/DashboardRoute"));
const ScheduleRoute = lazy(() => import("./Routes/ScheduleRoute"));
const UserPage = lazy(() => import("./Pages/UserPage"));

const Main = () => (
    <React.Fragment>
        <Suspense fallback={<p> Loading...</p>}>
            <Routes>
                <Route path="/dashboard/*" element={<DashboardRoute/>}></Route>
                <Route path="/users/*" element={<UserPage />}></Route>
                <Route path="/schedules/*" element={<ScheduleRoute/>}></Route>
            </Routes>
        </Suspense>
    </React.Fragment>
);

export default Main;