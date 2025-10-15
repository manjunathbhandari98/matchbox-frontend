// Export types here
export interface RegisterData {
    fullName:string,
    username:string,
    email:string,
    password:string
}

// types/project.ts
export type Status = "pending" | "in-progress" | "completed" | "upcoming";
export type Priority = "low" | "medium" | "high";

export interface Project {
  id: string;
  projectName: string;
  description: string;
  status: Status;
  totalAssignedTasks: number;
  completedTasks: number;
  startDate: string;       // ISO date string
  dueDate: string;         // ISO date string
  priority: Priority;
  teamMembers: string[];
  completedPercentage: number;
  lastUpdated: string;     // ISO date string
}


export interface Task {
  id: string;
  taskName: string;
  description: string;
  projectId: string;
  priority: Priority;
  status: Status;
  assignedTo: string[];   // team members
  createdDate: string;     // ISO date string
  dueDate: string;         // ISO date string
  completedPercentage: number;
  lastUpdated: string;     // ISO date string
}