import React, {useEffect, useState} from 'react'
import { Project } from '../../constants/types';

const Projects = ({ projects }: { projects: Project[] }) =>  {
	const [isEditingProjects, setIsEditingProjects] = useState(false);

	const handleEditProjects = () => {
		setIsEditingProjects(!isEditingProjects);
	};

	useEffect(() => {
		console.log(projects);
	}, [projects])

  return (
	<div className="bg-l-blue m-5 p-5 rounded-lg relative">
			<h2 className='text-h2 mb-2'>🚀 Projects</h2>
			{isEditingProjects ? (
			<div>
				<div>0
					<input type="text" value={"school"} />
					<input type="text" value={"program"} />
					<input type="text" value={"level"} />
					<input type="text" value={"start date"} />
					<button onClick={handleEditProjects}>Save</button>
				</div>
			</div>
			) : (
			<div>
				{projects &&	
					projects.map((info, i) => (
						<div key={i} className='flex flex-row mb-2 relative'>
							<div className='m-5'>
								logo
							</div>
							<div className='m-2'>
								<p className='text-h2'><b>{info.name}</b></p>
								<p className='text-p'><i>{info.date}</i> · <a href={info.link}>🔗</a></p>
								<div className='p-5'>
								<ul className='list-disc'>
									{info.description.map((point, idx) => (
										<li key={idx}>{point}</li>
									))}
								</ul>
							</div>
							</div>
							<button className="text-p absolute right-s bottom-s m-2" onClick={handleEditProjects}>✏️ Edit</button>
						</div>
					))
				}
			</div>
			)}
		</div>
  )
}

export default Projects
