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
