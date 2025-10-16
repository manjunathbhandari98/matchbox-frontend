import { CheckCircle, Clock, FolderGit, Plus, TrendingUp } from 'lucide-react';
import { Card } from '../components/app-layout/Card';
import ProjectList from '../components/app-layout/ProjectList';
import CommonButton from '../components/ui/CommonButton';
import { PageTitle } from '../components/ui/PageTitle';
import colors from '../constants/colors';
import { Projects } from '../data/projects';

const Dashboard = () => {
  const cardContents = [
    {
      title: 'Totle Projects',
      count: 12,
      info: '+2 from last month',
      icon: <FolderGit size={18} />,
    },
    {
      title: 'Tasks Completed',
      count: 45,
      info: '+12% this week',
      icon: <CheckCircle size={18} />,
    },
    {
      title: 'In Progress',
      count: 18,
      info: 'Accross 5 projects',
      icon: <Clock size={18} />,
    },
    {
      title: 'Team Members',
      count: 18,
      info: 'Active Collabarator',
      icon: <TrendingUp size={18} />,
    },
  ];

  const upcommingDeadlines = [
    { task: '@8Miles Website Deploy', deadLine: '2 days' },
    { task: 'Spring review', deadLine: '5 days' },
    { task: 'Client Presentation', deadLine: '1 Week' },
  ];

  return (
    <div className="p-3">
      <div className="flex items-center justify-between p-2">
        <PageTitle
          title="Dashboard"
          desc="Welcome back! Here's what's happening today"
        />
        <CommonButton
          text="Create Project"
          icon={<Plus />}
          borderColor={colors.primaryDark}
          bgColor="blue"
          size="md"
          rounded="md"
        />
      </div>
      <div className="mt-8">
        <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
          {cardContents.map((content, index) => (
            <Card
              key={index}
              header={content.title}
              count={content.count}
              info={content.info}
            />
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-[10fr_6fr] grid-cols-1 w-full mt-10 gap-4">
        {/* Active Projects Section */}
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-md">
          <PageTitle
            title="Active Projects"
            desc="Your ongoing projects and their progress"
          />
          <ProjectList projects={Projects} layout="list" className="mt-7" />
        </div>

        {/* Sidebar / Summary Section */}
        <div className="flex flex-col gap-4">
          <div className="p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg">
            {/* Header */}
            <div className="flex flex-col gap-1 mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Upcoming Deadlines
              </h2>
              <p className="text-sm text-gray-500">
                Keep track of your ongoing projects and upcoming tasks
              </p>
            </div>

            {/* Tasks List */}
            <div className="flex flex-col gap-3">
              {upcommingDeadlines.map((task, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-zinc-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors duration-200"
                >
                  <p className="text-gray-700 dark:text-gray-100 font-medium">
                    {task.task}
                  </p>
                  <p className="text-sm text-gray-500">{task.deadLine}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
