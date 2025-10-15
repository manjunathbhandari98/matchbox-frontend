import { ArrowRight } from 'lucide-react';
import React from 'react';
import type { Project } from '../../types';

interface ProjectListProps {
  projects: Project[];
  title?: string;
  className?: string;
  layout?: 'list' | 'grid';
}

const priorityStyles: Record<
  string,
  { bar: string; badge: string; text: string }
> = {
  high: {
    bar: 'bg-red-500',
    badge: 'bg-red-100 border-red-200',
    text: 'text-red-600',
  },
  medium: {
    bar: 'bg-yellow-400',
    badge: 'bg-yellow-100 border-yellow-200',
    text: 'text-yellow-700',
  },
  low: {
    bar: 'bg-green-500',
    badge: 'bg-green-100 border-green-200',
    text: 'text-green-600',
  },
  critical: {
    bar: 'bg-purple-500',
    badge: 'bg-purple-100 border-purple-200',
    text: 'text-purple-600',
  },
  default: {
    bar: 'bg-gray-400',
    badge: 'bg-gray-100 border-gray-200',
    text: 'text-gray-600',
  },
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

      <div
        className={
          layout === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'flex flex-col gap-6'
        }
      >
        {projects.map((project, index) => {
          const style =
            priorityStyles[project.priority] || priorityStyles.Default;

          return (
            <div
              key={index}
              className="relative rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-3 bg-white"
            >
              {/* Priority Color Bar */}
              <div
                className={`absolute top-0 left-0 w-full h-1.5 rounded-t-xl ${style.bar}`}
              ></div>

              {/* Priority Badge */}
              <div
                className={`absolute -top-3 right-4 px-3 py-1 text-xs font-medium border rounded-full shadow-sm ${style.badge} ${style.text}`}
              >
                {project.priority} Priority
              </div>

              {/* Header */}
              <div className="flex justify-between items-center mt-4">
                <h3 className="font-medium text-gray-800">
                  {project.projectName}
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

              {/* View Button */}
              <div
                className="group flex items-center gap-2 px-4 py-2 mt-2 bg-gray-100 border border-gray-300 
             justify-center font-medium rounded-xl shadow-sm cursor-pointer 
             transition-all duration-300 text-gray-700
             hover:bg-gray-200 hover:shadow-md active:scale-95"
              >
                <h2 className="text-sm sm:text-md tracking-wide">
                  View Project
                </h2>
                <ArrowRight
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  size={18}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectList;
