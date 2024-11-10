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
      <div className="pt-5">
        <h1 className="text-h1 ml-5">HELLO {user.name} 👋</h1>
      </div>
      <Link links={links} />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Extracurriculars />
      <Awards />
    </div>
  );
};

export default Resume;
