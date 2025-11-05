/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

//  Helper to get authorization headers
const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

//  Get user overview
export const getOverview = async (userId: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/analytics/overview/${userId}`, authHeaders());
    return res.data;
  } catch (error: any) {
    console.error("Error fetching overview:", error?.response?.data || error.message);
    throw error;
  }
};

//  Get team performance
export const getTeamPerformance = async (userId: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/analytics/team-performance/${userId}`, authHeaders());
    return res.data;
  } catch (error: any) {
    console.error("Error fetching team performance:", error?.response?.data || error.message);
    throw error;
  }
};

//  Get project progress
export const getProjectProgress = async (userId: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/analytics/project-progress/${userId}`, authHeaders());
    return res.data;
  } catch (error: any) {
    console.error("Error fetching project progress:", error?.response?.data || error.message);
    throw error;
  }
};

// Get weekly summary
export const getWeeklySummary = async (userId: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/analytics/weekly-summary/${userId}`, authHeaders());
    return res.data;
  } catch (error: any) {
    console.error("Error fetching weekly summary:", error?.response?.data || error.message);
    throw error;
  }
};

//  Get top performer
export const getTopPerformer = async (userId: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/analytics/top-performer/${userId}`, authHeaders());
    return res.data;
  } catch (error: any) {
    console.error("Error fetching top performer:", error?.response?.data || error.message);
    throw error;
  }
};

//  Get overall health stats
export const getOverallHealth = async (userId: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/analytics/overall-health/${userId}`, authHeaders());
    return res.data;
  } catch (error: any) {
    console.error("Error fetching overall health:", error?.response?.data || error.message);
    throw error;
  }
};
