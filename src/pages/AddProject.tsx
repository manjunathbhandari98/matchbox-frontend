import { MoveLeft, Users } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddProject = () => {
  const navigate = useNavigate();

  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  // Mock Data (replace later with actual API data)
  const teams = ['Design Team', 'Development Team', 'Marketing Team'];
  const priorities = ['Low', 'Medium', 'High'];
  const teamMembers = [
    { id: 1, name: 'Aarav' },
    { id: 2, name: 'Priya' },
    { id: 3, name: 'Ravi' },
    { id: 4, name: 'Sneha' },
  ];

  const handleMemberToggle = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-6 w-full relative">
      <button
        onClick={() => navigate(-1)} // optional if using React Router
        className="flex items-center gap-2 px-4 py-2 my-4 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-colors shadow-sm"
      >
        <MoveLeft className="text-gray-700 dark:text-gray-300" size={20} />
        <span className="text-gray-800 dark:text-gray-200 font-medium">
          Go Back
        </span>
      </button>

      {/* Form */}

      <form className="space-y-5">
        {/* Project Name */}
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

        {/* Description */}
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

        {/* Select Team */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Team
          </label>
          <div className="flex items-center gap-2 mt-2">
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Choose a team</option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Select Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Priority
          </label>
          <div className="flex items-center gap-2 mt-2">
            {/* <Flag size={18} className="text-gray-500" /> */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Select priority</option>
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Select Members */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Members
          </label>
          <div className="flex flex-wrap gap-2 bg-gray-50 dark:bg-zinc-800 p-3 rounded-xl border border-gray-300 dark:border-zinc-700">
            {teamMembers.map((member) => (
              <button
                key={member.id}
                type="button"
                onClick={() => handleMemberToggle(String(member.id))}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedMembers.includes(String(member.id))
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-600'
                }`}
              >
                <Users size={14} className="inline mr-1" />
                {member.name}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl shadow-md transition-all duration-200"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};
