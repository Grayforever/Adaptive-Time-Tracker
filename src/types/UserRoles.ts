export interface roles{
    "id"?: number,
    "role_name"?: string,
    "status"?: string,
}
export interface userRoleState {
    roleList: roles[],
    loading: boolean,
    state: 'idle' | 'Loading' | 'succeed' | 'failed',
    error: string
}