// Project type definition
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
  demo?: string;
  github?: string;
  status: 'completed' | 'ongoing' | 'coming-soon';
}

// Skill type definition
export interface Skill {
  name: string;
  level: number; // 1-5
  category: 'frontend' | 'backend' | 'tools' | 'softSkills';
}

// Education type definition
export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
}