import { FetchAllUserTeams } from "@/API/Users/Users";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { theme } from "@/theme";
import { userTeams } from "@/types/userTeams";
import { EllipsisVertical, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

const TeamsView = () => {
  const [userListTeam, setuserListTeam] = useState<userTeams[]>([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    callGetRequest();
  }, []);
  const callGetRequest = async () => {
    try {
      setisLoading(true);
      const apiResponse = await FetchAllUserTeams();
      console.log(apiResponse);
      if (apiResponse) {
        const { data } = apiResponse;
        setisLoading(false);
        setuserListTeam(data);
      }
    } catch (error) {
      setisLoading(false);
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
        <div className="w-fit my-4 ml-auto">
            <Button className="w-[150px]" style={{background:theme.colors.primary[8]}}>Add User <UserPlus /></Button>
        </div>

      {isLoading ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ) : (
        <Table>
          <TableCaption>
            A list of all team members and their roles
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Roles</TableHead>
              <TableHead>Assigned Group</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userListTeam.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.roles.map((role) => (
                    <label
                      className="px-[12px] py-[4px] mr-2 my-1 rounded-2xl text-white"
                      style={{ background: theme.colors.primary[3] }}
                      key={role.id+'_role'}
                    >
                      {role.role_name}
                    </label>
                  ))}
                </TableCell>
                <TableCell>
                  {user.team_groups.length?
                  user.team_groups.map((team) => (
                    <label
                      className="px-[12px] py-[4px] mr-2 my-1 rounded-2xl text-white"
                      style={{ background: theme.colors.secondary[3] }}
                      key={team.id+'_role'}
                    >
                      {team.name}
                    </label>
                  )):(
                    <label className="text-gray-400">Not Assigned</label>
                  )}
                </TableCell>
                <TableCell>
                    <DropdownMenu key={user.id+"_Action"}>
                    <DropdownMenuTrigger>
                    <Button variant="outline" key={user.id+"_ActionBtn"}><EllipsisVertical size={20} /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TeamsView;
