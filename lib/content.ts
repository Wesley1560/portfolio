import fs from 'fs';
import path from 'path';
import { PortfolioContent, BasicInfo, Project, Skills, Education, Hero } from './types';

function parsePersonalMd(): PortfolioContent {
  const filePath = path.join(process.cwd(), 'PERSONAL.md');
  if (!fs.existsSync(filePath)) {
    throw new Error('PERSONAL.md not found. Please ensure PERSONAL.md exists in the project root.');
  }
  const content = fs.readFileSync(filePath, 'utf-8');

  const lines = content.split('\n');

  // Parse Hero
  const hero = parseHero(lines);

  // Parse Basic Info
  const basicInfo = parseBasicInfo(lines);
  
  // Parse One-Line Positioning
  const oneLinePositioning = parseOneLinePositioning(lines);
  
  // Parse Professional Summary
  const professionalSummary = parseProfessionalSummary(lines);
  
  // Parse Skills
  const skills = parseSkills(lines);
  
  // Parse Projects
  const projects = parseProjects(lines);
  
  // Parse Education
  const education = parseEducation(lines);
  
  // Parse Achievements
  const achievements = parseAchievements(lines);

  return {
    hero,
    basicInfo,
    oneLinePositioning,
    professionalSummary,
    skills,
    projects,
    education,
    achievements,
  };
}

function parseBasicInfo(lines: string[]): BasicInfo {
  const basicInfo: Partial<BasicInfo> = {
    links: {},
  };

  let inBasicInfo = false;
  let inLinks = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.includes('BASIC INFO')) {
      inBasicInfo = true;
      continue;
    }

    if (inBasicInfo && line.includes('ONE-LINE POSITIONING')) {
      break;
    }

    if (!inBasicInfo) continue;

    if (line.startsWith('Full Name:')) {
      basicInfo.fullName = line.replace('Full Name:', '').trim();
    } else if (line.startsWith('Current Role / Primary Identity:')) {
      basicInfo.currentRole = line.replace('Current Role / Primary Identity:', '').trim();
    } else if (line.startsWith('Primary Skill Domain:')) {
      basicInfo.primarySkillDomain = line.replace('Primary Skill Domain:', '').trim();
    } else if (line.startsWith('Location (optional):')) {
      const location = line.replace('Location (optional):', '').trim();
      if (location) basicInfo.location = location;
    } else if (line.startsWith('Email:')) {
      basicInfo.email = line.replace('Email:', '').trim();
    } else if (line.startsWith('Primary Links:')) {
      inLinks = true;
    } else if (inLinks && line.startsWith('- Instagram:')) {
      basicInfo.links!.instagram = line.replace('- Instagram:', '').trim();
    } else if (inLinks && line.startsWith('- LinkedIn:')) {
      basicInfo.links!.linkedin = line.replace('- LinkedIn:', '').trim();
    } else if (inLinks && line.startsWith('- Portfolio:')) {
      const portfolio = line.replace('- Portfolio:', '').trim();
      if (portfolio) basicInfo.links!.portfolio = portfolio;
    } else if (inLinks && line.startsWith('- GitHub:') || line.startsWith('- Github:')) {
      basicInfo.links!.github = line.replace(/- (GitHub|Github):/, '').trim();
    } else if (inLinks && line && !line.startsWith('-')) {
      inLinks = false;
    }
  }

  return basicInfo as BasicInfo;
}

function parseHero(lines: string[]): Hero {
  const hero: Partial<Hero> = {
    typingLines: [],
  };

  let inSection = false;
  let currentField: keyof Hero | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.includes('HERO')) {
      inSection = true;
      continue;
    }

    if (inSection && line.includes('BASIC INFO')) {
      break;
    }

    if (!inSection) continue;

    if (line === 'TITLE:') {
      currentField = 'title';
    } else if (line === 'TYPING_LINES:') {
      currentField = 'typingLines';
    } else if (line === 'SUMMARY:') {
      currentField = 'summary';
    } else if (line === 'STATUS:') {
      currentField = 'status';
    } else if (currentField === 'title' && line && !line.startsWith('TYPING_LINES:') && !line.startsWith('SUMMARY:') && !line.startsWith('STATUS:')) {
      if (hero.title) {
        hero.title += '\n' + line;
      } else {
        hero.title = line;
      }
    } else if (currentField === 'typingLines' && line && !line.startsWith('SUMMARY:') && !line.startsWith('STATUS:')) {
      hero.typingLines!.push(line);
    } else if (currentField === 'summary' && line && !line.startsWith('STATUS:')) {
      if (hero.summary) {
        hero.summary += ' ' + line;
      } else {
        hero.summary = line;
      }
    } else if (currentField === 'status' && line) {
      if (hero.status) {
        hero.status += ' ' + line;
      } else {
        hero.status = line;
      }
    }
  }

  if (!hero.title || !hero.typingLines || hero.typingLines.length === 0 || !hero.summary || !hero.status) {
    throw new Error('HERO section is incomplete. All fields (TITLE, TYPING_LINES, SUMMARY, STATUS) are required.');
  }

  return hero as Hero;
}

function parseOneLinePositioning(lines: string[]): string {
  let inSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.includes('ONE-LINE POSITIONING')) {
      inSection = true;
      continue;
    }

    if (inSection && line.includes('SHORT PROFESSIONAL SUMMARY')) {
      break;
    }

    if (inSection && line && !line.startsWith('#') && !line.startsWith('=')) {
      return line;
    }
  }

  return '';
}

function parseProfessionalSummary(lines: string[]): string[] {
  const summary: string[] = [];
  let inSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.includes('SHORT PROFESSIONAL SUMMARY')) {
      inSection = true;
      continue;
    }

    if (inSection && line.includes('CORE SKILLS')) {
      break;
    }

    // Collect all non-empty lines that aren't comments or section markers
    if (inSection && line && 
        !line.startsWith('(') && 
        !line.startsWith('=') && 
        !line.startsWith('#')) {
      // Remove bullet points if present, otherwise use the line as-is
      const cleanLine = line.startsWith('- ') ? line.replace('- ', '').trim() : line;
      if (cleanLine) {
        summary.push(cleanLine);
      }
    }
  }

  return summary;
}

function parseSkills(lines: string[]): Skills {
  const skills: Skills = {
    technical: [],
    toolsFrameworks: [],
    nonTechnical: [],
  };

  let inSection = false;
  let currentCategory: keyof Skills | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.includes('CORE SKILLS')) {
      inSection = true;
      continue;
    }

    if (inSection && line.includes('PROJECTS')) {
      break;
    }

    if (!inSection) continue;

    if (line === 'Technical:') {
      currentCategory = 'technical';
    } else if (line === 'Tools / Frameworks:') {
      currentCategory = 'toolsFrameworks';
    } else if (line === 'Non-Technical:') {
      currentCategory = 'nonTechnical';
    } else if (currentCategory && line.startsWith('- ')) {
      skills[currentCategory].push(line.replace('- ', '').trim());
    }
  }

  return skills;
}

function parseProjects(lines: string[]): Project[] {
  const projects: Project[] = [];
  let inProjects = false;
  let currentProject: Partial<Project> | null = null;
  let currentField: keyof Project | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.includes('PROJECTS')) {
      inProjects = true;
      continue;
    }

    if (inProjects && line.includes('EDUCATION')) {
      if (currentProject) {
        projects.push(currentProject as Project);
      }
      break;
    }

    if (!inProjects) continue;

    if (line.startsWith('--------------------------------------------------')) {
      if (currentProject) {
        // Ensure all required arrays are initialized before pushing
        if (!currentProject.whatIDid) currentProject.whatIDid = [];
        if (!currentProject.outcome) currentProject.outcome = [];
        if (!currentProject.techUsed) currentProject.techUsed = [];
        if (!currentProject.problem) currentProject.problem = '';
        projects.push(currentProject as Project);
      }
      currentProject = {
        whatIDid: [],
        outcome: [],
        techUsed: [],
        problem: '',
      };
      currentField = null;
      continue;
    }

    if (!currentProject) continue;

    if (line.startsWith('Name:')) {
      currentProject.name = line.replace('Name:', '').trim();
    } else if (line.startsWith('Link:') || line.startsWith('Link (repo / live link):')) {
      const link = line.replace(/Link( \(repo \/ live link\))?:/, '').trim();
      if (link) {
        currentProject.link = link;
      }
    } else if (line.startsWith('Timeframe:')) {
      currentProject.timeframe = line.replace('Timeframe:', '').trim();
    } else if (line.startsWith('Role:')) {
      currentProject.role = line.replace('Role:', '').trim();
    } else if (line.startsWith('Problem:')) {
      currentField = 'problem';
      const problemText = line.replace('Problem:', '').trim();
      currentProject.problem = problemText || '';
    } else if (line.trim() === 'What I Did:') {
      currentField = 'whatIDid';
      if (!currentProject.whatIDid) currentProject.whatIDid = [];
    } else if (line.trim() === 'Outcome:') {
      currentField = 'outcome';
      if (!currentProject.outcome) currentProject.outcome = [];
    } else if (line.trim() === 'Tech Used:') {
      currentField = 'techUsed';
      if (!currentProject.techUsed) currentProject.techUsed = [];
    } else if (currentField === 'problem' && line && !line.startsWith('-') && line.trim() !== 'What I Did:' && line.trim() !== 'Outcome:' && line.trim() !== 'Tech Used:') {
      if (currentProject.problem) {
        currentProject.problem += ' ' + line;
      } else {
        currentProject.problem = line;
      }
    } else if (currentField && line.startsWith('- ')) {
      const value = line.replace('- ', '').trim();
      if (currentField === 'whatIDid') {
        if (!currentProject.whatIDid) currentProject.whatIDid = [];
        currentProject.whatIDid.push(value);
      } else if (currentField === 'outcome') {
        if (!currentProject.outcome) currentProject.outcome = [];
        currentProject.outcome.push(value);
      } else if (currentField === 'techUsed') {
        if (!currentProject.techUsed) currentProject.techUsed = [];
        currentProject.techUsed.push(value);
      }
    }
  }

  if (currentProject) {
    // Ensure all required arrays are initialized before pushing
    if (!currentProject.whatIDid) currentProject.whatIDid = [];
    if (!currentProject.outcome) currentProject.outcome = [];
    if (!currentProject.techUsed) currentProject.techUsed = [];
    if (!currentProject.problem) currentProject.problem = '';
    projects.push(currentProject as Project);
  }

  return projects;
}

function parseEducation(lines: string[]): Education {
  const education: Partial<Education> = {};

  let inSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.includes('EDUCATION')) {
      inSection = true;
      continue;
    }

    if (inSection && line.includes('ACHIEVEMENTS')) {
      break;
    }

    if (!inSection) continue;

    if (line.startsWith('Institution:')) {
      education.institution = line.replace('Institution:', '').trim();
    } else if (line.startsWith('Degree:')) {
      education.degree = line.replace('Degree:', '').trim();
    } else if (line.startsWith('Field:')) {
      education.field = line.replace('Field:', '').trim();
    } else if (line.startsWith('Dates:')) {
      education.dates = line.replace('Dates:', '').trim();
    } else if (line.startsWith('Notable Distinctions (optional):')) {
      education.notableDistinctions = line.replace('Notable Distinctions (optional):', '').trim();
    } else if (line.startsWith('GPA:')) {
      education.gpa = line.replace('GPA:', '').trim();
    }
  }

  return education as Education;
}

function parseAchievements(lines: string[]): string[] {
  const achievements: string[] = [];
  let inSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.includes('ACHIEVEMENTS / SIGNALS')) {
      inSection = true;
      continue;
    }

    if (inSection && line.includes('WHAT I WANT NEXT')) {
      break;
    }

    if (inSection && line.startsWith('- ')) {
      achievements.push(line.replace('- ', '').trim());
    }
  }

  return achievements;
}

// Parse and export content
export const portfolioContent = parsePersonalMd();
