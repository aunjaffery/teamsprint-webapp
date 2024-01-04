import { Box, Container } from "@chakra-ui/react";
import PageTitle from "../../components/misc/PageTitle";
import ErrorComponent from "../../components/misc/ErrorComponent";
import CustomLoader from "../../components/misc/CustomLoader";
import WsKbnList from "../../components/kanban/WsKbnList";
import { workspacekbns } from "../../services/Queries";
import useBoundStore from "../../store/Store";
import CreateKbnModal from "../../components/modals/CreateKbn";

const MyBoards = () => {
  const { isLoading, data, isError } = workspacekbns();
  const ws = data?.ws;
  if (isError) {
    return <ErrorComponent error="Error! Please try again." />;
  }

  return (
    <Box>
      <Container maxW="1400px">
        <PageTitle title="Your Workspaces" />
        <Box>{isLoading ? <CustomLoader /> : <WsKbnList ws={ws} />}</Box>
      </Container>
    </Box>
  );
};

export default MyBoards;
