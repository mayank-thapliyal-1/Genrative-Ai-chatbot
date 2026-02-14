import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const sendMessageAPI = (message, sessionId) =>
  API.post(`${import.meta.process.Vite_API_KEY}/api/chat`, { message, sessionId });
export const getHistoryAPI = (sessionId) => API.get(`${import.meta.process.Vite_API_KEY}/api/history/${sessionId}`);
export const getSessionsAPI = () => API.get(`${import.meta.process.Vite_API_KEY}/api/sessions`);
