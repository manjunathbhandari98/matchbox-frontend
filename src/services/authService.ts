import axios from "axios";
import type { RegisterData } from "../types";
const BASE_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (data: { email: string; password: string; role: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Login error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw error;
  }
};

export const registerUser = async (data:RegisterData) =>{
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`,data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Login error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw error;
  }
}