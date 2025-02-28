import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getInitialTimerState, saveTimerState, TimerState } from "@/lib/utils";

const Admin = () => {
  const [timerState, setTimerState] =
    useState<TimerState>(getInitialTimerState);
  const [displayTime, setDisplayTime] = useState(timerState.accumulatedTime);

  useEffect(() => {
    let interval: number;

    if (timerState.isRunning) {
      interval = window.setInterval(() => {
        const now = Date.now();
        const startTime = timerState.startTime || now;
        const currentTime =
          timerState.accumulatedTime + Math.floor((now - startTime) / 1000);

        setDisplayTime(currentTime);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerState]);

  // Save state changes to localStorage
  useEffect(() => {
    saveTimerState(timerState);
  }, [timerState]);

  const handleStartStop = () => {
    setTimerState((prev) => {
      if (!prev.isRunning) {
        // Starting timer
        return {
          startTime: Date.now(),
          accumulatedTime: prev.accumulatedTime,
          isRunning: true,
        };
      } else {
        // Stopping timer
        const now = Date.now();
        const newAccumulated =
          prev.accumulatedTime +
          Math.floor((now - (prev.startTime || now)) / 1000);
        return {
          startTime: null,
          accumulatedTime: newAccumulated,
          isRunning: false,
        };
      }
    });
  };

  const handleReset = () => {
    const newState = {
      startTime: null,
      accumulatedTime: 0,
      isRunning: false,
    };
    setTimerState(newState);
    setDisplayTime(0);
    saveTimerState(newState);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    document.title = `${formatTime(displayTime)} Adaptive Timer`;
  }, [displayTime]);

  return (
    <div className="flex justify-center items-center mt-3">
      <Card className="p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">{formatTime(displayTime)}</h2>
          <div className="space-x-2">
            <Button
              onClick={handleStartStop}
              variant={timerState.isRunning ? "destructive" : "default"}
            >
              {timerState.isRunning ? "Stop" : "Start"}
            </Button>
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Admin;
