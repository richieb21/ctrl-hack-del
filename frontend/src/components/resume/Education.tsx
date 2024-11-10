import React, { useState } from "react";
import uw from "../../assets/logos/uw.png";
import mhs from "../../assets/logos/mhs.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faPen } from "@fortawesome/free-solid-svg-icons";

const Education = () => {
  const [isEditingEducation, setIsEditingEducation] = useState(false);

  const handleEditEducation = () => {
    setIsEditingEducation(!isEditingEducation);
  };

  const education = [
    {
      logo: uw,
      schoolname: "University of Waterloo",
      level: "Bachelor's",
      program: "Computer Science",
      start: "Sept 2023",
      end: "Present",
      gpa: "3.8",
    },
    {
      logo: mhs,
      schoolname: "Merivale High School",
      level: "High School",
      program: "IB",
      start: "Sept 2019",
      end: "June 2023",
      gpa: "98.3%",
    },
  ];

  return (
    <div className="bg-l-blue m-5 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faGraduationCap} className="text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">Education</h2>
        </div>
      </div>

      {isEditingEducation ? (
        <div className="space-y-3 max-w-2xl">
          <input
            type="text"
            placeholder="School Name"
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Program"
              className="w-1/2 p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
            <input
              type="text"
              placeholder="Level"
              className="w-1/2 p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Start Date"
              className="w-1/2 p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
            <input
              type="text"
              placeholder="End Date"
              className="w-1/2 p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
          <input
            type="text"
            placeholder="GPA"
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={handleEditEducation}
            className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={index} className="relative group">
              <div className="flex items-start gap-4">
                <img
                  src={edu.logo}
                  className="w-12 h-12 object-contain"
                  alt={edu.schoolname}
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {edu.schoolname}
                  </h3>
                  <p className="text-md text-blue-500 font-medium">
                    {edu.program}, {edu.level}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {edu.start} - {edu.end} · GPA: {edu.gpa}
                  </p>
                </div>
                <button
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/50 rounded-full"
                  onClick={handleEditEducation}
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

export default Education;
