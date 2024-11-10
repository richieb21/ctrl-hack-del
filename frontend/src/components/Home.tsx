import React, { useState } from 'react';
import Resume from './resume/Resume';
import NavBar from './NavBar';

const Home: React.FC = () => {

  return (
    <div className="flex flex-row m-5">
		<NavBar />
      	<Resume />
    </div>
  );
};

export default Home;