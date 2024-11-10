import React from "react";
import Link from "./Link";
import Education from "./EducationComp";
import Skills from "./Skills";
import Projects from "./Projects";
import Extracurriculars from "./Extracurriculars";
import Awards from "./Awards";
import { User } from "../../constants/types";
import ExperienceComp from "./ExperienceComp";

const Resume = ({ user }: { user: User }) => {
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
      <Link links={user.links} />
      <ExperienceComp experiences={user.experiences}/>
      <Education education={user.education}/>
      <Skills />
      <Projects projects={user.projects} />
      <Extracurriculars extracurriculars={user.extra_curricular}/>
      <Awards />
    </div>
  );
};

export default Resume;
