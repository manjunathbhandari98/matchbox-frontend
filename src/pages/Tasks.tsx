import { Funnel, Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../app/store';
import CommonButton from '../components/ui/CommonButton';
import { PageTitle } from '../components/ui/PageTitle';
import colors from '../constants/colors';
import { getAllTasksFromMyProjects, getMyTasks } from '../services/taskService';
import type { TaskResponse } from '../types';

export const Tasks = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'my' | 'all'>('my');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatus, setActiveStatus] = useState<'all' | string>('all');
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch tasks when currentUser or activeTab changes
  useEffect(() => {
    if (!currentUser) return;

    const fetchTasks = async () => {
      setLoading(true);
      try {
        let data: TaskResponse[] = [];
        if (activeTab === 'my') {
          data = await getMyTasks(currentUser.id);
        } else {
          data = await getAllTasksFromMyProjects(currentUser.id);
        }
        setTasks(data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [currentUser, activeTab]);

  // Filter tasks based on tab, search, and status
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      activeStatus === 'all' ||
      task.status.toLowerCase() === activeStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    'all',
    'in-progress',
    'completed',
    'pending',
    'upcoming',
  ];

  return (
    <div className="p-3 flex flex-col gap-4">
      {/* Page header */}
      <div className="flex justify-between items-center w-full">
        <PageTitle title="Tasks" desc="Manage all your tasks efficiently" />
        <CommonButton
          text="Add Task"
          icon={<Plus />}
          borderColor={colors.primaryDark}
          bgColor={colors.primary}
          size="md"
          onClick={() => navigate('/create-task')}
          rounded="md"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-300 mb-4">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'my' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('my')}
        >
          My Tasks
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'all' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('all')}
        >
          All Tasks
        </button>
      </div>

      {/* Search + Filter */}
      <div className="my-6 w-full flex items-center gap-3">
        <div className="flex items-center bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 w-full shadow-sm hover:shadow-md transition-all duration-200">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            className="w-full px-3 py-1 bg-transparent border-0 outline-0 text-gray-700 placeholder-gray-400"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-gray-700 dark:text-gray-200 font-medium shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all duration-200">
          <Funnel size={18} className="text-gray-500" />
          <span>Filter</span>
        </button>
      </div>

      {/* Status Selector */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`px-3 py-1 rounded-full border ${
              activeStatus === status
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-700'
            } text-sm font-medium transition-all duration-200`}
          >
            {status.replace('-', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {/* Task List */}
      {loading ? (
        <p className="text-center text-gray-500 mt-4">Loading tasks...</p>
      ) : filteredTasks.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="rounded-xl p-4 border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-3 bg-white dark:bg-zinc-800"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-200">
                    {task.description}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-200">
                    Project: {task.projectId} | Due: {task.dueDate}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.status === 'completed'.toUpperCase()
                      ? 'bg-green-100 text-green-700'
                      : task.status === 'in-progress'.toUpperCase()
                        ? 'bg-blue-100 text-blue-700'
                        : task.status === 'pending'.toUpperCase()
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {task.status.toUpperCase()}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'HIGH'
                      ? 'bg-red-100 text-red-700'
                      : task.priority === 'MEDIUM'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                  }`}
                >
                  {task.priority} Priority
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">No tasks found.</p>
      )}
    </div>
  );
};
