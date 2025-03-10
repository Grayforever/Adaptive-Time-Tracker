import { AnyAction, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { allStaticReducers } from "./rootReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: { ...allStaticReducers },
});

/* eslint-disable @typescript-eslint/no-explicit-any */
export type RootState = ReturnType<typeof store.getState>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
