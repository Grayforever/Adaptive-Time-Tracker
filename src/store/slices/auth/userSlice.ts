import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";
import { loadUserDetails,savedUserState } from "@/store/localStorage";

export interface UserState {
  userName: string;
  email:string;
  id: "";

}

const initialState:  UserState = loadUserDetails()||  {
  id:0,
  userName: "",
  email:"",

};


// user slice
const userSlice = createSlice({
  name: `${SLICE_BASE_NAME}/user`,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.userName = action.payload.userName;
      state.email = action.payload.email
      state.id = action.payload.id
      savedUserState(state)
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
