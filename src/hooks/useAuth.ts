import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rola, setRola] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken/ppg");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const {role} = payload;
        setRola(role);
        const isExpired = payload.exp * 1000 < Date.now();
        if (isExpired) {
          localStorage.removeItem("accessToken/ppg");
          navigate("/login");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        alert("Invalid token");
        localStorage.removeItem("accessToken/ppg");
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  return { isAuthenticated, rola };
};

export default useAuth;
