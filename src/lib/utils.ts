import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TimerState {
  startTime: number | null;
  accumulatedTime: number;
  isRunning: boolean;
}

export const getInitialTimerState = (): TimerState => {
  const saved = localStorage.getItem("timerState");
  if (!saved) {
    return { startTime: null, accumulatedTime: 0, isRunning: false };
  }

  const state: TimerState = JSON.parse(saved);
  if (state.isRunning && state.startTime) {
    const now = Date.now();
    const newTime =
      state.accumulatedTime + Math.floor((now - state.startTime) / 1000);
    return {
      startTime: now,
      accumulatedTime: newTime,
      isRunning: true,
    };
  }

  return state;
};

export const saveTimerState = (state: TimerState) => {
  localStorage.setItem("timerState", JSON.stringify(state));
};
