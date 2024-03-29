import { DeleteIcon, DragHandleIcon } from "@chakra-ui/icons";
import { Box, CircularProgress, CircularProgressLabel, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskT } from "../@types/tasks";
import TasksContext from "../contexts/TasksContext";

interface TasksProps {
    data: TaskT;
    index: number;
    progress?: number;
    hideTomatoes: boolean;
}

export const Task = ({
    data,
    index,
    progress,
    hideTomatoes,
}: TasksProps) => {
    const taskContext = useContext(TasksContext);

    return (
        <Draggable draggableId={`id-${data.id}`} index={index}>
            {(provided) => (
                <Stack
                    color="secondary.dark"
                    bg="text.main"
                    p="0.5em"
                    w="100%"
                    mt="0.5em"
                    mb="0.5em"
                    borderRadius="0.5em"
                    fontWeight="medium"
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <DragHandleIcon />

                    <CircularProgress
                        color="primary.main"
                        size="1.25em"
                        pl="0.5em"
                        pr="0.5em"
                        value={progress}
                    />

                    <Box px="1em" width={["50%", "60%", "60%", "70%", "80%"]}>
                        {data.content}
                    </Box>

                    <Flex width="20%" alignItems="center" justifyContent="flex-end">
                        <Box
                            borderRadius="0.2em"
                            pl="5px"
                            pr="5px"
                            fontSize="0.9em"
                            fontWeight="bold"
                            bg="primary.main"
                            color="text.main"
                            textAlign="center"
                            lineHeight="1.5em"
                            height="1.5em"
                            overflowY="hidden"
                            minWidth="fit-content"
                            visibility={hideTomatoes ? "hidden" : "visible"}
                        >
                            <Text display="inline" whiteSpace="nowrap">
                                {data.completeTomatoes}
                            </Text>
                            /
                            <Text display="inline" whiteSpace="nowrap">
                                {data.tomatoes}
                            </Text>
                        </Box>

                        <Box>
                            <IconButton
                                bg="transparent"
                                color="primary.main"
                                aria-label="Remove task"
                                icon={<DeleteIcon />}
                                onClick={() => taskContext?.removeTask(data.id)}
                                width="30px"
                            />
                        </Box>
                    </Flex>
                </Stack>
            )}
        </Draggable>
    );
};
