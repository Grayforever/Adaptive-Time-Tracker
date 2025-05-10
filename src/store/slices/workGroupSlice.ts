import { FetchWorkgroups } from "@/API/workgroups/workgroups_api";
import { workgroups, workgroupState } from "@/types/workgroup.types";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const FetchworkgroupListThunk =createAsyncThunk<workgroups[]>('users/fetchWorkgroups',async ()=>{
    return await FetchWorkgroups()
})

const initialState:workgroupState = {
    workgroupList: [],
    loading: false,
    state: "idle",
    error: ""
}

const workgroupSlice = createSlice({
    name:'user/workgroups',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
        .addCase(FetchworkgroupListThunk.pending, (state)=>{
            state.loading=true
            state.state = "Loading"
        })
        .addCase(FetchworkgroupListThunk.fulfilled,(state,action)=>{
            state.loading = false
            state.state = "succeed"
            state.workgroupList = action.payload
        })
        .addCase(FetchworkgroupListThunk.rejected, (state)=>{
            state.loading=false
            state.state="failed"
        })
    },
})

export default workgroupSlice.reducer