import React, {useState} from 'react'
import uw from '../../assets/logos/uw.png'
import mhs from '../../assets/logos/mhs.png'

const Education = () => {
	const [isEditingEducation, setIsEditingEducation] = useState(false);

	const handleEditEducation = () => {
		setIsEditingEducation(!isEditingEducation);
	  };

	const education = [
		{
			logo: uw,
			schoolname: "University of Waterloo",
			level: "Bachelor's",
			program: "Computer Science",
			start: "Sept 2023",
			end: "Present",
			gpa: "3.8"
		},
		{
			logo: mhs,
			schoolname: "Merivale High School",
			level: "High School",
			program: "IB",
			start: "Sept 2019",
			end: "June 2023",
			gpa: "98.3%"
		},
	]

  	return (
		<div className="bg-l-blue m-5 p-5 rounded-lg relative">
			<h2 className='text-h2 mb-2'>🍎 Education</h2>
			{isEditingEducation ? (
			<div>
				<div>
					<input type="text" value={"school"} />
					<input type="text" value={"program"} />
					<input type="text" value={"level"} />
					<input type="text" value={"start date"} />
					<button onClick={handleEditEducation}>Save</button>
				</div>
			</div>
			) : (
			<div>
				{
					education.map((info, i) => (
						<div className='flex flex-row mb-2 relative'>
							<div className='flex justify-center items-center'>
								<img src={info.logo} className='w-12 h-12'></img>
							</div>
							<div className='m-2'>
								<p className='text-h2'><b>School:</b> {info.schoolname}</p>
								<p className='text-p'>{info.program}, {info.level}</p>
								<p className='text-s'><i>{info.start} - {info.end} · {info.gpa}</i></p>
							</div>
							<button className="text-p absolute right-s bottom-s m-2" onClick={handleEditEducation}>✏️ Edit</button>
						</div>
					))
				}
			</div>
			)}
		</div>
  )
}

export default Education
