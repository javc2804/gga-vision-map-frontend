import axios from "axios";

export const apiLocal = axios.create({ baseURL: "http://localhost:3000" });
export const apiTerceros = axios.create({
  baseURL: "https://api-terceros.com",
});
