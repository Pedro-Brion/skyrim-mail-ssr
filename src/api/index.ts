import axios from "axios";

const baseURL: string = import.meta.env.SSR ? import.meta.env.VITE_API_URL : "/api" ;

const api = axios.create({ baseURL });

export default api;
