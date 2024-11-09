import React, { useState } from 'react';

const Home: React.FC = () => {
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const [isEditingExperiences, setIsEditingExperiences] = useState(false);

  const handleEditLinks = () => {
    setIsEditingLinks(!isEditingLinks);
  };

  const handleEditExperiences = () => {
    setIsEditingExperiences(!isEditingExperiences);
  };

  const links = [
	{
		name: "Email",
		link: "link 1"
	},
	{
		name: "LinkedIn",
		link: "link 2"
	},
	{
		name: "GitHub",
		link: "link 3"
	},
	{
		name: "X",
		link: "link 4"
	}
  ]

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
    <div className="profile-card">
      <div className="profile-header">
        <h1>HELLO Yiyan! 👋</h1>
      </div>
      <div className="bg-l-blue m-5 p-5 rounded-lg">
        <h2 className='text-h2'>🔗 Links</h2>
        {isEditingLinks ? (
          <div>
            <input type="text" value={"y84huang@uwaterloo.ca"} />
            <input type="text" value={"yiyan023"} />
            <input type="text" value={"yiyanhuang.netlify.app"} />
            <input type="text" value={"yiyanhh"} />
            <button onClick={handleEditLinks}>Save</button>
          </div>
        ) : (
          <div>
			{
				links.map((link, i) => (
					<p className='text-p'><b>{link.name}</b>: {link.link}</p>
				))
			}
            <button className='text-p' onClick={handleEditLinks}>✏️ Edit</button>
          </div>
        )}
      </div>
      <div className="bg-l-blue m-5 p-5 rounded-lg">
        <h2 className='text-h2'>Experiences</h2>
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
              <div key={index} className="m-2">
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
				<button className='text-p' onClick={handleEditExperiences}>Edit</button>
              </div>
            ))}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;