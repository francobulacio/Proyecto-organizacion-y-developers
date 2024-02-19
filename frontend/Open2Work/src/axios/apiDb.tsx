import axios from "axios";

export const apiDb = axios.create({
    baseURL: 'http://192.168.0.88:8080'
})