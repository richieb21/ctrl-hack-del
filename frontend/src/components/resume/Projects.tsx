import { useState } from "react";
import { Project } from "../../constants/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPen, faRocket } from "@fortawesome/free-solid-svg-icons";

const Projects = ({ projects }: { projects: Project[] }) => {
  const [isEditingProjects, setIsEditingProjects] = useState(false);

  const handleEditProjects = () => {
    setIsEditingProjects(!isEditingProjects);
  };

  return (
    <div className="bg-l-blue m-5 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faRocket} className="text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
        </div>
      </div>

      {isEditingProjects ? (
        <div className="space-y-3 max-w-2xl">
          <input
            type="text"
            placeholder="Project Name"
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <input
            type="text"
            placeholder="Date"
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <input
            type="text"
            placeholder="Project Link"
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <textarea
            placeholder="Description points (one per line)"
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm min-h-[80px]"
          />
          <button
            onClick={handleEditProjects}
            className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="relative group">
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {project.name}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <FontAwesomeIcon icon={faLink} className="text-sm" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{project.date}</p>
                  <ul className="mt-2 space-y-1">
                    {project.description.map((point, idx) => (
                      <li key={idx} className="text-gray-600 flex items-start">
                        <span className="mr-2 text-blue-500">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/50 rounded-full"
                  onClick={handleEditProjects}
                >
                  <FontAwesomeIcon
                    icon={faPen}
                    className="text-gray-400 hover:text-gray-600"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
