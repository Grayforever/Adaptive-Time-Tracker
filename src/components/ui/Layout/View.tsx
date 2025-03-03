import Dashboard from "@/Pages/Dashboard";
import SignIn from "@/Pages/SignIn";
import { Route, Routes } from "react-router-dom";

export const View = () => {
  return (
    <Routes>
      <Route path="/" element={< SignIn/>} />
      <Route path="/home" element={< Dashboard/>} />
    </Routes>
  );
};
