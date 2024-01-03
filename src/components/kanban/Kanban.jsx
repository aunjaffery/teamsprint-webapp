import { Box, Container, Flex, SimpleGrid } from "@chakra-ui/react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import PageTitle from "../../components/misc/PageTitle";
import Card from "../../components/kanban/Card";
import List from "../../components/kanban/List";
import AddList from "../../components/kanban/AddList";
import { fk_items, fk_lists } from "./faker";

const Kanban = ({ data }) => {
  const [lists, _] = useState(fk_lists);
  const [items, setItems] = useState(data);
  const [activeId, setActiveId] = useState(null);
  useEffect(() => {
    if (!data) return;
    setItems(data);
  }, [data]);

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
    if (actType === "card" && ovrType === "list") {
      let newItems = [...items];
      let actItem = newItems.find((x) => x.id === actId);
      let ovrItem = lists.find((x) => x.id === ovrId);
      if (actItem.status === ovrItem.title) return;
      actItem.status = ovrItem.title;
      setItems(newItems);
    }
    if (actType === "card" && ovrType === "card") {
      let newItems = [...items];
      let actItem = newItems.find((x) => x.id === actId);
      let ovrItem = newItems.find((x) => x.id === ovrId);
      if (actItem.status === ovrItem.status) {
        let activeItemIndex = items.findIndex((f) => f.id === active.id);
        let overItemIndex = items.findIndex((f) => f.id === over.id);
        if (activeItemIndex < 0 || overItemIndex < 0) return;
        let newItems = [...items];
        newItems = arrayMove(newItems, activeItemIndex, overItemIndex);
        setItems(newItems);
      } else {
        actItem.status = ovrItem.status;
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
              {lists.map((b) => (
                <List key={b.id} b={b}>
                  <SortableContext items={items.map((i) => i.id)}>
                    <Flex direction="column" gridRowGap={4}>
                      {items.map((c) =>
                        c.status === b.title ? <Card key={c.id} c={c} /> : null,
                      )}
                    </Flex>
                  </SortableContext>
                </List>
              ))}
              <AddList />
            </SimpleGrid>
            <DragOverlay>
              {activeId && <Card c={findItems(activeId)} />}
            </DragOverlay>
          </DndContext>
        </Box>
      </Container>
    </Box>
  );
};

export default Kanban;
