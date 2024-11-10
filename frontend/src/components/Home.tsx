import React, { useState } from 'react';
import Link from './resume/Link';
import Experience from './resume/Experience';
import Education from './resume/Education';
import Skills from './resume/Skills';
import Projects from './resume/Projects';
import Extracurriculars from './resume/Extracurriculars';
import Awards from './resume/Awards';

const Home: React.FC = () => {

  return (
    <div className="profile-card">
      	<div className="m-5">
			<h1 className='text-h1'>HELLO Yiyan! 👋</h1>
			</div>
			<Link />
			<Experience />
			<Education />
			<Skills />
			<Projects />
			<Extracurriculars />
			<Awards />
    	</div>
  );
};

export default Home;