import { useState } from "react";
import useAuth from "../hooks/useAuth";
import UnosModal from "../components/UnosModal";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

function App() {
  const { isAuthenticated, rola } = useAuth();
  const [unosModalOpen, setUnosModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-row text-4xl justify-around">
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
    </>
  );
}

export default App;
