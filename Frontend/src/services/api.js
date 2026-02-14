import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const sendMessageAPI = (message, sessionId) =>
  API.post("/chat", { message, sessionId });
export const getHistoryAPI = (sessionId) => API.get(`/history/${sessionId}`);
export const getSessionsAPI = () => API.get("/sessions");
