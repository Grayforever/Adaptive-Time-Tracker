import { AddNewUserTeam, FetchAllUserTeams, UpdateTeamMember } from "@/API/Users/Users";
import { teamState, userTeams } from "@/types/userTeams";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const FetchingTeamsThunk = createAsyncThunk<userTeams[]>('users/teams', async ()=>{
    return await FetchAllUserTeams()
})

export const CreatingNewUserThunk = createAsyncThunk<void,userTeams>('users/Addteam',async (addTeamMember,{dispatch})=>{
    await AddNewUserTeam(addTeamMember)
    dispatch(FetchingTeamsThunk())
})

export const UpdatingUserThunk = createAsyncThunk<void,userTeams>('users/Updateteam',async (updatTeamMember,{dispatch})=>{
    await UpdateTeamMember(updatTeamMember)
    dispatch(FetchingTeamsThunk())
})

const initialState:teamState = {
    workTeams: [],
    loading: false,
    state: "idle",
    error: "",
    postError: ""

}

const TeamsSlice = createSlice({
    name:'userTeams',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(FetchingTeamsThunk.pending, (state)=>{
            state.loading = true
            state.state =  "Loading"
        })
        .addCase(FetchingTeamsThunk.fulfilled, (state,action)=>{
            state.loading=false
            state.state = "succeed"
            state.workTeams = action.payload
        })
        .addCase(FetchingTeamsThunk.rejected, (state)=>{
            state.loading=false
            state.state = "failed"
            state.error = "Error fetching data"
        })
        .addCase(CreatingNewUserThunk.rejected,(state,action)=>{
            state.postError = String(action.error.message)
        })
        .addCase(UpdatingUserThunk.rejected,(state,action)=>{
            state.postError = String(action.error.message)
        })
    },
});

export default TeamsSlice.reducer