/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { TeamState } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const createTeam = async(data:TeamState) =>{
    const token = localStorage.getItem('token');
    try {
        const res = await axios.post(`${BASE_URL}/team`,data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        return res.data;
    } catch (error:any) {
    console.error("Error creating team:", error?.response?.data || error.message);
    throw error; 
    }
}

export const getTeams = async(userId:string) =>{
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get(`${BASE_URL}/team?userId=${userId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return res.data;
    } catch (error:any) {
    console.error("Error fetching teams:", error?.response?.data || error.message);
    throw error;
    }
}