export type SkillCategory =
  | 'all'
  | 'programming'
  | 'web-development'
  | 'data-analysis'
  | 'tools';

export interface SkillItem {
  id: string;
  name: string;
  category: Exclude<SkillCategory, 'all'>;
  categoryLabel: string;
  /**
   * Configurable baseline value (0-100).
   * Not an external benchmark — editable here or directly inside the Skills Dashboard UI.
   */
  configurableLevel: number;
  description: string;
  iconKey:
    | 'code'
    | 'layers'
    | 'globe'
    | 'palette'
    | 'database'
    | 'table'
    | 'layout'
    | 'git'
    | 'cpu'
    | 'sparkles'
    | 'barChart';
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  overview: string;
  problemStatement: string;
  keyFeatures: string[];
  technologies: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  screenshotUrl: string;
  screenshotAlt: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  context: string;
  summary: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  status: string;
  description: string;
}

export interface SampleTrendPoint {
  year: string;
  movies: number;
  tvShows: number;
  totalSample: number;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  status: string;
  cgpa?: string;
  focusAreas: string[];
}

export const portfolioProfile = {
  name: 'Raheela Rani',
  fullName: 'Raheela Rani',
  title: 'Python Developer | Data Analyst | Mathematics Graduate',
  heroRoles: [
    'Python Developer',
    'Data Analyst',
    'MS Mathematics Scholar',
    'Mathematics Teacher at APS',
  ],
  shortBio:
    'MS Mathematics scholar, BS Mathematical Sciences graduate from FUUAST (3.75 CGPA), and Teacher at APS. Focused on turning raw datasets into structured insights through Python, Pandas, SQL, and Streamlit.',
  aboutParagraphs: [
    'I completed my BS in Mathematical Sciences at Federal Urdu University of Arts, Science & Technology (FUUAST) in December 2025 with a 3.75 CGPA, and I am currently pursuing my MS in Mathematics to deepen my analytical and quantitative expertise.',
    'Alongside my graduate studies, I serve as a Teacher at APS (Army Public School), where explaining complex mathematical concepts with clarity strengthens my structured communication and problem-solving approach.',
    'In software and data work, I apply this mathematical foundation to Python, Pandas, SQL, and Streamlit—auditing messy datasets, writing reproducible cleaning pipelines, and building interactive dashboards, while continuing to grow with Django, HTML5, CSS3, Git & GitHub, and basic machine learning.',
  ],
  locationPlaceholder: 'Pakistan (Editable in config)',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'raheelarani686@gmail.com',
  isEmailPlaceholder: false,
  phone: import.meta.env.VITE_CONTACT_PHONE || '03098205388',
  github: {
    username: '@Raheela15',
    url: import.meta.env.VITE_GITHUB_URL || 'https://github.com/Raheela15',
  },
  linkedin: {
    displayName: 'Raheela Rani',
    url: import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/raheelarani/',
  },
  cvUrl: '/Raheela_CV.pdf',
  cvFileName: 'Raheela_CV.pdf',
  profileImageUrl: '/assets/aistudio/image_9494e337.png',
  contactFormEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '',
};

export const educationDetails = {
  degree: 'BS Mathematical Sciences',
  currentDegree: 'MS Mathematics (In Progress)',
  institution: 'Federal Urdu University of Arts, Science & Technology (FUUAST)',
  graduation: 'December 2025',
  cgpa: '3.75',
  focusAreas: [
    'Probability & Mathematical Statistics',
    'Linear Algebra & Matrix Computations',
    'Calculus & Differential Equations',
    'Numerical Analysis & Quantitative Problem Solving',
  ],
};

export const educationList: EducationItem[] = [
  {
    id: 'ms-mathematics',
    degree: 'MS Mathematics',
    institution: 'Currently Pursuing (Update University in portfolioData.ts)',
    period: 'In Progress',
    status: 'Currently Enrolled',
    focusAreas: [
      'Advanced Mathematical Analysis & Applied Modeling',
      'Quantitative Research & Statistical Reasoning',
    ],
  },
  {
    id: 'bs-mathematical-sciences',
    degree: 'BS Mathematical Sciences',
    institution: 'Federal Urdu University of Arts, Science & Technology (FUUAST)',
    period: 'Graduated December 2025',
    status: 'Completed',
    cgpa: '3.75',
    focusAreas: [
      'Probability & Mathematical Statistics',
      'Linear Algebra & Matrix Computations',
      'Calculus & Differential Equations',
      'Numerical Analysis & Quantitative Problem Solving',
    ],
  },
];

export const skillCategoryMeta: Record<
  Exclude<SkillCategory, 'all'>,
  { label: string; shortLabel: string; accent: string }
> = {
  programming: {
    label: 'Programming',
    shortLabel: 'Programming',
    accent: '#6366f1',
  },
  'data-analysis': {
    label: 'Data Analysis',
    shortLabel: 'Data Analysis',
    accent: '#3b82f6',
  },
  'web-development': {
    label: 'Web Development',
    shortLabel: 'Web Dev',
    accent: '#8b5cf6',
  },
  tools: {
    label: 'Tools',
    shortLabel: 'Tools',
    accent: '#0ea5e9',
  },
};

export const skillsList: SkillItem[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'programming',
    categoryLabel: 'Programming',
    configurableLevel: 80,
    description: 'Primary language for scripting, data processing workflows, and web backend logic.',
    iconKey: 'code',
  },
  {
    id: 'basic-ml',
    name: 'Basic Machine Learning',
    category: 'programming',
    categoryLabel: 'Programming',
    configurableLevel: 55,
    description: 'Introductory supervised learning concepts, train/test splits, and regression/classification basics.',
    iconKey: 'cpu',
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'data-analysis',
    categoryLabel: 'Data Analysis',
    configurableLevel: 80,
    description: 'Tabular manipulation, missing-value imputation, grouping, merging, and dataset auditing.',
    iconKey: 'table',
  },
  {
    id: 'data-cleaning',
    name: 'Data Cleaning',
    category: 'data-analysis',
    categoryLabel: 'Data Analysis',
    configurableLevel: 82,
    description: 'Handling nulls, deduplicating records, standardizing dates/strings, and validating schemas.',
    iconKey: 'sparkles',
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    category: 'data-analysis',
    categoryLabel: 'Data Analysis',
    configurableLevel: 78,
    description: 'Exploratory analysis, trend comparison, distribution checks, and structured reporting.',
    iconKey: 'barChart',
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'data-analysis',
    categoryLabel: 'Data Analysis',
    configurableLevel: 72,
    description: 'Writing relational queries with joins, aggregations, filtering, and grouped summaries.',
    iconKey: 'database',
  },
  {
    id: 'django',
    name: 'Django',
    category: 'web-development',
    categoryLabel: 'Web Development',
    configurableLevel: 65,
    description: 'Foundational MVC/MVT architecture, URL routing, templates, and structured web applications.',
    iconKey: 'layers',
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'web-development',
    categoryLabel: 'Web Development',
    configurableLevel: 78,
    description: 'Semantic document structure, accessible landmarks, forms, and clean page hierarchy.',
    iconKey: 'globe',
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'web-development',
    categoryLabel: 'Web Development',
    configurableLevel: 74,
    description: 'Responsive layouts, Flexbox/Grid alignment, typography, and clean visual styling.',
    iconKey: 'palette',
  },
  {
    id: 'streamlit',
    name: 'Streamlit',
    category: 'tools',
    categoryLabel: 'Tools',
    configurableLevel: 76,
    description: 'Building interactive Python dashboards with dynamic filters and clean visual layouts.',
    iconKey: 'layout',
  },
  {
    id: 'git-github',
    name: 'Git & GitHub',
    category: 'tools',
    categoryLabel: 'Tools',
    configurableLevel: 75,
    description: 'Branching, commits, repository documentation, and publishing reproducible project code.',
    iconKey: 'git',
  },
];

export const projectsList: ProjectItem[] = [
  {
    id: 'netflix-cleaning-dashboard',
    index: '01',
    title: 'Netflix Data Cleaning Dashboard',
    subtitle: 'Data Integrity & Preprocessing Pipeline',
    overview:
      'A structured Python and Pandas data cleaning project paired with an inspection dashboard designed to transform raw, inconsistent Netflix catalog records into an analysis-ready dataset.',
    problemStatement:
      'Raw streaming catalog datasets frequently contain missing director or country fields, inconsistent date strings, mixed duration formats, and duplicate entries that distort downstream queries and charts.',
    keyFeatures: [
      'Automated missing-value auditing and consistent imputation rules across categorical columns',
      'Standardization of date-added strings, release years, and duration units (minutes vs. seasons)',
      'Duplicate detection and schema verification before exporting clean analytical tables',
      'Visual before-and-after dataset health inspection view',
    ],
    technologies: ['Python', 'Pandas', 'Data Cleaning', 'Streamlit', 'Git & GitHub'],
    githubUrl: 'https://github.com/Raheela15/Python-Data-Analysis',
    screenshotUrl: '/src/assets/images/netflix_cleaning_dashboard_1795525155807.jpg',
    screenshotAlt: 'Netflix Data Cleaning Dashboard interface showing null-value audit and cleaned table view',
  },
  {
    id: 'netflix-content-analysis',
    index: '02',
    title: 'Netflix Content Analysis',
    subtitle: 'Exploratory Data Analysis & Catalog Trends',
    overview:
      'An exploratory data analysis study examining Netflix catalog composition across movies and TV shows, release timelines, content ratings, and genre distribution.',
    problemStatement:
      'Understanding how a large streaming library evolves over time requires systematically breaking down multi-label genres, regional production shifts, and rating patterns rather than relying on surface counts.',
    keyFeatures: [
      'Comparative breakdown of Movies vs. TV Shows across release years and catalog additions',
      'Genre and rating frequency analysis highlighting dominant content categories',
      'Multi-country production parsing to examine regional catalog representation',
      'Clear statistical summaries and reproducible Python analysis notebooks',
    ],
    technologies: ['Python', 'Pandas', 'Data Analysis', 'Data Cleaning', 'Git & GitHub'],
    githubUrl: 'https://github.com/Raheela15/Netflix-Content-Analysis',
    screenshotUrl: '/src/assets/images/netflix_content_analysis_1795525155033.jpg',
    screenshotAlt: 'Netflix Content Analysis exploratory charts showing streaming media trends and regional share',
  },
  {
    id: 'netflix-data-analytics-dashboard',
    index: '03',
    title: 'Netflix Data Analytics Dashboard',
    subtitle: 'Interactive Exploratory Dashboard',
    overview:
      'An interactive analytics dashboard built to let users slice, filter, and inspect Netflix catalog metrics across content types, release periods, ratings, and countries.',
    problemStatement:
      'Static charts make it difficult for stakeholders to explore specific subsets of a catalog—such as comparing ratings within a single country or isolating recent release years.',
    keyFeatures: [
      'Interactive sidebar filters for content type, release period, rating, and region',
      'Dynamic visual breakdowns of rating distribution and top-performing categories',
      'Temporal trend views tracking year-over-year catalog growth',
      'Clean responsive layout built for rapid exploratory review',
    ],
    technologies: ['Python', 'Streamlit', 'Pandas', 'Data Analysis', 'Git & GitHub'],
    githubUrl: 'https://github.com/Raheela15/Netflix-Data-Analytics-Dashboard',
    screenshotUrl: '/src/assets/images/netflix_analytics_dashboard_1795525155931.jpg',
    screenshotAlt: 'Netflix Data Analytics Dashboard featuring interactive filter controls and multi-chart grid',
  },
];

/**
 * Illustrative Sample Dataset ONLY — used strictly to demonstrate
 * interactive Recharts line visualization capabilities in the Data Visualization section.
 * Explicitly labeled in the UI as illustrative sample data, NOT personal achievement statistics.
 */
export const illustrativeSampleTrendData: SampleTrendPoint[] = [
  { year: '2016', movies: 256, tvShows: 176, totalSample: 432 },
  { year: '2017', movies: 840, tvShows: 348, totalSample: 1188 },
  { year: '2018', movies: 1237, tvShows: 412, totalSample: 1649 },
  { year: '2019', movies: 1424, tvShows: 592, totalSample: 2016 },
  { year: '2020', movies: 1284, tvShows: 595, totalSample: 1879 },
  { year: '2021', movies: 993, tvShows: 505, totalSample: 1498 },
];

export const experienceList: ExperienceItem[] = [
  {
    id: 'aps-teacher',
    period: 'Present',
    role: 'Teacher — APS (Army Public School)',
    context: 'Army Public School (APS)',
    summary:
      'Teaching mathematics and supporting students in building strong foundational problem-solving, logical reasoning, and quantitative confidence.',
    highlights: [
      'Delivering clear, structured mathematics lessons tailored to student comprehension and analytical thinking',
      'Preparing exercises, assessments, and step-by-step explanations while balancing graduate MS Mathematics studies',
    ],
  },
  {
    id: 'independent-data-projects',
    period: '2024 — Present',
    role: 'Independent Python & Data Analysis Projects',
    context: 'Self-Directed Portfolio & Open-Source Repositories',
    summary:
      'Designed, cleaned, analyzed, and documented end-to-end Python data analysis repositories on GitHub focusing on real-world streaming catalog datasets.',
    highlights: [
      'Built reproducible Pandas data cleaning workflows to resolve null values, formatting inconsistencies, and duplicate records',
      'Developed interactive Streamlit analytics dashboards with dynamic filtering and multi-panel visual summaries',
      'Maintained clean version-controlled codebases and documentation using Git & GitHub',
    ],
  },
  {
    id: 'academic-math-research',
    period: '2022 — Dec 2025',
    role: 'BS Mathematical Sciences Coursework & Quantitative Practice',
    context: 'Federal Urdu University of Arts, Science & Technology (FUUAST)',
    summary:
      'Completed intensive undergraduate training in mathematical analysis, probability, linear algebra, and computational problem-solving, graduating with a 3.75 CGPA.',
    highlights: [
      'Applied statistical reasoning and matrix operations as the mathematical backbone for data analysis and basic machine learning',
      'Practiced structured problem decomposition, proof verification, and clear technical communication',
    ],
  },
];

export const certificationsList: CertificationItem[] = [
  {
    id: 'academic-honors-foundation',
    title: 'BS Mathematical Sciences — 3.75 CGPA',
    issuer: 'FUUAST (December 2025)',
    status: 'Verified Academic Record',
    description:
      'Strong quantitative grounding in calculus, probability, statistics, and numerical methods supporting analytical engineering.',
  },
  {
    id: 'editable-cert-slot-1',
    title: 'Certificate Slot — Ready to Customize',
    issuer: 'Add Issuing Organization in portfolioData.ts',
    status: 'Editable Placeholder',
    description:
      'Space reserved for adding verified Data Analysis, Python, SQL, or Machine Learning certificates as credentials are uploaded.',
  },
  {
    id: 'editable-cert-slot-2',
    title: 'Additional Credential Slot',
    issuer: 'Add Issuing Organization in portfolioData.ts',
    status: 'Editable Placeholder',
    description:
      'Space reserved for future technical workshops, Django/Web coursework, or verified online specializations.',
  },
];
