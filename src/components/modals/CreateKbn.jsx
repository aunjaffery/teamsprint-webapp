import {
  Box,
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
  Select,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-toastify";
import { createBoard, findWorkspace } from "../../services/Queries";

const CreateKbnModal = ({ isOpen, onClose }) => {
  const { isLoading, isError, data } = findWorkspace();
  const queryClient = useQueryClient();
  const createBoardMutation = useMutation({
    mutationFn: createBoard,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["workspacekbns"] });
      onClose();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error! Cannot create board");
    },
  });
  const initialRef = React.useRef(null);
  if (isError) {
    toast.error("Error! Cannot fetch workspace");
  }

  return (
    <Box>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Board</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={createBoardMutation.mutate}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Workspace</FormLabel>
                <Select name="workspace" required>
                  {data?.ws &&
                    data.ws.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name}
                      </option>
                    ))}
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Title</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Board title"
                  name="title"
                  maxLength={50}
                  required
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Visibility</FormLabel>
                <Select name="visibility" required>
                  <option value="workspace">Workspace</option>
                  <option value="board">Board</option>
                  <option value="public">Public</option>
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={createBoardMutation.isPending || isLoading}
              >
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default CreateKbnModal;
