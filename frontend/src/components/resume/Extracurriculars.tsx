import React, {useState} from 'react'

const Extracurriculars = () => {
	const [isEditingExtracurriculars, setIsEditingExtracurriculars] = useState(false);

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
		}
	]
	return (
		<div className="bg-l-blue m-5 p-5 rounded-lg">
        <h2 className='text-h2 mb-2'>🎨 Extracurriculars</h2>
        {isEditingExtracurriculars ? (
          <div>
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Description" />
            <input type="text" placeholder="Location" />
            <input type="text" placeholder="Date" />
            <textarea placeholder="Points (comma separated)" />
            <button onClick={handleEditExtracurriculars}>Save</button>
          </div>
        ) : (
          <div>
            {extracurriculars.map((exp, index) => (
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
				<button className="text-p absolute right-0 bottom-s m-2" onClick={handleEditExtracurriculars}>✏️ Edit</button>
              </div>
            ))}
            
          </div>
        )}
      </div>
	)
}

export default Extracurriculars
