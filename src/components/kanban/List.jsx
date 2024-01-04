import {
  Box,
  Button,
  Flex,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LuPlus, LuX } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createCard } from "../../services/Queries";

const List = ({ b, children }) => {
  const queryClient = useQueryClient();
  const createCardMutation = useMutation({
    mutationFn: createCard,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["fetchKbnCards"] });
      onClose();
    },
    onError: () => {
      toast.error("Error! Cannot create board");
    },
  });
  const { id: kbn_id } = useParams("id");
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { setNodeRef } = useDroppable({
    id: b.id,
    data: {
      type: "list",
    },
  });
  const onAddCardTitle = (e) => {
    e.preventDefault();
    let title = e.target?.title?.value;
    if (!title || !kbn_id) return;
    let data = {
      kanban: kbn_id,
      status: b.title,
      title,
    };
    createCardMutation.mutate(data);
  };
  return (
    <Box ref={setNodeRef}>
      <Flex
        w="full"
        bg={useColorModeValue("gray.200", "dark.200")}
        boxShadow="md"
        borderRadius="xl"
        direction="column"
        gridRowGap={4}
        p="4"
      >
        <Flex justifyContent="center" alignItems="center">
          <Text
            fontWeight="bold"
            fontSize="md"
            userSelect="none"
            textTransform="capitalize"
          >
            {b.title}
          </Text>
        </Flex>
        {children}
        {isOpen ? (
          <Box>
            <form onSubmit={onAddCardTitle}>
              <Textarea
                borderColor="gray.400"
                name="title"
                max={100}
                placeholder="Enter a title for this card"
                required
              />
              <Flex mt="4" alignItems="center" gridColumnGap={2}>
                <Button
                  size="sm"
                  colorScheme="teal"
                  type="submit"
                  isLoading={createCardMutation.isPending}
                >
                  Add card
                </Button>
                <Box
                  _hover={{
                    bg: useColorModeValue("gray.300", "dark.100"),
                  }}
                  p="2"
                  borderRadius="lg"
                  cursor="pointer"
                  onClick={onClose}
                >
                  <LuX size="20" />
                </Box>
              </Flex>
            </form>
          </Box>
        ) : (
          <Flex
            color="gray.500"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            gridColumnGap={2}
            py="1"
            borderRadius="md"
            _hover={{
              bg: useColorModeValue("gray.300", "dark.100"),
            }}
            onClick={onOpen}
          >
            <LuPlus size="18" />
            <Text fontWeight="bold">Add a card</Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
export default List;
