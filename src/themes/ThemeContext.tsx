import React, { createContext, useContext, useState } from "react";
import { pomodoroTheme, breakTheme } from './schemes';
import {ChakraProvider} from "@chakra-ui/react";
import {TaskCategory, TaskT, ThemeContextType} from "../@types/tasks";

interface Props {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeContextProvider: React.FC<Props> = ({ children }) => {

  const [theme, setTheme] = useState<TaskCategory>("NORMAL");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ChakraProvider theme={theme === 'NORMAL' ? pomodoroTheme : breakTheme}>
        {children}
      </ChakraProvider>
    </ThemeContext.Provider>
  )
}

/**
 * Simplifying the use of the context with a hook
 * */
export const useThemeContext = () => {

  const themeContext = useContext(ThemeContext);

  function changeTheme(type: TaskCategory) {
    themeContext?.setTheme(type);
  }

  return {
    changeTheme,
    isPomodoroTheme: themeContext?.theme === 'NORMAL'
  }
}