import {
  Avatar,
  Box,
  Container,
  Flex,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import PageTitle from "../../components/misc/PageTitle";
import { LuMessageCircle, LuMessageSquare } from "react-icons/lu";

const Test = () => {
  let boards = ["todo", "in progress", "done"];
  let cards = [
    "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    "Build banking App",
    "Project management",
    "Develop Application",
  ];
  return (
    <Box bg="none" minH="100vh">
      <Container maxW="container.xl">
        <Box py="6">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            textTransform="capitalize"
            color="gray.200"
          >
            Kanban Design
          </Text>
        </Box>
        <Box>
          <SimpleGrid columns={3} spacing={10}>
            {boards.map((b, id) => (
              <Box
                p="6"
                borderRadius="xl"
                key={id}
                bg="dark.200"
                boxShadow="xl"
              >
                <Box pb="4">
                  <Text
                    textAlign="center"
                    fontWeight="bold"
                    color="white"
                    textTransform="capitalize"
                  >
                    {b}
                  </Text>
                </Box>
							<Flex direction="column" gridRowGap={4}>
                {cards.map((c, id) => (
                  <Box
                    key={id}
                    bg={"dark.300"}
                    p="4"
                    borderRadius="md"
                    boxShadow="xl"
                  >
                    {id % 2 === 0 && (
                      <Box
                        w="32px"
                        h="4px"
                        bg="red.400"
                        borderRadius="full"
                        mb="2"
                      />
                    )}
                    <Text color="gray.300">{c}</Text>
                    {id % 2 === 0 && (
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
                ))}
							</Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default Test;
