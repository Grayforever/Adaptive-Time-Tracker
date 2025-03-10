import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";

export interface UserState {
  firstName: string;
  lastName: string;
}

const initialState: UserState = {
  firstName: "",
  lastName: "",
};

// user slice
const userSlice = createSlice({
  name: `${SLICE_BASE_NAME}/user`,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
