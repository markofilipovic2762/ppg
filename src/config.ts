import axios from "axios";

export const testniURL = "http://10.21.57.48:8000";
export const prodUrl = "http://python.zelsd.rs:8084";
export const localUrl = "http://localhost:5065";

export const api = () => {
  const accessToken = localStorage.getItem("accessToken/potrosnjagoriva");

  return axios.create({
    baseURL: prodUrl,
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
};

export const apiIdn = axios.create({
  baseURL: testniURL,
  timeout: 1000,
  withCredentials: true,
});
