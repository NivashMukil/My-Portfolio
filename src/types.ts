export interface Project {
  id: string;
  title: string;
  category: 'Data Analytics' | 'Python Full Stack' | 'Power BI';
  subtitle: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  objectives: string[];
  learnings: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  highlights: string[];
  codeSnippet?: {
    language: string;
    code: string;
    title: string;
  };
}

export interface Skill {
  name: string;
  level: number; // 0 - 100
  iconName: string;
  category: 'Programming' | 'Libraries' | 'Frameworks' | 'Analytics' | 'Databases' | 'Tools';
  description: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  institution: string;
  description: string;
  type: 'education' | 'training' | 'project' | 'goal';
  skills?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  icon: string;
  skillsCovered: string[];
  badgeColor: string;
}

export interface Achievement {
  label: string;
  value: number;
  suffix: string;
  icon: string;
  description: string;
}
