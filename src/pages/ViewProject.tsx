import {
  AlertTriangle,
  CalendarDays,
  CheckCircle,
  ClipboardList,
  Eye,
  Flag,
  ListTodo,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar } from '../components/ui/Avatar';
import { getProjectBySlug } from '../services/projectService';
import { getTaskByProjects } from '../services/taskService';
import { getTeamById } from '../services/teamService';
import type { ProjectResponse, TaskResponse, TeamResponse } from '../types';

export const ViewProjectPage = () => {
  const { slug } = useParams<string>();
  const [project, setProject] = useState<ProjectResponse>();
  const [assignedTeam, setAssignedTeam] = useState<TeamResponse>();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskResponse[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getProjectBySlug(slug as string);
        setProject(res);
      } catch (err) {
        console.error('Failed to fetch project', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await getTeamById(project?.teamId as string);
        setAssignedTeam(res);
      } catch (err) {
        console.error('Failed to fetch team', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [project]);

  useEffect(() => {
    const fetchProjectsByTask = async () => {
      try {
        const res = await getTaskByProjects(project?.id as string);
        setTasks(res);
      } catch (err) {
        console.error('Failed to fetch task', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsByTask();
  }, [project]);

  // Helper: color based on priority
  const priorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'text-red-500 dark:text-red-400';
      case 'MEDIUM':
        return 'text-yellow-500 dark:text-yellow-400';
      case 'LOW':
        return 'text-green-500 dark:text-green-400';
      default:
        return 'text-zinc-500 dark:text-zinc-400';
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'IN_PROGRESS':
        return <ClipboardList size={16} className="text-yellow-500" />;
      default:
        return <AlertTriangle size={16} className="text-zinc-500" />;
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-zinc-500 dark:text-zinc-400">
        Loading project details...
      </div>
    );
  if (!project)
    return (
      <div className="p-10 text-center text-red-500">Project not found.</div>
    );

  const formatDate = (date?: string) =>
    date
      ? new Date(date).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : '-';

  const progressWidth = `${project.progress}%`;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-zinc-200 dark:border-zinc-700 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {project.name}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
            {project.description}
          </p>
        </div>
        <div>
          <span
            className={`inline-block px-4 py-1 rounded-full text-sm font-semibold text-white ${
              project.status === 'COMPLETED'
                ? 'bg-green-600'
                : project.status === 'IN_PROGRESS'
                  ? 'bg-yellow-500 text-zinc-900'
                  : 'bg-zinc-500'
            }`}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: <Flag size={18} />,
            label: 'Priority',
            value: project.priority,
          },
          {
            icon: <Eye size={18} />,
            label: 'Visibility',
            value: project.visibility,
          },
          {
            icon: <ListTodo size={18} />,
            label: 'Team ID',
            value: assignedTeam?.name || '-',
          },
        ].map((item) => (
          <div
            key={item.label}
            className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 shadow-sm"
          >
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 mb-2">
              {item.icon} <span className="font-semibold">{item.label}</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Start Date', value: formatDate(project.startDate) },
          { label: 'Due Date', value: formatDate(project.dueDate) },
          { label: 'Completed Date', value: formatDate(project.completedDate) },
        ].map((date) => (
          <div
            key={date.label}
            className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 shadow-sm"
          >
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 mb-2">
              <CalendarDays size={18} />{' '}
              <span className="font-semibold">{date.label}</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">{date.value}</p>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="p-5 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
            <ListTodo size={18} /> Project Progress
          </h2>
          <span className="text-zinc-600 dark:text-zinc-400 font-medium">
            {project.progress}%
          </span>
        </div>

        {/* Custom progress bar */}
        <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-3 rounded-full overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all ${
              project.progress >= 80
                ? 'bg-green-500'
                : project.progress >= 50
                  ? 'bg-yellow-400'
                  : 'bg-red-500'
            }`}
            style={{ width: progressWidth }}
          ></div>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            Total Tasks:{' '}
            <span className="font-semibold text-zinc-800 dark:text-zinc-100">
              {project.totalTasks}
            </span>
          </p>
          <p>
            Assigned:{' '}
            <span className="font-semibold text-zinc-800 dark:text-zinc-100">
              {project.assignedTasks}
            </span>
          </p>
          <p>
            Completed:{' '}
            <span className="font-semibold text-zinc-800 dark:text-zinc-100">
              {project.completedTasks}
            </span>
          </p>
          <p
            className={
              project.overdueTasks > 0 ? 'text-red-500 font-semibold' : ''
            }
          >
            Overdue: {project.overdueTasks}
          </p>
        </div>
      </div>

      {/* Collaborators */}
      <div className="p-5 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
          <Users size={18} /> Collaborators
        </h2>

        {project.collaborators?.length ? (
          <div className="flex flex-wrap gap-4">
            {project.collaborators.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
              >
                {member.avatar ? (
                  <img
                    src={member.avatar || '/default-avatar.png'}
                    alt={member.fullName}
                    className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700"
                  />
                ) : (
                  <Avatar name={member.fullName} />
                )}

                <div>
                  <p className="font-medium text-zinc-800 dark:text-zinc-100">
                    {member.fullName}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {member.role || 'Member'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-500 dark:text-zinc-400">
            No collaborators assigned yet.
          </p>
        )}
      </div>
      {/* Tasks Section */}
      <div className="p-5 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
          <ListTodo size={18} /> Project Tasks
        </h2>

        {tasks.length > 0 ? (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    {statusIcon(task.status)}
                    <h3 className="text-zinc-800 dark:text-zinc-100 font-semibold">
                      {task.title}
                    </h3>
                  </div>
                  <span
                    className={`text-xs font-semibold ${priorityColor(task.priority)}`}
                  >
                    {task.priority}
                  </span>
                </div>
                {task.description && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-2">
                    {task.description}
                  </p>
                )}

                <div className="flex flex-wrap justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  <p>Status: {task.status}</p>
                  <p>Due: {formatDate(task.dueDate)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-500 dark:text-zinc-400">
            No tasks added to this project yet.
          </p>
        )}
      </div>

      {/* Footer Info */}
      <div className="text-sm text-zinc-500 dark:text-zinc-400 flex flex-wrap justify-between border-t border-zinc-200 dark:border-zinc-700 pt-4">
        <p>Created: {formatDate(project.createdAt)}</p>
        <p>Updated: {formatDate(project.updatedAt)}</p>
      </div>
    </div>
  );
};
