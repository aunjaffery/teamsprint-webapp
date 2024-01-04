import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Domain from "./Endpoint";

export const workspacekbns = () =>
  useQuery({
    queryKey: ["workspacekbns"],
    queryFn: () =>
      axios.get(`${Domain}/api/ws/workspacekbns`).then((res) => res.data),
    staleTime: Infinity,
  });
export const findWorkspace = () =>
  useQuery({
    queryKey: ["findworkspace"],
    queryFn: () =>
      axios.get(`${Domain}/api/ws/findworkspace`).then((res) => res.data),
    staleTime: Infinity,
  });

export const fetchKbnCards = (kbn_id) =>
  useQuery({
    queryKey: ["fetchKbnCards"],
    queryFn: () =>
      axios
        .get(`${Domain}/api/kbn/fetchKbnCards/${kbn_id}`)
        .then((res) => res.data),
  });

export const LoginQuery = async (e) => {
  e.preventDefault();
  const rsp = await axios.post(
    `${Domain}/api/user/login`,
    new FormData(e.target),
  );
  return rsp.data;
};
export const createBoard = async (e) => {
  e.preventDefault();
  const rsp = await axios.post(
    `${Domain}/api/kbn/createKbn`,
    new FormData(e.target),
  );
  return rsp.data;
};

export const createCard = async (data) => {
  const rsp = await axios.post(`${Domain}/api/crd/createcard`, data);
  return rsp.data;
};
