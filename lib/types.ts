export interface BasicInfo {
  fullName: string;
  currentRole: string;
  primarySkillDomain: string;
  location?: string;
  email: string;
  links: {
    instagram?: string;
    linkedin?: string;
    portfolio?: string;
    github?: string;
  };
}

export interface Project {
  name: string;
  link?: string;
  timeframe: string;
  role: string;
  problem: string;
  whatIDid: string[];
  outcome: string[];
  techUsed: string[];
}

export interface Skills {
  technical: string[];
  toolsFrameworks: string[];
  nonTechnical: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  dates: string;
  notableDistinctions?: string;
  gpa?: string;
}

export interface PortfolioContent {
  basicInfo: BasicInfo;
  oneLinePositioning: string;
  professionalSummary: string[];
  skills: Skills;
  projects: Project[];
  education: Education;
  achievements: string[];
}
