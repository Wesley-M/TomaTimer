import {extendTheme} from "@chakra-ui/react";

export const breakTheme = extendTheme({
  colors: {
    primary: {
      main: "#62BFED"
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