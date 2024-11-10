import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaintBrush, faPen } from "@fortawesome/free-solid-svg-icons";

const Extracurriculars = () => {
  const [isEditingExtracurriculars, setIsEditingExtracurriculars] =
    useState(false);

  const handleEditExtracurriculars = () => {
    setIsEditingExtracurriculars(!isEditingExtracurriculars);
  };

  const extracurriculars = [
    {
      title: "Soong Badminton Academy",
      position: "Badminton Coach",
      location: "Ottawa, ON",
      date: "Sept 2019 - June 2023",
      points: ["point 1", "point 2"],
    },
    {
      title: "Janet's Music School",
      position: "Music Teacher",
      location: "Ottawa, ON",
      date: "Sept 2019 - June 2023",
      points: ["point 1", "point 2"],
    },
  ];

  return (
    <div className="bg-l-blue m-5 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faPaintBrush} className="text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">
            Extracurriculars
          </h2>
        </div>
      </div>

      {isEditingExtracurriculars ? (
        <div className="space-y-3 max-w-2xl">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <input
            type="text"
            placeholder="Position"
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Location"
              className="w-1/2 p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
            <input
              type="text"
              placeholder="Date"
              className="w-1/2 p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
          <textarea
            placeholder="Points (one per line)"
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm min-h-[80px]"
          />
          <button
            onClick={handleEditExtracurriculars}
            className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {extracurriculars.map((extra, index) => (
            <div key={index} className="relative group">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {extra.title}
                  </h3>
                  <p className="text-md text-blue-500 font-medium">
                    {extra.position}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {extra.location} · {extra.date}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {extra.points.map((point, idx) => (
                      <li key={idx} className="text-gray-600 flex items-start">
                        <span className="mr-2 text-blue-500">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/50 rounded-full"
                  onClick={handleEditExtracurriculars}
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

export default Extracurriculars;
