import { DeleteIcon, DragHandleIcon } from "@chakra-ui/icons";
import { Box, IconButton, Stack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskT } from "../@types/tasks";
import TasksContext from "../contexts/TasksContext";

interface TasksProps {
  data: TaskT;
  index: number;
  progress?: number;
  color: string;
  hideTomatoes: boolean;
}

export const Task = ({
  data,
  index,
  progress,
  color,
  hideTomatoes,
}: TasksProps) => {
  const taskContext = useContext(TasksContext);

  return (
    <Draggable draggableId={`id-${data.id}`} index={index}>
      {(provided) => (
        <Stack
          color="#282828AA"
          bg={`linear-gradient(to right, ${color} ${progress ?? 0}%, #EDEDED ${
            progress ?? 0
          }%)`}
          p="0.5em"
          w="100%"
          mt="0.5em"
          mb="0.5em"
          borderRadius="0.5em"
          fontFamily="Nunito, sans-serif"
          fontWeight="medium"
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box sx={{ opacity: 0.6 }}>
            <DragHandleIcon />
          </Box>
          <Box
            px="1em"
            width="80%"
            textShadow={
              " \
                            0.02em 0 #28282822, \
                            0 0.02em #28282822, \
                            -0.02em 0 #28282822, \
                            0 -0.02em #28282822; \
                        "
            }
          >
            {data.content}
          </Box>

          <Box
            borderRadius="0.2em"
            pl="5px"
            pr="5px"
            fontSize="0.9em"
            fontWeight="bold"
            bg="#FD5E5E99"
            color="#EDEDED"
            minWidth="60px"
            textAlign="center"
            lineHeight="1.5em"
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
              color="#FD5E5E"
              aria-label="Remove task"
              icon={<DeleteIcon />}
              onClick={() => taskContext?.removeTask(data.id)}
              width="30px"
            />
          </Box>
        </Stack>
      )}
    </Draggable>
  );
};
