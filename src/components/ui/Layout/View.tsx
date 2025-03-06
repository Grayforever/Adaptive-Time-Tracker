import Dashboard from "@/Pages/Dashboard";
import SignIn from "@/Pages/SignIn";
import TimeTracker from "@/Pages/TimeTracker";
import { Route, Routes } from "react-router-dom";

export const View = () => {
  return (
    <Routes>
      <Route path="/" element={< SignIn/>} />
      <Route path="/home" element={< Dashboard/>} />
      <Route path="/time-tracker" element={< TimeTracker/>} />
    </Routes>
  );
};
