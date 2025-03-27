import { roles } from "@/types/UserRoles";
import base from "../BaseApi";
import { API_ENDPOINTS } from "../EndPoints";

export async function fetchallRoles() {
    const response = await base.get(API_ENDPOINTS.ALL_ROLES, { 
      headers: { "Accept": "application/json", "Content-Type": "application/json" }, 
    });
    if(response.status==200){
        return response.data as roles[]
    }else{
        return []
    }
}