import {DropResult} from "react-beautiful-dnd";
import {Config} from "use-timer/lib/types";

export type TaskT = {
    id: number;
    content: string;
    completeTomatoes: number;
    tomatoes: number;
    type: 'NORMAL' | 'BREAK';
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
    timerId: 'NORMAL' | 'BREAK';
    userStart: () => void;
    userReset: () => void;
};

export type TimerConfig = Config;