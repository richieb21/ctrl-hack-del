import { useState } from "react";
import { ExtraCurricular } from "../constants/types";
import { api } from "../services/api";

interface ExtracurricularStepProps {
  extracurriculars: ExtraCurricular[];
  setExtracurriculars: (extracurriculars: ExtraCurricular[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ExtracurricularStep = ({
  extracurriculars,
  setExtracurriculars,
  onNext,
  onBack,
}: ExtracurricularStepProps) => {
  const [currentExtra, setCurrentExtra] = useState<ExtraCurricular>({
    title: "",
    position: "",
    location: "",
    date: "",
    points: [""],
  });

  const handleAddPoint = () => {
    setCurrentExtra({
      ...currentExtra,
      points: [...currentExtra.points, ""],
    });
  };

  const handleRemovePoint = (index: number) => {
    setCurrentExtra({
      ...currentExtra,
      points: currentExtra.points.filter((_, i) => i !== index),
    });
  };

  const handlePointChange = (index: number, value: string) => {
    const newPoints = [...currentExtra.points];
    newPoints[index] = value;
    setCurrentExtra({
      ...currentExtra,
      points: newPoints,
    });
  };

  const handleAddExtra = () => {
    if (currentExtra.title && currentExtra.position) {
      setExtracurriculars([...extracurriculars, currentExtra]);
      setCurrentExtra({
        title: "",
        position: "",
        location: "",
        date: "",
        points: [""],
      });
    }
  };

  const handleRemoveExtra = (index: number) => {
    setExtracurriculars(extracurriculars.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.updateExtracurriculars(extracurriculars).then(() => {
      onNext();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1a3b63] mb-6">
        Extracurricular Activities
      </h2>

      {/* Current Extracurriculars List */}
      <div className="space-y-4">
        {extracurriculars.map((extra, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg bg-white shadow-sm relative"
          >
            <button
              type="button"
              onClick={() => handleRemoveExtra(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
            <h3 className="font-semibold text-lg">{extra.title}</h3>
            <p className="text-gray-600">{extra.position}</p>
            <p className="text-gray-600">
              {extra.location} • {extra.date}
            </p>
            <ul className="list-disc list-inside mt-2">
              {extra.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Add New Extracurricular Form */}
      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organization/Activity
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
            value={currentExtra.title}
            onChange={(e) =>
              setCurrentExtra({ ...currentExtra, title: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position/Role
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
            value={currentExtra.position}
            onChange={(e) =>
              setCurrentExtra({ ...currentExtra, position: e.target.value })
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
            value={currentExtra.location}
            onChange={(e) =>
              setCurrentExtra({ ...currentExtra, location: e.target.value })
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
            value={currentExtra.date}
            onChange={(e) =>
              setCurrentExtra({ ...currentExtra, date: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description Points
          </label>
          {currentExtra.points.map((point, index) => (
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
        onClick={handleAddExtra}
        className="mt-4 px-4 py-2 bg-[#2C74B3] text-white rounded-full hover:bg-[#205295]"
      >
        Add Extracurricular
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
