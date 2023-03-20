import {extendTheme} from "@chakra-ui/react";

export const pomodoroTheme = extendTheme({
  colors: {
    primary: {
      main: "#EB3F3F"
    },
    secondary: {
      light: "#00000033",
      main: "#00000066",
    },
    text: {
      light: "#FFFFFF99",
      main: "#FFF"
    }
  },
  fonts: {
    heading: "Nunito, sans-serif",
    body: "Nunito, sans-serif",
  },
})