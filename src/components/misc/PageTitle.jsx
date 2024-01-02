import { Box, Text, useColorModeValue } from "@chakra-ui/react";

const PageTitle = ({ title = "Dashboard" }) => {
  return (
    <Box py="6">
      <Text
        fontSize="2xl"
        fontWeight="bold"
        textTransform="capitalize"
        color={useColorModeValue("gray.600", "gray.400")}
      >
        {title}
      </Text>
    </Box>
  );
};

export default PageTitle;
