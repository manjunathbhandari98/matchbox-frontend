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
              icon={content.icon}
            />
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-[10fr_6fr] grid-cols-1 w-full mt-10 gap-4">
        {/* Active Projects Section */}
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-1">Active Projects</h2>
          <p className="text-sm text-gray-500 mb-6">
            Your ongoing projects and their progress
          </p>
          <ProjectList
            title="Active Projects"
            projects={Projects}
            layout="list"
          />

          <div className="flex flex-col w-full gap-6">
            {Projects.map((project, index) => (
              <div
                key={index}
                className="rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-3 bg-white"
              >
                {/* Project Header with Team */}
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-800">
                    {project.project}
                  </h3>
                  <div className="flex -space-x-2 items-center">
                    {project.teamMembers.slice(0, 3).map((member, idx) => (
                      <div
                        key={idx}
                        className="rounded-full w-8 h-8 flex items-center justify-center text-white font-medium text-sm bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-white"
                        title={member}
                      >
                        {member[0]}
                      </div>
                    ))}
                    {project.teamMembers.length > 3 && (
                      <div className="rounded-full w-8 h-8 flex items-center justify-center text-white font-medium text-sm bg-gray-400 border-2 border-white">
                        +{project.teamMembers.length - 3}
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Description */}
                <p className="text-sm text-gray-500">{project.desc}</p>

                {/* Tasks info */}
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex gap-1 items-center">
                    <span>{project.completedTask}</span>
                    <span>/</span>
                    <span>{project.totalAssignedTask}</span>
                  </div>
                  <span>{project.completedPercentage}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                    style={{ width: `${project.completedPercentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar / Summary Section */}
        <div className="flex flex-col gap-4">
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            {/* Header */}
            <div className="flex flex-col gap-1 mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
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
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <p className="text-gray-700 font-medium">{task.task}</p>
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
