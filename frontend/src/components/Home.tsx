import React, { useState } from 'react';
import Link from './resume/Link';
import Experience from './resume/Experience';
import Education from './resume/Education';

const Home: React.FC = () => {

  return (
    <div className="profile-card">
      	<div className="m-5">
			<h1 className='text-h1'>HELLO Yiyan! 👋</h1>
			</div>
			<Link />
			<Experience />
			<Education />
    	</div>
  );
};

export default Home;