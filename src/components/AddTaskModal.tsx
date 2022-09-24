import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import TasksContext from "../contexts/TasksContext";

type TaskModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const AddTaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  const [description, setDescription] = useState("");
  const [pomodoros, setPomodoros] = useState(1);

  const tasksContext = useContext(TasksContext);
  const toast = useToast();

  const handleDescriptionChange = (e: any) => {
    let v = e.target.value;
    setDescription(v);
  };

  const handlePomodoroChange = (e: any) => {
    let v = parseInt(e.target.value);
    setPomodoros(v);
  };

  const resetTask = () => {
    setDescription("");
    setPomodoros(1);
  };

  const saveTask = () => {
    if (description && pomodoros >= 1) {
      tasksContext?.addTask({
        content: description,
        tomatoes: pomodoros,
      });
      resetTask();
      onClose();
    } else {
      onClose();
      toast({
        title: "The task data is invalid.",
        description:
          "Please, provide a valid number of pomodoros and task description.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
        variant: "subtle",
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#EB3F3F">Create a new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color="#282828CC">Description</FormLabel>
              <Input
                onChange={handleDescriptionChange}
                value={description}
                placeholder="What are you going to do ?"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="#282828CC">Pomodoros</FormLabel>
              <Input
                onChange={handlePomodoroChange}
                value={pomodoros}
                type="number"
                placeholder="How many pomodoros this task is worth ?"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={saveTask} mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
