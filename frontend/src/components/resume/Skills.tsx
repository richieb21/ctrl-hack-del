import React, { useState } from 'react'
import { AVAILABLE_SKILLS } from '../../constants/onboarding'

const Skills = () => {
	const [skills, setSkills] = useState(AVAILABLE_SKILLS);

	const removeSkill = (skillName: string) => {
		setSkills(skills.filter((s) => s.name !== skillName));
	  };
	
	return (
		<div className="bg-l-blue m-5 p-5 rounded-lg">
			<h2 className='text-h2 mb-2'>🔧 Skills</h2>
				<div className="flex flex-wrap gap-2 m-2 p-2">
					{skills.map((skill) => (
					<div
						key={skill.name}
						className="flex items-center gap-2 bg-white px-3 py-2 rounded-full"
					>
						<skill.icon className="w-5 h-5" />
						<span>{skill.name}</span>
						<button
						type="button"
						onClick={() => removeSkill(skill.name)}
						className="ml-2 text-gray-500 hover:text-red-500"
						>
						×
						</button>
					</div>
					))}
				</div>
		</div>
	)
}

export default Skills
