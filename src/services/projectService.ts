/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { ProjectRequest } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getProjects = async(userId:string) =>{
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get(`${BASE_URL}/project/user?userId=${userId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return res.data;
    } catch (error:any) {
        console.error("Error fetching projects:", error?.response?.data || error.message);
    throw error; 
    }
}

export const getProjectsByTeam = async(teamId: string) =>{
    const token = localStorage.getItem('token');
    try {
          const res = await axios.get(`${BASE_URL}/project/team/${teamId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return res.data;
    } catch (error:any) {
        console.error("Error fetching projects:", error?.response?.data || error.message);
    throw error; 
    }
}

export const getProjectBySlug = async (slug: string) =>{
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get(`${BASE_URL}/project/${slug}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return res.data;
  } catch (error:any) {
        console.error("Error fetching projects:", error?.response?.data || error.message);
    throw error;
  }
}

export const createProject = async (data: ProjectRequest) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.post(`${BASE_URL}/project`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error: any) {
    console.error('Error creating project: ', error?.response?.data || error.message);
    throw error; 
  }
};

