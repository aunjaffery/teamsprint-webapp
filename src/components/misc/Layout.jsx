import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

const Layout = ({ children }) => {
  const location = useLocation();

  const render = () => {
    return location.pathname === "/login" || location.pathname === "/signup"
      ? true
      : false;
  };

  if (render()) {
    return <Box>{children}</Box>;
  }

  return (
    <Box position="relative">
      <Flex>
        <Box
          flex="1"
          minH="calc(100vh)"
          bg={useColorModeValue("bg.100", "dark.100")}
          position="relative"
          overflowY="hidden"
        >
          <Box
            h="100vh"
            overflowY="auto"
            sx={{
              "&::-webkit-scrollbar-track": {
                bg: "transparent",
              },
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                bg: "blackAlpha.400",
                borderRadius: "20px",
              },
            }}
          >
            <Navbar />
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;
