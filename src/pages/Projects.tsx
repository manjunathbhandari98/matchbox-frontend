import { ArrowRight } from 'lucide-react';
import React from 'react';
import type { Project } from '../types';

interface ProjectListProps {
  projects: Project[];
  title?: string;
  className?: string;
  layout?: 'list' | 'grid';
}

const priorityColors: Record<string, string> = {
  High: 'bg-red-100 text-red-600 border-red-200',
  Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  Low: 'bg-green-100 text-green-600 border-green-200',
  Critical: 'bg-purple-100 text-purple-600 border-purple-200',
};

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  title,
  className,
  layout = 'list',
}) => {
  return (
    <div className={`w-full ${className || ''}`}>
      {title && (
        <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-4">
          {title}
        </h2>
      )}

      {/* Grid or List Layout */}
      <div
        className={
          layout === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'flex flex-col gap-6'
        }
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col gap-3 bg-white"
          >
            {/* Priority Indicator */}
            <div
              className={`absolute -top-2 left-4 px-3 py-1 text-xs font-medium border rounded-full shadow-sm ${
                priorityColors[project.priority] ||
                'bg-gray-100 text-gray-600 border-gray-200'
              }`}
            >
              {project.priority} Priority
            </div>

            {/* Project Header */}
            <div className="flex justify-between items-center mt-4">
              <h3 className="font-medium text-gray-800">
                {project.projectName}
              </h3>
              <div className="flex -space-x-2 items-center">
                {project.teamMembers
                  .slice(0, 3)
                  .map((member: string, idx: number) => (
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

            {/* Description */}
            <p className="text-sm text-gray-500">{project.description}</p>

            {/* Task Info */}
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div className="flex gap-1 items-center">
                <span>{project.completedTasks}</span>
                <span>/</span>
                <span>{project.totalAssignedTasks}</span>
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

            {/* View Project Button */}
            <div
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-400 
             text-center justify-center font-medium rounded-xl shadow-md cursor-pointer 
             transition-all duration-300 text-gray-800
             hover:shadow-lg active:scale-95 group"
            >
              <h2 className="text-sm sm:text-md tracking-wide">View Project</h2>
              <ArrowRight
                className="transition-transform duration-300 group-hover:translate-x-1"
                size={18}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
