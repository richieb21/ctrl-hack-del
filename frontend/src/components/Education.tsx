import { useState } from "react";
import { Education } from "../constants/types";
import { api } from "../services/api";

interface EducationStepProps {
  education: Education[];
  setEducation: (education: Education[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const EducationStep = ({
  education,
  setEducation,
  onNext,
  onBack,
}: EducationStepProps) => {
  const [currentEducation, setCurrentEducation] = useState<Education>({
    schoolname: "",
    level: "",
    program: "",
    start: "",
    end: "",
    gpa: "",
  });

  const handleAddEducation = () => {
    if (currentEducation.schoolname && currentEducation.program) {
      setEducation([...education, currentEducation]);
      setCurrentEducation({
        schoolname: "",
        level: "",
        program: "",
        start: "",
        end: "",
        gpa: "",
      });
    }
  };

  const handleRemoveEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.updateEducation(education).then(() => {
      onNext();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1a3b63] mb-6">Education</h2>

      {/* Current Education List */}
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg bg-white shadow-sm relative"
          >
            <button
              type="button"
              onClick={() => handleRemoveEducation(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
            <h3 className="font-semibold text-lg">{edu.schoolname}</h3>
            <p className="text-gray-600">
              {edu.level} - {edu.program}
            </p>
            <p className="text-gray-600">
              {edu.start} - {edu.end}
            </p>
            {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
          </div>
        ))}
      </div>

      {/* Add New Education Form */}
      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            School Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
            value={currentEducation.schoolname}
            onChange={(e) =>
              setCurrentEducation({
                ...currentEducation,
                schoolname: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Level
          </label>
          <select
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
            value={currentEducation.level}
            onChange={(e) =>
              setCurrentEducation({
                ...currentEducation,
                level: e.target.value,
              })
            }
          >
            <option value="">Select Level</option>
            <option value="High School">High School</option>
            <option value="Bachelor's">Bachelor's</option>
            <option value="Master's">Master's</option>
            <option value="PhD">PhD</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Program/Major
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
            value={currentEducation.program}
            onChange={(e) =>
              setCurrentEducation({
                ...currentEducation,
                program: e.target.value,
              })
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
              placeholder="e.g., Sep 2020"
              value={currentEducation.start}
              onChange={(e) =>
                setCurrentEducation({
                  ...currentEducation,
                  start: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
              placeholder="e.g., May 2024"
              value={currentEducation.end}
              onChange={(e) =>
                setCurrentEducation({
                  ...currentEducation,
                  end: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GPA (Optional)
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
            placeholder="e.g., 3.8/4.0"
            value={currentEducation.gpa}
            onChange={(e) =>
              setCurrentEducation({ ...currentEducation, gpa: e.target.value })
            }
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddEducation}
        className="mt-4 px-4 py-2 bg-[#2C74B3] text-white rounded-full hover:bg-[#205295]"
      >
        Add Education
      </button>

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
