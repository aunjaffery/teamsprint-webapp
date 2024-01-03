import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

const AddList = () => {
  return (
    <Box>
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
      >
        <LuPlus size="18" />
        <Text fontWeight="bold" fontSize="sm">
          Add New List
        </Text>
      </Flex>
    </Box>
  );
};
export default AddList;
