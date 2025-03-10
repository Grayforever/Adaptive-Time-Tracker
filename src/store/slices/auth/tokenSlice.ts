import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SLICE_BASE_NAME } from "./constants";
import { LocalState } from "../../localStorage";

export interface TokenState {
  access: string;
  refresh: string;
}

const initialState: TokenState = {
  ...LocalState(),
};

// user slice
const tokenSlice = createSlice({
  name: `${SLICE_BASE_NAME}/user`,
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<TokenState>) {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
