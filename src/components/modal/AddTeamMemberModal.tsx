import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { PageTitle } from '../ui/PageTitle';

type AddTeamProps = {
  onClose: () => void;
};

export const AddTeamMemberModal = ({ onClose }: AddTeamProps) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-6 w-full max-w-md relative"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <PageTitle
            title="Create A Project"
            desc="Add a new project to organize your work"
          />
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            <X className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              className="mt-2 w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="e.g., Marketing Dashboard"
            />
          </div>

          <div>
            <label
              htmlFor="projectDesc"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              id="projectDesc"
              rows={3}
              className="mt-2 w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Briefly describe your project..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl shadow-md transition-all duration-200"
          >
            Create Project
          </button>
        </form>
      </motion.div>
    </div>
  );
};
