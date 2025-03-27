import { userTeams } from "@/types/userTeams";
import base from "../BaseApi";
import { API_ENDPOINTS } from "../EndPoints";

export async function FetchAllUserTeams() {

    const response = await base.get(API_ENDPOINTS.ALL_USER_TEAMS, { 
      headers: { "Accept": "application/json", "Content-Type": "application/json" }, 
    });
    if(response.status==200){

      return response.data as userTeams[]
    }else{
      return []
    }
}


export async function AddNewUserTeam(body:userTeams) {

    const response = await base.post(API_ENDPOINTS.ADD_MEMBER, body,{ 
      headers: { "Accept": "application/json", "Content-Type": "application/json" }, 
    });

    return response.data
}

export async function UpdateTeamMember(body:userTeams) {

    const response = await base.put(API_ENDPOINTS.UPDATE_MEMBER(body.id as number), body,{ 
      headers: { "Accept": "application/json", "Content-Type": "application/json" }, 
    });

    return response.data
}