/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export const getNotifications = async(userId:string) =>{
    const token = localStorage.getItem('token');
    try{
        const res = await axios.get(`${BASE_URL}/notifications?userId=${userId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return res.data;
    }
     catch (error:any) {
            console.error("Error fetching notifications:", error?.response?.data || error.message);
        throw error; 
     }
}

export const markNotificationAsRead = async (id:string) =>{
const token = localStorage.getItem('token');
try {
    const res = await axios.post(`${BASE_URL}/notifications/${id}/read`,null,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
    return res.data;
} catch (error:any) {
            console.error("Error while marking notifications:", error?.response?.data || error.message);
        throw error; 
     }
}

export const acceptInvitation = async (invitationId: string, receiverId: string) => {
  const token = localStorage.getItem("token");
  return axios.post(`${BASE_URL}/team/invitations/${invitationId}/accept`, null, {
    params: { receiverId },
    headers: { Authorization: `Bearer ${token}` },
  });
};
