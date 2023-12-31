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
} from "@chakra-ui/react";
import useBoundStore from "../../store/Store";
import { MdMenu, MdNotifications } from "react-icons/md";
import { LuClipboardCheck, LuLayoutTemplate, LuUsers } from "react-icons/lu";

const Navbar = () => {
  const { isSidebarOpen, onSidebarClose, onSidebarOpen } = useBoundStore(
    (state) => state,
  );
  return (
    <Box w="100%">
      <Flex
        bg="none"
        h="68px"
        align="center"
        mx="4"
        justify="space-between"
        borderBottom="1px"
        borderColor="gray.300"
      >
        <Flex alignItems="center">
          <IconButton
            css={{
              WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
            }}
            size="xs"
            aria-label="close-btn"
            icon={<MdMenu size="26" />}
            onClick={isSidebarOpen ? onSidebarClose : onSidebarOpen}
            _hover={{ outline: "none" }}
            _focus={{ outline: "none" }}
            _active={{ bg: "none", outline: "none" }}
            color="black"
          />
          <Box ml="6">
            <Menu>
              <MenuButton as={Button} colorScheme="blue" size="md">
                Create
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Flex direction="column" maxW="360px">
                    <Flex>
                      <Box mt="1" mr="1">
                        <LuClipboardCheck size="14" />
                      </Box>
                      <Text>Create board</Text>
                    </Flex>
                    <Text fontSize="xs" color="gray.600">
                      A board is made up of cards ordered on lists. Use it to
                      manage projects, track information, or organize anything.
                    </Text>
                  </Flex>
                </MenuItem>
                <MenuItem>
                  <Flex direction="column" maxW="360px">
                    <Flex>
                      <Box mt="1" mr="1">
                        <LuUsers size="14" />
                      </Box>
                      <Text>Create Workspace</Text>
                    </Flex>
                    <Text fontSize="xs" color="gray.600">
                      A Workspace is a group of boards and people. Use it to
                      organize your company, side hustle, family, or friends.
                    </Text>
                  </Flex>
                </MenuItem>
                <MenuItem>
                  <Flex direction="column" maxW="360px">
                    <Flex>
                      <Box mt="1" mr="1">
                        <LuLayoutTemplate size="14" />
                      </Box>
                      <Text>Start with a template</Text>
                    </Flex>
                    <Text fontSize="xs" color="gray.600">
                      Get started faster with a board template.
                    </Text>
                  </Flex>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>

        <Flex justifyContent="center" alignItems="center" pr="2">
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

export default Navbar;
