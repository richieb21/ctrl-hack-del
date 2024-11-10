import { useState } from "react";
import { Project } from "../constants/types";
import { api } from "../services/api";

interface ProjectStepProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ProjectStep = ({
  projects,
  setProjects,
  onNext,
  onBack,
}: ProjectStepProps) => {
  const [currentProject, setCurrentProject] = useState<Project>({
    name: "",
    date: "",
    description: [""],
    link: "",
  });

  const handleAddDescription = () => {
    setCurrentProject({
      ...currentProject,
      description: [...currentProject.description, ""],
    });
  };

  const handleRemoveDescription = (index: number) => {
    setCurrentProject({
      ...currentProject,
      description: currentProject.description.filter((_, i) => i !== index),
    });
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescription = [...currentProject.description];
    newDescription[index] = value;
    setCurrentProject({
      ...currentProject,
      description: newDescription,
    });
  };

  const handleAddProject = () => {
    if (currentProject.name && currentProject.date) {
      setProjects([...projects, currentProject]);
      setCurrentProject({
        name: "",
        date: "",
        description: [""],
        link: "",
      });
    }
  };

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.updateProjects(projects).then(() => {
      onNext();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1a3b63] mb-6">Projects</h2>

      {/* Current Projects List */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg bg-white shadow-sm relative"
          >
            <button
              type="button"
              onClick={() => handleRemoveProject(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
            <h3 className="font-semibold text-lg">{project.name}</h3>
            <p className="text-gray-600">{project.date}</p>
            <ul className="list-disc list-inside mt-2">
              {project.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2C74B3] hover:underline"
            >
              View Project
            </a>
          </div>
        ))}
      </div>

      {/* Add New Project Form */}
      <div className="p-4 border rounded-lg bg-gray-50">
        <h3 className="font-semibold mb-4">Add New Project</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
              value={currentProject.name}
              onChange={(e) =>
                setCurrentProject({ ...currentProject, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
              placeholder="e.g., Jan 2024"
              value={currentProject.date}
              onChange={(e) =>
                setCurrentProject({ ...currentProject, date: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Link
            </label>
            <input
              type="url"
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
              value={currentProject.link}
              onChange={(e) =>
                setCurrentProject({ ...currentProject, link: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description Points
            </label>
            {currentProject.description.map((desc, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
                  value={desc}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => handleRemoveDescription(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddDescription}
              className="text-[#2C74B3] hover:underline text-sm"
            >
              + Add Description Point
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddProject}
          className="mt-4 px-4 py-2 bg-[#2C74B3] text-white rounded-full hover:bg-[#205295]"
        >
          Add Project
        </button>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 text-[#2C74B3] hover:underline"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-8 py-3 text-lg font-semibold text-white bg-[#2C74B3] hover:bg-[#205295] rounded-full"
        >
          Next
        </button>
      </div>
    </form>
  );
};
