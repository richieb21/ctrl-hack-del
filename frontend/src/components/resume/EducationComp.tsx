import React, { useEffect, useState } from "react";
import uw from "../../assets/logos/uw.png";
import mhs from "../../assets/logos/mhs.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faPen } from "@fortawesome/free-solid-svg-icons";
import { Education } from "../../constants/types";
import { api } from "../../services/api";

const EducationComp = ({ education }: { education: {schoolname: string, level: string, program: string, start: string, end: string, gpa: string }[]; } ) => {
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [edu, setEdu] = useState(education)
  const [curIndex, setCurIndex] = useState(0);
  const [curEdu, setCurEdu] = useState(education[curIndex])

  const handleEditEducation = (i:number) => {
    setIsEditingEducation(!isEditingEducation);
	setCurIndex(i);
  };

  useEffect(() => {
	setCurEdu(education[curIndex])
  }, [curIndex])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Education) => {
	setCurEdu({
	  ...curEdu,
	  [field]: e.target.value,
	});
  };

  const saveEducation = async () => {
	setIsEditingEducation(!isEditingEducation);
	const newEdu = [...edu]
	newEdu[curIndex] = curEdu;
	console.log(newEdu[curIndex], curIndex)
	setEdu(newEdu);

	await api.updateEducation(newEdu);
  }

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
			value={curEdu.schoolname}
			onChange={(e) => {handleInputChange(e, 'schoolname')}}
            placeholder="School Name"
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Program"
			  value={curEdu.program}
			  onChange={(e) => {handleInputChange(e, 'program')}}
              className="w-1/2 p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
            <input
              type="text"
              placeholder="Level"
			  value={curEdu.level}
			  onChange={(e) => {handleInputChange(e, 'level')}}
              className="w-1/2 p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Start Date"
			  value={curEdu.start}
			  onChange={(e) => {handleInputChange(e, 'start')}}
              className="w-1/2 p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
            <input
              type="text"
              placeholder="End Date"
			  value={curEdu.end}
			  onChange={(e) => {handleInputChange(e, 'end')}}
              className="w-1/2 p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
          <input
            type="text"
            placeholder="GPA"
			value={curEdu.gpa}
			  onChange={(e) => {handleInputChange(e, 'gpa')}}
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={saveEducation}
            className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {edu.map((edu, i) => (
            <div key={i} className="relative group">
              <div className="flex items-start gap-4">
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
                  onClick={() => {handleEditEducation(i)}}
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

export default EducationComp;
