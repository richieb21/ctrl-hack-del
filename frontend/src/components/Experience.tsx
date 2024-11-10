import { useState } from "react";
import { Experience } from "../constants/types";
import { api } from "../services/api";

interface ExperienceStepProps {
  experiences: Experience[];
  setExperiences: (experiences: Experience[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ExperienceStep = ({
  experiences,
  setExperiences,
  onNext,
  onBack,
}: ExperienceStepProps) => {
  const [currentExperience, setCurrentExperience] = useState<Experience>({
    title: "",
    position: "",
    location: "",
    date: "",
    points: [""],
  });

  const handleAddPoint = () => {
    setCurrentExperience({
      ...currentExperience,
      points: [...currentExperience.points, ""],
    });
  };

  const handleRemovePoint = (index: number) => {
    setCurrentExperience({
      ...currentExperience,
      points: currentExperience.points.filter((_, i) => i !== index),
    });
  };

  const handlePointChange = (index: number, value: string) => {
    const newPoints = [...currentExperience.points];
    newPoints[index] = value;
    setCurrentExperience({
      ...currentExperience,
      points: newPoints,
    });
  };

  const handleAddExperience = () => {
    if (currentExperience.title && currentExperience.position) {
      setExperiences([...experiences, currentExperience]);
      setCurrentExperience({
        title: "",
        position: "",
        location: "",
        date: "",
        points: [""],
      });
    }
  };

  const handleRemoveExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.updateExperiences(experiences).then(() => {
      onNext();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1a3b63] mb-6">Experience</h2>

      {/* Current Experiences List */}
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg bg-white shadow-sm relative"
          >
            <button
              type="button"
              onClick={() => handleRemoveExperience(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
            <h3 className="font-semibold text-lg">{exp.title}</h3>
            <p className="text-gray-600">{exp.position}</p>
            <p className="text-gray-600">
              {exp.location} • {exp.date}
            </p>
            <ul className="list-disc list-inside mt-2">
              {exp.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Add New Experience Form */}
      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company/Organization
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
            value={currentExperience.title}
            onChange={(e) =>
              setCurrentExperience({
                ...currentExperience,
                title: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
            value={currentExperience.position}
            onChange={(e) =>
              setCurrentExperience({
                ...currentExperience,
                position: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
            value={currentExperience.location}
            onChange={(e) =>
              setCurrentExperience({
                ...currentExperience,
                location: e.target.value,
              })
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
            placeholder="e.g., Jan 2023 - Present"
            value={currentExperience.date}
            onChange={(e) =>
              setCurrentExperience({
                ...currentExperience,
                date: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description Points
          </label>
          {currentExperience.points.map((point, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
                value={point}
                onChange={(e) => handlePointChange(index, e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleRemovePoint(index)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddPoint}
            className="text-[#2C74B3] hover:underline text-sm"
          >
            + Add Point
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddExperience}
        className="mt-4 px-4 py-2 bg-[#2C74B3] text-white rounded-full hover:bg-[#205295]"
      >
        Add Experience
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
