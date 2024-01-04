import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { LuSettings2, LuUsers } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const WsKbnList = ({ ws }) => {
  const navigate = useNavigate();
  return (
    <Flex direction="column" gridRowGap="12" mt="10">
      {ws &&
        ws.map((w) => (
          <Box key={w.id} w="full">
            <Flex
              justifyContent="space-between"
              alignItems="center"
              w="full"
              maxW="800px"
            >
              <Flex alignItems="center" gridColumnGap="4">
                <Placeholder w={w.name} />
                <Text key={w.id} fontWeight="bold" fontSize="xl">
                  {w.name}
                </Text>
              </Flex>
              <Flex alignItems="center" gridColumnGap="4">
                <Button leftIcon={<LuUsers />} bg="blackAlpha.200" size="sm">
                  Members (3)
                </Button>
                <Button
                  leftIcon={<LuSettings2 />}
                  bg="blackAlpha.200"
                  size="sm"
                >
                  Settings
                </Button>
              </Flex>
            </Flex>
            <Box mt="6">
              <Flex
                justifyContent="flex-start"
                alignItems="center"
                gridColumnGap="6"
              >
                {w.kanban &&
                  w.kanban.map((k) => (
                    <Box
                      key={k.id}
                      w="240px"
                      minW="240px"
                      h="120px"
                      bg="gray.300"
                      onClick={() => navigate(`/kanban/${k.id}`)}
                      cursor="pointer"
                      borderRadius="lg"
                      bgGradient="linear(to-r, #3d2cbd, #dcbdf7)"
                    >
                      <Text
                        px="4"
                        pt="4"
                        fontSize="lg"
                        fontWeight="bold"
                        color="white"
                        noOfLines={1}
                      >
                        {k.title}
                      </Text>
                    </Box>
                  ))}
              </Flex>
            </Box>
          </Box>
        ))}
    </Flex>
  );
};
const Placeholder = ({ w = "v", wh = "40px" }) => {
  let alpha = w.charAt(0).toUpperCase();
  return (
    <Flex
      w={wh}
      h={wh}
      bg="black"
      borderRadius="md"
      bgGradient="linear(to-r, teal.500, green.500)"
      justifyContent="center"
      alignItems="center"
    >
      <Text color="white" fontWeight="bold" fontSize="xl">
        {alpha}
      </Text>
    </Flex>
  );
};

export default WsKbnList;
