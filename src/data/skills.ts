import { Skill, Education } from '../types';

export const skills: Skill[] = [
  // Frontend (for AI interfaces & dashboards)
  { name: 'Python', level: 5, category: 'frontend' },
  { name: 'Streamlit', level: 5, category: 'frontend' },
  { name: 'C++', level: 4, category: 'frontend' },
  { name: 'Java', level: 4, category: 'frontend' },

  // Backend (ML/AI logic and data pipelines)
  { name: 'Machine Learning', level: 5, category: 'backend' },
  { name: 'Deep Learning', level: 5, category: 'backend' },
  { name: 'NLP (Natural Language Processing)', level: 4, category: 'backend' },
  { name: 'Computer Vision', level: 4, category: 'backend' },
  { name: 'Blockchain (KYC/Smart Contracts)', level: 4, category: 'backend' },
  { name: 'API Integration', level: 4, category: 'backend' },

  // Tools (libraries, environments, and dev tools)
  { name: 'TensorFlow', level: 5, category: 'tools' },
  { name: 'PyTorch', level: 4, category: 'tools' },
  { name: 'scikit-learn', level: 5, category: 'tools' },
  { name: 'Pandas', level: 5, category: 'tools' },
  { name: 'NumPy', level: 5, category: 'tools' },
  { name: 'Matplotlib/Seaborn', level: 5, category: 'tools' },
  { name: 'Jupyter Notebook', level: 5, category: 'tools' },
  { name: 'Git/GitHub', level: 5, category: 'tools' },
  { name: 'VS Code', level: 5, category: 'tools' },

  // Soft Skills
  { name: 'Problem Solving', level: 5, category: 'softSkills' },
  { name: 'Team Leadership', level: 4, category: 'softSkills' },
  { name: 'Technical Writing', level: 5, category: 'softSkills' },
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
    role: 'Core Team Member - Blockchain R&D Club',
    organization: 'VIT Bhopal',
    period: '2024 - Present',
    description: 'Working on Blockchain-based KYC verification system and smart contracts.',
  },
  {
    role: 'Core Technical Member - Matrix Tech Club',
    organization: 'VIT Bhopal',
    period: '2025 - Present',
    description: 'Contributing to AI/ML and data science projects like smart city dashboards and healthcare applications.',
  },
  {
    role: 'Certifications & Hackathons',
    organization: 'Various',
    period: '2023 - Present',
    description: `
- Python Libraries for Data Science (Simplilearn)
- Geodata Processing using Python (ISRO)
- Basics of Machine Learning (Pantak)
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
    `,
    links: {
      github: 'https://github.com/udityamerit',
      linkedin: 'https://www.linkedin.com/in/uditya-narayan-tiwari-562332289/',
    }
  }
];
