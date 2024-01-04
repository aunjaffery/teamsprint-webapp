import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { LuPlus, LuX } from "react-icons/lu";
import { useParams } from "react-router-dom";

const AddList = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { id: kbn_id } = useParams("id");
  const onAddList = (e) => {
    e.preventDefault();
    let title = e.target?.title?.value;
    if (!title || !kbn_id) return;
    let data = { title, kbn_id };
    console.log(data);
  };
  return (
    <Box>
      {isOpen ? (
        <Box
          boxShadow="md"
          bg={useColorModeValue("gray.200", "dark.200")}
          borderRadius="xl"
          p="4"
        >
          <form onSubmit={onAddList}>
            <Input
              name="title"
              placeholder="Enter list title..."
              borderColor="gray.400"
              max={50}
              required
            />
            <Flex mt="4" alignItems="center" gridColumnGap={2}>
              <Button size="sm" colorScheme="teal" type="submit">
                Add list
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
          alignItems="center"
          gridColumnGap={2}
          color="gray.500"
          boxShadow="md"
          bg={useColorModeValue("gray.200", "dark.200")}
          borderRadius="xl"
          cursor="pointer"
          p="4"
          _hover={{ bg: useColorModeValue("white", "dark.300") }}
          onClick={onOpen}
        >
          <LuPlus size="18" />
          <Text fontWeight="bold" fontSize="sm">
            Add New List
          </Text>
        </Flex>
      )}
    </Box>
  );
};
export default AddList;
