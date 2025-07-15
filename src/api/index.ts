import axios from "axios";

const baseURL: string = import.meta.env.SSR ? "http://localhost:5173/api" : "/api" ;
console.log(baseURL)

const api = axios.create({ baseURL });

export default api;
