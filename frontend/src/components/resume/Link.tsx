import React, {useState} from 'react'

const Link = () => {
	const [isEditingLinks, setIsEditingLinks] = useState(false);

	const handleEditLinks = () => {
		setIsEditingLinks(!isEditingLinks);
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

  	return (
		<div className="bg-l-blue m-5 p-5 rounded-lg relative">
			<h2 className='text-h2 mb-2'>🔗 Links</h2>
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
				<button className="text-p absolute right-s bottom-s m-2" onClick={handleEditLinks}>✏️ Edit</button>
			</div>
			)}
		</div>
  )
}

export default Link
