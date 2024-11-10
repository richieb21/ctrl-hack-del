import React, {useState} from 'react'

const Experience = () => {
	const [isEditingExperiences, setIsEditingExperiences] = useState(false);

	const handleEditExperiences = () => {
		setIsEditingExperiences(!isEditingExperiences);
	};

	const experiences = [
		{
			title: "Rich Media",
			position: "Software Developer Intern",
			location: "Toronto, ON",
			date: "May 2024 - Aug 2024",
			points: ["point 1", "point 2"],
		},
		{
			title: "PointClickCare",
			position: "Software Engineering Intern",
			location: "Toronto, ON",
			date: "Sept 2024 - Present",
			points: ["point 1", "point 2"],
		}
	]
	return (
		<div className="bg-l-blue m-5 p-5 rounded-lg">
        <h2 className='text-h2 mb-2'>💼 Experiences</h2>
        {isEditingExperiences ? (
          <div>
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Description" />
            <input type="text" placeholder="Location" />
            <input type="text" placeholder="Date" />
            <textarea placeholder="Points (comma separated)" />
            <button onClick={handleEditExperiences}>Save</button>
          </div>
        ) : (
          <div>
            {experiences.map((exp, index) => (
              <div key={index} className="mb-2 relative">
                <h3 className='text-h3'><b>{exp.title}</b></h3>
                <p className='text-p'><i>{exp.position}</i></p>
                <p className='text-s'>{exp.location} · {exp.date}</p>
                <div className='p-5'>
					<ul className='list-disc'>
						{exp.points.map((point, idx) => (
							<li key={idx}>{point}</li>
						))}
					</ul>
				</div>
				<button className="text-p absolute right-0 bottom-s m-2" onClick={handleEditExperiences}>✏️ Edit</button>
              </div>
            ))}
            
          </div>
        )}
      </div>
	)
}

export default Experience
