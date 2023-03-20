import {AddIcon} from "@chakra-ui/icons";
import {
    Box,
    Button, chakra, css,
    Divider,
    HStack, Icon,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React, {useContext} from "react";
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import {TasksContextType} from "../@types/tasks";
import TasksContext from "../contexts/TasksContext";
import TimeContext from "../contexts/TimeContext";
import {AddTaskModal} from "./AddTaskModal";
import {Task} from "./Task";
import {MdAddCircle} from 'react-icons/md';

const BaseButton = chakra(Button, {
    baseStyle: {
        height: "48px",
        width: "50%",
        border: "2px dashed",
        color: "primary.main",
        bg: "#FFFFFFF5",
        fontFamily: "Nunito, sans-serif",
        borderColor: "primary.main",
        fontWeight: 500,
        _hover: {
            bg: "#FFF"
        },
    },
})

const TaskOrganizer: React.FC = () => {
    const tasksContext = useContext<TasksContextType | null>(TasksContext);
    const addTaskModal = useDisclosure();

    const timeContext = useContext(TimeContext);

    const addTask = () => {
        tasksContext?.addTask({
            content: "Break time! Go have a coffee :)",
            type: "BREAK",
        });
    }

    return (
        <Box
            textAlign="left"
            mt="3em"
            ml="2em"
            mr={["10vw", "10vw", "15vw", "20vw"]}
            w={["85vw", "85vw", "35vw", "25em", "30em"]}
        >
            <Text fontSize="1.3em" fontFamily="Anton, sans-serif" color="text.main">
                Tasks
            </Text>

            <Divider
                orientation="horizontal"
                borderWidth="2px"
                borderColor="text.light"
                mb="1em"
            />

            <Box
                overflowY={["hidden", "hidden", "auto"]}
                maxHeight={["auto", "auto", "40vh"]}
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
                                        progress={index == 0 ? timeContext?.progress : 0}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>

            <HStack spacing={2}>
                <BaseButton
                    leftIcon={<Icon as={MdAddCircle}/>}
                    onClick={addTaskModal.onOpen}
                >
                    Add task
                </BaseButton>

                <BaseButton
                    bg="secondary.light"
                    color="text.light"
                    _hover={{
                        bg: "secondary.main",
                        color: "text.main"
                    }}
                    leftIcon={<Icon as={MdAddCircle}/>}
                    onClick={addTask}
                >
                    Add break
                </BaseButton>
            </HStack>

            <AddTaskModal
                isOpen={addTaskModal.isOpen}
                onOpen={addTaskModal.onOpen}
                onClose={addTaskModal.onClose}
            />
        </Box>
    );
};

export default TaskOrganizer;
