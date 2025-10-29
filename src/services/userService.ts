/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getUserInfo = async (email: string) => {
  try {
    const token = localStorage.getItem("token"); 
    const res = await axios.get(`${BASE_URL}/user/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error:any) {
    console.error("Error fetching user info:", error?.response?.data || error.message);
    throw error; 
  }
};

export const updateUser = async (email: string, updatedData:any) =>{
  try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${BASE_URL}/user/update/${email}`,updatedData, {
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      return res.data;
    } catch (error:any) {
    console.error("Error fetching user info:", error?.response?.data || error.message);
    throw error; 
  }
}

export const updatePassword = async(email:string, updatePasswordData:any) =>{
  try {
    const token = localStorage.getItem('token');
    const res = await axios.put(`${BASE_URL}/user/update-password/${email}`,updatePasswordData,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return res.data;
  } catch (error:any) {
    console.error("Password Incorrect:", error?.response?.data || error.message);
    throw error; 
  }
}

export const searchUsers = async (query:string, currentUserId: string) =>{
try {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${BASE_URL}/user/search`,{
     params: { q: query, currentUserId },
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  return res.data;
} catch (error:any) {
   console.error("Password Incorrect:", error?.response?.data || error.message);
    throw error; 
}
}