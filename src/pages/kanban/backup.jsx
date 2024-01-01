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
  const [boards, _] = useState([]);
  const [items, setItems] = useState([
    {
      id: 101,
      title: "todo",
      cards: [
        { id: 1, status: "todo", title: "Hello world" },
        { id: 3, status: "todo", title: "Building the famous Application" },
      ],
    },
    {
      id: 102,
      title: "done",
      cards: [{ id: 2, status: "done", title: "Everything is Completed" }],
    },
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
    console.log(`act ${actId}-${actType} | ovr ${ovrId}-${ovrType}`);
    if (!actType || !ovrType || !actId || !ovrId) return;
    if (actId === ovrId && actType === ovrType) return;
    if (actType === "item" && ovrType === "board") {
      // all logic
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
      return item;
    }
    if (type === "board") {
      let board = boards.find((i) => i.id === id);
      return board;
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
          <SortableContext items={items.map((i) => i.id)}>
            {items.map((b) => (
              <Board key={b.id} id={b.id} title={b.title}>
                <SortableContext items={b.cards.map((i) => i.id)}>
                  <Flex direction="column" gridRowGap={4}>
                    {b.cards.map((x) => (
                      <Item key={x.id} id={x.id} title={x.title} />
                    ))}
                  </Flex>
                </SortableContext>
              </Board>
            ))}
          </SortableContext>
          <DragOverlay></DragOverlay>
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
    <Box
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? "30%" : "100%",
      }}
    >
      <Box bg="gray.200" pb="8" px="4" borderRadius="xl" h="full">
        <Flex justifyContent="center" alignItems="center" py="4">
          <Text
            fontWeight="bold"
            fontSize="md"
            userSelect="none"
            {...listeners}
          >
            {title}
          </Text>
        </Flex>
        {children}
      </Box>
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
    >
      <Flex {...listeners} justifyContent="flex-start" alignItems="center">
        <Text userSelect="none">{title}</Text>
      </Flex>
    </Box>
  );
};

export default Kanban;
