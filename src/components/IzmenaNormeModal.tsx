import type React from "react";
import { useState } from "react";
import {
  useGetTipNorme,
  useGetTipoveVozila,
  useGetVozilaPoTipu,
} from "../query";
import { api } from "../config";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button } from "primereact/button";

const MySwal = withReactContent(Swal);

interface FormData {
  vozilo_id: string;
  potrosnja_km: string;
  potrosnja_h: string;
  tip_norme: string;
}

interface IzmenaNormeModalProps {
  izmenaNormeModalOpen: boolean;
  setIzmenaNormeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialFormData: FormData = {
  vozilo_id: "",
  potrosnja_km: "",
  potrosnja_h: "",
  tip_norme: "",
};

const IzmenaNormeModal = ({
  izmenaNormeModalOpen,
  setIzmenaNormeModalOpen,
}: IzmenaNormeModalProps) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [grupa, setGrupa] = useState<string>("");

  const { data: tipNorme } = useGetTipNorme(Number(formData?.vozilo_id));
  const { data: tipoviVozila } = useGetTipoveVozila();
  const { data: vozilaPoTipu } = useGetVozilaPoTipu(Number(grupa));

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkUnosDisabled = () => {
    if (!formData.vozilo_id) return true;
    if (tipNorme?.TIP_NORME === 2 && !formData.potrosnja_h) return true;
    if (tipNorme?.TIP_NORME === 3 && !formData.potrosnja_km) return true;
    if (
      tipNorme?.TIP_NORME === 1 &&
      (!formData.potrosnja_h || !formData.potrosnja_km)
    )
      return true;
    return false;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api()
      .post("/promena_norme", {
        vozilo_id: Number(formData.vozilo_id),
        potrosnja_km: Number(formData.potrosnja_km),
        potrosnja_h: Number(formData.potrosnja_h),
        tip_norme: Number(tipNorme?.TIP_NORME),
      })
      .then((res) => {
        if (res.status === 200) {
          MySwal.fire({
            title: "Uspešno ste izmenili normu",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
            didClose: () => {
              setFormData(initialFormData);
              setIzmenaNormeModalOpen(false);
            },
          });
        }
      })
      .catch((error) => {
        MySwal.fire({
          title: "Greška prilikom izmene norme",
          text: error.response.data.message,
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
        });
      });
  };

  return (
    <div>
      {izmenaNormeModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600/50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="shadow-gray-700 relative top-50 mx-auto p-5 w-96 shadow-lg rounded-md bg-gray-50">
            <div className="mt-3 text-center">
              <h3 className="text-2xl leading-6 mb-4 font-medium text-blue-500">
                Izmena norme za vozilo
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
                  className="shadow-md shadow-gray-400 cursor-pointer border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    id="vozilo_id"
                    name="vozilo_id"
                    value={formData.vozilo_id}
                    onChange={handleInputChange}
                    disabled={!grupa}
                    className="shadow-md shadow-gray-400 cursor-pointer border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        htmlFor="potrosnja_km"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Potrosnja na 100km
                      </label>
                      <input
                        type="number"
                        id="potrosnja_km"
                        min={1}
                        name="potrosnja_km"
                        value={formData.potrosnja_km}
                        onChange={handleInputChange}
                        className="shadow-md shadow-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                  </div>
                )}
                {[1, 2].includes(tipNorme?.TIP_NORME) && (
                  <div className="mb-4 relative">
                    <div className="mb-4">
                      <label
                        htmlFor="potrosnja_h"
                        className="block text-gray-700 text-sm font-bold mb-2"
                      >
                        Potrosnja po satu
                      </label>
                      <input
                        type="number"
                        id="potrosnja_h"
                        name="potrosnja_h"
                        min={1}
                        value={formData.potrosnja_h}
                        onChange={handleInputChange}
                        className="shadow-md shadow-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-center">
                  <Button
                    type="submit"
                    disabled={checkUnosDisabled()}
                    className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Unesi
                  </Button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(initialFormData);
                    setGrupa("");
                    setIzmenaNormeModalOpen(false);
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

export default IzmenaNormeModal;
