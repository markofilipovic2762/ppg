import type React from "react";
import { useEffect, useState } from "react";
import {
  useGetTipNorme,
  useGetTipoveVozila,
  useGetVozac,
  useGetVozilaPoTipu,
} from "../query";
import { Calendar } from "primereact/calendar";
import { api } from "../config";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button } from "primereact/button";

const MySwal = withReactContent(Swal);

interface FormData {
  datum: string;
  vozilo: string;
  kilometraza: string;
  motosati: string;
  litaraGoriva: string;
  napomena?: string;
  vozac: string;
}

interface UnosModalProps {
  unosModalOpen: boolean;
  setUnosModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialFormData: FormData = {
  datum: "",
  vozilo: "",
  kilometraza: "",
  motosati: "",
  litaraGoriva: "",
  napomena: "",
  vozac: "",
};

const UnosModal = ({ unosModalOpen, setUnosModalOpen }: UnosModalProps) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [grupa, setGrupa] = useState<string>("");

  const { data: tipNorme } = useGetTipNorme(Number(formData?.vozilo));
  const { data: tipoviVozila } = useGetTipoveVozila();
  const { data: vozilaPoTipu } = useGetVozilaPoTipu(Number(grupa));
  const { data: vozacData, error: errorVozacData } = useGetVozac(
    formData?.vozac
  );

  useEffect(() => {
    setFormData(initialFormData);
  }, [unosModalOpen, grupa]);

  console.log(formData);
  console.log(tipNorme);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkUnosDisabled = () => {
    if (!formData.vozilo || !formData.datum || !formData.litaraGoriva) {
      console.log("Prvi uslov ispunjen");
      return true;
    }

    if (!formData.litaraGoriva && !formData.kilometraza) {
      console.log("Drugi uslov ispunjen");
      return true;
    }
    if (tipNorme?.TIP_NORME === 2 && !formData.motosati) {
      console.log("Treci uslov ispunjen");
      return true;
    }
    if (tipNorme?.TIP_NORME === 3 && !formData.kilometraza) {
      console.log("Cetvrti uslov ispunjen");
      return true;
    }
    if (
      tipNorme?.TIP_NORME === 1 &&
      (!formData.kilometraza || !formData.motosati)
    ) {
      console.log("Peti uslov ispunjen");
      return true;
    }
    return false;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api()
      .post("/create_tocenje", {
        vozilo_id: Number(formData.vozilo),
        norma_id: tipNorme?.NORMA_ID,
        datum_tocenja: formData.datum,
        trenutno_stanje_km: Number(formData.kilometraza) || null,
        trenutno_stanje_h: Number(formData.motosati) || null,
        kolicina_goriva: Number(formData.litaraGoriva),
        napomena: formData.napomena,
        vozac_mbr: formData.vozac,
      })
      .then((res) => {
        if (res.status === 200) {
          MySwal.fire({
            title: "Uspešno ste uneli podatke",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
            didClose: () => {
              setFormData(initialFormData);
              setUnosModalOpen(false);
            },
          });
        }
      })
      .catch((error) => {
        MySwal.fire({
          title: "Greška",
          text: error.response.data.message,
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
        });
      });
  };

  return (
    <div>
      {unosModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600/50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 w-96  shadow-white shadow-md rounded-md bg-gray-50">
            <div className="mt-3 text-center">
              <h3 className="text-3xl leading-6 mb-4 pt-2 font-medium text-blue-600">
                Unos podataka za vozilo
              </h3>
              <div className="mb-4 text-left">
                <label
                  htmlFor="grupa"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Grupa vozila
                </label>
                <select
                  id="grupa"
                  name="grupa"
                  value={grupa}
                  onChange={(e) => {
                    setGrupa(e.target.value);
                  }}
                  className="shadow-sm shadow-gray-400 cursor-pointer border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Izaberi grupu</option>
                  {tipoviVozila?.map((tipVozila: any) => (
                    <option value={tipVozila.ID}>{tipVozila.VALUE}</option>
                  ))}
                </select>
              </div>
              <form onSubmit={handleSubmit} className="mt-2 text-left">
                <div className="mb-4">
                  <label
                    htmlFor="vozilo"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Vozilo
                  </label>
                  <select
                    id="vozilo"
                    name="vozilo"
                    value={formData.vozilo}
                    onChange={handleInputChange}
                    disabled={!grupa}
                    className="shadow-sm shadow-gray-400 cursor-pointer border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Izaberi vozilo</option>
                    {vozilaPoTipu?.map((vozilo: any) => (
                      <option value={vozilo.ID}>
                        {vozilo.GARAZNI_BROJ} - {vozilo.REG_BROJ} -{" "}
                        {vozilo.NAZIV}
                      </option>
                    ))}
                  </select>
                </div>
                {[1, 3].includes(tipNorme?.TIP_NORME) && (
                  <div className="mb-4 relative">
                    <div className="mb-4">
                      <label
                        htmlFor="kilometraza"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        kilometraža
                      </label>
                      <input
                        type="number"
                        id="kilometraza"
                        name="kilometraza"
                        value={formData.kilometraza}
                        placeholder="Unesite kilometražu..."
                        onChange={handleInputChange}
                        className="shadow-sm shadow-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        min={1}
                        onInvalid={(e) => {
                          const target = e.target as HTMLInputElement;
                          target.title = "Ovo polje je obavezno!";
                          if (target.validity.valueMissing) {
                            target.setCustomValidity("Ovo polje je obavezno!");
                          } else {
                            target.setCustomValidity("");
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
                {[1, 2].includes(tipNorme?.TIP_NORME) && (
                  <div className="mb-4 relative">
                    <div className="mb-4">
                      <label
                        htmlFor="motosati"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Moto sati
                      </label>
                      <input
                        type="number"
                        id="motosati"
                        name="motosati"
                        min={1}
                        value={formData.motosati}
                        onChange={handleInputChange}
                        placeholder="Unesite moto sate..."
                        className="shadow-sm shadow-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        onInvalid={(e) => {
                          const target = e.target as HTMLInputElement;
                          if (target.validity.valueMissing) {
                            target.setCustomValidity("Ovo polje je obavezno!");
                            target.title = "Ovo polje je obavezno!";
                          } else {
                            target.setCustomValidity("");
                          }
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="mb-4 relative">
                  <label
                    htmlFor="litaraGoriva"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Sipano litara goriva
                  </label>
                  <input
                    id="litaraGoriva"
                    name="litaraGoriva"
                    type="number"
                    placeholder="Unesite količinu.."
                    min={1}
                    max={500}
                    value={formData.litaraGoriva}
                    onChange={handleInputChange}
                    onInvalid={(e) => {
                      const target = e.target as HTMLInputElement;
                      if (target.validity.rangeUnderflow) {
                        target.setCustomValidity(
                          "Vrednost mora biti veća od nule."
                        );
                      } else if (target.validity.rangeOverflow) {
                        target.setCustomValidity(
                          "Vrednost mora biti manja ili jednaka 500."
                        );
                      } else if (target.validity.valueMissing) {
                        target.setCustomValidity("Ovo polje je obavezno!");
                      } else {
                        target.setCustomValidity("");
                      }
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement; // Eksplicitno kastovanje
                      target.setCustomValidity("");
                    }}
                    className="shadow-sm shadow-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  ></input>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="napomena"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Napomena
                  </label>
                  <textarea
                    id="napomena"
                    name="napomena"
                    placeholder="Unesite napomenu..."
                    value={formData.napomena}
                    onChange={handleInputChange}
                    className="shadow-sm shadow-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="gender"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Vozač
                  </label>
                  {vozacData && (
                    <p className="text-blue-600 text-md font-bold mb-2">
                      {vozacData.IME} {vozacData.PREZIME}
                    </p>
                  )}
                  {errorVozacData && (
                    <p className="text-red-600 text-md font-bold mb-2">
                      Vozač sa tim MBR ne postoji
                    </p>
                  )}
                  <input
                    id="vozac"
                    name="vozac"
                    maxLength={5}
                    minLength={5}
                    placeholder="Unesite MBR vozača..."
                    value={formData.vozac}
                    onChange={handleInputChange}
                    className="shadow-sm shadow-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4 w-full">
                  <label
                    htmlFor="datum"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Datum točenja
                  </label>
                  <Calendar
                    placeholder="Odaberi datum"
                    dateFormat="yy-mm-dd"
                    className="w-full"
                    maxDate={new Date()}
                    value={new Date(formData.datum)}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        datum: e.value?.toLocaleDateString("en-CA") || "",
                      })
                    }
                    showIcon
                  />
                </div>
                <div className="flex items-center justify-center">
                  <Button
                    style={{ cursor: "pointer" }}
                    icon="pi pi-check"
                    label="Unesi"
                    type="submit"
                    severity="success"
                    outlined
                    raised
                    disabled={checkUnosDisabled()}
                    //className="bg-blue-500 hover:bg-blue-700 text-white hover:text-blue-800 shadow-md shadow-gray-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(initialFormData);
                    setUnosModalOpen(false);
                  }}
                  className="hover:bg-red-700 cursor-pointer hover:text-white text-gray-800 absolute top-0 right-0 font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                >
                  X
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnosModal;
