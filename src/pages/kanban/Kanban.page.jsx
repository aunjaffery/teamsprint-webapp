import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Domain from "../../services/Endpoint";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CustomLoader from "../../components/misc/CustomLoader";
import ErrorComponent from "../../components/misc/ErrorComponent";
import Kanban from "../../components/kanban/Kanban";

const KanbanPage = () => {
  const { id: kbn_id } = useParams("id");
  const { isError, data, isLoading } = useQuery({
    queryKey: ["fetchcards"],
    queryFn: () =>
      axios.get(`${Domain}/crd/fetchcards/${kbn_id}`).then((res) => res.data),
  });
  if (isError) <ErrorComponent />;
  if (isLoading) <CustomLoader />;
  let cards = data?.data;
  if (!cards || !cards.length) {
    return "no cards";
  }

  return (
    <Box>
      <Kanban data={cards} />
    </Box>
  );
};

export default KanbanPage;
