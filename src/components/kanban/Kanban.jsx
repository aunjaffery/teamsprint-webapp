import { Box, Container, Flex, SimpleGrid } from "@chakra-ui/react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import PageTitle from "../../components/misc/PageTitle";
import Card from "../../components/kanban/Card";
import List from "../../components/kanban/List";
import AddList from "../../components/kanban/AddList";
import { fk_lists } from "./faker";

const Kanban = ({ data }) => {
  const [lists, setLists] = useState(data.lists);
  const [cards, setCards] = useState(data.cards);
  const [activeId, setActiveId] = useState(null);
  useEffect(() => {
    if (!data.cards) return;
    setCards(data.cards);
    if (!data.lists) return;
    setLists(lists);
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
      let newItems = [...cards];
      let actItem = newItems.find((x) => x.id === actId);
      let ovrItem = lists.find((x) => x.id === ovrId);
      if (actItem.status === ovrItem.title) return;
      actItem.status = ovrItem.title;
      setCards(newItems);
    }
    if (actType === "card" && ovrType === "card") {
      let newItems = [...cards];
      let actItem = newItems.find((x) => x.id === actId);
      let ovrItem = newItems.find((x) => x.id === ovrId);
      if (actItem.status === ovrItem.status) {
        let activeItemIndex = cards.findIndex((f) => f.id === active.id);
        let overItemIndex = cards.findIndex((f) => f.id === over.id);
        if (activeItemIndex < 0 || overItemIndex < 0) return;
        let newItems = [...cards];
        newItems = arrayMove(newItems, activeItemIndex, overItemIndex);
        setCards(newItems);
      } else {
        actItem.status = ovrItem.status;
        setCards(newItems);
      }
    }
  };
  const dgend = () => {
    // console.log(e);
    setActiveId(null);
  };
  const findItems = (id) => {
    if (!id) return;
    let i = cards.find((x) => x.id === id);
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
              {lists &&
                lists.length &&
                lists.map((b) => (
                  <List key={b.id} b={b}>
                    {cards && cards.length ? (
                      <SortableContext items={cards.map((i) => i.id)}>
                        <Flex direction="column" gridRowGap={4}>
                          {cards.map((c) =>
                            c.status === b.title ? (
                              <Card key={c.id} c={c} />
                            ) : null,
                          )}
                        </Flex>
                      </SortableContext>
                    ) : null}
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
