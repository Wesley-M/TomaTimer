import React, { createContext, useContext, useEffect, useState } from "react";
import { useTimer } from "use-timer";
import { TimeContextType, Timer, TimerConfig } from "../@types/tasks";
import { BREAK, NORMAL } from "../config/config";
import TasksContext from "./TasksContext";

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
   * The tasks context
   * */
  const tasksContext = useContext(TasksContext);

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
   * Update the timer based on the current active task
   * */
  const updateTimer = () => {
    let activeTaskType = tasksContext?.updateActiveTask()[0]?.type;
    if (["NORMAL", "BREAK"].includes(activeTaskType ?? "")) {
      setCurrTimer(activeTaskType ?? "NORMAL");
    } else {
      userReset();
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
  const userStart = () => {
    getCurrentTimer().start();
    setGlobalStart(true);
  };

  /**
   * Cancel/resets the timer
   * */
  const userReset = () => {
    getCurrentTimer().reset();
    setGlobalStart(false);
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

  useEffect(() => {
    const activeTask = tasksContext?.tasks[0];
    if (activeTask) {
      if (["NORMAL", "BREAK"].includes(activeTask.type)) {
        setCurrTimer(activeTask.type);
        autoStart(activeTask.type === "NORMAL" ? pomodoroTimer : breakTimer);
      }
    } else {
      setCurrTimer("NORMAL");
      pomodoroTimer.reset();
    }
  }, [tasksContext?.tasks]);

  return (
    <TimeContext.Provider
      value={{
        timer: getCurrentTimer(),
        progress: getTimerProgress(),
        timerId: currTimer,
        userStart,
        userReset,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};

export default TimeContext;
