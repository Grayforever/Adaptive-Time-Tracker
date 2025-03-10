import { BiSolidTachometer } from "react-icons/bi";
import { Clock4, FileStack } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BiSolidTachometer,
  },
  {
    title: "All Projects",
    url: "/dashboard/allProjects",
    icon: FileStack,
  },
  {
    title: "Time Tracker",
    url: "/dashboard/time-tracker",
    icon: Clock4,
  },

];

const AppSideBar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Adaptive Time Tracker App</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSideBar;
