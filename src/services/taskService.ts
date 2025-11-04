/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import type { TaskRequest } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getMyTasks = async(userId:string) =>{
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get(`${BASE_URL}/task/my-task/${userId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return res.data;
    }catch (error:any) {
        console.error("Error fetching your tasks:", error?.response?.data || error.message);
    throw error; 
    }
}

export const getAllTasksFromMyProjects = async(userId:string) =>{
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get(`${BASE_URL}/task/all-task/${userId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return res.data;
    }catch (error:any) {
        console.error("Error fetching all tasks:", error?.response?.data || error.message);
    throw error; 
    }
}

export const getTaskByProjects = async(projectId:string) =>{
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get(`${BASE_URL}/task/project/${projectId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return res.data;
    }catch (error:any) {
        console.error("Error fetching all tasks:", error?.response?.data || error.message);
    throw error; 
    }
}

export const createTask = async(taskData:TaskRequest) =>{
    const token = localStorage.getItem('token');
    try {
        const res = await axios.post(`${BASE_URL}/task`,taskData,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return res.data;
    } catch (error:any) {
        console.error("Error creating task:", error?.response?.data || error.message);
    throw error;
    }
} 

export const deleteTask = async(taskId: string) =>{
    const token = localStorage.getItem('token');
    try {
        const res = await axios.delete(`${BASE_URL}/task/${taskId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return res.data;
    } catch (error:any) {
        console.error("Error deleting task:", error?.response?.data || error.message);
    throw error;
    }
}