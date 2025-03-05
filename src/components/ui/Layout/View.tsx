import { Route, Routes } from "react-router-dom";
import Admin from "@/Pages/Admin";
import Dashboard from "@/Pages/Dashboard";
import Timetracker from "@/Pages/AllProjects";
import SignIn from "@/Pages/SignIn";
import AppLayout from "./AppLayout";

export const View = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />

      <Route path="/dashboard" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="admin" element={<Admin />} />
        <Route path="allProjects" element={<Timetracker />} />
      </Route>
    </Routes>
  );
};
