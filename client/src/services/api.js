import axios from "axios";

const api = axios.create({
  baseURL: "https://team-task-manager-production-b85f.up.railway.app/api",
});

export default api;