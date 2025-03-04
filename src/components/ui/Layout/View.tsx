<<<<<<< HEAD
import Admin from "@/screens/Admin";
import Dashboard from "@/screens/Dashboard";
import Timetracker from "@/screens/AllProjects";

=======
import Dashboard from "@/Pages/Dashboard";
import SignIn from "@/Pages/SignIn";
>>>>>>> 9624a80ca98c8cbc41e3278969c69b2e29a8058b
import { Route, Routes } from "react-router-dom";

export const View = () => {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Dashboard />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/timetracker" element={<Timetracker/>} />
=======
      <Route path="/" element={< SignIn/>} />
      <Route path="/home" element={< Dashboard/>} />
>>>>>>> 9624a80ca98c8cbc41e3278969c69b2e29a8058b
    </Routes>
  );
};
