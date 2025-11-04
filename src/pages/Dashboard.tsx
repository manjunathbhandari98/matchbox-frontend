import { CheckCircle, Clock, FolderGit, Plus, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../app/store';
import { Card } from '../components/app-layout/Card';
import ProjectList from '../components/app-layout/ProjectList';
import { AddProjectModal } from '../components/modal/AddProjectModal';
import CommonButton from '../components/ui/CommonButton';
import { PageTitle } from '../components/ui/PageTitle';
import colors from '../constants/colors';
import {
  getActiveMembersCount,
  getInProgressSummary,
  getTotalCompletedTaskForuser,
  getTotalProjectForUser,
  getUpcomingDeadlines,
} from '../services/dashboardService';
import { getProjects } from '../services/projectService';
import type { DeadlineResponse, ProjectResponse } from '../types';

const Dashboard = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const [totalProjects, setTotalProjects] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [inProgressSummary, setInProgressSummary] = useState<{
    totalInProgressTasks: number;
    totalProjects: number;
  }>();
  const [activeMembers, setActiveMembers] = useState(0);
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [deadlines, setDeadlines] = useState<DeadlineResponse[]>([]);

  useEffect(() => {
    const fetchTotalProjects = async () => {
      try {
        const data = await getTotalProjectForUser(currentUser.id);
        setTotalProjects(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTotalCompletedTasks = async () => {
      try {
        const data = await getTotalCompletedTaskForuser(currentUser.id);
        setCompletedTasks(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchInProgressSummary = async () => {
      try {
        const data = await getInProgressSummary(currentUser.id);
        setInProgressSummary(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchActiveMembersCount = async () => {
      try {
        const data = await getActiveMembersCount(currentUser.id);
        setActiveMembers(data.activeMembers);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchProjects = async () => {
      try {
        const data = await getProjects(currentUser.id);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDeadlines = async () => {
      try {
        const data = await getUpcomingDeadlines(currentUser.id);
        setDeadlines(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTotalProjects();
    fetchTotalCompletedTasks();
    fetchInProgressSummary();
    fetchActiveMembersCount();
    fetchProjects();
    fetchDeadlines();
  }, [currentUser]);

  const cardContents = [
    {
      title: 'Totle Projects',
      count: totalProjects,
      info: 'All Active Projects',
      icon: <FolderGit size={18} />,
    },
    {
      title: 'Tasks Completed',
      count: completedTasks,
      info: 'Completed across all projects',
      icon: <CheckCircle size={18} />,
    },
    {
      title: 'In Progress',
      count: inProgressSummary?.totalInProgressTasks,
      info: ` Accross ${inProgressSummary?.totalProjects} projects`,
      icon: <Clock size={18} />,
    },
    {
      title: 'Team Members',
      count: activeMembers,
      info: 'Active Collabarator',
      icon: <TrendingUp size={18} />,
    },
  ];

  const [projectModalOpen, setProjectModalOpen] = useState(false);

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
          onClick={() => navigate('/create-project')}
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
          <ProjectList projects={projects} layout="list" className="mt-7" />
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
              {deadlines.length > 0 ? (
                deadlines.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-200"
                  >
                    {/* Left section: Title and type */}
                    <div className="flex flex-col">
                      <p className="text-zinc-800 dark:text-zinc-100 font-medium">
                        {item.title}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {item.type === 'PROJECT' ? 'Project' : 'Task'}
                        {item.name ? ` · ${item.name}` : ''}
                      </p>
                    </div>

                    {/* Right section: Due date */}
                    <div className="text-right">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                        {new Date(item.dueDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </p>
                      <p
                        className={`text-xs ${
                          new Date(item.dueDate) < new Date()
                            ? 'text-red-500 dark:text-red-400'
                            : 'text-zinc-500 dark:text-zinc-400'
                        }`}
                      >
                        {new Date(item.dueDate) < new Date()
                          ? 'Overdue'
                          : 'Due soon'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-zinc-500 dark:text-zinc-400 py-4 text-sm">
                  No upcoming deadlines 🎉
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {projectModalOpen && (
        <AddProjectModal onClose={() => setProjectModalOpen(false)} />
      )}
    </div>
  );
};

export default Dashboard;
