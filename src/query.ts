import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "./config";

export const useSkladista = () =>
  useQuery({
    queryKey: ["skladista"],
    queryFn: () =>
      api()
        .get("/skladista")
        .then((res) => res.data),
    gcTime: 60 * 60 * 1000,
  });

export const useKupciPoSkladistu = (skladiste) =>
  useQuery({
    queryKey: ["kupciPoSkladistu", skladiste],
    queryFn: () =>
      api()
        .get(`/kupciPoSkladistu?skladiste=${skladiste}`)
        .then((res) => res.data),
    enabled: !!skladiste,
    gcTime: 10 * 60 * 1000,
  });

export const useSetZavrsenKamion = (queryClient, pogon) => {
  return useMutation({
    mutationKey: ["zavrsen_utovar_kamiona"],
    mutationFn: (id) =>
      api()
        .put("/update", id)
        .then((res) => res.data),
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: ["kamioni", pogon] });
    },
  });
};
