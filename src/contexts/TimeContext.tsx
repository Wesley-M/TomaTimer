import React, { createContext, useContext, useEffect, useState } from "react";
import { useTimer } from "use-timer";
import { TaskT, TimeContextType, Timer, TimerConfig } from "../@types/tasks";
import { BREAK, NORMAL } from "../config/config";
import TasksContext from "./TasksContext";
import { useThemeContext } from "../themes/ThemeContext";

interface Props {
  children: React.ReactNode;
}

const TimeContext = createContext<TimeContextType | null>(null);

export const TimeProvider: React.FC<Props> = ({ children }) => {
  /**
   * Signals the end of timer countdown
   * */
  const [timeOverSignal, setTimeOverSignal] = useState(false);

  /**
   * Indicates the start by the user
   * */
  const [globalStart, setGlobalStart] = useState(false);

  /**
   * Indicates the current timer being used
   * */
  const [currTimer, setCurrTimer] = useState<"NORMAL" | "BREAK">("NORMAL");

  /**
   * Indicates the last active task
   * */
  const [lastActiveTaskId, setLastActiveTaskId] = useState<number | null>(null);

  /**
   * The tasks context
   * */
  const tasksContext = useContext(TasksContext);

  /**
   * Theme utilities
   * */
  const theme = useThemeContext();

  /**
   * Base timer configurations
   * */
  const baseTimerConfig: Partial<TimerConfig> = {
    timerType: "DECREMENTAL",
    endTime: 0,
    onTimeOver: () => {
      updateTimer();
      setTimeOverSignal(true);
    },
  };

  /**
   * Timer for pomodoro rounds
   * */
  const pomodoroTimer = useTimer({
    initialTime: NORMAL,
    ...baseTimerConfig,
  });

  /**
   * Timer for break rounds
   * */
  const breakTimer = useTimer({
    initialTime: BREAK,
    ...baseTimerConfig,
  });

  /**
   * Returns the current timer
   * */
  const getCurrentTimer = () => {
    return currTimer === "NORMAL" ? pomodoroTimer : breakTimer;
  };

  /**
   * Update the timer typé based on the current active task
   * */
  const updateTimer = () => {
    let activeTaskType = tasksContext?.updateActiveTask()[0]?.type;
    if (["NORMAL", "BREAK"].includes(activeTaskType ?? "")) {
      setCurrTimer(activeTaskType ?? "NORMAL");
    } else {
      reset();
    }
  };

  /**
   * Get the progress in percentage of time completed
   * */
  const getTimerProgress = () => {
    if (currTimer === "NORMAL") {
      return ((NORMAL - getCurrentTimer().time) * 100) / NORMAL;
    }
    return ((BREAK - getCurrentTimer().time) * 100) / BREAK;
  };

  /**
   * Start the timer
   * */
  const start = () => {
    getCurrentTimer().start();
    setGlobalStart(true);
  };

  /**
   * Cancel/resets the timer
   * */
  const reset = (stopGlobalStart = true) => {
    getCurrentTimer().reset();
    if (stopGlobalStart) setGlobalStart(false);
  };

  /**
   * Cancel/resets the timer
   * */
  const pause = () => {
    getCurrentTimer().pause();
    setGlobalStart(false);
  };

  /**
   * Check if the timer is paused or stopped
  */
  const isPaused = () => {
    return ["PAUSED", "STOPPED"].includes(getCurrentTimer().status);
  };

  /**
   * Toggle the timer
   * */
  const toggle = () => {
    if (isPaused()) {
      start();
    } else {
      pause();
    }
  };

  /**
   * Auto-start timer if global start in on
   * */
  const autoStart = (timer: Timer) => {
    if (globalStart) {
      timer.reset();
      timer.start();
    }
  };

  /**
   * Restores the pomodoro timer
   * */
  const restorePomodoroTimer = () => {
    setCurrTimer("NORMAL");
    pomodoroTimer.reset();
    theme.changeTheme("NORMAL");
  }

  /**
   * Updates the timer and theme given a change in active task
   * */
  const updateActiveTask = (activeTask: TaskT) => {
    setCurrTimer(activeTask.type);
    setLastActiveTaskId(activeTask.id);

    autoStart(activeTask.type === "NORMAL" ? pomodoroTimer : breakTimer);
    theme.changeTheme(activeTask.type);
    
    reset(false);
  }

  /**
   * If we receive a timeover signal, it means that the timer ran out.
   * So reset the clock, and start again if there are still tasks.
   * */
  useEffect(() => {
    if (timeOverSignal) {
      getCurrentTimer().reset();
      if ((tasksContext?.tasks.length ?? 0) !== 0) {
        getCurrentTimer().start();
      }
      setTimeOverSignal(false);
    }
  }, [timeOverSignal]);

  /**
   * Monitors the active task type
   * */
  useEffect(() => {
    const activeTask = tasksContext?.tasks[0];
    const hasActiveTaskChanged = activeTask && activeTask?.id !== lastActiveTaskId;

    if (hasActiveTaskChanged) {
      updateActiveTask(activeTask);
    } else {
      if (!activeTask) { 
        restorePomodoroTimer();
      }
    }
  }, [tasksContext?.tasks]);

  return (
    <TimeContext.Provider
      value={{
        timer: getCurrentTimer(),
        progress: getTimerProgress(),
        timerId: currTimer,
        start,
        reset,
        pause,
        isPaused,
        toggle
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export default TimeContext;
