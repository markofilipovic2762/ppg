import { useMemo, useState } from "react";
import type { ColDef, RowSelectionOptions } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AG_GRID_LOCALE_SR } from "../assets/sr-Sr";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection: RowSelectionOptions = {
  mode: "multiRow",
  headerCheckbox: false,
};

export default function Tabela() {
  const [rowData, setRowData] = useState([
    {
      datum: "2024-01-31",
      brojLitara: 50,
      pocetniMotoSati: 1200,
      krajnjiMotoSati: 1250,
      pocetnaKilometraza: 25000,
      krajnjaKilometraza: 25550,
      MotoSati: 50,
      Kilometraza: 550,
      ProsecniMotoSati: 10,
      ProsecnaKilometraza: 110,
      procenatNormeMotoSati: 95,
      procenatNormeKilometraza: 98,
    },
    {
      datum: "2024-02-01",
      brojLitara: 60,
      pocetniMotoSati: 1250,
      krajnjiMotoSati: 1305,
      pocetnaKilometraza: 25550,
      krajnjaKilometraza: 26120,
      MotoSati: 55,
      Kilometraza: 570,
      ProsecniMotoSati: 11,
      ProsecnaKilometraza: 114,
      procenatNormeMotoSati: 97,
      procenatNormeKilometraza: 99,
    },
    {
      datum: "2024-02-02",
      brojLitara: 45,
      pocetniMotoSati: 1305,
      krajnjiMotoSati: 1350,
      pocetnaKilometraza: 26120,
      krajnjaKilometraza: 26600,
      MotoSati: 45,
      Kilometraza: 480,
      ProsecniMotoSati: 9,
      ProsecnaKilometraza: 96,
      procenatNormeMotoSati: 93,
      procenatNormeKilometraza: 95,
    },
  ]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "datum",
      filter: 'agDateColumnFilter'
    },
    { field: "brojLitara", filter: "agNumberColumnFilter" },
    { field: "pocetniMotoSati" },
    { field: "krajnjiMotoSati", filter: "agNumberColumnFilter" },
    { field: "pocetnaKilometraza", filter: "agNumberColumnFilter" },
    { field: "krajnjaKilometraza", filter: "agNumberColumnFilter" },
    
    { field: "MotoSati" },
    { field: "Kilometraza"},
    { field: "ProsecniMotoSati", filter: "agNumberColumnFilter" },
    { field: "ProsecnaKilometraza", filter: "agNumberColumnFilter" },
    { field: "procenatNormeMotoSati", filter: "agNumberColumnFilter" },
    { field: "procenatNormeKilometraza", filter: "agNumberColumnFilter" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      floatingFilter: true,
      flex: 1
    };
  }, []);

  return (
    <div className="absolute top-20 right-5 w-[95vw] h-[80vh] opacity-90">
      <AgGridReact
        localeText={AG_GRID_LOCALE_SR}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
      />
    </div>
  );
}
