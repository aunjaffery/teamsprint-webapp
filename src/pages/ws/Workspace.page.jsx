import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import PageTitle from "../../components/misc/PageTitle";

const Workspace = () => {
  let ws_id = ["qwe", "xyz", "abc"];
  let g = { msg: "qwe", a: [] };
  let qwe = g?.a;
  console.log("qwe", qwe);
  let pop =
    qwe &&
    qwe.map((q) => {
      console.log("ql", q);
      return q;
    });
  console.log("opop", pop);
  return (
    <Box>
      <PageTitle title="Workspace" />
      {ws_id.map((w) => (
        <Box key={w}>
          <Text fontSize={"xl"} fontWeight="bold">
            {w}
          </Text>
          <Text>This is Protected Route</Text>

          <Box my="10">
            <Button colorScheme="green">Open</Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Workspace;
