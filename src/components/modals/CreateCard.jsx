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
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const CreateCardModal = ({ isOpen, onClose, stage }) => {
  if (!stage) {
    return null;
  }
  const initialRef = React.useRef(null);
  const onSubmid = (e) => {
    console.log(e.target);
  };

  return (
    <Box>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue("bg.100", "dark.200")}>
          <ModalHeader>Create Card</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={onSubmid}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Workspace</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Board title"
                  name="title"
                  maxLength={50}
                  required
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Title</FormLabel>
                <Input
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
              <Button colorScheme="blue" mr={3} type="submit">
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
export default CreateCardModal;
