import type React from "react";
import { useState } from "react";

interface FormData {
  vozilo: string;
  pocetniMotoSati: number;
  krajnjiMotoSati: number;
  pocetnaKilometraza: number;
  krajnjaKilometraza: number;
  litaraGoriva: number;
  procenatNorme?: number;
  napomena?: string;
  vozac?: string;
}

const initialFormData: FormData = {
  vozilo: "",
  pocetniMotoSati: 0,
  krajnjiMotoSati: 0,
  pocetnaKilometraza: 0,
  krajnjaKilometraza: 0,
  litaraGoriva: 0,
  napomena: "",
};

const UnosModal: React.FC = ({ unosModalOpen, setUnosModalOpen }: any) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [norma, setNorma] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" || type === "range" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const izracunaj = () => {
    const procenatNorme =
      formData.krajnjaKilometraza - formData.pocetnaKilometraza;
  };

  return (
    <div>
      {unosModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600/50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-gray-50">
            <div className="mt-3 text-center">
              <h3 className="text-2xl leading-6 mb-4 font-medium text-gray-900">
                Unos podataka za vozilo
              </h3>
              <form onSubmit={handleSubmit} className="mt-2 text-left">
                <div className="mb-4">
                  <label
                    htmlFor="country"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Vozilo
                  </label>
                  <select
                    id="vozilo"
                    name="vozilo"
                    value={formData.vozilo}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Izaberi vozilo</option>
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="ca">Canada</option>
                    <option value="au">Australia</option>
                  </select>
                </div>
                <div className="flex flex-row gap-12">
                  <div className="mb-4">
                    <label
                      htmlFor="pocetniMotoSati"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Početni moto sati
                    </label>
                    <input
                      type="number"
                      id="pocetniMotoSati"
                      name="pocetniMotoSati"
                      value={formData.pocetniMotoSati}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="krajnjiMotoSati"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Krajnji moto sati
                    </label>
                    <input
                      type="number"
                      id="krajnjiMotoSati"
                      name="krajnjiMotoSati"
                      value={formData.krajnjiMotoSati}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-12">
                  <div className="mb-4">
                    <label
                      htmlFor="pocetnaKilometraza"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Početna kilometraža
                    </label>
                    <input
                      type="number"
                      id="pocetnaKilometraza"
                      name="pocetnaKilometraza"
                      value={formData.pocetnaKilometraza}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="krajnjaKilometraza"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Krajnja kilometraža
                    </label>
                    <input
                      type="number"
                      id="krajnjaKilometraza"
                      name="krajnjaKilometraza"
                      value={formData.krajnjaKilometraza}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>

                <div className="mb-8 relative">
                  <label
                    htmlFor="litaraGoriva"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Sipano litara goriva
                  </label>
                  <span>{formData.litaraGoriva}</span>
                  <input
                    id="litaraGoriva"
                    name="litaraGoriva"
                    type="range"
                    min={0}
                    max={200}
                    value={formData.litaraGoriva}
                    onChange={handleInputChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  ></input>
                  <span className="inline text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                    0
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                    50l
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                    100l
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                    150l
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                    200l
                  </span>
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
                    value={formData.napomena}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="gender"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Vozač
                  </label>
                  <select
                    id="vozac"
                    name="vozac"
                    value={formData.vozac}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Vozac</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Unesi
                  </button>
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
