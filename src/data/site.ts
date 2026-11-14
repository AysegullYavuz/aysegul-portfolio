import {
  siDjango,
  siDocker,
  siFirebase,
  siFlutter,
  siGit,
  siHtml5,
  siJavascript,
  siNodedotjs,
  siPandas,
  siPostgresql,
  siPython,
  siReact,
  siScikitlearn,
  siStreamlit,
  siTailwindcss,
  siTypescript,
} from 'simple-icons'

/* ------------------------------------------------------------------ */
/*  Central content file — edit here, the UI updates automatically     */
/* ------------------------------------------------------------------ */

export const site = {
  name: 'Ayşegül Yavuz',
  shortName: 'Ayşegül.',
  role: 'Computer Engineer',
  location: 'Computer Engineer — Data Analytics & Full-Stack',
  email: 'yavuzaysegul10@gmail.com',
  linkedin: encodeURI('https://www.linkedin.com/in/ayşegülyavuz'),
  linkedinLabel: 'in/ayşegülyavuz',
  github: 'https://github.com/AysegullYavuz',
  githubLabel: 'github.com/AysegullYavuz',
  x: 'https://x.com/your-handle',
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Projects', href: '#projects' },
  { label: 'Technologies', href: '#technologies' },
  { label: 'Contact', href: '#contact' },
]

export const heroStats = [
  { value: '8', label: 'Projects across data & web' },
  { value: 'ML', label: 'Forecasting, NLP & clustering' },
  { value: 'Web', label: 'Real-time full-stack apps' },
]

export const aboutContent = {
  paragraphs: [
    'I’m Ayşegül, a computer engineering graduate of Bandırma Onyedi Eylül University who loves turning raw data and rough ideas into dependable, elegant software. I work across data analytics, machine learning and full-stack development — from exploring and modelling data to building the applications that put it to use.',
    'I’ve built real-time web platforms, forecasting pipelines, NLP applications and an AI-powered location recommender — and completed a two-month internship in computer vision at Ayvos Bilgi Teknolojileri. I write code that is readable, tested and built to evolve.',
  ],
  badge: { value: 'CE', text: 'computer engineer focused on data & full-stack' },
  principles: [
    {
      title: 'Clarity over cleverness',
      body: 'Simple, well-named, well-tested code ages better than anything ingenious.',
    },
    {
      title: 'Data tells the story',
      body: 'Good decisions start with clean data, honest analysis and visuals people can trust.',
    },
    {
      title: 'Ship, learn, refine',
      body: 'Small, measurable releases keep projects honest and users at the center.',
    },
  ],
  highlights: [
    {
      year: 'Education',
      title: 'Computer Engineering',
      place: 'Bandırma Onyedi Eylül University — Graduate',
    },
    {
      year: 'Internship · 2 months',
      title: 'Computer Vision Intern',
      place: 'Ayvos Bilgi Teknolojileri',
    },
    {
      year: 'Graduation project',
      title: 'CogniLoc',
      place: 'LLM-powered location analytics & recommendation',
    },
  ],
}

export type Expertise = {
  id: string
  title: string
  description: string
  tags: string[]
}

export const expertise: Expertise[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description:
      'Fast, type-safe interfaces with React, TypeScript and Tailwind — including interactive dashboards and dark/light theming.',
    tags: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description:
      'Scalable Django services, WebSocket real-time layers with Daphne (ASGI) and concurrency-safe logic.',
    tags: ['Django', 'Daphne', 'WebSockets'],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    description:
      'End-to-end ownership — from database schema and REST API to a containerised, deployed interface.',
    tags: ['Django + React', 'Docker', 'Flutter'],
  },
  {
    id: 'database',
    title: 'Database Design',
    description:
      'Normalised relational schemas with role-based access control, audit logging and analytical SQL views.',
    tags: ['PostgreSQL', 'SQL Server', 'T-SQL'],
  },
  {
    id: 'api',
    title: 'API Development & Integration',
    description:
      'RESTful services with Django REST Framework, real-time data streams and LLM API integrations.',
    tags: ['DRF', 'REST', 'LLM APIs'],
  },
  {
    id: 'data',
    title: 'Data Analysis & Automation',
    description:
      'Data pipelines, forecasting, segmentation, NLP and Power BI reporting — from raw data to decisions.',
    tags: ['Pandas', 'Scikit-learn', 'Power BI'],
  },
]

export type Project = {
  title: string
  category: string
  badge: string
  description: string
  tech: string[]
  image: string
  href: string
  alt: string
}

/** Featured projects — shown as large editorial rows. Set `href` to your GitHub / demo link. */
export const projects: Project[] = [
  {
    title: 'NexusReserve',
    category: 'Real-Time Seat Reservation Platform',
    badge: 'Full-Stack',
    description:
      'A full-duplex, real-time synchronisation system built on WebSockets and Daphne (ASGI) that handles concurrent seat reservations — with server-side optimistic and pessimistic locking to prevent race conditions and eliminate double-booking.',
    tech: ['Django', 'Daphne', 'React', 'TypeScript', 'Tailwind CSS'],
    image: '/images/project_nexus.jpg',
    href: '#',
    alt: 'NexusReserve real-time seat map showing available, selected and reserved seats on a laptop',
  },
  {
    title: 'Demand Forecasting',
    category: 'E-Commerce Supply Chain Analytics',
    badge: 'Data & ML',
    description:
      'An end-to-end pipeline: SQL Server views turn raw transactions into daily time series, Python prepares lag and calendar features, a Random Forest model forecasts demand and writes results back to SQL Server for an executive Power BI dashboard.',
    tech: ['SQL Server', 'Python', 'Pandas', 'Scikit-Learn', 'PyODBC', 'Power BI'],
    image: '/images/project_analytics.jpg',
    href: '#',
    alt: 'Analytics dashboard on a laptop showing sales metrics and demand forecast curves',
  },
  {
    title: 'CogniLoc',
    category: 'Location Analytics & Recommendation — Graduation Project',
    badge: 'AI · Mobile',
    description:
      'Covers the full data lifecycle — collection, cleaning and semantic interpretation of geospatial data across Istanbul, Bursa and Izmir — and a personalised recommendation engine that uses LLMs to turn natural-language queries into spatial insights.',
    tech: ['Flutter', 'Firebase', 'Gemini AI', 'LLaMA 3.3', 'Python'],
    image: '/images/project_cogniloc.jpg',
    href: '#',
    alt: 'CogniLoc mobile app with a city map, location pins and natural-language search',
  },
  {
    title: 'IncidentFlow',
    category: 'Incident & Task Management System',
    badge: 'Full-Stack · DevOps',
    description:
      'Scalable REST API services that streamline cross-team issue tracking and task delegation, backed by a normalised PostgreSQL schema with role-based access control and audit logging — containerised end to end with Docker Compose.',
    tech: ['Django REST Framework', 'PostgreSQL', 'Docker Compose', 'React'],
    image: '/images/project_incident.jpg',
    href: '#',
    alt: 'IncidentFlow kanban board with ticket cards, priority tags and assignees',
  },
  {
    title: 'Apex Dashboard',
    category: 'Interactive Financial Analytics Dashboard',
    badge: 'Frontend',
    description:
      'A high-performance, modular dashboard rendering dynamic metrics, interactive charts and real-time REST API data streams — with TypeScript type safety, an optimised Vite build pipeline and persistent dark/light theming.',
    tech: ['TypeScript', 'Vite', 'Tailwind CSS', 'REST API'],
    image: '/images/project_apex.jpg',
    href: '#',
    alt: 'Apex financial analytics dashboard with charts and KPI cards in dark and light themes',
  },
]

export type MoreProject = {
  title: string
  category: string
  description: string
  tech: string[]
  href: string
}

/** Additional projects — shown as a compact grid below the featured work. */
export const moreProjects: MoreProject[] = [
  {
    title: 'Turkish Reviews Sentiment Analysis',
    category: 'NLP · Machine Learning',
    description:
      'Classifies large-scale unstructured Turkish e-commerce reviews as positive or negative, using stemming, stop-word removal and TF-IDF / CountVectorizer pipelines, deployed as a live Streamlit app.',
    tech: ['Python', 'Scikit-Learn', 'Logistic Regression', 'Streamlit'],
    href: '#',
  },
  {
    title: 'Customer Segmentation',
    category: 'Data Analytics · BI',
    description:
      'RFM metrics and K-Means clustering to profile customer behaviour, with interactive visual reports and BI dashboards for multi-channel marketing and target-group discovery.',
    tech: ['Python', 'Pandas', 'K-Means', 'Seaborn', 'Power BI'],
    href: '#',
  },
  {
    title: 'Customer Churn Prediction',
    category: 'Machine Learning',
    description:
      'An end-to-end ML pipeline that forecasts churn on structured enterprise data — automated preprocessing, missing-value imputation, predictive modelling and rigorous evaluation of performance metrics.',
    tech: ['Python', 'Scikit-learn', 'XGBoost', 'NumPy'],
    href: '#',
  },
]

export type Tech = { name: string; path: string; hex: string }

export const technologies: Tech[] = [
  { name: 'Python', path: siPython.path, hex: siPython.hex },
  { name: 'JavaScript', path: siJavascript.path, hex: siJavascript.hex },
  { name: 'TypeScript', path: siTypescript.path, hex: siTypescript.hex },
  { name: 'React', path: siReact.path, hex: siReact.hex },
  { name: 'HTML & CSS', path: siHtml5.path, hex: siHtml5.hex },
  { name: 'Django', path: siDjango.path, hex: siDjango.hex },
  { name: 'Node.js', path: siNodedotjs.path, hex: siNodedotjs.hex },
  { name: 'PostgreSQL', path: siPostgresql.path, hex: siPostgresql.hex },
  { name: 'Docker', path: siDocker.path, hex: siDocker.hex },
  { name: 'Git', path: siGit.path, hex: siGit.hex },
  { name: 'Pandas', path: siPandas.path, hex: siPandas.hex },
  { name: 'Scikit-learn', path: siScikitlearn.path, hex: siScikitlearn.hex },
  { name: 'Tailwind CSS', path: siTailwindcss.path, hex: siTailwindcss.hex },
  { name: 'Flutter', path: siFlutter.path, hex: siFlutter.hex },
  { name: 'Firebase', path: siFirebase.path, hex: siFirebase.hex },
  { name: 'Streamlit', path: siStreamlit.path, hex: siStreamlit.hex },
]

export const processSteps = [
  {
    number: '01',
    title: 'Research & Discovery',
    description:
      'We start by listening — understanding your users, goals and constraints so every decision that follows is grounded in real context.',
    outputs: ['Stakeholder interviews', 'Requirements map', 'Risk assessment'],
  },
  {
    number: '02',
    title: 'Planning & Architecture',
    description:
      'I define the technical blueprint: system design, data models, milestones and a roadmap that balances ambition with delivery.',
    outputs: ['System diagram', 'Tech stack decision', 'Delivery roadmap'],
  },
  {
    number: '03',
    title: 'UI/UX Design',
    description:
      'Wireframes become refined interfaces. Component systems, accessibility and motion are designed together before a line of production code.',
    outputs: ['Wireframes', 'Design system', 'Interactive prototype'],
  },
  {
    number: '04',
    title: 'Development',
    description:
      'Iterative, test-driven builds with regular demos. Clean commits, typed code and continuous integration keep quality visible.',
    outputs: ['Frequent releases', 'Code reviews', 'Automated testing'],
  },
  {
    number: '05',
    title: 'Testing & Optimization',
    description:
      'Performance budgets, accessibility audits and load testing make sure it’s not just working — it’s fast, secure and resilient.',
    outputs: ['Performance audit', 'Security review', 'Accessibility pass'],
  },
  {
    number: '06',
    title: 'Deployment',
    description:
      'Automated pipelines, monitoring and documentation for a smooth launch — and a handover that leaves your team confident.',
    outputs: ['CI/CD pipeline', 'Monitoring & alerts', 'Documentation'],
  },
]

/** Sample testimonials — replace with real feedback when you have it. */
export const testimonials = [
  {
    quote:
      'Ayşegül took a loosely defined idea and turned it into a product our users genuinely love. The code quality and attention to detail were exceptional.',
    name: 'Sample Client',
    role: 'Founder, Placeholder Co.',
  },
  {
    quote:
      'Rare to find an engineer who is equally strong in data and in building polished applications. Communication was clear and delivery was predictable.',
    name: 'Sample Name',
    role: 'Head of Product, Example Studio',
  },
  {
    quote:
      'The analytics work gave our team clarity we never had before. Calm, thoughtful and incredibly reliable to work with.',
    name: 'Your Client Here',
    role: 'CTO, Demo Technologies',
  },
]
