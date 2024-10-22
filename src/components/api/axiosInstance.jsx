import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://97.74.89.204:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
