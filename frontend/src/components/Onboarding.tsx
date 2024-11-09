import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { SkillsStep } from "./Skills";
import { Skill } from "../constants/types";
import { LinksStep } from "./Links";

type Links = {
  github: string;
  linkedin: string;
  portfolio: string;
  x: string;
  email: string;
};

type Project = {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
};

export const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [links, setLinks] = useState<Links>({
    github: "",
    linkedin: "",
    portfolio: "",
    x: "",
    email: "",
  });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    console.log(skills);
  }, [skills]);

  const handleProjectsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Submit all data to your API
      await api.updateProfile({ links, skills, projects });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#1a3b63] via-[#2b5c94] to-[#3d75b3]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[600px]">
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                stepNumber === step
                  ? "bg-[#2C74B3] text-white"
                  : stepNumber < step
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {stepNumber}
            </div>
          ))}
        </div>

        {step === 1 && (
          <LinksStep
            links={links}
            setLinks={setLinks}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <SkillsStep
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
            skills={skills}
            setSkills={setSkills}
          />
        )}

        {step === 3 && (
          <form onSubmit={handleProjectsSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1a3b63] mb-6">Projects</h2>
            {/* Add project input fields */}
            <button
              type="button"
              className="mb-4 text-[#2C74B3]"
              onClick={() =>
                setProjects([
                  ...projects,
                  { title: "", description: "", technologies: [] },
                ])
              }
            >
              + Add Project
            </button>
            <button
              type="submit"
              className="w-full px-8 py-3 text-lg font-semibold text-white bg-[#2C74B3] hover:bg-[#205295] rounded-full"
            >
              Complete
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
