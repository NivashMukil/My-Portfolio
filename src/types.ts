export interface Project {
  id: string;
  title: string;
  category: 'Data Analytics' | 'Python Full Stack' | 'Power BI' | string;
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
  stars?: number;
  forks?: number;
  updatedAt?: string;
  topics?: string[];
  isFeatured?: boolean;
  repoName?: string;
  isGitHubRepo?: boolean;
  language?: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  created_at: string;
  topics?: string[];
  archived: boolean;
  fork: boolean;
  visibility: string;
}

export interface Skill {
  name: string;
  level: number; // 0 - 100
  iconName: string;
  category: 'Programming' | 'Data Analytics' | 'Database' | 'Web Development' | 'Tools';
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
