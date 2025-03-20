import axios from "axios";

const testniURL = "http://10.21.57.48:8000";
const localUrl = "http://localhost:5065";

export const api = () => {
  // const accessToken = localStorage.getItem("accessToken/ppg");

  return axios.create({
    baseURL: testniURL,
    timeout: 1000,
    // headers: {
    //   Authorization: `Bearer ${accessToken}`,
    //   "Content-Type": "application/json",
    // },
    withCredentials: true,
  });
};
