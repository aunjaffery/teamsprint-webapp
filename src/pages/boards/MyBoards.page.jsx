import { Box } from "@chakra-ui/react";
import PageTitle from "../../components/misc/PageTitle";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Domain from "../../services/Endpoint";
import ErrorComponent from "../../components/misc/ErrorComponent";
import CustomLoader from "../../components/misc/CustomLoader";
import WsKbnList from "../../components/kanban/WsKbnList";

const MyBoards = () => {
  const { isError, data, isLoading } = useQuery({
    queryKey: ["workspacekbns"],
    queryFn: () =>
      axios.get(`${Domain}/ws/workspacekbns`).then((res) => res.data),
  });
  if (isError) {
    return <ErrorComponent error="Error! Please try again." />;
  }
  const ws = data?.ws;
  return (
    <Box>
      <PageTitle title="Your Workspaces" />
      <Box>{isLoading ? <CustomLoader /> : <WsKbnList ws={ws} />}</Box>
    </Box>
  );
};

export default MyBoards;
