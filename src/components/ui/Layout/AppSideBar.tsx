import { Clock4, FileStack, LayoutDashboard, Users } from "lucide-react";
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
import { theme } from "@/theme";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
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
  {
    title: "Teams",
    url: "/teams",
    icon: Users,
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
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild className="!py-[3vh] !px-[1vw] rounded-3xl">
                    <a href={item.url}>
                      <item.icon  style={{height:24,width:24,color:theme.colors.primary[8]}}/>
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
