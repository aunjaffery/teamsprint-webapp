import {
  Avatar,
  Box,
  Container,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import PageTitle from "../../components/misc/PageTitle";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { LuMessageSquare, LuPlus } from "react-icons/lu";

import { CSS } from "@dnd-kit/utilities";
import { fk_boards, fk_items } from "./faker";

const Kanban = () => {
  const [activeId, setActiveId] = useState(null);
  const [boards, _] = useState(fk_boards);
  const [items, setItems] = useState(fk_items);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (e) => {
    const { active } = e;
    let act = {
      id: active?.id,
      type: active?.data?.current?.type,
    };
    console.log(act);
    setActiveId(act);
  };
  const handleDragMove = (e) => {
    const { active, over } = e;
    let actId = active?.id;
    let actType = active?.data?.current?.type;
    let ovrId = over?.id;
    let ovrType = over?.data?.current?.type;
    if (actType === "board" && ovrType === "board") return;
    if (actType === "board" && ovrType === "item") return;
    console.log(`act ${actId}-${actType} | ovr ${ovrId}-${ovrType}`);
    if (!actType || !ovrType || !actId || !ovrId) return;
    if (actId === ovrId) return;
    let newItems = [...items];
    let activeItem = newItems.find((x) => x.id === actId);
    let overItem = newItems.find((x) => x.id === ovrId);
    if (actType === "item" && ovrType === "board") {
      console.log("-- Corect logic --");
      let ovrBoard = boards.find((b) => b.id === ovrId);
      console.log(ovrBoard);
      activeItem.status = ovrBoard.title;
      setItems(newItems);
    } else if (activeItem.status === overItem.status) {
      let activeItemIndex = items.findIndex((f) => f.id === active.id);
      let overItemIndex = items.findIndex((f) => f.id === over.id);
      if (activeItemIndex < 0 || overItemIndex < 0) return;
      let newItems = [...items];
      newItems = arrayMove(newItems, activeItemIndex, overItemIndex);
      setItems(newItems);
    } else {
      activeItem.status = overItem.status;
      setItems(newItems);
    }
    // if (active.id && over.id && active.id !== over.id) {
    //   let activeItemIndex = items.findIndex((f) => f.id === active.id);
    //   let overItemIndex = items.findIndex((f) => f.id === over.id);
    //   if (activeItemIndex < 0 || overItemIndex < 0) return;
    //   let newItems = [...items];
    //   newItems = arrayMove(newItems, activeItemIndex, overItemIndex);
    //   setItems(newItems);
    // }
  };
  let dragEnd = (e) => {
    const { active, over } = e;
    setActiveId(null);
  };
  const findItems = (id, type) => {
    if (type === "item") {
      let item = items.find((i) => i.id === id);
      return item.title;
    }
    if (type === "board") {
      let board = boards.find((i) => i.id === id);
      return board.title;
    }
  };

  return (
    <Box>
      <Container maxW="container.xl">
        <PageTitle title="Kanban" />
        <SimpleGrid columns={[1, 1, 2, 3, 3]} spacing="10">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={dragEnd}
          >
            <SortableContext items={boards.map((i) => i.id)}>
              {boards.map((b) => (
                <Board key={b.id} id={b.id} title={b.title}>
                  <SortableContext
                    items={items
                      .filter((x) => x.status === b.title)
                      .map((i) => i.id)}
                  >
                    <Flex direction="column" gridRowGap={4}>
                      {items.map((x) =>
                        x.status === b.title ? (
                          <Item key={x.id} id={x.id} title={x.title} />
                        ) : null,
                      )}
                    </Flex>
                  </SortableContext>
                </Board>
              ))}
            </SortableContext>
            <DragOverlay>
              {activeId && activeId?.id && activeId?.type === "board" && (
                <Board id={activeId.id} title={findItems(activeId.id, "board")}>
                  {items.map((x) =>
                    x.status === findItems(activeId.id, "board") ? (
                      <Item key={x.id} id={x.id} title={x.title} />
                    ) : null,
                  )}
                </Board>
              )}
              {activeId && activeId?.id && activeId?.type === "item" && (
                <Item id={activeId.id} title={findItems(activeId.id, "item")} />
              )}
            </DragOverlay>
          </DndContext>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
const Board = ({ id, title, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "board",
    },
  });
  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? "30%" : "100%",
      }}
    >
      <Flex
        w="full"
        bg={useColorModeValue("gray.200", "dark.200")}
        borderRadius="xl"
        direction="column"
        gridRowGap={4}
        p="4"
      >
        <Flex justifyContent="center" alignItems="center" {...listeners}>
          <Text
            fontWeight="bold"
            fontSize="md"
            userSelect="none"
            textTransform="capitalize"
          >
            {title}
          </Text>
        </Flex>
        {children}
        <Flex
          color="gray.500"
          alignItems="center"
          justifyContent="center"
          gridColumnGap={2}
          py="1"
          borderRadius="md"
          _hover={{
            bg: useColorModeValue("gray.300", "dark.100"),
          }}
        >
          <LuPlus size="18" />
          <Text fontWeight="bold">Add a card</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

const Item = ({ id, title }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "item",
    },
  });
  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? "30%" : "100%",
      }}
      {...listeners}
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
        {id % 2 === 0 && (
          <Box w="32px" h="4px" bg="red.400" borderRadius="full" mb="2" />
        )}
        <Text
          userSelect="none"
          color={useColorModeValue("gray.700", "gray.300")}
        >
          {title}
        </Text>
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
    </Box>
  );
};

export default Kanban;
