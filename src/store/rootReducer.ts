import auth, { AuthState } from "./slices/auth";

export type RootState = {
  auth: AuthState;
};

export const allStaticReducers = {
  auth,
};

// const rootReducer = (state: RootState, action: AnyAction) => {
//   const combineReducer = combineReducers({ ...allStaticReducers });
//   return combineReducer(state, action);
// };

// export default rootReducer;
