import { useState, useEffect } from "react";
import { api } from "../config";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [ad, setAd] = useState("");
  const [password, setPassword] = useState("");
  const [adError, setAdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateAd = (ad: string) => {
    if (!ad) {
      setAdError("AD nalog je obavezan");
    } else if (ad.length > 7) {
      setAdError("AD nalog ne sme imati vise od 7 karaktera");
    } else if (ad.length < 7) {
      setAdError("AD nalog mora imati 7 karaktera");
    } else {
      setAdError("");
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Lozinka je obavezna");
    } else if (password.length < 8) {
      setPasswordError("Lozinka mora biti bar 8 karaktera duga");
    } else {
      setPasswordError("");
    }
  };

  useEffect(() => {
    if (ad.length > 4) validateAd(ad);
  }, [ad]);

  useEffect(() => {
    if (password.length > 6) validatePassword(password);
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adError && !passwordError) {
      // Handle sign-in logic here
      api()
        .post("/login", { username: ad, password })
        .then((res) => {
          if (res) {
            localStorage.setItem("accessToken/ppg", res.data.accessToken);
            localStorage.setItem("firstName/ppg", res.data.firstName);
            localStorage.setItem("lastName/ppg", res.data.lastName);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Doslo je do greske prilikom logovanja");
        });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white/95 p-8 rounded-lg shadow-2xl w-md">
        <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">
          Uloguj se
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              AD Nalog
            </label>
            <input
              type="text"
              id="ad"
              value={ad}
              onChange={(e) => setAd(e.target.value)}
              required
              className={`mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md shadow-sm placeholder-gray-400
                       focus:outline-none focus:ring-1 focus:ring-blue-500
                       ${adError ? "border-red-500" : "border-gray-300"}`}
            />
            {adError && <p className="mt-1 text-xs text-red-500">{adError}</p>}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-medium text-gray-700"
            >
              Lozinka
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md shadow-sm placeholder-gray-400
                       focus:outline-none focus:ring-1 focus:ring-blue-500
                       ${passwordError ? "border-red-500" : "border-gray-300"}`}
            />
            {passwordError && (
              <p className="mt-1 text-xs text-red-500">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer mt-3 py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                     transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105
                     disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!!adError || !!passwordError}
          >
            Potvrdi
          </button>
        </form>
      </div>
    </div>
  );
}
