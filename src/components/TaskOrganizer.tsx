import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Divider,
    Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { TasksContextType } from "../@types/tasks";
import TasksContext from "../contexts/TasksContext";
import TimeContext from "../contexts/TimeContext";
import { AddTaskModal } from "./AddTaskModal";
import { Task } from "./Task";

const TaskOrganizer: React.FC = () => {
  const tasksContext = useContext<TasksContextType | null>(TasksContext);
  const addTaskModal = useDisclosure();

  const timeContext = useContext(TimeContext);

  return (
    <Box
      textAlign="left"
      mt="3em"
      ml="2em"
      mr={["10vw", "10vw", "15vw", "20vw"]}
      borderRadius="0.8em"
    >
      <Text fontSize="1.3em" fontFamily="Anton, sans-serif" color="#EB3F3FBB">
        Tasks
      </Text>

      <Divider
        orientation="horizontal"
        borderWidth="2px"
        borderColor="#EB3F3F55"
        mb="1em"
      />

      <Box
        overflowY={["hidden", "hidden", "auto"]}
        maxHeight={["auto", "auto", "60vh"]}
      >
        <DragDropContext
          onDragEnd={
            tasksContext?.reorderOnDrag as unknown as (
              result: DropResult
            ) => void
          }
        >
          <Droppable droppableId="tasks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {tasksContext?.tasks.map((task, index) => (
                  <Task
                    data={task}
                    index={index}
                    key={task.id}
                    hideTomatoes={task.type === "BREAK"}
                    color={
                      timeContext?.timerId === "NORMAL"
                        ? "#EB3F3F55"
                        : "#3F7FDF55"
                    }
                    progress={index == 0 ? timeContext?.progress : 0}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Box>

      <VStack spacing={2}>
        <Button
          height="48px"
          width="100%"
          border="2px dashed"
          color="#FD5E5E"
          bg="#FD5E5E22"
          _hover={{
            bg: "#FD5E5E33",
          }}
          fontFamily="Nunito, sans-serif"
          fontWeight="bold"
          borderColor="#FD5E5E33"
          leftIcon={<AddIcon />}
          onClick={addTaskModal.onOpen}
        >
          Add task
        </Button>

        <Button
          height="48px"
          width="100%"
          border="2px dashed"
          color="#3F7FDF"
          bg="#3F7FDF22"
          _hover={{
            bg: "#3F7FDF33",
          }}
          fontFamily="Nunito, sans-serif"
          fontWeight="bold"
          borderColor="#3F7FDF33"
          leftIcon={<AddIcon />}
          onClick={() => {
            tasksContext?.addTask({
              content: "Break time! Go have a coffee :)",
              type: "BREAK",
            });
          }}
        >
          Add break
        </Button>
      </VStack>

      <AddTaskModal
        isOpen={addTaskModal.isOpen}
        onOpen={addTaskModal.onOpen}
        onClose={addTaskModal.onClose}
      />
    </Box>
  );
};

export default TaskOrganizer;
