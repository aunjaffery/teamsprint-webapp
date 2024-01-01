import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
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
import { CSS } from "@dnd-kit/utilities";

const Kanban = () => {
  const [activeId, setActiveId] = useState(null);
  const [boards, _] = useState([
    { id: 101, title: "todo" },
    { id: 102, title: "done" },
  ]);
  const [items, setItems] = useState([
    { id: 1, status: "todo", title: "Hello world" },
    { id: 2, status: "done", title: "Everything is Completed" },
    { id: 3, status: "todo", title: "Building the famous Application" },
    { id: 4, status: "done", title: "Sleep" },
  ]);
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
    if (actType === "board" || ovrType === "board") return;
    console.log(`act ${actId}-${actType} | ovr ${ovrId}-${ovrType}`);
    if (!actType || !ovrType || !actId || !ovrId) return;
    if (actId === ovrId) return;
    if (actType === "item" && ovrType === "board") {
      // all logic
    }
    let newItems = [...items];
    let activeItem = newItems.find((x) => x.id === actId);
    let overItem = newItems.find((x) => x.id === ovrId);
    if (activeItem.status === overItem.status) {
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
      console.log(item);
      return item.title;
    }
    if (type === "board") {
      let board = boards.find((i) => i.id === id);
      return board.title;
    }
  };

  return (
    <Box>
      <PageTitle title="Kanban" />
      <SimpleGrid columns={[1, 1, 2, 3, 4]} spacing="10">
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
    <Flex
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? "30%" : "100%",
      }}
      w="full"
      bg="gray.200"
      pb="8"
      px="4"
      borderRadius="xl"
      direction="column"
      gridRowGap={4}
    >
      <Flex justifyContent="center" alignItems="center" py="4" {...listeners}>
        <Text fontWeight="bold" fontSize="md" userSelect="none">
          {title}
        </Text>
      </Flex>
      {children}
    </Flex>
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
      p="4"
      boxShadow="lg"
      borderRadius="lg"
      bg="white"
      borderColor="white"
      borderWidth="1px"
      _hover={{
        borderWidth: "1px",
        borderColor: "blue.400",
      }}
      {...listeners}
    >
      <Flex justifyContent="flex-start" alignItems="center">
        <Text userSelect="none">{title}</Text>
      </Flex>
    </Box>
  );
};

export default Kanban;
