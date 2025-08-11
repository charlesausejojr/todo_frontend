import axios, { AxiosResponse } from "axios";
import { Todo, CreateTodoData, UpdateTodoData } from "@/types/todo";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error("API Error:", error);
    if (error.response?.status === 404) {
      throw new Error("Resource not found");
    } else if (error.response?.status === 500) {
      throw new Error("Server error");
    } else if (error.code === "NETWORK_ERROR") {
      throw new Error("Network error - check if backend is running");
    }
    throw error;
  }
);

export const todoAPI = {
  getTodos: async (): Promise<Todo[]> => {
    const res = await api.get<Todo[]>("/todos");
    return res.data;
  },
  getTodo: async (id: number): Promise<Todo> => {
    const res = await api.get<Todo>(`/todos/${id}`);
    return res.data;
  },
  createTodo: async (todoData: CreateTodoData): Promise<Todo> => {
    const res = await api.post<Todo>("/todos", todoData);
    return res.data;
  },
  updateTodo: async (id: number, updateData: UpdateTodoData): Promise<Todo> => {
    const res = await api.put<Todo>(`/todos/${id}`, updateData);
    return res.data;
  },
  deleteTodo: async (id: number): Promise<{ message: string }> => {
    const res = await api.delete<{ message: string }>(`/todos/${id}`);
    return res.data;
  },
  healthCheck: async (): Promise<{ status: string }> => {
    const res = await api.get<{ status: string }>("/health");
    return res.data;
  },
};

export default todoAPI;
