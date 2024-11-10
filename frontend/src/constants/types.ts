import { IconType } from "react-icons";

export type Skill = {
  name: string;
  category: string;
  icon: IconType;
};

export type Links = {
  github: string;
  linkedin: string;
  portfolio: string;
  x: string;
  email: string;
};

export type Project = {
  name: string;
  date: string;
  description: string[];
  link?: string;
};

export type ExtraCurricular = {
  title: string;
  location: string;
  position: string;
  date: string;
  points: string[];
};

export type Award = {
  title: string;
  date: string;
  description: string;
};

export type Experience = {
  title: string;
  position: string;
  location: string;
  date: string;
  points: string[];
};

export type Education = {
  schoolname: string;
  level: string;
  program: string;
  start: string;
  end: string;
  gpa: string;
};

export type User = {
  name: string;
  linkedin_profile: string;
  github_profile: string;
  phone_number: string;
  skills: {
    language: string[];
    framework: string[];
    tool: string[];
    other: string[];
  };
  experiences: {
    job_title: string;
    date_range: string;
    job_description: string;
    skills: string[];
  }[];
  projects: Project[];
  generated_resumes: any[]; // Define later
};
