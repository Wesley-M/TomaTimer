import {Box, Button, Center, Flex, Icon, Image, Text, VStack} from "@chakra-ui/react";
import React, {useContext} from "react";
import TimeContext from "../contexts/TimeContext";
import {MdPlayArrow, MdPause} from "react-icons/md";

const PomodoroTimer: React.FC = () => {
    const timeContext = useContext(TimeContext);

    const toMMSS = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        const pad = (n: number) => n.toString().padStart(2, "0");
        return `${pad(minutes)}:${pad(seconds)}`;
    };

    const toggleTimer = () => {
        timeContext?.timer.status === "STOPPED"
            ? timeContext?.userStart()
            : timeContext?.userReset()
    }

    const isPaused = () => {
        return timeContext?.timer.status === "STOPPED";
    }

    return (
        <Box
            mt="3em"
            ml="2em"
            mr={["10vw", "10vw", "5vw"]}
            w={["85vw", "85vw", "85vw", "25em", "30em"]}
            h={["15em", "20em", "20em", "20em", "20em"]}
            borderRadius="0.8em"
            transition="all 500ms ease"
            bg="secondary.light"
        >
            <VStack h="100%" alignItems="center" justifyContent="center">
                <Flex>
                    <Center>
                        <Text
                            fontFamily="Anton, sans-serif"
                            fontSize={["4em", "5em", "5.5em", "6em"]}
                        >
                            {toMMSS(timeContext?.timer.time ?? 0)}
                        </Text>
                    </Center>
                </Flex>
                <Button
                    bg="secondary.light"
                    color="text.main"
                    fontWeight="500"
                    fontSize="1em"
                    width="6em"
                    borderRadius="0.25em"
                    _hover={{
                        bg: "secondary.main"
                    }}
                    onClick={toggleTimer}
                    leftIcon={isPaused() ? <Icon as={MdPlayArrow}/> : <Icon as={MdPause}/>}
                >
                    {isPaused() ? "Start" : "Pause"}
                </Button>
            </VStack>
        </Box>
    );
};

export default PomodoroTimer;
