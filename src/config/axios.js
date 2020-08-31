import axios from "axios";

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

export default axiosConfig;
