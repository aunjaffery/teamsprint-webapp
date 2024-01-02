import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import useBoundStore from "../../store/Store";
import { MdMenu, MdNotifications } from "react-icons/md";
import {
  LuClipboardCheck,
  LuLayoutTemplate,
  LuMoon,
  LuSun,
  LuUsers,
} from "react-icons/lu";
import { NavLink } from "react-router-dom";
import MyNavLinks from "../../services/MyNavLinks";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isSidebarOpen, onSidebarClose, onSidebarOpen } = useBoundStore(
    (state) => state,
  );

  return (
    <Box w="100%">
      <Flex
        bg={useColorModeValue("bg.100", "dark.200")}
        h="68px"
        align="center"
        justify="space-between"
        boxShadow="md"
      >
        <Flex alignItems="center">
          <Box ml="6">
            <Menu>
              <MenuButton as={Button} colorScheme="green" size="md">
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
        </Flex>

        <Flex justifyContent="center" alignItems="center" pr="2">
          <Flex
            justifyContent="center"
            alignItems="center"
            pr="4"
            onClick={toggleColorMode}
          >
            {colorMode === "dark" ? <LuSun size="24" /> : <LuMoon size="24" />}
          </Flex>
          <Flex justifyContent="center" alignItems="center" pr="4">
            <MdNotifications size="24" />
          </Flex>
          <Flex justifyContent="center" alignItems="center" pr="2">
            <Avatar name="Dan Abrahmov" src="https://bit.ly/prosper-baba" />
            <Text pl="2" fontSize="sm" fontWeight="bold">
              AunJaffery
            </Text>
          </Flex>
        </Flex>
      </Flex>
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
