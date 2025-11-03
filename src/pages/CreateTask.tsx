/* eslint-disable @typescript-eslint/no-explicit-any */
import { Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../app/store';
import CommonButton from '../components/ui/CommonButton';
import colors from '../constants/colors';
import { getProjectsByTeam } from '../services/projectService';
import { createTask } from '../services/taskService';
import { getTeams } from '../services/teamService';
import type {
  MemberResponse,
  Project,
  TaskRequest,
  TeamResponse,
} from '../types';

export const CreateTask = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<MemberResponse[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamResponse | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('LOW');
  const [status, setStatus] = useState<'TODO' | 'IN_PROGRESS' | 'COMPLETED'>(
    'TODO'
  );
  // const [tags, setTags] = useState<string[]>([]);
  // const [tagInput, setTagInput] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    dueDate: '',
  });

  // Fetch teams
  useEffect(() => {
    if (!currentUser) return;
    const fetchTeams = async () => {
      try {
        const res = await getTeams(currentUser.id);
        setTeams(res);
      } catch (err) {
        console.error('Error fetching teams:', err);
      }
    };
    fetchTeams();
  }, [currentUser]);

  // Fetch projects when team changes
  useEffect(() => {
    if (!selectedTeam) return;
    const fetchProjects = async () => {
      try {
        const res = await getProjectsByTeam(selectedTeam.id);
        setProjects(res);
      } catch (error) {
        console.error('Error fetching projects', error);
      }
    };
    fetchProjects();
  }, [selectedTeam]);

  // Form change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamChange = (teamId: string) => {
    const team = teams.find((t) => t.id === teamId) || null;
    setSelectedTeam(team);
    setTeamMembers(team?.members || []);
    setSelectedMembers([]);
    setSelectedProject(null);
    setProjects([]);
  };

  const handleProjectChange = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId) || null;
    setSelectedProject(project);
  };

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  // const addTag = () => {
  //   if (tagInput.trim() && !tags.includes(tagInput.trim())) {
  //     setTags([...tags, tagInput.trim()]);
  //     setTagInput('');
  //   }
  // };

  // const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !selectedProject || !selectedTeam) {
      toast.error('Please select team and project!');
      return;
    }

    const payload: TaskRequest = {
      title: formData.title,
      description: formData.description,
      status,
      priority,
      startDate: new Date(formData.startDate).toISOString(),
      dueDate: new Date(formData.dueDate).toISOString(),
      projectId: selectedProject.id,
      assignedToId: selectedMembers,
      createdById: currentUser.id,
      teamId: selectedTeam.id,
      parentTaskId: null,
      subtaskIds: [],
    };
    console.log(payload);

    try {
      await createTask(payload);
      toast.success('Task created successfully!');
      navigate('/tasks');
    } catch (err) {
      console.error('Error creating task:', err);
      toast.error('Failed to create task.');
    }
  };

  return (
    <div className="p-6 w-full bg-white dark:bg-zinc-900 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
        Create Task
      </h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-2 w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Task title..."
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-2 w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Task description..."
          />
        </div>

        {/* Team */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Team
          </label>
          <select
            value={selectedTeam?.id || ''}
            onChange={(e) => handleTeamChange(e.target.value)}
            className="mt-2 w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Select Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        {/* Project */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Project
          </label>
          <select
            value={selectedProject?.id || ''}
            onChange={(e) => handleProjectChange(e.target.value)}
            className="mt-2 w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {/* Members */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Assign Members
          </label>
          <div className="flex flex-wrap gap-2 bg-gray-50 dark:bg-zinc-800 p-3 rounded-xl border border-gray-300 dark:border-zinc-700">
            {teamMembers.length > 0 ? (
              teamMembers.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => toggleMember(member.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedMembers.includes(member.id)
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-600'
                  }`}
                >
                  <Users size={14} className="inline mr-1" />
                  {member.fullName}
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Select a team to choose members
              </p>
            )}
          </div>
        </div>

        {/* Status & Priority */}
        <div className="flex gap-4 w-full">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="mt-2 w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="mt-2 w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, startDate: e.target.value }))
              }
              className="mt-2 w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
              }
              className="mt-2 w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Tags */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags
          </label>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white flex items-center gap-1 text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="font-bold"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === 'Enter' && (e.preventDefault(), addTag())
              }
              placeholder="Add tag..."
              className="px-3 py-1 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-3 py-1 bg-blue-600 text-white rounded-xl"
            >
              Add
            </button>
          </div>
        </div> */}

        {/* Submit */}
        <CommonButton
          text="Create Task"
          type="submit"
          bgColor={colors.primary}
          borderColor={colors.primaryDark}
          size="lg"
        />
      </form>
    </div>
  );
};
