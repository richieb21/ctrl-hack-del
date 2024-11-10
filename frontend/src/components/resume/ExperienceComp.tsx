import { faBriefcase, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Experience } from "../../constants/types";

const ExperienceComp = ({ experiences }: { experiences: { title: string; position: string; location: string; date: string; points: string[]; }[] }) => {
  const [isEditingExperiences, setIsEditingExperiences] = useState(false);
  const [exp, setExp] = useState(experiences)
  const [curIndex, setCurIndex] = useState(0);
  const [curJob, setCurJob] = useState(experiences[curIndex])

  const handleEditExperiences = (i: number) => {
	setCurIndex(i);
    setIsEditingExperiences(!isEditingExperiences);
  };

  useEffect(() => {
	setCurJob(experiences[curIndex])
  }, [curIndex])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Experience) => {
	setCurJob({
	  ...curJob,
	  [field]: e.target.value,
	});
  };
  
  const handlePointsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
	setCurJob({
	  ...curJob,
	  points: e.target.value.split('\n'), // Split the textarea value by newline to get the array
	});
  };

  const saveExperiences = async () => {
	setIsEditingExperiences(!isEditingExperiences);
	const newExp = [...exp]
	newExp[curIndex] = curJob;
	console.log(newExp[curIndex], curIndex)
	setExp(newExp);

	await api.updateExperiences(newExp);
  }

  return (
    <div className="bg-l-blue m-5 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faBriefcase} className="text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">Experiences</h2>
        </div>
      </div>

      {isEditingExperiences ? (
		<div className="space-y-3 max-w-2xl">
			<input
			type="text"
			value={curJob.title}
			placeholder="Title"
			className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
			onChange={(e) => handleInputChange(e, 'title')}
			/>
			<input
			type="text"
			value={curJob.position}
			placeholder="Position"
			className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
			onChange={(e) => handleInputChange(e, 'position')}
			/>
			<div className="flex gap-2">
			<input
				type="text"
				value={curJob.location}
				placeholder="Location"
				className="w-1/2 p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
				onChange={(e) => handleInputChange(e, 'location')}
			/>
			<input
				type="text" 
				value={curJob.date}
				placeholder="Date"
				className="w-1/2 p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
				onChange={(e) => handleInputChange(e, 'date')}
			/>
			</div>
			<textarea
				value={curJob.points.join('\n')}
				placeholder="Points (one per line)"
				className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm min-h-[80px]"
				onChange={(e) => {handlePointsChange(e)}}
			/>
			<button
			onClick={saveExperiences}
			className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
			>
			Save Changes
			</button>
		</div>
		) : (
        <div className="space-y-6">
          {exp.map((exp, i) => (
            <div key={i} className="relative group">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {exp.title}
                  </h3>
                  <p className="text-md text-blue-500 font-medium">
                    {exp.position}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {exp.location} · {exp.date}
                  </p>
                </div>
                <button
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/50 rounded-full"
                  onClick={() => {handleEditExperiences(i)}}
                >
                  <FontAwesomeIcon
                    icon={faPen}
                    className="text-gray-400 hover:text-gray-600"
                  />
                </button>
              </div>
              <div className="mt-3">
                <ul className="space-y-2 list-none">
                  {exp.points.map((point, idx) => (
                    <li key={idx} className="text-gray-600 flex items-start">
                      <span className="mr-2 text-blue-500">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceComp;
