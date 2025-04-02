import { useMemo, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AG_GRID_LOCALE_SR } from "../assets/sr-Sr";
import { AgGridReact } from "ag-grid-react";
import {
  useUnosReport,
} from "../query";


ModuleRegistry.registerModules([AllCommunityModule]);

const UnesenoTabela = () => {
  const { data: reportData } = useUnosReport();

  const [columnDefs, _setColumnDefs] = useState<ColDef[]>([
    {
      field: "datum_tocenja",
      headerName: "Datum unosa",
      sort: "desc",
      //valueFormatter: params => params.value.slice(0, 10),
      valueFormatter: (params) =>
        new Date(params.value).toLocaleDateString("sr-SR"),
    },
    {
      headerName: "Vozilo",
      valueGetter: (p) => p.data.garazni_broj + " " + p.data.naziv,
      filter: "agSetColumnFilter",
      flex: 2,
    },
    {
      field: "kolicina_goriva",
      headerName: "Sipano",
      valueFormatter: (params) => params.value + " litara",
      filter: "agNumberColumnFilter",
    },
    { field: "prethodno_stanje_h", headerName: "Prethodno ms" },
    { field: "trenutno_stanje_h", headerName: "Trenutno ms" },
    { field: "prethodno_stanje_km", headerName: "Prethodno km" },
    { field: "trenutno_stanje_km", headerName: "Trenutno km" },
    { field: "potroseni_h", headerName: "Potrošeno ms" },
    { field: "predjeni_km", headerName: "Pređeno km" },
    {
      field: "stvarna_potrosnja_km",
      valueFormatter: (params) => params.value && params.value + " litara",
      headerName: "Potrošnja km",
    },
    {
      field: "stvarna_potrosnja_h",
      valueFormatter: (params) => params.value && params.value + " litara",
      headerName: "Potrošnja ms",
    },
    { field: "procenat_km", headerName: "Procenat km" },
    { field: "procenat_h", headerName: "Procenat ms" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  }, []);

  const rowClassRules = useMemo(() => {
    return {
      "rag-red": (params: any) => params.data.status === "Prekoračenje",
    };
  }, []);

  return (
    <div className="absolute top-20 right-5 w-[97vw] h-[80vh] opacity-90">
      <div className="flex gap-4 mb-4">
        <h1 className="text-white text-3xl font-bold">Današnji unos:</h1>
      </div>
      <AgGridReact
        rowClassRules={rowClassRules}
        localeText={AG_GRID_LOCALE_SR}
        rowData={reportData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
      />
    </div>
  );
};

export default UnesenoTabela;
