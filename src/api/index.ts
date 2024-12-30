import axios from "axios";

const API_URL_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_TERCEROS_URL_BASE = import.meta.env.VITE_API_TERCEROS_URL || "https://api-terceros.com";

export const API_URL = axios.create({ baseURL: API_URL_BASE });
export const apiTerceros = axios.create({ baseURL: API_TERCEROS_URL_BASE });
