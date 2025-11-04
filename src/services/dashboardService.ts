import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = import.meta.env.VITE_API_URL;

export const getTotalProjectForUser = async (userId:string) =>{
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get(`${BASE_URL}/project/total-projects/${userId}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (error:any) {
        console.log('Failed to get count of total projects for user: ', error.response.message | error.message);
        throw new error;
    }
}


export const getTotalCompletedTaskForuser = async (userId:string) =>{
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get(`${BASE_URL}/task/total-task/completed/${userId}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (error:any) {
        console.log('Failed to get count of completed task: ', error.response.message | error.message);
        throw new error;
    }
}

export const getInProgressSummary = async (userId:string) =>{
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get(`${BASE_URL}/task/users/${userId}/tasks/in-progress/summary`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (error:any) {
        console.log('Failed to get summary of project progress: ', error.response.message | error.message);
        throw new error;
    }
}

export const getActiveMembersCount = async (userId:string) =>{
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get(`${BASE_URL}/team/users/${userId}/teams/active-members/count`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (error:any) {
        console.log('Failed to get count of active members: ', error.response.message | error.message);
        throw new error;
    }
}


export const getUpcomingDeadlines = async (userId:string) =>{
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get(`${BASE_URL}/dashboard/users/${userId}/upcoming-deadlines`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        return res.data;
    } catch (error:any) {
        console.log('Failed to fetch upcomming deadlines: ', error.response.message | error.message);
        throw new error;
    }
}