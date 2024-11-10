import React from "react";
import Link from "./Link";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
import Projects from "./Projects";
import Extracurriculars from "./Extracurriculars";
import Awards from "./Awards";
import { User } from "../../constants/types";

const Resume = ({ user }: { user: User }) => {
  const links = [
    { name: "Github", link: user.github_profile },
    { name: "LinkedIn", link: user.linkedin_profile },
  ];

  return (
    <div>
      <div className="m-5 p-8 rounded-xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Hello, <span className="text-blue-500">{user.name}</span> 👋
        </h1>
        <p className="text-gray-600 text-lg">
          Welcome back to your resume builder
        </p>
      </div>
      <Link links={links} />
      <Experience />
      <Education />
      <Skills />
      <Projects projects={user.projects} />
      <Extracurriculars />
      <Awards />
    </div>
  );
};

export default Resume;
