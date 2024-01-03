import {
  Avatar,
  Box,
  Container,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { DndContext, DragOverlay, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { fk_boards, fk_items } from "../kanban/faker";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { LuMessageSquare, LuPlus } from "react-icons/lu";
import PageTitle from "../../components/misc/PageTitle";
import CreateCardModal from "../../components/modals/CreateCard";

const Kanban = () => {
  const [boards, _] = useState(fk_boards);
  const [items, setItems] = useState(fk_items);
  const [activeId, setActiveId] = useState(null);
  const [stage, setStage] = useState(null);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const dgstart = (e) => {
    // console.log(e);
    setActiveId(e?.active?.id);
  };
  const dgover = (e) => {
    const { active, over } = e;
    if (!active || !over) return;
    let actId = active?.id;
    let ovrId = over?.id;
    let actType = active?.data?.current?.type;
    let ovrType = over?.data?.current?.type;
    if (!actId || !ovrId || !actType || !ovrType) return;
    if (actId === ovrId) return;
    console.log(`act ${actId}-${actType} | ovr ${ovrId}-${ovrType}`);
    if (actType === "card" && ovrType === "board") {
      let newItems = [...items];
      let actItem = newItems.find((x) => x.id === actId);
      let ovrItem = boards.find((x) => x.id === ovrId);
      if (actItem.stage === ovrItem.title) return;
      actItem.stage = ovrItem.title;
      setItems(newItems);
    }
    if (actType === "card" && ovrType === "card") {
      let newItems = [...items];
      let actItem = newItems.find((x) => x.id === actId);
      let ovrItem = newItems.find((x) => x.id === ovrId);
      if (actItem.stage === ovrItem.stage) {
        let activeItemIndex = items.findIndex((f) => f.id === active.id);
        let overItemIndex = items.findIndex((f) => f.id === over.id);
        if (activeItemIndex < 0 || overItemIndex < 0) return;
        let newItems = [...items];
        newItems = arrayMove(newItems, activeItemIndex, overItemIndex);
        setItems(newItems);
      } else {
        actItem.stage = ovrItem.stage;
        setItems(newItems);
      }
    }
  };
  const dgend = () => {
    // console.log(e);
    setActiveId(null);
  };
  const findItems = (id) => {
    if (!id) return;
    let i = items.find((x) => x.id === id);
    return i;
  };

  const openCreateCard = (stage) => {
    setStage(stage);
    onOpen();
  };

  return (
    <Box bg="none" minH="100vh">
      <Container maxW="1400px">
        <PageTitle title="Kaban" />
        <Box>
          <DndContext
            onDragStart={dgstart}
            onDragEnd={dgend}
            onDragOver={dgover}
          >
            <SimpleGrid columns={[1, 1, 2, 3, 4]} spacing={6}>
              {boards.map((b) => (
                <Board key={b.id} b={b} openCreateCard={openCreateCard}>
                  <SortableContext items={items.map((i) => i.id)}>
                    <Flex direction="column" gridRowGap={4}>
                      {items.map((c) =>
                        c.stage === b.title ? <Card key={c.id} c={c} /> : null,
                      )}
                    </Flex>
                  </SortableContext>
                </Board>
              ))}
              <AddBoard />
            </SimpleGrid>
            <DragOverlay>
              {activeId && <Card c={findItems(activeId)} />}
            </DragOverlay>
          </DndContext>
        </Box>
      </Container>
      <CreateCardModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setStage(null);
        }}
        stage={stage}
      />
    </Box>
  );
};
const Board = ({ b, children, openCreateCard }) => {
  const { setNodeRef } = useDroppable({
    id: b.id,
    data: {
      type: "board",
    },
  });
  return (
    <Box ref={setNodeRef}>
      <Flex
        w="full"
        bg={useColorModeValue("gray.200", "dark.200")}
        boxShadow="md"
        borderRadius="xl"
        direction="column"
        gridRowGap={4}
        p="4"
      >
        <Flex justifyContent="center" alignItems="center">
          <Text
            fontWeight="bold"
            fontSize="md"
            userSelect="none"
            textTransform="capitalize"
          >
            {b.title}
          </Text>
        </Flex>
        {children}
        <Flex
          color="gray.500"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          gridColumnGap={2}
          py="1"
          borderRadius="md"
          _hover={{
            bg: useColorModeValue("gray.300", "dark.100"),
          }}
          onClick={() => openCreateCard(b.title)}
        >
          <LuPlus size="18" />
          <Text fontWeight="bold">Add a card</Text>
        </Flex>
      </Flex>
    </Box>
  );
};
const Card = ({ c }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({
    id: c.id,
    data: { type: "card" },
  });
  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        opacity: isDragging ? "30%" : "100%",
      }}
    >
      <Box
        p="4"
        boxShadow="xl"
        borderRadius="md"
        bg={useColorModeValue("white", "dark.300")}
        borderColor={useColorModeValue("white", "dark.300")}
        borderWidth="1px"
        _hover={{
          borderWidth: "1px",
          borderColor: "blue.400",
        }}
      >
        {c.id % 2 === 0 && (
          <Box w="32px" h="4px" bg="red.400" borderRadius="full" mb="2" />
        )}
        <Text
          userSelect="none"
          color={useColorModeValue("gray.700", "gray.300")}
        >
          {c.id} {c.title}
        </Text>
        {c.id % 2 === 0 && (
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
    </Box>
  );
};
const AddBoard = () => {
  return (
    <Box>
      <Flex
        alignItems="center"
        gridColumnGap={2}
        color="gray.500"
        boxShadow="md"
        bg={useColorModeValue("gray.200", "dark.200")}
        borderRadius="xl"
        cursor="pointer"
        p="4"
        _hover={{ bg: useColorModeValue("white", "dark.300") }}
      >
        <LuPlus size="18" />
        <Text fontWeight="bold" fontSize="sm">
          Add New Board
        </Text>
      </Flex>
    </Box>
  );
};

export default Kanban;
