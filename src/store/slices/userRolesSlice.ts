import { fetchallRoles } from "@/API/Roles/roles_api";
import { roles, userRoleState } from "@/types/UserRoles";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const FetchUserRolesThunk =createAsyncThunk<roles[]>('users/fetchTeam',async ()=>{
    return await fetchallRoles()
})

const initialState:userRoleState = {
    roleList: [],
    loading: false,
    state: "idle",
    error: ""
}

const RolesSlice = createSlice({
    name:'user/roles',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(FetchUserRolesThunk.pending, (state)=>{
            state.loading=true
            state.state = "Loading"
        })
        .addCase(FetchUserRolesThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.state = "succeed"
            state.roleList = action.payload
        })
        .addCase(FetchUserRolesThunk.rejected, (state)=>{
            state.loading=false
            state.state="failed"
        })
    },
})

export default RolesSlice.reducer