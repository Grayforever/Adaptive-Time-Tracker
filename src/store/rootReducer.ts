import auth, { AuthState } from "./slices/auth";
import { combineReducers } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import taskReducer from './slices/taskEntrySlice'

export type RootState = {
  auth: AuthState;
};

export const allStaticReducers = {
  auth,
  projects: projectReducer,
  tasks: taskReducer
};

export const rootReducer = combineReducers(allStaticReducers)

// const rootReducer = (state: RootState, action: AnyAction) => {
//   const combineReducer = combineReducers({ ...allStaticReducers });
//   return combineReducer(state, action);
// };