import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import {
	SiJavascript,
	SiPython,
	SiReact,
	SiVuedotjs,
	SiAngular,
	SiNodedotjs,
	SiTypescript,
	SiRuby,
	SiGo,
	SiDocker,
	SiKubernetes,
	SiMongodb,
	SiPostgresql,
  } from "react-icons/si";
  import { FaJava } from "react-icons/fa";
import { api } from "../../services/api";

const Skills = ({ skills } : {skills: {language: string[]; framework: string[]; tool: string[]; other: string[];}}) => {
	const [skillArr, setSkillsArr] = useState([
		...skills.language,
		...skills.framework,
		...skills.tool,
		...skills.other
	  ]);

	const skill_icons = {
		"JavaScript": SiJavascript,
		"Python": SiPython,
		"React": SiReact,
		"Vue.js": SiVuedotjs,
		"Angular": SiAngular,
		"Node.js": SiNodedotjs,
		"TypeScript": SiTypescript,
		"Ruby": SiRuby,
		"Go": SiGo,
		"Java": FaJava,
		"Docker": SiDocker,
		"Kubernetes": SiKubernetes,
		"MongoDB": SiMongodb,
		"PostgreSQL": SiPostgresql
	}

	const skill_type: { [key: string]: string } = {
		"JavaScript": "Language",
		"Python": "Language",
		"React": "Framework",
		"Vue.js": "Framework",
		"Angular": "Framework",
		"Node.js": "Framework",
		"TypeScript": "Framework",
		"Ruby": "Language",
		"Go": "Language",
		"Java": "Language",
		"Docker": "Tool",
		"Kubernetes": "Tool",
		"MongoDB": "Tool",
		"PostgreSQL": "Tool"
	}

	const removeSkill = async (skillName: string) => {
		const new_arr = skillArr.filter((s) => s !== skillName);
		console.log(new_arr)
		setSkillsArr(new_arr);

		let new_skills: { name: string; category: string }[] = [];

		new_arr.map((name, i) => {
			new_skills.push({ name: name, category: skill_type[name] });
		  });
		  
		await api.updateSkills(new_skills)
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
        {skillArr.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-lg text-sm border border-gray-100 hover:bg-white transition-colors"
          >
            {React.createElement(skill_icons[skill as keyof typeof skill_icons], { className: "w-4 h-4 text-gray-600" })}
            <span className="text-gray-700">{skill}</span>
            <button
              type="button"
              onClick={() => removeSkill(skill)}
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
