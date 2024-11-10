import { useState } from "react";
import { Award } from "../constants/types";
import { api } from "../services/api";

interface AwardStepProps {
  awards: Award[];
  setAwards: (awards: Award[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const AwardStep = ({
  awards,
  setAwards,
  onNext,
  onBack,
}: AwardStepProps) => {
  const [currentAward, setCurrentAward] = useState<Award>({
    title: "",
    date: "",
    description: "",
  });

  const handleAddAward = () => {
    if (currentAward.title && currentAward.date) {
      setAwards([...awards, currentAward]);
      setCurrentAward({
        title: "",
        date: "",
        description: "",
      });
    }
  };

  const handleRemoveAward = (index: number) => {
    setAwards(awards.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.updateAwards(awards).then(() => {
      onNext();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1a3b63] mb-6">
        Awards & Achievements
      </h2>

      {/* Current Awards List */}
      <div className="space-y-4">
        {awards.map((award, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg bg-white shadow-sm relative"
          >
            <button
              type="button"
              onClick={() => handleRemoveAward(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
            <h3 className="font-semibold text-lg">{award.title}</h3>
            <p className="text-gray-600">{award.date}</p>
            <p className="mt-2">{award.description}</p>
          </div>
        ))}
      </div>

      {/* Add New Award Form */}
      <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Award Title
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
            value={currentAward.title}
            onChange={(e) =>
              setCurrentAward({ ...currentAward, title: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Received
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
            placeholder="e.g., January 2023"
            value={currentAward.date}
            onChange={(e) =>
              setCurrentAward({ ...currentAward, date: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
            rows={3}
            value={currentAward.description}
            onChange={(e) =>
              setCurrentAward({ ...currentAward, description: e.target.value })
            }
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddAward}
        className="mt-4 px-4 py-2 bg-[#2C74B3] text-white rounded-full hover:bg-[#205295]"
      >
        Add Award
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
