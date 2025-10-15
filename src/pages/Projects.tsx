import { Funnel, Grid, List, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import ProjectList from '../components/app-layout/ProjectList';
import CommonButton from '../components/ui/CommonButton';
import { PageTitle } from '../components/ui/PageTitle';
import colors from '../constants/colors';
import { Projects as mockProjects } from '../data/projects';

export const Projects = () => {
  const [activeTab, setActiveTab] = useState('In Progress');
  const [gridView, setGridView] = useState(true);

  const inProgressProjects = mockProjects.filter(
    (project) => project.status == 'in-progress'
  );

  const completedProjects = mockProjects.filter(
    (project) => project.status === 'completed'
  );
  const pendingProjects = mockProjects.filter(
    (project) => project.status === 'pending'
  );
  const upcommingProjects = mockProjects.filter(
    (project) => project.status === 'upcoming'
  );

  const tabs = ['In Progress', 'Pending', 'Completed', 'Upcomming'];
  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <PageTitle title="Projects" desc="Manage and Track All your projects" />
        <CommonButton
          text="New Project"
          icon={<Plus />}
          borderColor={colors.primaryDark}
          bgColor="blue"
          size="md"
          rounded="md"
        />
      </div>
      <div className="my-6 w-full flex items-center gap-3">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-full shadow-sm hover:shadow-md transition-all duration-200">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            className="w-full px-3 py-1 bg-transparent border-0 outline-0 text-gray-700 placeholder-gray-400"
            placeholder="Search projects..."
          />
        </div>

        {/* Filter Button */}
        <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 font-medium shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200">
          <Funnel size={18} className="text-gray-500" />
          <span>Filter</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="w-full mt-6">
        {/* Tabs Header */}
        <div className="flex gap-2 items-center w-full">
          <div className="flex justify-start border-b border-gray-200 w-full">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-300 
              ${
                activeTab === tab
                  ? 'text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-purple-600 rounded-t-md transition-all duration-300"></span>
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 bg-gray-100 p-1 rounded-xl shadow-sm">
            <button
              onClick={() => setGridView(true)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                gridView
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid size={18} />
            </button>

            <button
              onClick={() => setGridView(false)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                !gridView
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-5 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm transition-all duration-300">
          {activeTab === 'In Progress' && (
            <ProjectList
              projects={inProgressProjects}
              layout={gridView ? 'grid' : 'list'}
            />
          )}
          {activeTab === 'Pending' && (
            <ProjectList
              projects={pendingProjects}
              layout={gridView ? 'grid' : 'list'}
            />
          )}
          {activeTab === 'Completed' && (
            <ProjectList
              projects={completedProjects}
              layout={gridView ? 'grid' : 'list'}
            />
          )}
          {activeTab === 'Upcomming' && (
            <ProjectList
              projects={upcommingProjects}
              layout={gridView ? 'grid' : 'list'}
            />
          )}
        </div>
      </div>
    </div>
  );
};
