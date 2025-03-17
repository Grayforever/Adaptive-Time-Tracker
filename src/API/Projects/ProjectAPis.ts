import base from "../BaseApi";
import { API_ENDPOINTS } from "../EndPoints";

export async function getAllProjects() {

    return await base.get(API_ENDPOINTS.ALL_PROJECTS, { 
      headers: { "Accept": "application/json", "Content-Type": "application/json","Ngrok-Skip-Browser-Warning":true }, 
    });
}