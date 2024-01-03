import { Flex, Spinner } from "@chakra-ui/react";

const CustomLoader = ({ height = "600px" }) => {
  return (
    <Flex justifyContent="center" alignItems="center" h={height}>
      <Spinner size="xl" />
    </Flex>
  );
};

export default CustomLoader;
