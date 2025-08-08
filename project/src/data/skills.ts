import { Skill, Education } from '../types';
import { 
  Brain, Network, Cpu, Bot, MessageSquare, Code2, Terminal, Coffee, Globe, Link,
  BarChart3, Calculator, PieChart, FileText, Eye, GitBranch, Code, Flame, Shield, Puzzle,
  PenTool, Lightbulb, Users, Briefcase, Mic
} from 'lucide-react';

// Top 5 Machine Learning & AI Skills - Updated to 80% (level 4)
export const machineLearningSkills = [
  { name: 'Machine Learning', icon: Brain, color: 'from-purple-500 to-pink-500', level: 4 },
  { name: 'Deep Learning', icon: Network, color: 'from-blue-500 to-cyan-500', level: 4 },
  { name: 'TensorFlow', icon: Cpu, color: 'from-orange-500 to-red-500', level: 3 }, // 60%
  { name: 'scikit-learn', icon: Bot, color: 'from-green-500 to-emerald-500', level: 4 },
  { name: 'NLP (Natural Language Processing)', icon: MessageSquare, color: 'from-indigo-500 to-purple-500', level: 4 }
];

// Top 5 Programming Languages
export const programmingLanguages = [
  { name: 'Python', icon: Code2, color: 'from-yellow-500 to-amber-500', level: 5 },
  { name: 'C++', icon: Terminal, color: 'from-blue-600 to-blue-800', level: 4 },
  { name: 'Java', icon: Coffee, color: 'from-red-600 to-orange-600', level: 4 },
  { name: 'Streamlit', icon: Globe, color: 'from-pink-500 to-rose-500', level: 5 },
  { name: 'API Integration', icon: Link, color: 'from-cyan-500 to-blue-500', level: 4 }
];

// Top 5 Data Science & Analytics Tools
export const dataScienceTools = [
  { name: 'Pandas', icon: BarChart3, color: 'from-green-500 to-teal-500', level: 5 },
  { name: 'NumPy', icon: Calculator, color: 'from-blue-500 to-indigo-500', level: 5 },
  { name: 'Matplotlib/Seaborn', icon: PieChart, color: 'from-purple-500 to-violet-500', level: 5 },
  { name: 'Jupyter Notebook', icon: FileText, color: 'from-orange-500 to-amber-500', level: 5 },
  { name: 'Computer Vision', icon: Eye, color: 'from-emerald-500 to-green-600', level: 4 }
];

// Top 5 Development & Collaboration Tools - Updated PyTorch to 60%, Blockchain to 40%, TensorFlow to 60%
export const developmentTools = [
  { name: 'Git/GitHub', icon: GitBranch, color: 'from-gray-700 to-gray-900', level: 5 },
  { name: 'VS Code', icon: Code, color: 'from-blue-500 to-cyan-500', level: 5 },
  { name: 'PyTorch', icon: Flame, color: 'from-red-500 to-orange-500', level: 3 }, // 60%
  { name: 'Blockchain (KYC/Smart Contracts)', icon: Shield, color: 'from-yellow-600 to-orange-600', level: 2 }, // 40%
  { name: 'Problem Solving', icon: Puzzle, color: 'from-indigo-500 to-blue-500', level: 5 }
];

// Top 5 Leadership & Communication Skills - Updated Technical Writing to 70%, Problem Solving to 80%
export const softSkills = [
  { name: 'Technical Writing', icon: PenTool, color: 'from-slate-500 to-gray-600', level: 3.5 }, // 70%
  { name: 'Problem Solving', icon: Lightbulb, color: 'from-yellow-500 to-orange-500', level: 4 }, // 80%
  { name: 'Team Leadership', icon: Users, color: 'from-blue-500 to-purple-500', level: 4 },
  { name: 'Project Management', icon: Briefcase, color: 'from-green-500 to-blue-500', level: 4 },
  { name: 'Public Speaking', icon: Mic, color: 'from-pink-500 to-red-500', level: 4 }
];

// Combined skills object for easy access
export const skillClusters = {
  machineLearning: machineLearningSkills,
  programming: programmingLanguages,
  dataScience: dataScienceTools,
  development: developmentTools,
  softSkills: softSkills
};

export const skills: Skill[] = [
  // Frontend (for AI interfaces & dashboards)
  { name: 'Python', level: 5, category: 'frontend' },
  { name: 'Streamlit', level: 5, category: 'frontend' },
  { name: 'C++', level: 4, category: 'frontend' },
  { name: 'Java', level: 4, category: 'frontend' },

  // Backend (ML/AI logic and data pipelines)
  { name: 'Machine Learning', level: 4, category: 'backend' }, // 80%
  { name: 'Deep Learning', level: 4, category: 'backend' }, // 80%
  { name: 'NLP (Natural Language Processing)', level: 4, category: 'backend' }, // 80%
  { name: 'Computer Vision', level: 4, category: 'backend' },
  { name: 'Blockchain (KYC/Smart Contracts)', level: 2, category: 'backend' }, // 40%
  { name: 'API Integration', level: 4, category: 'backend' },

  // Tools (libraries, environments, and dev tools)
  { name: 'TensorFlow', level: 3, category: 'tools' }, // 60%
  { name: 'PyTorch', level: 3, category: 'tools' }, // 60%
  { name: 'scikit-learn', level: 4, category: 'tools' }, // 80%
  { name: 'Pandas', level: 5, category: 'tools' },
  { name: 'NumPy', level: 5, category: 'tools' },
  { name: 'Matplotlib/Seaborn', level: 5, category: 'tools' },
  { name: 'Jupyter Notebook', level: 5, category: 'tools' },
  { name: 'Git/GitHub', level: 5, category: 'tools' },
  { name: 'VS Code', level: 5, category: 'tools' },

  // Soft Skills
  { name: 'Problem Solving', level: 4, category: 'softSkills' }, // 80%
  { name: 'Team Leadership', level: 4, category: 'softSkills' },
  { name: 'Technical Writing', level: 3.5, category: 'softSkills' }, // 70%
  { name: 'Project Management', level: 4, category: 'softSkills' },
  { name: 'Public Speaking', level: 4, category: 'softSkills' },
];

export const education: Education[] = [
  {
    degree: 'B.Tech in Computer Science and Engineering (AI & ML)',
    institution: 'Vellore Institute of Technology (VIT)',
    location: 'Bhopal, Madhya Pradesh',
    period: '2023 - 2027',
    description: `
Specializing in Artificial Intelligence and Machine Learning. Focus areas include:
- Deep Learning, Natural Language Processing (NLP), and Computer Vision.
- Applied ML projects in healthcare, geospatial data, student performance prediction, and customer churn analysis.
    `,
  }
];

export const experience = [
  {
    role: 'Core Team Member - Microsoft Technical Club',
    organization: 'VIT Bhopal',
    period: '2025 - Present',
    description: 'Leading technical initiatives with Microsoft technologies including Azure cloud services, .NET framework, and Microsoft development tools. Organizing workshops and mentoring students in Microsoft technology stack.',
  },
  {
    role: 'Core Technical Member - Matrix Tech Club',
    organization: 'VIT Bhopal',
    period: '2025 - Present',
    description: 'Contributing to AI/ML and data science projects like smart city dashboards and healthcare applications. Leading technical teams in innovative projects.',
  },
  {
    role: 'Core Team Member - Blockchain R&D Club',
    organization: 'VIT Bhopal',
    period: '2024 - Present',
    description: 'Working on Blockchain-based KYC verification system and smart contracts. Research and development in blockchain technologies and decentralized applications.',
  },
  
  {
    role: 'Certifications & Hackathons',
    organization: 'Various',
    period: '2023 - Present',
    description: `
- Python Libraries for Data Science (Simplilearn)
- Geodata Processing using Python (ISRO)
- Basics of Machine Learning (Pantak)
- Winner of InnovMinds Expo Hackathon (VIT Bhopal)
- Participant in international Health-Hack AI/ML hackathon
    `,
  },
  {
    role: 'Projects & Achievements',
    organization: 'Personal / GitHub',
    period: '2023 - Present',
    description: `
- Built multiple end-to-end ML projects: Breast Cancer Prediction, Chatbots, Face Recognition Attendance System, Weather Forecasting App.
- Achieved 5 ratings in Python and C++ on HackerRank.
- 350+ LeetCode problems solved.
    `,
    links: {
      github: 'https://github.com/udityamerit',
      linkedin: 'https://www.linkedin.com/in/uditya-narayan-tiwari-562332289/',
    }
  }
];