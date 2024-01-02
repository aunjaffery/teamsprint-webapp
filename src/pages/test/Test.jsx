import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react";
import PageTitle from "../../components/misc/PageTitle";

const Test = () => {
  let boards = ["todo", "in progress", "done"];
  let cards = [
    "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    "Build banking App",
    "Project management",
    "Develop Application",
  ];
  let brdbg = "#1d1c20";
  let crdbg = "#2d2b30";
  return (
    <Box bg={brdbg} minH="100vh">
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
              <Box bg={brdbg} p="4" borderRadius="xl" key={id}>
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
                {cards.map((c, id) => (
                  <Box key={id} bg={crdbg} mb="4" p="4" borderRadius="md">
                    <Text color="white">{c}</Text>
                  </Box>
                ))}
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};

export default Test;
