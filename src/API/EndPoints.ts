export const API_ENDPOINTS = {
    LOGIN_API:"/token",
    LOGOUT:"/logout",
    TOKEN_REFRESH:"/refresh-token",
    REGISTER:"/register",
    ALL_PROJECTS:"/user-projects",
    SINGLE_PROJECT:(id: string) => `/user-projects/${id}`,
    CREATE_TASK: "/create-task" 
}