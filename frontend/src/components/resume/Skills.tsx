import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { AVAILABLE_SKILLS } from "../../constants/onboarding";

const Skills = () => {
  const [skills, setSkills] = useState(AVAILABLE_SKILLS);

  const removeSkill = (skillName: string) => {
    setSkills(skills.filter((s) => s.name !== skillName));
  };

  return (
    <div className="bg-l-blue m-5 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faWrench} className="text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-lg text-sm border border-gray-100 hover:bg-white transition-colors"
          >
            <skill.icon className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">{skill.name}</span>
            <button
              type="button"
              onClick={() => removeSkill(skill.name)}
              className="ml-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
