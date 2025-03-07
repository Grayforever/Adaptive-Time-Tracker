
import { Button } from "../button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../dropdown-menu";
import { SidebarTrigger } from "../sidebar";

const NavBar = () => {
  // const 
  return (
    <div
      className="p-2 flex items-center bg-white"
      style={{borderBottom:"2px solid #00000014" }}
    >
      <div className="flex gap-6 items-center w-fit">
        <SidebarTrigger className="h-10 w-10 text-7xl" />
      </div>

      <div className="flex gap-6 ml-auto">
      <DropdownMenu>
      <DropdownMenuTrigger>
        <span>Welcome 👋</span> &nbsp;&nbsp;
        <Button key={'profile'} className="profileName">SM</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
      </div>
    </div>
  );
};

export default NavBar;
