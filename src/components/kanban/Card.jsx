import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { LuMessageSquare } from "react-icons/lu";

const Card = ({ c }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: c.id,
    data: { type: "card" },
  });
  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        opacity: isDragging ? "30%" : "100%",
      }}
    >
      <Box
        p="4"
        boxShadow="xl"
        borderRadius="md"
        bg={useColorModeValue("white", "dark.300")}
        borderColor={useColorModeValue("white", "dark.300")}
        borderWidth="1px"
        _hover={{
          borderWidth: "1px",
          borderColor: "blue.400",
        }}
      >
        {c.id === 0 && (
          <Box w="32px" h="4px" bg="red.400" borderRadius="full" mb="2" />
        )}
        <Text
          userSelect="none"
          color={useColorModeValue("gray.700", "gray.300")}
        >
          {c.title}
        </Text>
        {c.id % 2 === 0 && (
          <Flex
            justifyContent="space-between"
            alignItems="flex-end"
            color="gray.400"
            gridColumnGap={2}
            mt="1"
          >
            <Flex alignItems="center">
              <LuMessageSquare size="16" />
              <Text fontSize="xs" ml="1">
                3
              </Text>
            </Flex>
            <Avatar
              size="xs"
              name="Dan Abrahmov"
              src="https://bit.ly/prosper-baba"
            />
          </Flex>
        )}
      </Box>
    </Box>
  );
};
export default Card;
