import { Funnel, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import CommonButton from '../components/ui/CommonButton';
import { PageTitle } from '../components/ui/PageTitle';
import colors from '../constants/colors';
import { Tasks as tasks } from '../data/tasks';
import type { Task } from '../types';

export const Tasks = () => {
  const [activeTab, setActiveTab] = useState<'my' | 'all'>('my');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatus, setActiveStatus] = useState('all');

  // Filtered tasks based on tab, search, and status
  const filteredTasks = tasks.filter((task) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'my' && task.assignedTo.includes('Alice')); // replace 'Alice' with logged-in user
    const matchesSearch =
      task.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.projectId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      activeStatus === 'all' || task.status === activeStatus;
    return matchesTab && matchesSearch && matchesStatus;
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
          rounded="md"
        />
      </div>

      {/* Tabs: My Tasks / All Tasks */}
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

      {/* Search + Filter Bar */}
      <div className="my-6 w-full flex items-center gap-3">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-full shadow-sm hover:shadow-md transition-all duration-200">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            className="w-full px-3 py-1 bg-transparent border-0 outline-0 text-gray-700 placeholder-gray-400"
            placeholder="Search projects..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Button */}
        <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 font-medium shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200">
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
                : 'bg-gray-100 text-gray-700 border-gray-300'
            } text-sm font-medium transition-all duration-200`}
          >
            {status.replace('-', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="flex flex-col gap-4">
        {filteredTasks.map((task: Task) => (
          <div
            key={task.id}
            className="rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-3 bg-white"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <h3 className="font-medium text-gray-800">{task.taskName}</h3>
                <p className="text-sm text-gray-500">{task.description}</p>
                <p className="text-xs text-gray-400">
                  Project: {task.projectId} | Due:{' '}
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
              {/* Assigned Members */}
              <div className="flex -space-x-2">
                {task.assignedTo.slice(0, 3).map((member, idx) => (
                  <div
                    key={idx}
                    className="rounded-full w-8 h-8 flex items-center justify-center text-white font-medium text-sm bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-white"
                    title={member}
                  >
                    {member[0]}
                  </div>
                ))}
                {task.assignedTo.length > 3 && (
                  <div className="rounded-full w-8 h-8 flex items-center justify-center text-white font-medium text-sm bg-gray-400 border-2 border-white">
                    +{task.assignedTo.length - 3}
                  </div>
                )}
              </div>
            </div>

            {/* Task Status & Priority */}
            <div className="flex justify-between items-center mt-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : task.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-700'
                      : task.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                }`}
              >
                {task.status.toUpperCase()}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  task.priority === 'high'
                    ? 'bg-red-100 text-red-700'
                    : task.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : task.priority === 'low'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                }`}
              >
                {task.priority} Priority
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  task.completedPercentage === 100
                    ? 'bg-green-500'
                    : 'bg-blue-500'
                }`}
                style={{ width: `${task.completedPercentage}%` }}
              ></div>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No tasks found.</p>
        )}
      </div>
    </div>
  );
};
