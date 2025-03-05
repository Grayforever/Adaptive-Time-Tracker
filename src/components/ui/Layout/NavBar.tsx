import { SidebarTrigger } from "../sidebar";

const NavBar = () => {
  return (
    <div
      className="p-4 flex items-center"
      style={{ boxShadow: "2px 5px 9px #00000017" }}
    >
      <div className="flex gap-6 items-center w-fit">
        <SidebarTrigger className="h-10 w-10 text-7xl" />
      </div>

      <div className="flex gap-6 ml-auto">logo</div>
    </div>
  );
};

export default NavBar;
