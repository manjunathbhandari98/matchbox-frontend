import { Award, TrendingUp } from 'lucide-react';
import { Card } from '../components/app-layout/Card';
import { Avatar } from '../components/ui/Avatar';
import { PageTitle } from '../components/ui/PageTitle';
import { ProgressBar } from '../components/ui/ProgressBar';
import { analytics } from '../data/analytics';

export const Analytics = () => {
  const teamMembers = [
    { name: 'Sarah Miller', tasks: 18, completed: 15, efficiency: 83 },
    { name: 'John Doe', tasks: 16, completed: 14, efficiency: 88 },
    { name: 'Alex Lee', tasks: 14, completed: 11, efficiency: 79 },
    { name: 'Rachel Kim', tasks: 12, completed: 10, efficiency: 83 },
  ];

  const projectStats = [
    { name: 'Website Redesign', completion: 65, onTime: 85 },
    { name: 'Mobile App', completion: 40, onTime: 70 },
    { name: 'Marketing Campaign', completion: 80, onTime: 95 },
    { name: 'API Integration', completion: 25, onTime: 60 },
  ];

  const taskStats = [
    { label: 'Tasks Completed', value: 32 },
    { label: 'New Tasks', value: 28 },
    { label: 'Overdue', value: 3 },
  ];

  return (
    <div className="p-4 flex flex-col gap-6 bg-blue-50 dark:bg-zinc-900 min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center w-full">
        <PageTitle
          title="Analytics"
          desc="Track team performance and project insights"
        />
      </div>

      {/* Analytics Cards */}
      <div className="mt-4 grid sm:grid-cols-4 grid-cols-2 gap-4">
        {analytics.map((analytic, idx) => (
          <Card
            key={idx}
            header={analytic.title}
            count={analytic.value}
            info={analytic.description}
            change={analytic.change}
            unit={analytic.unit}
          />
        ))}
      </div>

      {/* Team Performance & Project Progress */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Team Performance */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-sm">
          <PageTitle
            title="Team Performance"
            desc="Individual Member Productivity"
          />
          <div className="flex flex-col gap-6 mt-4">
            {teamMembers.map((member, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <Avatar name={member.name} size={8} />
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        {member.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {member.completed}/{member.tasks} Tasks Completed
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-center">
                    <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                      {member.efficiency}%
                    </h2>
                    <p className="text-gray-500 text-sm">Efficiency</p>
                  </div>
                </div>
                <ProgressBar
                  className="mt-2"
                  value={member.efficiency}
                  colorFrom="from-blue-400"
                  colorTo="to-blue-600"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Project Progress */}
        <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-sm">
          <PageTitle
            title="Project Progress"
            desc="Completion & On-time Delivery"
          />
          <div className="flex flex-col gap-6 mt-4">
            {projectStats.map((project, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    {project.name}
                  </h3>
                  <span className="text-gray-500 dark:text-gray-300 text-sm">
                    {project.completion}% Complete
                  </span>
                </div>
                <ProgressBar
                  value={project.completion}
                  colorFrom="from-green-400"
                  colorTo="to-green-600"
                />
                <div className="flex justify-between mt-1 text-sm text-gray-500">
                  <span>Completion</span>
                  <span>On Time: {project.onTime}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*  */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* This Week Performace */}
        <div className="rounded-xl p-5 bg-white dark:bg-zinc-800 shadow-md hover:shadow-lg transition-shadow duration-300">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-blue-500 w-6 h-6" />
            <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-200">
              This Week
            </h2>
          </div>

          {/* Task Stats */}
          <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-500">
            {taskStats.map((task, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-3 first:pt-0 last:pb-0"
              >
                <span className="text-gray-600 dark:text-gray-200 font-medium">
                  {task.label}
                </span>
                <span className="text-gray-900 dark:text-gray-300 font-bold text-xl">
                  {task.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performer */}
        <div className="rounded-xl p-5 bg-white dark:bg-zinc-800 shadow-md hover:shadow-lg transition-shadow duration-300">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <Award className="text-blue-500 w-6 h-6" />
            <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-200">
              Top Performer
            </h2>
          </div>

          {/* Performer Info */}
          <div className="flex items-center gap-4 mb-2">
            <Avatar name="John Doe" className="w-14 h-14" />
            <div className="flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                John Doe
              </h3>
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                88% efficiency
              </span>
            </div>
          </div>

          {/* Task Info */}
          <p className="text-gray-500 dark:text-gray-300 text-xs mb-3 mt-7">
            14 tasks completed this week
          </p>

          {/* Progress Bar */}
          <ProgressBar
            value={83}
            height={10}
            colorFrom="from-blue-400"
            colorTo="to-blue-600"
          />
        </div>

        {/* Overall health */}
        <div className="rounded-xl p-6 text-white bg-gradient-to-r from-blue-500 to-blue-400 shadow-lg w-80">
          {/* Title */}
          <h2 className="font-bold text-2xl text-white">Overall Health</h2>

          {/* Grade */}
          <h1 className="text-4xl text-center font-bold mb-1">A+</h1>
          <p className="text-sm mb-4 text-center">Excellent team performance</p>

          {/* Stats */}
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span>On-time delivery</span>
              <span className="font-semibold">92%</span>
            </div>
            <div className="flex justify-between">
              <span>Team satisfaction</span>
              <span className="font-semibold">4.8/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
