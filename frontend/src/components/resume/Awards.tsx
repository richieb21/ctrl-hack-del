import { faPen, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Award } from "../../constants/types";
import { api } from "../../services/api";

const Awards = ({ awards }: { awards: { title: string; description: string; date: string }[]; }) => {

  const [isEditingAwards, setIsEditingAwards] = useState(false);
  const [award, setAward] = useState(awards)
  const [curIndex, setCurIndex] = useState(0);
  const [curAward, setCurAward] = useState(awards[curIndex])

  const handleEditAwards = () => {
    setIsEditingAwards(!isEditingAwards);
  };

  useEffect(() => {
	setCurAward(awards[curIndex])
  }, [curIndex])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Award) => {
	setCurAward({
	  ...curAward,
	  [field]: e.target.value,
	});
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: keyof Award) => {
	setCurAward({
	  ...curAward,
	  [field]: e.target.value,
	});
  };

  const saveAwards = async () => {
	setIsEditingAwards(!isEditingAwards);
	const newAward = [...award]
	newAward[curIndex] = curAward;
	console.log(newAward[curIndex], curIndex)
	setAward(newAward);

	await api.updateAwards(newAward);
  }

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
			value={curAward.title}
			onChange={(e) => {handleInputChange(e, 'title')}}
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <input
            type="text"
            placeholder="Date"
			value={curAward.date}
			onChange={(e) => {handleInputChange(e, 'date')}}
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <textarea
            placeholder="Description"
			value={curAward.description}
			onChange={(e) => {handleDescriptionChange(e, 'description')}}
            className="w-full p-1.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm min-h-[60px]"
          />
          <button
            onClick={saveAwards}
            className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {award.map((award, index) => (
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
