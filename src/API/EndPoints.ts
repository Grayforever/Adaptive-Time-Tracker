export const API_ENDPOINTS = {
    LOGIN_API:"/token",
    REGISTER:"/register",
    ALL_PROJECTS:"/user-projects",
    FETCH_USER_TASKS:(id: string) => `/user-projects/${id}`,
    CREATE_TASK: "/create-task"
}