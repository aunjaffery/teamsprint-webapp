import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdNotifications } from "react-icons/md";
import {
  LuClipboardCheck,
  LuLayoutTemplate,
  LuMoon,
  LuRocket,
  LuSun,
  LuUsers,
} from "react-icons/lu";
import { NavLink } from "react-router-dom";
import MyNavLinks from "../../services/MyNavLinks";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box w="100%" bg={useColorModeValue("bg.100", "dark.200")} boxShadow="md">
      <Container maxW="1400px">
        <Flex h="68px" align="center" justify="space-between">
          <Flex
            alignItems="center"
            color={useColorModeValue("gray.700", "gray.300")}
            cursor="pointer"
            h="100%"
          >
            <Text fontWeight="bold" fontSize="xl">
              Team
            </Text>
            <Box>
              <LuRocket size="20" />
            </Box>
            <Text fontWeight="bold" fontSize="xl">
              Sprint
            </Text>
          </Flex>
          <Flex justifyContent="center" alignItems="center" gridColumnGap={8}>
            {MyNavLinks.map((l) => (
              <NavLink to={l.path} key={l.id}>
                <Text
                  fontWeight="bold"
                  textTransform="capitalize"
                  color={useColorModeValue("gray.700", "gray.400")}
                  _hover={{
                    color: useColorModeValue("black", "white"),
                  }}
                >
                  {l.title}
                </Text>
              </NavLink>
            ))}
            <Box>
              <Menu>
                <MenuButton as={Button} colorScheme="teal" size="sm">
                  Create
                </MenuButton>
                <MenuList>
                  {MyMenus.map((m) => (
                    <MenuItem key={m.id}>
                      <Flex direction="column" maxW="360px">
                        <Flex>
                          <Box mt="1" mr="1">
                            {m.i}
                          </Box>
                          <Text>{m.t}</Text>
                        </Flex>
                        <Text
                          fontSize="xs"
                          color={useColorModeValue("gray.600", "gray.400")}
                        >
                          {m.d}
                        </Text>
                      </Flex>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Box>
          </Flex>

          <Flex justifyContent="center" alignItems="center" pr="2">
            <Flex
              justifyContent="center"
              alignItems="center"
              mr="4"
              onClick={toggleColorMode}
              cursor="pointer"
              py="2"
            >
              {colorMode === "dark" ? (
                <LuSun size="20" />
              ) : (
                <LuMoon size="20" />
              )}
            </Flex>
            <Flex
              justifyContent="center"
              alignItems="center"
              mr="4"
              py="2"
              cursor="pointer"
            >
              <MdNotifications size="20" />
            </Flex>
            <Flex justifyContent="center" alignItems="center" pr="2">
              <Avatar name="Dan Abrahmov" src="https://bit.ly/prosper-baba" />
              <Text pl="2" fontSize="sm" fontWeight="bold">
                AunJaffery
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
const MyMenus = [
  {
    id: 1,
    t: "Create board",
    d: "A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.",
    i: <LuClipboardCheck size="14" />,
  },
  {
    id: 2,
    t: "Create workspace",
    d: "A Workspace is a group of boards and people. Use it to organize your company, side hustle, family, or friends.",
    i: <LuUsers size="14" />,
  },
  {
    id: 3,
    t: "Start with a template",
    d: "Get started faster with a board template.",
    i: <LuLayoutTemplate size="14" />,
  },
];
export default Navbar;
