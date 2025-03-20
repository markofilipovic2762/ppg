import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "./config";
import axios from "axios";

export const useGetTipoveVozila = () =>
  useQuery({
    queryKey: ["tipoviVozila"],
    queryFn: () =>
      axios
        .get("https://10.21.57.48:8000/get_tip_vozila", {
          withCredentials: true,
        })
        .then((res) => {
          console.log("Tipovi vozila:", res.data);
          return res.data;
        })
        .catch((err) => console.log("Greska za get tip vozila:", err)),
    gcTime: 60 * 60 * 1000,
  });

export const useGetVozilaPoTipu = (id: number) =>
  useQuery({
    queryKey: ["vozilaPoTipu", id],
    queryFn: () =>
      api()
        .get(`/get_vozila/${id}`)
        .then((res) => res.data),
    enabled: !!id,
    gcTime: 60 * 1000,
  });

export const useGetTipNorme = (id: number) =>
  useQuery({
    queryKey: ["tipNorme", id],
    queryFn: () =>
      api()
        .get(`/get_tip_norme/${id}`)
        .then((res) => res.data),
    enabled: !!id,
    gcTime: 60 * 1000,
  });

export const useGetVozac = (mbr: string) =>
  useQuery({
    queryKey: ["vozac", mbr],
    queryFn: () =>
      api()
        .get(`/vozac/${mbr}`)
        .then((res) => res.data),
    enabled: mbr.length === 5,
    gcTime: 60 * 1000,
    retry: 0,
  });

// export const useSetZavrsenKamion = (queryClient, pogon) => {
//   return useMutation({
//     mutationKey: ["zavrsen_utovar_kamiona"],
//     mutationFn: (id) =>
//       api()
//         .put("/update", id)
//         .then((res) => res.data),
//     onSettled: () => {
//       return queryClient.invalidateQueries({ queryKey: ["kamioni", pogon] });
//     },
//   });
// };
