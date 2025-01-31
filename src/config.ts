import axios from "axios";

const testniURL = "http://10.21.57.45:8000";

export const api = () => {
    const accessToken = localStorage.getItem("accessToken/ppg");

    return axios.create({
      baseURL: testniURL,
      timeout: 5000,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // "Content-Type": "application/json"
      },
    });
}
  
