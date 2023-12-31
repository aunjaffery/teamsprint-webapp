import { Box, Button, Flex, Text } from "@chakra-ui/react";
import PageTitle from "../../components/misc/PageTitle";
import { useParams } from "react-router-dom";
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
  const [items, setItems] = useState([
    { id: 1, index: 1, title: "Hello world" },
    { id: 2, index: 2, title: "Everythin is awsome" },
    { id: 3, index: 3, title: "Building the famous Application" },
  ]);
  let { id } = useParams();
  console.log(id);
  const handleDragStart = (e) => {
    console.log(e);
    setActiveId(e.active.id);
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const handleDragMove = (e) => {
    const { active, over } = e;
    if (!active.id || !over.id) {
      return;
    }
    if (active.id === over.id) {
      return;
    }
    if (active.id && over.id && active.id !== over.id) {
      let activeItemIndex = items.findIndex((f) => f.id === active.id);
      let overItemIndex = items.findIndex((f) => f.id === over.id);
      console.log(activeItemIndex, overItemIndex);
      let newItems = [...items];
      newItems = arrayMove(newItems, activeItemIndex, overItemIndex);
      setItems(newItems);
    }
  };
  let dragEnd = (e) => {
    const { active, over } = e;
    setActiveId(null);
  };
  const findItems = (id) => {
    return items.find((i) => i.id === id);
  };

  return (
    <Box>
      <PageTitle title="Kanban" />
      <Flex>
        <Box bg="gray.200" p="8" borderRadius="lg">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={dragEnd}
          >
            <SortableContext items={items}>
              <Flex direction="column" gridRowGap={4}>
                {items.map((x) => (
                  <Item key={x.id} id={x.id} item={x} />
                ))}
              </Flex>
            </SortableContext>
            <DragOverlay>
              {activeId ? (
                <Item id={activeId} item={findItems(activeId)} />
              ) : null}
            </DragOverlay>
          </DndContext>
        </Box>
      </Flex>
    </Box>
  );
};

const Item = ({ id, item }) => {
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
    >
      <Flex
        {...listeners}
        justifyContent="flex-start"
        alignItems="center"
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
        <Text userSelect="none">{item.title}</Text>
      </Flex>
    </Box>
  );
};

export default Kanban;
