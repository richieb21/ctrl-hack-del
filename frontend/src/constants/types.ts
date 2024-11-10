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
  links: {
    email: string;
    github_profile: string;
    linkedin_profile: string;
    portfolio_link: string;
    x_profile: string;
  };
  phone_number: string;
  skills: {
    language: string[];
    framework: string[];
    tool: string[];
    other: string[];
  };
  education: {
	schoolname: string;
	level: string; 
	program: string;
	start: string;
	end: string;
	gpa: string;
  }[];
  experiences: {
    title: string;
	position: string;
	location: string;
	date: string;
	points: string[];
  }[];
  extra_curricular: {
	title: string;
	location: string;
	position: string;
	date: string;
	points: string[];
  }[];
  awards: {
	title: string;
	description: string;
	date: string
  }[];
  projects: Project[];
  generated_resumes: any[]; // Define later
};

export interface BulletPoint {
  id: string;
  text: string;
}

export interface ResumeItem {
  id: string;
  title: string;
  subTitle: string;
  location: string;
  timeFrom: string;
  timeTo: string;
  subPoints: BulletPoint[];
}

export interface ResumeSection {
  id: string;
  title: string;
  items: ResumeItem[];
}

export interface Resume {
  name: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  sections: ResumeSection[];
}
