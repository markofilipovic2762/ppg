import { useQuery } from "@tanstack/react-query";
import { api } from "./config";

export const useGetTipoveVozila = () =>
  useQuery({
    queryKey: ["tipoviVozila"],
    queryFn: () =>
      api()
        .get("/get_tip_vozila")
        .then((res) => res.data)
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

export const useGetReport = () =>
  useQuery({
    queryKey: ["report"],
    queryFn: () =>
      api()
        .get("/reporting")
        .then((res) => res.data),
    gcTime: 60 * 1000,
  });

export const useUnosReport = () =>
  useQuery({
    queryKey: ["unosReporting"],
    queryFn: () =>
      api()
        .get("/unos_reporting")
        .then((res) => res.data),
    gcTime: 60 * 1000,
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
