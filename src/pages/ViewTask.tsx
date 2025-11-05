import { format } from 'date-fns';
import {
  CheckCircle,
  Clock,
  Folder,
  MessageCircle,
  MoveLeft,
  Paperclip,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '../components/ui/Avatar';
import { getTaskBySlug, updateTaskStatus } from '../services/taskService';
import type { MemberResponse, TaskResponse } from '../types';

export const ViewTask = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<TaskResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await getTaskBySlug(slug as string);
        setTask(res);
      } catch (err) {
        toast.error('Failed to load task details.');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [slug]);

  const handleStatusChange = async (newStatus: string) => {
    if (!task) return;
    setUpdatingStatus(true);
    try {
      const updated = await updateTaskStatus(task.id, newStatus.toUpperCase());
      setTask({ ...task, status: updated.status });
      toast.success(`Task marked as ${newStatus.replace('_', ' ')}`);
    } catch {
      toast.error('Failed to update task status.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
        Loading task details...
      </p>
    );
  }

  if (!task) {
    return <p className="text-center text-red-500 mt-10">Task not found.</p>;
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 dark:bg-zinc-900 min-h-screen transition-all duration-300">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <MoveLeft size={20} />
        <span>Back</span>
      </button>

      {/* Header */}
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md mt-4 p-6 flex flex-col gap-3">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {task.title}
          </h1>

          {/* ✅ Status Dropdown */}
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={updatingStatus}
            className={`text-xs font-medium border rounded-full px-3 py-1 cursor-pointer transition-all
              ${
                task.status === 'COMPLETED'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-800'
                  : task.status === 'IN_PROGRESS'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-300 dark:border-blue-800'
                    : 'bg-gray-100 text-gray-700 dark:bg-zinc-700 dark:text-gray-300 border-gray-300 dark:border-zinc-600'
              }`}
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="REVIEW">Review</option>
            <option value="BLOCKED">Blocked</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <p className="text-gray-600 dark:text-gray-300">{task.description}</p>

        {/* Project & Priority */}
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Folder size={16} />
            <span>{task.projectName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>
              Due:{' '}
              {task.dueDate
                ? format(new Date(task.dueDate), 'MMM dd, yyyy')
                : 'No due date'}
            </span>
          </div>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              task.priority === 'HIGH'
                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                : task.priority === 'MEDIUM'
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            }`}
          >
            {task.priority} Priority
          </div>
        </div>
      </div>

      {/* Assigned Members */}
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md mt-6 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <Users size={18} /> Assigned To
        </h2>
        {task.assignedTo?.length ? (
          <div className="flex -space-x-3">
            {task.assignedTo
              .slice(0, 5)
              .map((member: MemberResponse) =>
                member.avatar ? (
                  <img
                    key={member.id}
                    src={member.avatar}
                    alt={member.fullName}
                    title={member.fullName}
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-800"
                  />
                ) : (
                  <Avatar key={member.id} name={member.fullName} />
                )
              )}
            {task.assignedTo.length > 5 && (
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 dark:bg-zinc-700 text-xs font-medium text-gray-800 dark:text-gray-100 border-2 border-white dark:border-zinc-800">
                +{task.assignedTo.length - 5}
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No assignees yet.
          </p>
        )}
      </div>

      {/* Subtasks */}
      {task.subtasks?.length > 0 && (
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md mt-6 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
            <CheckCircle size={18} /> Subtasks
          </h2>
          <ul className="space-y-2">
            {task.subtasks.map((sub) => (
              <li
                key={sub.id}
                className="flex justify-between items-center bg-gray-50 dark:bg-zinc-700 p-3 rounded-lg"
              >
                <span
                  className={`text-sm ${
                    sub.status === 'COMPLETED'
                      ? 'line-through text-gray-400 dark:text-gray-500'
                      : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {sub.title}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    sub.status === 'COMPLETED'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-200 text-gray-600 dark:bg-zinc-600 dark:text-gray-300'
                  }`}
                >
                  {sub.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Attachments */}
      {task.attachments?.length > 0 && (
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md mt-6 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
            <Paperclip size={18} /> Attachments
          </h2>
          <div className="flex flex-wrap gap-3">
            {task.attachments.map((file) => (
              <a
                key={file.id}
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className="bg-gray-100 dark:bg-zinc-700 px-4 py-2 rounded-lg text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-all"
              >
                {file.fileName || 'Attachment'}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Comments */}
      {task.comments?.length > 0 && (
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-md mt-6 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
            <MessageCircle size={18} /> Comments
          </h2>
          <div className="space-y-3">
            {task.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-50 dark:bg-zinc-700 p-3 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {'Author'}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {format(new Date(comment.createdAt), 'MMM dd, yyyy')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {comment.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meta info */}
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
        Created on {format(new Date(task.createdAt), "MMM dd, yyyy 'at' HH:mm")}
      </div>
    </div>
  );
};
