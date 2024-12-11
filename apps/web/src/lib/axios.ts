import axios from "axios";
import { loadFromLocalStorage } from "../utils/manageLocalStorage";

const Axios = axios.create({
    baseURL: "http://localhost:4000",
});

Axios.interceptors.request.use((config) => {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${loadFromLocalStorage("token")}`;

    return config;
});

export default Axios;
