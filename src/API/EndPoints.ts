export const API_ENDPOINTS = {
    LOGIN_API:"/token",
    ALL_PROJECTS:"/user-projects",
    REGISTER:"/register",
    ALL_PROJECTS:"/user-projects",
    SINGLE_PROJECT:(id: string) => `/user-projects/${id}`,
    CREATE_TASK: "/create-task" 
}