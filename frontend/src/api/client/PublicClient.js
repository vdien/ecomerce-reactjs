import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://lnvdien-ecomerce-be.vercel.app/";

const token = Cookies.get("auth_token") || null;

const publicClient = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    },
});

publicClient.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = `${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

publicClient.interceptors.response.use(
    (response) => {
        if (response && response.data) return response.data;
        return response;
    },
    (err) => {
        throw err.response.data;
    }
);

export default publicClient;