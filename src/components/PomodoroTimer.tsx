import { Box, Button, Image, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import TimeContext from "../contexts/TimeContext";
import coffee from "../images/coffee.png";
import tomato from "../images/tomato.png";

const PomodoroTimer: React.FC = () => {
  const timeContext = useContext(TimeContext);

  const toMMSS = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <Box
      mt="3em"
      ml="2em"
      mr="2em"
      h="70vh"
      borderRadius="0.8em"
      transition="all 500ms ease"
      bg={timeContext?.timerId === "NORMAL" ? "#EB3F3F" : "#3F7FDF"}
    >
      <VStack h="100%" alignItems="center" justifyContent="center">
        <Box position="relative">
          <Image
            src={timeContext?.timerId === "NORMAL" ? tomato : coffee}
            w={["12em", "15em", "15em", "18em", "18em"]}
            h={["12em", "15em", "15em", "18em", "18em"]}
            style={{
              margin: "0 auto",
              opacity: 0.6,
            }}
          />

          <Text
            position="absolute"
            left="50%"
            top="60%"
            transform="translate(-50%, -50%)"
            width="100%"
            fontFamily="Anton, sans-serif"
            fontSize="3em"
            opacity="0.85"
          >
            {toMMSS(timeContext?.timer.time ?? 0)}
          </Text>
        </Box>
        <Button
          fontFamily="Anton, sans-serif"
          color={timeContext?.timerId === "NORMAL" ? "#EB3F3FBB" : "#3F7FDFBB"}
          fontSize="1.2em"
          w="10em"
          borderRadius="2em"
          onClick={() =>
            timeContext?.timer.status === "STOPPED"
              ? timeContext?.userStart()
              : timeContext?.userReset()
          }
        >
          {timeContext?.timer.status === "STOPPED" ? "START" : "CANCEL"}
        </Button>
      </VStack>
    </Box>
  );
};

export default PomodoroTimer;
