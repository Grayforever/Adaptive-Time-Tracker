import { Input } from "@/components/ui/input";
import RolesComboBox from "@/Pages/Team/RolesComboBox";
import { roles } from "@/types/UserRoles";
import { userTeams } from "@/types/userTeams";
import WorkgroupCombobox from "./WorkgroupCombobox";
import { workgroups } from "@/types/workgroup.types";

interface props {
  roleList: roles[];
  workgroupList: workgroups[];
  setdata: (e: userTeams) => void;
  teamMember: userTeams;
  isUpdate:boolean
}
const AddUpdateTeamMember: React.FC<props> = ({
  roleList,
  workgroupList,
  setdata,
  teamMember,
  isUpdate
}) => {
  // const [revalidatePass,setrevalidatePass] = useState('')
  return (
    <div>
      <div className="px-4 py-1">
        <label className="text-gray-500 ml-2 text-[13px]">
          Enter Full Name
        </label>
        <Input
          placeholder="Full Name"
          id="fullname"
          className="mt-1 outline-none"
          value={teamMember?.name}
          onChange={(e) =>
            setdata?.({
              ...teamMember,
              name: e.target.value,
            }) 
          }
          type="text"
        />
      </div>

      <div className="px-4 py-1">
        <label className="text-gray-500 ml-2 text-[13px]">
          Enter user email
        </label>
        <Input
          placeholder="Email"
          id="emailInput"
          className="mt-1 outline-none"
          value={teamMember?.email}
          onChange={(e) => setdata?.({ ...teamMember, email: e.target.value })}
          type="email"
        />
      </div>

      {
        !isUpdate?
        (
            <div className="flex flex-wrap">
            <div className="px-4 py-1 w-full md:w-1/2">
              <label className="text-gray-500 ml-2 text-[13px]">
                Enter user password
              </label>
              <Input
                placeholder="Enter Password"
                id="passwordInput"
                className="mt-1 outline-none"
                value={teamMember?.password}
                onChange={(e) =>
                  setdata?.({ ...teamMember, password: e.target.value })
                }
                type="password"
              />
            </div>
    
            <div className="px-4 py-1 w-full md:w-1/2">
              <label className="text-gray-500 ml-2 text-[13px]">
                Re-Enter user password
              </label>
              <Input
                placeholder="Re-Enter Password"
                id="revalpasswordInput"
                className="mt-1 outline-none"
                value={teamMember.revalidatePass}
                onChange={(e) =>
                  setdata?.({ ...teamMember, revalidatePass: e.target.value })
                }
                type="password"
              />
            </div>
          </div>
        ):''
      }

     

      <div className="px-4 py-1">
        <label className="text-gray-500 ml-2 text-[13px]">Select Role</label>
        <RolesComboBox
          data={roleList}
          value={teamMember?.roles as number[]}
          onchange={(value) => setdata?.({ ...teamMember, roles: value })}
          dataKey={"id"}
          datavalue={"role_name"}
          label={"Select Role"}
        />
      </div>

      <div className="px-4 py-1">
        <label className="text-gray-500 ml-2 text-[13px]">
          Select Workgroup
        </label>
        <WorkgroupCombobox
          data={workgroupList}
          value={teamMember?.team_groups as number[]}
          onchange={(value) => setdata?.({ ...teamMember, team_groups: value })}
          dataKey={"id"}
          datavalue={"name"}
          label={"Select Workgroup"}
        />
      </div>
    </div>
  );
};

export default AddUpdateTeamMember;
