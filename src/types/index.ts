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
  slug:string;
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

export interface ProjectRequest {
  name: string;
  description: string;
  creatorId: string;
  teamId: string;
  collaboratorIds: string[];
  status: string;
  priority: string;
  visibility: string;
  startDate: string | null;
  dueDate: string | null;
}

export interface TaskRequest {
  title: string;
  description?: string;
  status?: "TODO" | "IN_PROGRESS" | "COMPLETED";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  startDate?: string; 
  dueDate?: string;
  progress?: number;
  projectId: string;
  assignedToId?: string[];
  createdById: string;
  teamId?: string;
  parentTaskId?: string | null;
  tags?: string[];
  subtaskIds?: string[];
}

export interface SubtaskResponse {
  id: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  progress: number;
}

export interface TaskAttachmentResponse {
  id: string;
  fileName: string;
  url: string;
  uploadedAt: string;
}

export interface TaskCommentResponse {
  id: string;
  message: string;
  authorId: string;
  createdAt: string;
}


export interface TaskResponse {
  id: string;
  title: string;
  slug:string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  startDate?: string;
  dueDate?: string;
  completedAt?: string;
  progress: number;
  projectId?: string;
  projectName?:string;
  assignedTo?: [];
  createdById?: string;
  teamId?: string;
  parentTaskId?: string;
  tags: string[];
  subtasks: SubtaskResponse[];
  attachments: TaskAttachmentResponse[];
  comments: TaskCommentResponse[];
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}


export interface CollaboratorResponse {
  id: string;
  fullName: string;
  avatar?: string;
  role?: string;
}

export interface ProjectResponse {
  id: string;
  name: string;
  slug: string;
  description: string;
  creatorId: string;
  teamId: string;
  collaborators: CollaboratorResponse[];
  status: string;
  priority: string;
  visibility: string;
  startDate: string;
  dueDate: string;
  completedDate?: string;
  progress: number;
  totalTasks: number;
  assignedTasks: number;
  completedTasks: number;
  overdueTasks: number;
  createdAt: string;
  updatedAt: string;
}

export interface DeadlineResponse {
  id:string;
  title:string;
  type:string;
  dueDate:string;
  name:string;
  completed:boolean;
}

// 📊 Analytics overview of user's activity
export interface AnalyticsOverviewResponse {
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  avgTimePerTask: number;
  activeMembers: number;
  taskChangeSinceLastMonth: number;
  timeImprovement: number;
}

// 👥 Team performance metrics
export interface TeamPerformanceResponse {
  memberId: string;
  fullName: string;
  avatar?: string;
  tasksCompleted: number;
  tasksAssigned: number;
  efficiency: number;
}

// 🧩 Project progress and delivery stats
export interface ProjectProgressResponse {
  projectId: string;
  projectName: string;
  completion: number; // percentage
  onTimeRate: number; // percentage
}

// 📅 Weekly summary of user activity
export interface WeeklySummaryResponse {
  tasksCompleted: number;
  newTasks: number;
  overdueTasks: number;
}

// 🏅 Top performer in user’s teams
export interface TopPerformerResponse {
  memberId: string;
  fullName: string;
  avatar?: string;
  efficiency: number;
  tasksCompletedThisWeek: number;
}

// ❤️ Overall health and satisfaction indicators
export interface OverallHealthResponse {
  grade: string;
  onTimeDelivery: number;
  teamSatisfaction: number;
  comment: string;
}
