import { useState } from "react";
import { Skill } from "../constants/types";
import { AVAILABLE_SKILLS, TechSkill } from "../constants/onboarding";

interface SkillsStepProps {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const SkillsStep = ({
  skills,
  setSkills,
  onNext,
  onBack,
}: SkillsStepProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSkills = AVAILABLE_SKILLS.filter((skill) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Organize skills by category
  const categorizedSkills = {
    Language: filteredSkills.filter((skill) => skill.category === "Language"),
    Framework: filteredSkills.filter((skill) => skill.category === "Framework"),
    Tool: filteredSkills.filter((skill) => skill.category === "Tool"),
  };

  const addSkill = (techSkill: TechSkill) => {
    if (!skills.some((s) => s.name === techSkill.name)) {
      setSkills([
        ...skills,
        {
          name: techSkill.name,
          icon: techSkill.icon,
        },
      ]);
    }
  };

  const removeSkill = (skillName: string) => {
    setSkills(skills.filter((s) => s.name !== skillName));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const renderSkillsSection = (category: string, skillsList: TechSkill[]) => {
    if (skillsList.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#1a3b63] mb-3">
          {category}s
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {skillsList.map((skill) => (
            <button
              key={skill.name}
              type="button"
              onClick={() => addSkill(skill)}
              disabled={skills.some((s) => s.name === skill.name)}
              className={`flex items-center gap-2 p-2 rounded border transition-colors
                ${
                  skills.some((s) => s.name === skill.name)
                    ? "bg-gray-100 text-gray-500"
                    : "hover:bg-gray-50 hover:border-[#2C74B3]"
                }`}
            >
              <skill.icon className="w-5 h-5" />
              <span>{skill.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1a3b63] mb-6">Skills</h2>

      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
          placeholder="Search for skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full"
          >
            <skill.icon className="w-5 h-5" />
            <span>{skill.name}</span>
            <button
              type="button"
              onClick={() => removeSkill(skill.name)}
              className="ml-2 text-gray-500 hover:text-red-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="max-h-[400px] overflow-y-auto pr-2">
        {renderSkillsSection("Language", categorizedSkills.Language)}
        {renderSkillsSection("Framework", categorizedSkills.Framework)}
        {renderSkillsSection("Tool", categorizedSkills.Tool)}
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 text-[#2C74B3] hover:underline"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-8 py-3 text-lg font-semibold text-white bg-[#2C74B3] hover:bg-[#205295] rounded-full"
        >
          Next
        </button>
      </div>
    </form>
  );
};
