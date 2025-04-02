import { useEffect, useMemo, useRef, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AG_GRID_LOCALE_SR } from "../assets/sr-Sr";
import { AgGridReact } from "ag-grid-react";
import { useGetReport, useGetTipoveVozila, useGetVozilaPoTipu } from "../query";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import * as XLSX from "xlsx";
import {
  MdDeleteForever,
  MdEditSquare,
  MdOutlineSpeakerNotes,
} from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { api } from "../config";
import useAuth from "../hooks/useAuth";
import { Tooltip } from "primereact/tooltip";

const MySwal = withReactContent(Swal);

ModuleRegistry.registerModules([AllCommunityModule]);

const DeleteEdit = (props: any) => {
  const { rola } = useAuth();
  const tooltipRef = useRef(null);
  return (
    <div className="flex flex-row justify-baseline gap-3">
      {rola === "SIT_REFERENT" && (
        <>
          <MdDeleteForever
            size={32}
            color="red"
            className="cursor-pointer"
            onClick={() => {
              MySwal.fire({
                title: "Da li ste sigurni da zelite da obrisete ovaj unos?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Da, obrisite",
                cancelButtonText: "Ne, odbacite",
              }).then((result) => {
                if (result.isConfirmed) {
                  props.delete(Number(props.data.id));
                }
              });
            }}
          />
          <MdEditSquare
            size={32}
            color="blue"
            className="cursor-pointer"
            onClick={async () => {
              const { value: text } = await Swal.fire({
                input: "textarea",
                inputValue: props.data?.napomena,
                inputLabel: "Napomena:",
                inputPlaceholder: "Napišite napomenu...",
                inputAttributes: {
                  "aria-label": "Ovde ispišite napomenu",
                },
                showCancelButton: true,
                cancelButtonText: "Odustani",
              });
              if (text) {
                props.edit(Number(props.data.id), text);
              }
            }}
          />
        </>
      )}
      <span ref={tooltipRef}>
        <MdOutlineSpeakerNotes
          className="napomena"
          size={24}
          color={props?.data?.napomena ? "red" : "gray"}
          data-pr-tooltip={props?.data?.napomena || "Nema napomene"}
          data-pr-position="left"
        />
      </span>

      <Tooltip
        target={tooltipRef}
        content={props?.data?.napomena || ""}
        position="left"
        // content={props?.data?.napomena}
        // key={props?.data?.napomena}
      />
    </div>
  );
};

export default function Tabela() {
  const { data: reportData } = useGetReport();
  const { data: tipoviVozila } = useGetTipoveVozila();
  const [grupa, setGrupa] = useState<string>("");
  const { data: vozilaPoTipu } = useGetVozilaPoTipu(Number(grupa));
  const [filteredData, setFilteredData] = useState(reportData);
  const [dateFrom, setDateFrom] = useState<Nullable<Date>>(null);
  const [dateTo, setDateTo] = useState<Nullable<Date>>(null);
  const [vozilo, setVozilo] = useState("");

  const { rola } = useAuth();

  console.log(rola);

  const storniraj = (id: number) => {
    api()
      .put(`/azuriraj_tocenje/${id}`, {
        status: "N",
        napomena: "",
      })
      .then(
        (res) =>
          res &&
          MySwal.fire({
            title: "Uspešno ste stornirali točenje",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
            didClose: () => {
              window.location.reload();
            },
          })
      );
  };

  const dodajNapomenu = (id: number, napomena: string) => {
    api()
      .put(`/azuriraj_tocenje/${id}`, {
        status: "A",
        napomena,
      })
      .then(
        (res) =>
          res &&
          MySwal.fire({
            title: "Uspešno ste uneli napomenu za točenje",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
            didClose: () => {
              window.location.reload();
            },
          })
      );
  };

  useEffect(() => {
    if (!reportData) return;
    let filtered = reportData;

    if (dateFrom) {
      filtered = filtered.filter(
        (item: any) => new Date(item.datum_tocenja) >= dateFrom
      );
    }
    if (dateTo) {
      filtered = filtered.filter(
        (item: any) => new Date(item.datum_tocenja) <= dateTo
      );
    }

    if (vozilo) {
      filtered = filtered.filter((item: any) => item.garazni_broj == vozilo);
    }

    setFilteredData(filtered);
  }, [dateFrom, dateTo, reportData, vozilo]);

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        field: "datum_tocenja",
        headerName: "Datum",
        sort: "desc",
        valueFormatter: (params: any) =>
          new Date(params.value).toLocaleDateString("sr-SR"),
      },
      {
        headerName: "Vozilo",
        valueGetter: (p: any) => p.data.garazni_broj + " " + p.data.naziv,
        filter: "agSetColumnFilter",
        flex: 2,
      },
      {
        field: "kolicina_goriva",
        headerName: "Sipano",
        valueFormatter: (params: any) => params.value + " litara",
        filter: "agNumberColumnFilter",
      },
      { field: "prethodno_stanje_h", headerName: "Prethodno ms" },
      { field: "trenutno_stanje_h", headerName: "Trenutno ms" },
      { field: "prethodno_stanje_km", headerName: "Prethodno km" },
      { field: "trenutno_stanje_km", headerName: "Trenutno km" },
      { field: "potroseni_h", headerName: "Potroseno ms" },
      { field: "predjeni_km", headerName: "Predjeno km" },
      {
        field: "stvarna_potrosnja_km",
        valueFormatter: (params: any) =>
          params.value && params.value + " litara",
        headerName: "Potrošnja km",
      },
      {
        field: "stvarna_potrosnja_h",
        valueFormatter: (params: any) =>
          params.value && params.value + " litara",
        headerName: "Potrošnja ms",
      },
      { field: "procenat_km", headerName: "Procenat km" },
      { field: "procenat_h", headerName: "Procenat ms" },
      {
        field: "storniraj",
        headerName: rola === "SIT_REFERENT" ? "Akcija" : "Napomena",
        cellRenderer: DeleteEdit,
        cellRendererParams: (params: any) => ({
          data: params.data,
          delete: storniraj,
          edit: dodajNapomenu,
        }),
      },
    ],
    [rola]
  );

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

  const resetFilters = () => {
    setDateFrom(null);
    setDateTo(null);
    setVozilo("");
    setGrupa("");
  };

  const exportToExcel = () => {
    const today = new Date().toLocaleDateString("sr-SR").replace(/\./g, "-");
    const fileName = `ReportPotrosnjegoriva_${today}`;

    const excelData = filteredData.map((item: any) => ({
      Datum: new Date(item.datum_tocenja).toLocaleDateString("sr-SR"),
      Vozilo: `${item.garazni_broj} ${item.naziv}`,
      Sipano: `${item.kolicina_goriva} litara`,
      "Prethodno ms": item.prethodno_stanje_h,
      "Trenutno ms": item.trenutno_stanje_h,
      "Prethodno km": item.prethodno_stanje_km,
      "Trenutno km": item.trenutno_stanje_km,
      "Potroseno ms": item.potroseni_h,
      "Predjeno km": item.predjeni_km,
      "Potrošnja km": item.stvarna_potrosnja_km
        ? `${item.stvarna_potrosnja_km} litara`
        : "",
      "Potrošnja ms": item.stvarna_potrosnja_h
        ? `${item.stvarna_potrosnja_h} litara`
        : "",
      "Procenat km": item.procenat_km,
      "Procenat ms": item.procenat_h,
      Napomena: item.napomena,
    }));

    // Kreiranje radnog lista i fajla
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <div className="absolute top-20 right-5 w-[97vw] h-[80vh] opacity-90">
      <div className="flex gap-4 mb-4">
        <Calendar
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          placeholder="DATUM OD"
          showIcon
          //className="p-2 border rounded"
        />
        <Calendar
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          placeholder="DATUM DO"
          showIcon
          //className="p-2 border rounded"
        />
        <Dropdown
          id="grupa"
          value={grupa}
          onChange={(e) => setGrupa(e.value)}
          options={tipoviVozila?.map((tipVozila: any) => ({
            label: tipVozila.VALUE,
            value: tipVozila.ID,
          }))}
          placeholder="Izaberi grupu"
          className="shadow-sm shadow-gray-400 cursor-pointer border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <Dropdown
          id="vozilo"
          value={vozilo}
          onChange={(e) => setVozilo(e.value)}
          options={vozilaPoTipu?.map((vozilo: any) => ({
            label: `${vozilo.GARAZNI_BROJ} - ${vozilo.REG_BROJ} - ${vozilo.NAZIV}`,
            value: vozilo.GARAZNI_BROJ,
          }))}
          placeholder="Izaberi vozilo"
          disabled={!grupa}
          className="shadow-sm shadow-gray-400 cursor-pointer border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <Button
          label="Reset polja"
          icon="pi pi-refresh"
          onClick={resetFilters}
          className="shadow-sm shadow-gray-400 cursor-pointer border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <Button
          label="Preuzmi Excel"
          icon="pi pi-file-excel"
          onClick={exportToExcel}
          severity="success"
          className="shadow-sm shadow-gray-400 cursor-pointer border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <AgGridReact
        rowClassRules={rowClassRules}
        localeText={AG_GRID_LOCALE_SR}
        rowData={filteredData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
      />
    </div>
  );
}
