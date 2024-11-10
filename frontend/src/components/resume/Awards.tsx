import { faPen, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Awards = () => {
  const awards = [
    {
      title: "Best Gender Equality Hack",
      date: "Sept 2024",
      description: "Earned at TechNova",
    },
    {
      title: "FIRST IMPACT Award",
      date: "March 2023",
      description: "Given to the team that embodies the mission of FIRST",
    },
  ];

  const [isEditingAwards, setIsEditingAwards] = useState(false);

  const handleEditAwards = () => {
    setIsEditingAwards(!isEditingAwards);
  };

  return (
    <div className="bg-l-blue m-5 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faTrophy} className="text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">Awards</h2>
        </div>
      </div>

      {isEditingAwards ? (
        <div className="space-y-3 max-w-2xl">
          <input
            type="text"
            placeholder="Award Title"
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <input
            type="text"
            placeholder="Date"
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <textarea
            placeholder="Description"
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm min-h-[60px]"
          />
          <button
            onClick={handleEditAwards}
            className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {awards.map((award, index) => (
            <div key={index} className="relative group">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {award.title}
                  </h3>
                  <p className="text-sm text-gray-500">{award.date}</p>
                  <p className="text-md text-gray-600 mt-1">
                    {award.description}
                  </p>
                </div>
                <button
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/50 rounded-full"
                  onClick={handleEditAwards}
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

export default Awards;
