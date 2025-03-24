import base from "../BaseApi";
import { API_ENDPOINTS } from "../EndPoints";

export async function FetchAllUserTeams() {

    return await base.get(API_ENDPOINTS.ALL_USER_TEAMS, { 
      headers: { "Accept": "application/json", "Content-Type": "application/json" }, 
    });
}