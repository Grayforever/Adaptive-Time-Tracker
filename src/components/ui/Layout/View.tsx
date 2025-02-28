import Admin from "@/screens/Admin";
import Dashboard from "@/screens/Dashboard";
import { Route, Routes } from "react-router-dom";

export const View = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};
