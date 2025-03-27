import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
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
import { RootState } from "@/store/rootReducer";
import { CreatingNewUserThunk, FetchingTeamsThunk, UpdatingUserThunk } from "@/store/slices/userTeams/userTeamsSlice";
import { useAppDispatch } from "@/store/storeSetup";
import { theme } from "@/theme";
import { Ban, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddUpdateTeamMember from "./AddUpdateTeamMember";
import { FetchUserRolesThunk } from "@/store/slices/userRolesSlice";
import { FetchworkgroupListThunk } from "@/store/slices/workGroupSlice";
import { userRoles, userTeamGroups, userTeams } from "@/types/userTeams";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const TeamsView = () => {
    const dispatch = useAppDispatch();
    const [tableModalOpened,settableModalOpened]=useState<boolean[]>([])
    const [AddUserModalOpened,setAddUserModalOpened]=useState<boolean>()
    const { workTeams, loading, state, postError } = useSelector((state:RootState) => state.teams);
    const { roleList } = useSelector((state:RootState) => state.roles);
    const { workgroupList } = useSelector((state:RootState) => state.workgroups);
    const [errorMessage,seterrorMessage] = useState('')
    const [rowData,setrowData] = useState<userTeams>({
      name:'',
      email:'',
      password:'',
      team_groups:[],
      roles:[]
  })
    const [teamMember,setteamMember] = useState<userTeams>({
      name:'',
      email:'',
      password:'',
      team_groups:[],
      roles:[]
  });
  
    useEffect(() => {
      if (state === "idle" || state === "failed") {
        dispatch(FetchingTeamsThunk());
        dispatch(FetchUserRolesThunk());
        dispatch(FetchworkgroupListThunk());
      }
    }, [state, dispatch]);

    useEffect(()=>{
        if(workTeams.length){
            settableModalOpened(workTeams.map(()=>false))
        }
    },[workTeams])

  const handlesubmit = async ()=>{
    if(!teamMember.name){
      const space = document.getElementById('fullname') as HTMLInputElement;
      if(space) space.select();
      return seterrorMessage('Please enter a valid name. the provided space for the name cannot be empty')
    }
    if(!teamMember.email){
      const space = document.getElementById('emailInput') as HTMLInputElement;
      if(space) space.select();
      return seterrorMessage('Please enter a valid email. the provided space for the email cannot be empty')
    }
    if(!teamMember.password){
      const space = document.getElementById('passwordInput') as HTMLInputElement;
      if(space) space.select();
      return seterrorMessage('Please enter a valid password. the provided space for the password cannot be empty')
    }
    if(!teamMember.revalidatePass){
      const space = document.getElementById('revalpasswordInput') as HTMLInputElement;
      if(space) space.select();
      return seterrorMessage('Password validation cannot be empty. the provided space for the password validation cannot be empty')
    }
    if(teamMember.revalidatePass !== teamMember.password){
      return seterrorMessage('Password does not match')
    }
    if(!teamMember.roles.length){
      const space = document.getElementById('roleInput') as HTMLInputElement;
      if(space) space.select();
      return seterrorMessage('Please make sure to assign a team member to a specific role.')
    }
    seterrorMessage('')
    console.log(teamMember)
    await dispatch(CreatingNewUserThunk(teamMember))
    if(!postError){
      setAddUserModalOpened(false)
    }
  }

  const handleSetRow = (user:userTeams)=>{
    let remod = user;
    remod = {
      ...remod,
      roles:((user.roles as userRoles[]).map(item=>item.id) as number[]),
      team_groups:((user.team_groups as userTeamGroups[]).map(item=>item.id) as number[])
    }
    setrowData(remod);
  }

  const handleupdate = async()=>{
    if(!rowData.name){
      const space = document.getElementById('fullname') as HTMLInputElement;
      if(space) space.select();
      return seterrorMessage('Please enter a valid name. the provided space for the name cannot be empty')
    }
    if(!rowData.email){
      const space = document.getElementById('emailInput') as HTMLInputElement;
      if(space) space.select();
      return seterrorMessage('Please enter a valid email. the provided space for the email cannot be empty')
    }
    // if(!rowData.password){
    //   const space = document.getElementById('passwordInput') as HTMLInputElement;
    //   if(space) space.select();
    //   return seterrorMessage('Please enter a valid password. the provided space for the password cannot be empty')
    // }
    // if(!rowData.revalidatePass){
    //   const space = document.getElementById('revalpasswordInput') as HTMLInputElement;
    //   if(space) space.select();
    //   return seterrorMessage('Password validation cannot be empty. the provided space for the password validation cannot be empty')
    // }
    // if(rowData.revalidatePass !== rowData.password){
    //   return seterrorMessage('Password does not match')
    // }
    if(!rowData.roles.length){
      const space = document.getElementById('roleInput') as HTMLInputElement;
      if(space) space.select();
      return seterrorMessage('Please make sure to assign a team member to a specific role.')
    }
    seterrorMessage('')
    console.log(rowData)
    await dispatch(UpdatingUserThunk(rowData))
    if(!postError){
      setAddUserModalOpened(false)
    }
  }
  return (
    <div>
        <div className="w-fit my-4 ml-auto">
        <Dialog modal={true} key={"createmodal"} open={AddUserModalOpened} onOpenChange={setAddUserModalOpened}>
        <DialogTrigger asChild key={"createmodalTrigger"}>
            <Button className="w-[150px]" style={{background:theme.colors.primary[8]}} onClick={()=>setAddUserModalOpened(true)}>Add User <UserPlus /></Button>
        </DialogTrigger>
        <DialogContent key={"createmodalContent"} className="sm:min-w-[425px] md:max-w-[55vw]">
            <DialogHeader>
            <DialogTitle>Create New Team Member</DialogTitle>
            <DialogDescription>
                Follow the procedures below to create a new Team member.
            </DialogDescription>
            </DialogHeader>
            {
              errorMessage?
              (<Alert>
                <Ban className="h-4 w-4" stroke={theme.colors.danger[7]} />
                <AlertTitle className="text-red-500">Validation Error</AlertTitle>
                <AlertDescription>
                 {errorMessage}
                </AlertDescription>
              </Alert>):''
            }
                <AddUpdateTeamMember roleList={roleList} workgroupList={workgroupList} setdata={setteamMember} teamMember={teamMember}/>
            <DialogFooter>
            <Button onClick={handlesubmit}>Save changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
            
        </div>

      {loading ? (
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
            {workTeams.map((user,index) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {(user.roles as userRoles[]).map((role) => (
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
                  (user.team_groups as userTeamGroups[]).map((team) => (
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
                    <div className="flex">
                        <Dialog key={user.id+'updateDialog'} open={tableModalOpened[index]} onOpenChange={(value)=>{
                            settableModalOpened(prev => {
                                const newState = [...prev];
                                newState[index] = value;
                                return newState;
                            });
                        }}>
                            <DialogTrigger asChild>
                                <Button variant={'outline'} onClick={()=>handleSetRow(user)}>Edit</Button>
                            </DialogTrigger>
                            <DialogContent  key={user.id+'updateDialogContent'} className="sm:min-w-[425px] md:max-w-[55vw]">
                                <DialogHeader>
                                <DialogTitle>Update New Team Member</DialogTitle>
                                <DialogDescription>
                                    Follow the procedures below to update an existing Team member.
                                </DialogDescription>
                                </DialogHeader>
                                    <AddUpdateTeamMember roleList={roleList} workgroupList={workgroupList} setdata={setrowData} teamMember={rowData}/>
                                <DialogFooter>
                                <Button onClick={handleupdate}>Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
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
