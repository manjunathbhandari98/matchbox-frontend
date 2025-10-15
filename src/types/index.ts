// Export types here
export interface RegisterData {
    fullName:string,
    username:string,
    email:string,
    password:string
}

// types/project.ts
export type ProjectStatus = "pending" | "in-progress" | "completed" | "upcoming";
export type ProjectPriority = "low" | "medium" | "high";

export interface Project {
  id: string;
  projectName: string;
  description: string;
  status: ProjectStatus;
  totalAssignedTasks: number;
  completedTasks: number;
  startDate: string;       // ISO date string
  dueDate: string;         // ISO date string
  priority: ProjectPriority;
  teamMembers: string[];
  completedPercentage: number;
  lastUpdated: string;     // ISO date string
}
