import { SidebarProvider } from "../sidebar";
import AppSideBar from "./AppSideBar";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const AppLayout = () => {
  return (
    <SidebarProvider defaultOpen={true} className="border-none">
      <AppSideBar />
      <main className="w-full bg-gray-100">
        <NavBar/>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default AppLayout;
