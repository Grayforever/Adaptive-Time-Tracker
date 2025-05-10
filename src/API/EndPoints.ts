export const API_ENDPOINTS = {
    LOGIN_API:"/token",
    LOGOUT:"/logout",
    ALL_USER_TEAMS:"/user-teams",
    ALL_ROLES:"/user-roles",
    ADD_MEMBER:"/create-member",
    UPDATE_MEMBER:(id:number)=>`/update-member/${id}`,
    TOKEN_REFRESH:"/refresh-token",
    ALL_WORKGROUPS:"/workgroup-list",
    REGISTER:"/register",
    ALL_PROJECTS:"/user-projects",
    SINGLE_PROJECT:(id: string) => `/user-projects/${id}`,
    CREATE_TASK: "/create-task" 
}