// Export types here
export interface RegisterData {
    fullName:string,
    username:string,
    email:string,
    password:string
}

// Theme type
export type Theme = 'LIGHT' | 'DARK';

// User role type
export type UserRole = 'USER' | 'ADMIN';


// Settings interface
export interface UserSettings {
  theme: Theme;
  emailNotifications: boolean;
  taskAssignmentNotifications: boolean;
  projectUpdateNotifications: boolean;
  commentsAndMentionNotifications: boolean;
  weeklySummary: boolean;
  twoFactorAuth: boolean;
}

// User interface
export interface UserType {
  fullName: string;
  username: string;
  email: string;
  bio?: string | null;
  active: boolean;
  lastSeen?: string | null; // ISO string from backend
  role: UserRole;
  settings: UserSettings;
}


// types/project.ts
export type Status = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "UPCOMMING";
export type Priority = "low" | "medium" | "high";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: Status;
  totalTasks: number;
  completedTasks: number;
  startDate: string;       // ISO date string
  dueDate: string;         // ISO date string
  priority: Priority;
  collaborators: string[];
  progress: number;
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

export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImg: string;
  joinedAt: string; // ISO date string
}

export interface ActiveProject {
  projectId: string;
  projectName: string;
  status: 'in-progress' | 'completed' | 'pending' | 'upcoming';
  progress: number; // 0–100
}

export interface Team {
  teamId: string;
  teamName: string;
  teamRole: string;
  description: string;
  members: Member[];
  activeProjects: ActiveProject[];
  totalMembers: number;
  totalProjects: number;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}
