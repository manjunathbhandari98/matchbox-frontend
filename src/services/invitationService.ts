/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const inviteUserToPlatform = async (inviterId: string, email: string) => {
    const token = localStorage.getItem('token');
  try {
    const res = await axios.post(`${BASE_URL}/team/invite`, null, {
      params: { inviterId, email },
      headers:{ Authorization: `Bearer ${token}`}
    });
    return res.data;
  } catch (error: any) {
    console.error("Error inviting user to platform:", error);
    throw error.response?.data || "Failed to send invite";
  }
};

export const inviteMemberToTeam = async (teamId: string, userId: string) => {
    const token = localStorage.getItem('token');
  try {
    const res = await axios.post(`${BASE_URL}/team/${teamId}/invite`, null, {
      params: { userId },
      headers:{ Authorization: `Bearer ${token}`}
    });
    return res.data;
  } catch (error: any) {
    console.error("Error inviting member to team:", error);
    throw error.response?.data || "Failed to invite member";
  }
};

export const getAllInvitedMembers = async(senderId:string) =>{
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get(`${BASE_URL}/team/members/${senderId}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return res.data;
  } catch (error:any) {
     console.error("Error Fetching members:", error);
    throw error.response?.data || "Failed to Fetch Members";
  }
}