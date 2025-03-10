import { BiSolidTachometer } from "react-icons/bi";
import { Clock4, FileStack } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
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
    url: "/allProjects",
    icon: FileStack,
  },
  {
    title: "Time Tracker",
    url: "/time-tracker",
    icon: Clock4,
  },

];

const AppSideBar = () => {
  return (
    <Sidebar className="border-none" style={{boxShadow:"2px 4px 9px #0000002e"}}>
      <SidebarHeader>
      <SidebarMenu>
      <SidebarMenuItem>
      <img
        src="/adaptive.png"
        alt="Image"
        className="inset-0 mx-auto h-9 object-contain mt-4 mb-1"
      />
      </SidebarMenuItem>
      </SidebarMenu>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Adaptive Time Tracker App</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon  style={{height:24,width:24}} className="text-pink-600"/>
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
