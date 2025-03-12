export const API_ENDPOINTS = {
    LOGIN_API:"/token",
    REGISTER:"/register",
    ALL_PROJECTS:"/user-projects/",
    SINGLE_PROJECT:(id: string) => `/user-projects/${id}/`
}