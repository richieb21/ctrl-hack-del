import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPen } from "@fortawesome/free-solid-svg-icons";
import { api } from '../../services/api';

const Link = ({ links }: { links: { email: string; github_profile: string; linkedin_profile: string; portfolio_link: string; x_profile: string } }) => {
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const [curIndex, setCurIndex] = useState(0);
  const [keys, setKeys] = useState([links.email, links.github_profile, links.linkedin_profile, links.portfolio_link, links.x_profile]);

  const handleEditLinks = (i: number) => {
	setCurIndex(i);
    setIsEditingLinks(!isEditingLinks);
  };

  const saveEditLinks = async () => {
	setIsEditingLinks(!isEditingLinks);

	const newLinks = {
		email: keys[0],
		github: keys[1],
		linkedin: keys[2],
		portfolio: keys[3],
		x: keys[4]
	}

	console.log(newLinks);
	await api.updateLinks(newLinks)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	const newKeys = [...keys];
	newKeys[curIndex] = e.target.value;
	setKeys(newKeys);
  }

  const names = ["Email", "GitHub", "LinkedIn", "Portfolio", "X"];

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
			<p>Edit {names[curIndex]}:</p>
          <input
            type="text"
            value={keys[curIndex]}
			onChange={handleInputChange}
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={saveEditLinks}
            className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div>
          {names.map((name, i) => (
            <div
              key={i}
              className="relative group flex justify-between items-center"
            >
              <p className="text-gray-600">
                <span className="font-medium text-gray-800">{name}</span>:{" "}
                {keys[i]}
              </p>
              <button
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/50 rounded-full"
                onClick={() => {handleEditLinks(i)}}
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
