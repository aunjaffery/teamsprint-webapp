import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.page";
import LoginPage from "./pages/AuthPages/Login.page";
import NotFound from "./pages/notfound/NotFound.page";
import MyBoards from "./pages/boards/MyBoards.page";
import Layout from "./components/misc/Layout";
import ProtectedRoute from "./services/ProtectedRoute";
import useBoundStore from "./store/Store";
import Workspace from "./pages/ws/Workspace.page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Test from "./pages/test/Test";
import KanbanPage from "./pages/kanban/Kanban.page";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const authCheck = useBoundStore((state) => {
    return state.user ? state.user : false;
  });
  useEffect(() => {
    // useEffect only if you want whole App private.
    if (authCheck === false) navigate("login");
    //remove this useEffect if You want some public pages in App.
    //Route can handle private pages individually through ProtectedRoute
  }, [authCheck]);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Layout pathname={pathname}>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route
            path="ws"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <Workspace />
              </ProtectedRoute>
            }
          />
          <Route
            path="boards"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <MyBoards />
              </ProtectedRoute>
            }
          />
          <Route path="kanban/:id" element={<KanbanPage />} />
          <Route path="test" element={<Test />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
