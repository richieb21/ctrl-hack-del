import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPen } from "@fortawesome/free-solid-svg-icons";

const Link = ({ links }: { links: { name: string; link: string }[] }) => {
  const [isEditingLinks, setIsEditingLinks] = useState(false);

  const handleEditLinks = () => {
    setIsEditingLinks(!isEditingLinks);
  };

  return (
    <div className="bg-l-blue m-5 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faLink} className="text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">Links</h2>
        </div>
      </div>

      {isEditingLinks ? (
        <div className="space-y-3 max-w-2xl">
          <input
            type="text"
            value="y84huang@uwaterloo.ca"
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <input
            type="text"
            value="yiyan023"
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <input
            type="text"
            value="yiyanhuang.netlify.app"
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <input
            type="text"
            value="yiyanhh"
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={handleEditLinks}
            className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((link, i) => (
            <div
              key={i}
              className="relative group flex justify-between items-center"
            >
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">{link.name}</span>:{" "}
                {link.link}
              </p>
              <button
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/50 rounded-full"
                onClick={handleEditLinks}
              >
                <FontAwesomeIcon
                  icon={faPen}
                  className="text-gray-400 hover:text-gray-600"
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Link;
