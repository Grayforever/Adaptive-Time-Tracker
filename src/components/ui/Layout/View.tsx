import { Route, Routes } from "react-router-dom";
import Admin from "@/Pages/Admin";
import Dashboard from "@/Pages/Dashboard";
import AllProjects from "@/Pages/AllProjects";
import SignIn from "@/Pages/SignIn";

import AppLayout from "./AppLayout";
import TimeTracker from "@/Pages/TimeTracker";


export const View = () => {
  return (
    <Routes>

      <Route path="/" element={<SignIn />} />

      <Route path="/*" element={<AppLayout />}>
        <Route index path="dashboard" element={<Dashboard />} />
        <Route path="admin" element={<Admin />} />
        <Route path="allProjects" element={<AllProjects />} />
        <Route path="time-tracker" element={<TimeTracker />} />
      </Route>

    </Routes>
  );
};
