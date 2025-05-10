import auth, { AuthState } from "./slices/auth";
import { combineReducers } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import taskReducer from './slices/taskEntrySlice'
import TeamsSlice from './slices/userTeams/userTeamsSlice'
import RolesSlice from './slices/userRolesSlice'
import workgroupSlice from './slices/workGroupSlice'
import { teamState } from "@/types/userTeams";
import { userRoleState } from "@/types/UserRoles";
import { workgroupState } from "@/types/workgroup.types";

export type RootState = {
  auth: AuthState;
  teams:teamState;
  roles:userRoleState;
  workgroups:workgroupState;
};

export const allStaticReducers = {
  auth,
  projects: projectReducer,
  tasks: taskReducer,
  teams: TeamsSlice,
  roles: RolesSlice,
  workgroups: workgroupSlice,
};

export const rootReducer = combineReducers(allStaticReducers)