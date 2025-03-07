// app/api/fetchers.ts

import base from "../BaseApi"
import { API_ENDPOINTS } from "../EndPoints"

interface User{
    email:string,
    password:string
}

export async function LoginUser(body:User) {

    return await base.post(API_ENDPOINTS.LOGIN_API, { ...body }, { 
      headers: { "Accept": "application/json", "Content-Type": "application/json" }, 
    });
}
