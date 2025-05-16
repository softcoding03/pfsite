// Career milestone data
interface Milestone {
  id: number;
  timestamp: Date;
  title: string;
  techStack: string[];
  description: string;
  achievements: string[];
  icon: string;
}

export const milestones: Milestone[] = [
  {
    id: 1,
    timestamp: new Date('2018-05-15'),
    title: 'Bachelor\'s Degree in Computer Science',
    techStack: ['Java', 'Python', 'C++', 'Data Structures'],
    description: 'Graduated with honors, focusing on algorithms and software engineering fundamentals.',
    achievements: [
      'Valedictorian with 3.9 GPA',
      'Led programming team to regional victory',
      'Published research on sorting algorithms'
    ],
    icon: 'src/assets/graduation.svg'
  },
  {
    id: 2,
    timestamp: new Date('2019-01-10'),
    title: 'Junior Developer at TechStart',
    techStack: ['JavaScript', 'React', 'Node.js', 'Express'],
    description: 'Built frontend interfaces and RESTful APIs for startup client projects.',
    achievements: [
      'Reduced page load times by 40%',
      'Implemented responsive design system',
      'Mentored 2 intern developers'
    ],
    icon: 'src/assets/code.svg'
  },
  {
    id: 3,
    timestamp: new Date('2020-03-22'),
    title: 'Full Stack Developer at DataCorp',
    techStack: ['TypeScript', 'Angular', 'PostgreSQL', 'Docker'],
    description: 'Designed and developed enterprise data visualization tools and analytics dashboards.',
    achievements: [
      'Created component library used across 5 projects',
      'Optimized database queries, improving speed by 60%',
      'Led migration from legacy system to modern stack'
    ],
    icon: 'src/assets/database.svg'
  },
  {
    id: 4,
    timestamp: new Date('2021-06-01'),
    title: 'Senior Developer at InnovateTech',
    techStack: ['React Native', 'GraphQL', 'AWS', 'Serverless'],
    description: 'Architected cloud-based solutions and led mobile app development for healthcare clients.',
    achievements: [
      'Built HIPAA-compliant patient portal',
      'Reduced infrastructure costs by 35%',
      'Mentored junior development team'
    ],
    icon: 'src/assets/mobile.svg'
  },
  {
    id: 5,
    timestamp: new Date('2022-09-15'),
    title: 'Lead Developer at FutureSoft',
    techStack: ['Next.js', 'Svelte', 'WebAssembly', 'TensorFlow.js'],
    description: 'Leading innovation team focused on emerging technologies and experimental projects.',
    achievements: [
      'Implemented ML-driven recommendation engine',
      'Open-sourced 3 developer tools with 1000+ stars',
      'Speaker at 2 international tech conferences'
    ],
    icon: 'src/assets/rocket.svg'
  }
];