import { useState } from "react";
import useAuth from "../hooks/useAuth";
import UnosModal from "../components/UnosModal";
import { Link, useNavigate } from "react-router-dom";
import IzmenaNormeModal from "../components/IzmenaNormeModal";

function App() {
  const { isAuthenticated, rola } = useAuth();
  const [unosModalOpen, setUnosModalOpen] = useState(false);
  const [izmenaNormeModalOpen, setIzmenaNormeModalOpen] = useState(false);
  

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = () => {
  //     const response = axios
  //       .get("http://localhost:5065/auth/verify", { withCredentials: true })
  //       .then((res) => {
  //         if (res.status === 200) {
  //           console.log("User is authenticated");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("User is not authenticated", err);
  //       });
  //   };
  //   fetchData();
  // }, []);
  //console.log(tipVozila);
  if (!isAuthenticated) {
    navigate("/login");
  }

  return (
    <>
      <div className="flex flex-row text-4xl justify-around">
        {rola === "SIT_REFERENT" && (
          <div
            className="shadow-2xl drop-shadow-2xl rounded-t-2xl hover:scale-110 duration-300 cursor-pointer overflow-hidden"
            onClick={() => setUnosModalOpen(true)}
          >
            <div className="relative">
              <img
                className="object-cover w-96 h-96"
                src="eco-fuel.gif"
                alt=""
              />
              <div className="absolute inset-0 bg-black opacity-10 hover:opacity-0 transition duration-300 rounded-2xl"></div>
            </div>

            <div className="bg-red-400 rounded-b-2xl">
              <p className="h-24 p-7 text-center font-bold"> Unos </p>
            </div>
          </div>
        )}

        {rola === "SIT_REFERENT" && (
          <Link to={"/uneseno"}>
            <div className="shadow-2xl drop-shadow-2xl rounded-t-2xl hover:scale-110 duration-300 cursor-pointer overflow-hidden">
              <div className="relative">
                <img
                  className="object-cover w-96 h-96"
                  src="uneseno.gif"
                  alt=""
                />
                <div className="absolute inset-0 bg-black opacity-10 hover:opacity-0 transition duration-300 rounded-2xl"></div>
              </div>
              <div className="bg-red-400 rounded-b-2xl">
                <p className="h-24 p-7 text-center font-bold"> Uneto danas </p>
              </div>
            </div>
          </Link>
        )}

        {rola === "SIT_OLIC" && (
          <div
            className="shadow-2xl drop-shadow-2xl rounded-t-2xl hover:scale-110 duration-300 cursor-pointer overflow-hidden"
            onClick={() => setIzmenaNormeModalOpen(true)}
          >
            <div className="relative">
              <img
                className="object-cover w-96 h-96"
                src="notebook.gif"
                alt=""
              />
              <div className="absolute inset-0 bg-black opacity-10 hover:opacity-0 transition duration-300 rounded-2xl"></div>
            </div>

            <div className="bg-red-400 rounded-b-2xl">
              <p className="h-24 p-7 text-center font-bold"> Izmena norme </p>
            </div>
          </div>
        )}

        <Link to={"/tabela"}>
          <div className="shadow-2xl drop-shadow-2xl rounded-t-2xl hover:scale-110 duration-300 cursor-pointer overflow-hidden">
            <div className="relative">
              <img
                className="object-cover w-96 h-96"
                src="statistics.gif"
                alt=""
              />
              <div className="absolute inset-0 bg-black opacity-10 hover:opacity-0 transition duration-300 rounded-2xl"></div>
            </div>
            <div className="bg-red-400 rounded-b-2xl">
              <p className="h-24 p-7 text-center font-bold"> Pregled </p>
            </div>
          </div>
        </Link>
      </div>

      <UnosModal
        unosModalOpen={unosModalOpen}
        setUnosModalOpen={setUnosModalOpen}
      />

      <IzmenaNormeModal
        izmenaNormeModalOpen={izmenaNormeModalOpen}
        setIzmenaNormeModalOpen={setIzmenaNormeModalOpen}
      />
    </>
  );
}

export default App;
