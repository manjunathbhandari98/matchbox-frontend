import { Funnel, Grid, List, Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../app/store';
import NoProjectsSection from '../components/app-layout/NoProjectsSection';
import ProjectList from '../components/app-layout/ProjectList';
import CommonButton from '../components/ui/CommonButton';
import { PageTitle } from '../components/ui/PageTitle';
import colors from '../constants/colors';
import { getProjects } from '../services/projectService';
import type { ProjectResponse } from '../types';

export const Projects = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('In Progress');
  const [gridView, setGridView] = useState(true);
  const [projects, setProjects] = useState<ProjectResponse[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await getProjects(user.id);
      setProjects(res);
    };
    fetchProjects();
  }, [user]);

  const inProgressProjects = projects.filter((p) => p.status === 'IN_PROGRESS');
  const completedProjects = projects.filter((p) => p.status === 'COMPLETED');
  const pendingProjects = projects.filter((p) => p.status === 'PENDING');
  const upcomingProjects = projects.filter((p) => p.status === 'UPCOMMING');

  const tabs = ['In Progress', 'Pending', 'Completed', 'Upcomming'];

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center p-6">
        <div className="bg-blue-100 dark:bg-blue-900/40 p-6 rounded-full mb-6 shadow-sm">
          <Plus className="text-blue-600 dark:text-blue-400 w-10 h-10" />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          No Projects Yet
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
          You haven’t created any projects yet. Start by creating your first
          project to organize your work and collaborate easily.
        </p>

        <CommonButton
          text="Create New Project"
          icon={<Plus />}
          borderColor={colors.primaryDark}
          bgColor="blue"
          size="md"
          rounded="lg"
          onClick={() => navigate('/create-project')}
        />
      </div>
    );
  }

  return (
    <div className="relative p-2 text-gray-800 dark:text-gray-100">
      <div className="flex justify-between items-center">
        <PageTitle title="Projects" desc="Manage and Track All your projects" />
        <CommonButton
          text="New Project"
          icon={<Plus />}
          borderColor={colors.primaryDark}
          bgColor="blue"
          size="md"
          rounded="md"
          onClick={() => navigate('/create-project')}
        />
      </div>

      {/* Search + Filter */}
      <div className="my-6 w-full flex items-center gap-3">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl px-3 py-2 w-full shadow-sm hover:shadow-md transition-all duration-200">
          <Search size={20} className="text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            className="w-full px-3 py-1 bg-transparent border-0 outline-0 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="Search projects..."
          />
        </div>

        {/* Filter Button */}
        <button className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-gray-700 dark:text-gray-200 font-medium shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
          <Funnel size={18} className="text-gray-500 dark:text-gray-400" />
          <span>Filter</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="w-full mt-6">
        <div className="flex gap-2 items-center w-full">
          <div className="flex justify-start border-b border-gray-200 dark:border-gray-700 w-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-300 
                ${
                  activeTab === tab
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-purple-600 dark:bg-purple-400 rounded-t-md transition-all duration-300"></span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 bg-gray-100 dark:bg-zinc-800 p-1 rounded-xl shadow-sm">
            <button
              onClick={() => setGridView(true)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                gridView
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Grid size={18} />
            </button>

            <button
              onClick={() => setGridView(false)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                !gridView
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-5 bg-white dark:bg-zinc-900 p-5 shadow-sm transition-all duration-300">
          {activeTab === 'In Progress' &&
            (inProgressProjects.length > 0 ? (
              <ProjectList
                projects={inProgressProjects}
                layout={gridView ? 'grid' : 'list'}
              />
            ) : (
              <NoProjectsSection
                title="No In-Progress Projects"
                desc="You don’t have any active projects right now. Start a new one to begin tracking your work."
                onCreate={() => navigate('/create-project')}
              />
            ))}

          {activeTab === 'Pending' &&
            (pendingProjects.length > 0 ? (
              <ProjectList
                projects={pendingProjects}
                layout={gridView ? 'grid' : 'list'}
              />
            ) : (
              <NoProjectsSection
                title="No Pending Projects"
                desc="All caught up! Create a project and mark it as pending to plan ahead."
                onCreate={() => navigate('/create-project')}
              />
            ))}

          {activeTab === 'Completed' &&
            (completedProjects.length > 0 ? (
              <ProjectList
                projects={completedProjects}
                layout={gridView ? 'grid' : 'list'}
              />
            ) : (
              <NoProjectsSection
                title="No Completed Projects"
                desc="You haven’t completed any projects yet. Once you finish one, it will appear here."
                onCreate={() => navigate('/create-project')}
              />
            ))}

          {activeTab === 'Upcomming' &&
            (upcomingProjects.length > 0 ? (
              <ProjectList
                projects={upcomingProjects}
                layout={gridView ? 'grid' : 'list'}
              />
            ) : (
              <NoProjectsSection
                title="No Upcoming Projects"
                desc="No future projects yet. Plan ahead and create one to stay organized."
                onCreate={() => navigate('/create-project')}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
