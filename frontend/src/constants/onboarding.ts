import { IconType } from "react-icons";
import {
  SiJavascript,
  SiPython,
  SiReact,
  SiVuedotjs,
  SiAngular,
  SiNodedotjs,
  SiTypescript,
  SiRuby,
  SiGo,
  SiDocker,
  SiKubernetes,
  SiMongodb,
  SiPostgresql,
} from "react-icons/si";

import { FaJava } from "react-icons/fa";

export type TechSkill = {
  name: string;
  icon: IconType;
  category: "Language" | "Framework" | "Tool";
};

export const AVAILABLE_SKILLS: TechSkill[] = [
  { name: "JavaScript", icon: SiJavascript, category: "Language" },
  { name: "Python", icon: SiPython, category: "Language" },
  { name: "React", icon: SiReact, category: "Framework" },
  { name: "Vue.js", icon: SiVuedotjs, category: "Framework" },
  { name: "Angular", icon: SiAngular, category: "Framework" },
  { name: "Node.js", icon: SiNodedotjs, category: "Framework" },
  { name: "TypeScript", icon: SiTypescript, category: "Language" },
  { name: "Ruby", icon: SiRuby, category: "Language" },
  { name: "Go", icon: SiGo, category: "Language" },
  { name: "Java", icon: FaJava, category: "Language" },
  { name: "Docker", icon: SiDocker, category: "Tool" },
  { name: "Kubernetes", icon: SiKubernetes, category: "Tool" },
  { name: "MongoDB", icon: SiMongodb, category: "Tool" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "Tool" },
];
