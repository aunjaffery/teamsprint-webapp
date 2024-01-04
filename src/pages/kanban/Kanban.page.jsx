import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import CustomLoader from "../../components/misc/CustomLoader";
import ErrorComponent from "../../components/misc/ErrorComponent";
import Kanban from "../../components/kanban/Kanban";
import { fetchKbnCards } from "../../services/Queries";

const KanbanPage = () => {
  const { id: kbn_id } = useParams("id");
  const { isError, data, isLoading } = fetchKbnCards(kbn_id);
  if (isError) <ErrorComponent />;
  if (isLoading) <CustomLoader />;
  console.log(data);
  let rsp = data?.data;
  console.log("Card api->", rsp);
  if (!rsp || !rsp.cards) {
    return "no cards";
  }

  return (
    <Box>
      <Kanban data={rsp} />
    </Box>
  );
};

export default KanbanPage;
