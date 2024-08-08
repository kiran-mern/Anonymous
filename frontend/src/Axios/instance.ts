import axios from "axios";
import { API_URL } from "./BaseUrl";

export const axiosInstance=axios.create({
    baseURL:API_URL,
    headers:{
        'Content-Type' : 'application/json'
    }
})
