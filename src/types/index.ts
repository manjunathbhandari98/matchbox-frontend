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
  id:string;
  fullName: string;
  username: string;
  email: string;
  avatar?:string;
  bio?: string | null;
  invitationStatus?:'PENDING'|'NONE'|'ACCEPTED'|'REJECTED';
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


export interface ActiveProject {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
export interface MemberResponse {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatar: string | null;
  bio?: string;
  active: boolean;
  lastSeen?: string | null;
  role: 'ADMIN' | 'USER'; // system-level role
  teamRole: 'TEAM_LEAD' | 'DEVELOPER' | 'DESIGNER' | 'TESTER' | 'MANAGER'; // role within the team
  invitationStatus: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'SELF';
}

export type TeamRole = "TEAM_LEAD" | "DEVELOPER" | "DESIGNER" | "TESTER" | "MANAGER";

export interface MemberRequest {
  id: string;
  role: TeamRole
}

export interface TeamResponse {
  id: string;
  name: string;
  description: string;
  avatar: string;
  createdBy: string;
  members: MemberResponse[];
  projects?: Project[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface TeamRequest {
  id?: string;
  name: string;
  description: string;
  avatar: string;
  createdBy: string;
  members: MemberRequest[];
}

export interface NotificationType {
  id: string;
  type: string;
  title: string;
  message: string;
  createdAt: string;
  isRead?: boolean;
  invitationId?: string;
}
