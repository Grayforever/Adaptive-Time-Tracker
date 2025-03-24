export interface userTeams{
        "id"?: number,
        "name": string,
        "email": string,
        "created_at"?: Date,
        "updated_at"?: Date,
        "roles": Array<userRoles>,
        "team_groups": Array<userTeamGroups>
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
        "created_at": Date,
        "updated_at": Date,
}