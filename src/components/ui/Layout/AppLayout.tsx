import { SidebarProvider } from "../sidebar";
import AppSideBar from "./AppSideBar";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const AppLayout = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSideBar />
      <main className="w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default AppLayout;
