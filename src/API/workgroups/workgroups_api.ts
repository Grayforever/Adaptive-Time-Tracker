import base from "../BaseApi";
import { API_ENDPOINTS } from "../EndPoints";
import { workgroups } from "@/types/workgroup.types";

export async function FetchWorkgroups() {

    const response = await base.get(API_ENDPOINTS.ALL_WORKGROUPS, { 
      headers: { "Accept": "application/json", "Content-Type": "application/json" }, 
    });
    if(response.status==200){
      return response.data as workgroups[]
    }else{
      return []
    }
}