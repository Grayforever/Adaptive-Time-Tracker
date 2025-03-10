import { combineReducers } from "@reduxjs/toolkit";

import user, { UserState } from "./userSlice";
import token, { TokenState } from "./tokenSlice";

// will add other auth reducers later
const reducer = combineReducers({
  user,
  token,
});

export type AuthState = {
  user: UserState;
  Token: TokenState;
};

export * from "./userSlice";

export default reducer;
