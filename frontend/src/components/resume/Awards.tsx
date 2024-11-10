import React, {useState} from 'react'

const Awards = () => {
	const awards = [
		{
			title: "Best Gender Equality Hack",
			date: "Sept 2024",
			description: "Earned at TechNova"
		}, 
		{
			title: "FIRST IMPACT Award",
			date: "March 2023",
			description: "Given to the team that embodies the mission of FIRST"
		}
	]

	const [isEditingAwards, setIsEditingAwards] = useState(false);

	const handleEditAwards = () => {
		setIsEditingAwards(!isEditingAwards);
	};

  return (
	<div className="bg-l-blue m-5 p-5 rounded-lg">
        <h2 className='text-h2 mb-2'>🏆 Awards</h2>
        {isEditingAwards ? (
          <div>
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Description" />
            <input type="text" placeholder="Location" />
            <input type="text" placeholder="Date" />
            <textarea placeholder="Points (comma separated)" />
            <button onClick={handleEditAwards}>Save</button>
          </div>
        ) : (
          <div>
            {awards.map((exp, index) => (
              <div key={index} className="mb-2 relative">
                <h3 className='text-h3'><b>{exp.title}</b></h3>
                <p className='text-s'>{exp.date}</p>
				<p className='text-s'>{exp.description}</p>
				<button className="text-p absolute right-0 bottom-s m-2" onClick={handleEditAwards}>✏️ Edit</button>
              </div>
            ))}
            
          </div>
        )}
      </div>
  )
}

export default Awards
