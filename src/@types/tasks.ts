import {DropResult} from "react-beautiful-dnd";
import {Config} from "use-timer/lib/types";
import {Dispatch, SetStateAction} from "react";

export type TaskCategory = 'NORMAL' | 'BREAK';

export type TaskT = {
    id: number;
    content: string;
    completeTomatoes: number;
    tomatoes: number;
    type: TaskCategory;
}

export type TasksContextType = {
    tasks: TaskT[];
    addTask: (task: Partial<TaskT>) => void;
    removeTask: (order: number) => void;
    reorderOnDrag: (result: DropResult) => void;
    updateActiveTask: () => TaskT[];
    swapHistory: () => void;
};

export type Status = 'RUNNING' | 'PAUSED' | 'STOPPED';

export type Timer = {
    advanceTime: (timeToAdd: number) => void;
    pause: () => void;
    reset: () => void;
    start: () => void;
    status: Status;
    time: number;
};

export type TimeContextType = {
    timer: Timer;
    progress: number;
    timerId: TaskCategory;
    userStart: () => void;
    userReset: () => void;
};

export type ThemeContextType = {
    theme: TaskCategory;
    setTheme:  Dispatch<SetStateAction<TaskCategory>>
};

export type TimerConfig = Config;