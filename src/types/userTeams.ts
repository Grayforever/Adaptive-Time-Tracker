export interface userTeams{
        "id"?: number,
        "name": string,
        "email": string,
        "password"?: string,
        "revalidatePass"?: string,
        "created_at"?: Date,
        "updated_at"?: Date,
        "roles": number[] | Array<userRoles>,
        "team_groups": number[] |  Array<userTeamGroups>
}

export interface teamMemberInterface{
        "name": string,
        "email": string,
        "password": string,
        "revalidatePass"?: string,
        "roles": number[],
        "team_groups": number[],
}

export interface userRoles{
        "id"?: number,
        "role_name": string,
        "status": string,
        "created_at"?: Date,
        "updated_at"?: Date
}

export interface userTeamGroups{
        "id"?: number,
        "name": string,
        "description": string,
        "status": string,
        "created_at"?: Date,
        "updated_at"?: Date,
}

export interface teamState {
    workTeams: userTeams[];
    loading: boolean;
    state:'idle' | 'Loading' | 'succeed' | 'failed'
    error: string
    postError:string
  }