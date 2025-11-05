import { Award, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { Card } from '../components/app-layout/Card';
import { Avatar } from '../components/ui/Avatar';
import { PageTitle } from '../components/ui/PageTitle';
import { ProgressBar } from '../components/ui/ProgressBar';
import {
  getOverallHealth,
  getOverview,
  getProjectProgress,
  getTeamPerformance,
  getTopPerformer,
  getWeeklySummary,
} from '../services/analyticsService';
import type {
  AnalyticsOverviewResponse,
  OverallHealthResponse,
  ProjectProgressResponse,
  TeamPerformanceResponse,
  TopPerformerResponse,
  WeeklySummaryResponse,
} from '../types';

export const Analytics = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [overview, setOverview] = useState<AnalyticsOverviewResponse>();
  const [teamPerformance, setTeamPerformance] = useState<
    TeamPerformanceResponse[]
  >([]);
  const [projectProgress, setProjectProgress] = useState<
    ProjectProgressResponse[]
  >([]);
  const [weeklySummary, setWeeklySummary] = useState<WeeklySummaryResponse>();
  const [topPerformer, setTopPerformer] = useState<TopPerformerResponse>();
  const [overallHealth, setOverallHealth] = useState<OverallHealthResponse>();

  // const teamMembers = [
  //   { name: 'Sarah Miller', tasks: 18, completed: 15, efficiency: 83 },
  //   { name: 'John Doe', tasks: 16, completed: 14, efficiency: 88 },
  //   { name: 'Alex Lee', tasks: 14, completed: 11, efficiency: 79 },
  //   { name: 'Rachel Kim', tasks: 12, completed: 10, efficiency: 83 },
  // ];

  // const projectStats = [
  //   { name: 'Website Redesign', completion: 65, onTime: 85 },
  //   { name: 'Mobile App', completion: 40, onTime: 70 },
  //   { name: 'Marketing Campaign', completion: 80, onTime: 95 },
  //   { name: 'API Integration', completion: 25, onTime: 60 },
  // ];

  const taskStats = [
    { label: 'Tasks Completed', value: weeklySummary?.tasksCompleted },
    { label: 'New Tasks', value: weeklySummary?.newTasks },
    { label: 'Overdue', value: weeklySummary?.overdueTasks },
  ];

  useEffect(() => {
    if (!user?.id) return;

    // const fetchOverview = async () => {
    //   try {
    //     const data = await getOverview(user.id);
    //     setOverview(data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    (async () => {
      const [ov, tp, pp, ws, tpf, oh] = await Promise.all([
        getOverview(user.id),
        getTeamPerformance(user.id),
        getProjectProgress(user.id),
        getWeeklySummary(user.id),
        getTopPerformer(user.id),
        getOverallHealth(user.id),
      ]);

      setOverview(ov);
      setTopPerformer(tpf);
      setProjectProgress(pp);
      setWeeklySummary(ws);
      setTeamPerformance(tp);
      setOverallHealth(oh);
    })();
  }, [user]);

  const analytics = [
    {
      title: 'Total Tasks',
      value: overview?.totalTasks,
      change: overview?.taskChangeSinceLastMonth,
      description: 'from last month',
    },
    {
      title: 'Completion Rate',
      value: overview?.completedTasks,
      unit: '%',
      description: 'Overall completion rate',
    },
    {
      title: 'Avg Time/Task',
      value: overview?.avgTimePerTask,
      unit: 'days',
      change: overview?.timeImprovement,
      description: 'Improvement compared to last month',
    },
    {
      title: 'Active Members',
      value: overview?.activeMembers,
      projects: 12,
      description: 'Across active projects',
    },
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
            change={analytic.change?.toString()}
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
            {teamPerformance.map((member, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <Avatar name={member.fullName} size={8} />
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        {member.fullName}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {member.tasksCompleted}/{member.tasksAssigned} Tasks
                        Completed
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-center">
                    <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                      {member.efficiency?.toFixed(0)}%
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
            {projectProgress.map((project, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">
                    {project.projectName}
                  </h3>
                  <span className="text-gray-500 dark:text-gray-300 text-sm">
                    {project.completion.toFixed(0)}% Complete
                  </span>
                </div>
                <ProgressBar
                  value={project.completion}
                  colorFrom="from-green-400"
                  colorTo="to-green-600"
                />
                <div className="flex justify-between mt-1 text-sm text-gray-500">
                  <span>Completion</span>
                  <span>On Time: {project.onTimeRate}%</span>
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
            <Avatar
              name={topPerformer?.fullName || 'Unknown'}
              className="w-14 h-14"
            />
            <div className="flex flex-col">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                {topPerformer?.fullName}
              </h3>
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                {topPerformer?.efficiency?.toFixed(0)}% efficiency
              </span>
            </div>
          </div>

          {/* Task Info */}
          <p className="text-gray-500 dark:text-gray-300 text-xs mb-3 mt-7">
            {topPerformer?.tasksCompletedThisWeek} tasks completed this week
          </p>

          {/* Progress Bar */}
          <ProgressBar
            value={topPerformer?.efficiency || 0}
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
          <h1 className="text-4xl text-center font-bold mb-1">
            {overallHealth?.grade}
          </h1>
          <p className="text-sm mb-4 text-center">Excellent team performance</p>

          {/* Stats */}
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span>On-time delivery</span>
              <span className="font-semibold">
                {overallHealth?.onTimeDelivery.toFixed(0)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Team satisfaction</span>
              <span className="font-semibold">
                {overallHealth?.teamSatisfaction}/5
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
