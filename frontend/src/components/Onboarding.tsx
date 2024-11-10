import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SkillsStep } from "./Skills";
import {
  Award,
  Education,
  Experience,
  ExtraCurricular,
  Project,
  Skill,
} from "../constants/types";
import { LinksStep } from "./Links";
import { ProjectStep } from "./Project";
import { NameStep } from "./Name";
import { ExperienceStep } from "./Experience";
import { EducationStep } from "./Education";
import { AwardStep } from "./Award";
import { ExtracurricularStep } from "./Extracurricular";

type Links = {
  github: string;
  linkedin: string;
  portfolio: string;
  x: string;
  email: string;
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
  const [name, setName] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [extracurriculars, setExtracurriculars] = useState<ExtraCurricular[]>(
    []
  );
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#1a3b63] via-[#2b5c94] to-[#3d75b3]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[600px]">
        <div className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
          {[1, 2, 3, 4].map((stepNumber) => (
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
          <NameStep name={name} setName={setName} onNext={() => setStep(2)} />
        )}

        {step === 2 && (
          <LinksStep
            links={links}
            setLinks={setLinks}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <ExperienceStep
            experiences={experiences}
            setExperiences={setExperiences}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <EducationStep
            education={education}
            setEducation={setEducation}
            onNext={() => setStep(5)}
            onBack={() => setStep(3)}
          />
        )}

        {step === 5 && (
          <SkillsStep
            onNext={() => setStep(6)}
            onBack={() => setStep(4)}
            skills={skills}
            setSkills={setSkills}
          />
        )}

        {step === 6 && (
          <ProjectStep
            projects={projects}
            setProjects={setProjects}
            onNext={() => setStep(7)}
            onBack={() => setStep(5)}
          />
        )}

        {step === 7 && (
          <ExtracurricularStep
            extracurriculars={extracurriculars}
            setExtracurriculars={setExtracurriculars}
            onNext={() => setStep(8)}
            onBack={() => setStep(6)}
          />
        )}

        {step === 8 && (
          <AwardStep
            awards={awards}
            setAwards={setAwards}
            onNext={() => navigate("/home")}
            onBack={() => setStep(7)}
          />
        )}
      </div>
    </div>
  );
};

export default Onboarding;
