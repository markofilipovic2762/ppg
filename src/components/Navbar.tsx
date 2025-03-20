import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../config";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Navbar = () => {
  const { rola, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("rola/potrosnjaGoriva");
    api().post("/auth/logout").then((res) => {
      if (res.status === 200) {
        MySwal.fire({
          title: "Izlogovani ste",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          didClose: () => {
            navigate("/login");
          },
        });
      }
    }).catch((error) => {
      MySwal.fire({
        title: "Greška",
        text: error.response.data.message,
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
      });
    }); 
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      navigate(0);
    }
  };

  return (
    <nav className="bg-white/30 xl:text-xl 2xl:text-2xl backdrop-blur-md text-white sm:p-2 p-4 w-full absolute top-0 flex flex-row justify-between items-center gap-4 z-50">
      <Link to="/">
        <span className="text-gray-800 font-semibold hover:text-amber-100">
          Praćenje potrošnje goriva
        </span>
      </Link>
      { isAuthenticated ? (
        <div className="flex flex-row gap-4 justify-center items-center">
          <h3 className="text-gray-100 font-semibold">
            {/* {localStorage.getItem("firstName/ppg")}&nbsp;
            {localStorage.getItem("lastName/ppg")} */}
            {localStorage.getItem("imeKorisnika/potrosnjaGoriva")}
            &nbsp;{localStorage.getItem("rola/potrosnjaGoriva")}
          </h3>
          <button
            onClick={handleLogout}
            className="text-gray-300 px-3 py-1 2xl:text-xl bg-gray-700 border border-transparent hover:border-gray-700 rounded-md hover:bg-white hover:text-black duration-200 transition-all cursor-pointer"
          >
            Odjavi se
          </button>
        </div>
      ) : (
        <Link to="/login">
          <div className="flex flex-row justify-center items-center">
            <span className="text-gray-300 px-3 py-1 2xl:text-xl bg-gray-700 border border-transparent hover:border-gray-700 rounded-md hover:bg-white hover:text-black duration-200 transition-all cursor-pointer">
              Uloguj se
            </span>
          </div>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
