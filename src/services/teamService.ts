/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { TeamRequest } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const createTeam = async(data:TeamRequest) =>{
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

export const deleteTeam = async(userId:string, teamId:string) =>{
    const token = localStorage.getItem('token');
    try {
        const res = await axios.delete(`${BASE_URL}/team/delete`,{
            params:{
                creatorId:userId,
                teamId:teamId
            },
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return res.data;
    }  catch (error:any) {
    console.error("Error deleting team:", error?.response?.data || error.message);
    throw error;
    }
}

export const getTeamById = async(teamId:string) =>{
    const token = localStorage.getItem("token");
    try {
        const res = await axios.get(`${BASE_URL}/team/${teamId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return res.data;
    }  catch (error:any) {
    console.error("Error fetching team:", error?.response?.data || error.message);
    throw error;
    }
}
export const updateTeam = async (teamId: string, formData: FormData) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.put(`${BASE_URL}/team/update/${teamId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', 
      },
    });
    return res.data;
  } catch (error: any) {
    console.error('Error updating team:', error?.response?.data || error.message);
    throw error;
  }
};


export const removeTeamMember = async(teamId:string , memberId:string) =>{
    const token = localStorage.getItem('token')
    try {
        await axios.delete(`${BASE_URL}/team/delete-member`,{
            params:{
                teamId,memberId
            },
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    } catch (error:any) {
        console.error("Error removing member",error?.response?.data || error.message);
        throw error;
        
    }
}

export const updateMemberRole = async(teamId:string, memberId:string, role:string) =>{
    const token = localStorage.getItem('token');
try {
    const res = await axios.put(`${BASE_URL}/team/update-role`,role,{
        params:{
            teamId, memberId
        },
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return res.data;
}catch (error:any) {
        console.error("Error updating member",error?.response?.data || error.message);
        throw error;
}
}

export const addTeamMember = async(teamId:string, request:{ memberId:string, role:string}) =>{
    const token = localStorage.getItem('token');
    try {
        const res = await axios.post(`${BASE_URL}/team/add-member?teamId=${teamId}`,
            request,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch  (error:any) {
        console.error("Error adding member",error?.response?.data || error.message);
        throw error;
    }
}