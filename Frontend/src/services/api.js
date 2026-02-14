import axios from 'axios';
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});
export const sendMessageAPI = (message, sessionId) =>
  API.post("/chat", { message, sessionId });
export const getHistoryAPI = (sessionId) => API.get(`history/${sessionId}`);
export const getSessionsAPI = () => API.get(`/sessions`);
