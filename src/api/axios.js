import axios from 'axios';

const SESSION_NAME = import.meta.env.VITE_SESSION_NAME;
const BASE_URL = localStorage.getItem(`${SESSION_NAME}_TP`) == '1' ? import.meta.env.VITE_URL_API_DEV : import.meta.env.VITE_URL_API;
const APP_KEY = import.meta.env.VITE_APP_KEY;

export default axios.create({
    headers: {
        'Authorization': `Bearer ${APP_KEY}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    baseURL : BASE_URL,
    withCredentials : true
});
