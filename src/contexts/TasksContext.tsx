import React, { createContext, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { TasksContextType, TaskT } from "../@types/tasks";

interface Props {
  children: React.ReactNode;
}

const TasksContext = createContext<TasksContextType | null>(null);

export const TasksProvider: React.FC<Props> = ({ children }) => {
  /**
   * ALl the tasks that weren't completed yet
   */
  const [tasks, setTasks] = useState<TaskT[]>([]);

  /**
   * History of tasks
   */
  const [history, setHistory] = useState<TaskT[]>([]);

  /**
   * If the user should see the history or current tasks
   * */
  const [historySwitch, setHistorySwitch] = useState(false);

  const addTask = (task: Partial<TaskT>) => {
    const newTask: TaskT = {
      id: tasks.length + 1,
      content: task?.content ?? "",
      tomatoes: task?.tomatoes ?? 1,
      completeTomatoes: 0,
      type: task?.type ?? "NORMAL",
    };
    setTasks([...tasks, newTask]);
  };

  /**
   * Removes a task by id
   * */
  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id != id));
  };

  /**
   * Returns the active task at the moment
   * */
  const getActiveTask = () => {
    return tasks[0];
  };

  /**
   * Completes a task by removing the head (active task)
   * */
  const completeTask = () => {
    setHistory((old) => {
      return [getActiveTask(), ...old];
    });
    return tasks.slice(1);
  };

  /**
   * The active task still has tomatoes to go
   * */
  const taskHasIncompleteTomatoes = () => {
    const activeTask = tasks[0];
    return activeTask.tomatoes - (activeTask.completeTomatoes + 1) == 0;
  };

  /**
   * Adding a new tomato to the active task
   * */
  const addTomato = () => {
    const activeTask = tasks[0];
    return [
      {
        ...tasks[0],
        completeTomatoes: activeTask.completeTomatoes + 1,
      },
      ...tasks.slice(1),
    ];
  };

  /**
   * Updates the active task and returns the new tasks
   * */
  const updateActiveTask = () => {
    let newTasks: TaskT[] = [];

    if (getActiveTask()) {
      if (taskHasIncompleteTomatoes()) {
        newTasks = completeTask();
      } else {
        newTasks = addTomato();
      }
    }

    setTasks(newTasks);

    return newTasks;
  };

  /**
   * Reorders tasks with drag and drop
   * */
  const reorderTasks = (
    tasks: TaskT[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  /**
   * Reorders on drag end event
   * */
  const reorderOnDrag = (result: DropResult) => {
    if (!result.destination) return;

    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedTasks = reorderTasks(
      tasks,
      result.source.index,
      result.destination.index
    );

    setTasks(reorderedTasks);
  };

  /**
   * Swapping tasks with history
   * */
  const swapHistory = () => {
    setHistorySwitch((old) => !old);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks: historySwitch ? history : tasks,
        swapHistory,
        addTask,
        removeTask,
        reorderOnDrag,
        updateActiveTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContext;
