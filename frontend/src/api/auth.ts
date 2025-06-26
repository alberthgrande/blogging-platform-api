import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const login = (email: string, password: string) =>
  API.post("/auth/login", { email, password });

export const refresh = () => API.post("/auth/refresh");

export const logout = () => API.post("/auth/logout");

export const getPosts = (token: string) =>
  API.get("/posts", {
    headers: { Authorization: `Bearer ${token}` },
  });
