export interface workgroupState{
        workgroupList: workgroups[],
        loading: boolean,
        state: 'idle' | 'Loading' | 'succeed' | 'failed',
        error: string
}

export interface workgroups{
    "id"?: number,
    "name": string,
    "description": string,
    "status": string,
}