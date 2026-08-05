import type { Project, Skill, TimelineItem, Certification, Achievement } from '../types';

export const PERSONAL_INFO = {
  name: 'Nivash Mukil',
  titles: [
    'Aspiring Data Analyst',
    'Python Developer',
    'Power BI Developer',
    'SQL Enthusiast'
  ],
  bio: 'A passionate Computer Science graduate and Data Analytics & Python Full Stack Developer. Adept at turning raw, complex data into actionable business intelligence using Python, SQL, and Power BI, while building robust end-to-end full-stack web applications.',
  email: 'nivash1912004@gmail.com',
  phone: '+91 8088190044',
  location: 'Bangalore, India',
  github: 'https://github.com/NivashMukil',
  linkedin: 'https://linkedin.com/in/nivash-mukil',
  degree: 'Bachelor of Computer Science',
  university: 'Madurai Kamaraj University College',
  training: 'PySpiders Training Institute',
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    label: 'Projects Completed',
    value: 5,
    suffix: '+',
    icon: 'FolderCheck',
    description: 'Full-stack & data analytics projects built'
  },
  {
    label: 'Dashboards Built',
    value: 10,
    suffix: '+',
    icon: 'BarChart3',
    description: 'Interactive Power BI & analytics reports'
  },
  {
    label: 'Programming Languages',
    value: 3,
    suffix: '+',
    icon: 'Code2',
    description: 'Python, SQL, JavaScript'
  },
  {
    label: 'Libraries Mastered',
    value: 8,
    suffix: '+',
    icon: 'Binary',
    description: 'Pandas, NumPy, Seaborn, Matplotlib, OpenCV...'
  },
  {
    label: 'Learning Journey',
    value: 100,
    suffix: '%',
    icon: 'Sparkles',
    description: 'Continuous hands-on practice & growth'
  }
];

export const SKILLS: Skill[] = [
  // Programming
  { name: 'Python', level: 90, iconName: 'FileCode', category: 'Programming', description: 'Data structures, OOP, Pandas, NumPy, Django, FastAPI' },
  { name: 'SQL', level: 88, iconName: 'Database', category: 'Programming', description: 'Complex Queries, Joins, Aggregations, Subqueries, Stored Procedures' },
  { name: 'JavaScript', level: 78, iconName: 'Code', category: 'Programming', description: 'ES6+, DOM Manipulation, Async/Await, Interactive UIs' },
  { name: 'HTML5', level: 92, iconName: 'Layout', category: 'Programming', description: 'Semantic markup, accessibility, SEO structure' },
  { name: 'CSS3', level: 85, iconName: 'Palette', category: 'Programming', description: 'Flexbox, Grid, Glassmorphism, Animations, Responsive layouts' },

  // Libraries
  { name: 'Pandas', level: 90, iconName: 'Table', category: 'Libraries', description: 'Data manipulation, wrangling, transformation, aggregation' },
  { name: 'NumPy', level: 85, iconName: 'Calculator', category: 'Libraries', description: 'Numerical computations, multi-dimensional array processing' },
  { name: 'Matplotlib', level: 84, iconName: 'LineChart', category: 'Libraries', description: 'Custom statistical charts, plotting, trend visualizations' },
  { name: 'Seaborn', level: 86, iconName: 'PieChart', category: 'Libraries', description: 'Statistical data visualization, heatmaps, correlation matrix' },
  { name: 'OpenCV', level: 72, iconName: 'Eye', category: 'Libraries', description: 'Computer vision basics, image processing & color analysis' },

  // Frameworks
  { name: 'Django', level: 82, iconName: 'Server', category: 'Frameworks', description: 'MVT Architecture, ORM, Auth, Admin Portal, SQLite/PostgreSQL integration' },
  { name: 'FastAPI', level: 75, iconName: 'Zap', category: 'Frameworks', description: 'High-performance async APIs, Pydantic data validation' },
  { name: 'REST API', level: 84, iconName: 'Globe', category: 'Frameworks', description: 'API design, JSON response formatting, HTTP verbs, integration' },

  // Analytics
  { name: 'Power BI', level: 92, iconName: 'BarChart', category: 'Analytics', description: 'Interactive Dashboards, Power Query, DAX measures, ETL pipeline' },
  { name: 'Excel', level: 88, iconName: 'Sheet', category: 'Analytics', description: 'Pivot tables, VLOOKUP/XLOOKUP, Advanced formulas, Data cleaning' },
  { name: 'DAX', level: 84, iconName: 'Cpu', category: 'Analytics', description: 'Data Analysis Expressions, calculated columns, measures, time intelligence' },
  { name: 'ETL', level: 85, iconName: 'Workflow', category: 'Analytics', description: 'Extract, Transform, Load workflows in Power Query & Python' },
  { name: 'EDA', level: 90, iconName: 'Search', category: 'Analytics', description: 'Exploratory Data Analysis, outlier detection, hypothesis testing' },

  // Databases
  { name: 'Oracle SQL', level: 82, iconName: 'Database', category: 'Databases', description: 'Enterprise relational database querying & schema design' },
  { name: 'MySQL', level: 86, iconName: 'HardDrive', category: 'Databases', description: 'Relational database management, indexing, relational tables' },

  // Tools
  { name: 'Git', level: 85, iconName: 'GitBranch', category: 'Tools', description: 'Version control, branching strategies, commit history management' },
  { name: 'GitHub', level: 88, iconName: 'Github', category: 'Tools', description: 'Repository hosting, collaborative coding, portfolio showcase' },
  { name: 'VS Code', level: 92, iconName: 'Terminal', category: 'Tools', description: 'Primary IDE for Python, Frontend, and SQL scripting' },
  { name: 'PyCharm', level: 84, iconName: 'Cpu', category: 'Tools', description: 'Python & Django dedicated development environment' },
  { name: 'Power BI Desktop', level: 94, iconName: 'Monitor', category: 'Tools', description: 'Report creation, model building, dataset transformations' }
];

export const PROJECTS: Project[] = [
  {
    id: 'hr-attrition-analysis',
    title: 'HR Attrition Analysis',
    category: 'Data Analytics',
    subtitle: 'End-to-End Employee Churn & Retention Analytics',
    description: 'Comprehensive exploratory data analysis and predictive insight model to identify key factors driving employee attrition and improve workforce retention strategies.',
    longDescription: 'In this project, I performed end-to-end Exploratory Data Analysis (EDA) on HR dataset comprising over 1,400 employee records. By cleaning missing data, engineering key features like tenure ratios and salary bands, and executing correlation matrix analysis using Pandas and Seaborn, I uncovered critical insights regarding overtime, job satisfaction, and distance from home.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    features: [
      'Data Cleaning & Imputation of missing workplace records',
      'Feature Engineering (Tenure Groups, Salary Banding, Satisfaction Index)',
      'Exploratory Data Analysis (EDA) with interactive visualization',
      'Correlation Heatmaps identifying top 5 attrition drivers',
      'Actionable Business Recommendations for HR Leadership'
    ],
    objectives: [
      'Identify root causes of employee turnover in corporate environments',
      'Provide data-driven recommendations to reduce attrition rate by up to 15%',
      'Visualize employee demographic distributions across departments'
    ],
    learnings: [
      'Mastered feature engineering techniques for categorical HR metrics',
      'Discovered that employees working regular overtime had 3x higher attrition risk',
      'Optimized statistical chart rendering using Seaborn pairplots and boxplots'
    ],
    githubUrl: 'https://github.com/NivashMukil/Employee-Attrition-Analysis-',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Overtime & Distance correlation discovered', '1,400+ Records Analyzed', 'Interactive Visual Reports'],
    codeSnippet: {
      title: 'Python Pandas Attrition Correlation Snippet',
      language: 'python',
      code: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load dataset and clean missing values
df = pd.read_csv('hr_employee_attrition.csv')
df.dropna(subset=['TotalWorkingYears'], inplace=True)

# Feature engineering: Overtime flag numerical conversion
df['Attrition_Numeric'] = df['Attrition'].apply(lambda x: 1 if x == 'Yes' else 0)

# Group by Department & OverTime
attrition_by_dept = df.groupby(['Department', 'OverTime'])['Attrition_Numeric'].mean().reset_index()

# Plot heatmap
plt.figure(figsize=(10, 6))
sns.barplot(data=attrition_by_dept, x='Department', y='Attrition_Numeric', hue='OverTime', palette='viridis')
plt.title('Attrition Rate by Department & OverTime Work')
plt.ylabel('Attrition Rate')
plt.show()`
    }
  },
  {
    id: 'titanic-survival-analysis',
    title: 'Titanic Survival Analysis',
    category: 'Data Analytics',
    subtitle: 'Statistical Data Analytics & Demographic Insights',
    description: 'In-depth demographic statistical study of the historic Titanic disaster, leveraging Python data libraries to discover key indicators of passenger survival rates.',
    longDescription: 'This data analysis project dives deep into the Titanic passenger manifest. Using Pandas for missing value handling (age imputation based on Pclass/Title), Seaborn for categorical distribution plots, and Matplotlib for multi-variable breakdown, I explored how socioeconomic status, gender, and family size influenced survival odds.',
    technologies: ['Python', 'Pandas', 'Seaborn', 'Matplotlib'],
    features: [
      'Advanced Missing Value Imputation (Age estimation based on Title extraction)',
      'Feature Engineering (Family Size, IsAlone, Fare Binning)',
      'Survival Distribution Visualizations across Pclass and Sex',
      'Statistical Hypothesis & Pivot Table Summaries'
    ],
    objectives: [
      'Extract insights into historical survival demographics',
      'Demonstrate clean data wrangling and feature extraction methodology'
    ],
    learnings: [
      'Female passengers in 1st class had over 96% survival rate',
      'Extracted titles (Mr, Mrs, Miss, Master) from Name column to accurately impute missing ages'
    ],
    githubUrl: 'https://github.com/NivashMukil/Titanic-Survival-Analysis-EDA',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    highlights: ['96% 1st Class Female Survival Insight', 'Name Title Feature Extraction', 'Complete Clean Pipeline'],
    codeSnippet: {
      title: 'Missing Age Imputation by Title',
      language: 'python',
      code: `# Title extraction from passenger names
df['Title'] = df['Name'].str.extract(' ([A-Za-z]+)\\.', expand=False)

# Map rare titles to common groups
df['Title'] = df['Title'].replace(['Lady', 'Countess','Capt', 'Col','Don', 'Dr', 'Major', 'Rev', 'Sir', 'Jonkheer', 'Dona'], 'Rare')
df['Title'] = df['Title'].replace('Mlle', 'Miss')
df['Title'] = df['Title'].replace('Ms', 'Miss')
df['Title'] = df['Title'].replace('Mme', 'Mrs')

# Impute median age based on title
df['Age'] = df.groupby('Title')['Age'].transform(lambda x: x.fillna(x.median()))`
    }
  },
  {
    id: 'sales-dashboard',
    title: 'Executive Sales Dashboard',
    category: 'Power BI',
    subtitle: 'Dynamic Power BI Report & Business Intelligence',
    description: 'An interactive executive Power BI dashboard analyzing global retail sales performance, profit margins, regional revenue distribution, and product category KPIs.',
    longDescription: 'Built using Power BI Desktop, Power Query ETL, and advanced DAX formulas. The dashboard provides dynamic drill-downs into revenue by region, monthly profit trends, top performing products, and customer segment metrics. Features bookmark navigation, custom theme colors, and time-intelligence DAX measures.',
    technologies: ['Power BI', 'Excel', 'DAX', 'ETL'],
    features: [
      'Dynamic Power Query ETL Transformation & Star Schema Data Modeling',
      'Advanced DAX Measures (YoY Growth, MoM Sales, Rolling Profit Margin)',
      'Interactive Slicers, Bookmarks, and Tooltip Visuals',
      'Executive KPI Cards & Regional Heatmaps'
    ],
    objectives: [
      'Empower business leaders to track monthly revenue targets instantly',
      'Identify loss-making sub-categories and optimize inventory distribution'
    ],
    learnings: [
      'Mastered time-intelligence DAX functions like CALCULATE, SAMEPERIODLASTYEAR, and TOTALYTD',
      'Designed responsive dashboard layout using glassmorphism dark theme principles'
    ],
    githubUrl: 'https://github.com/NivashMukil/PowerBI-Sales-Dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Interactive Power BI Drilldown', 'DAX YoY Calculations', 'Star Schema Model'],
    codeSnippet: {
      title: 'DAX Sales & YoY Growth Measures',
      language: 'dax',
      code: `// Total Sales Measure
Total Sales = SUM(Sales[SalesAmount])

// Prior Year Sales Measure
Sales PY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR('Date'[Date]))

// Year-over-Year Growth Percentage
YoY Growth % = 
VAR Change = [Total Sales] - [Sales PY]
RETURN DIVIDE(Change, [Sales PY], 0)`
    }
  },
  {
    id: 'food-web-application',
    title: 'Food Web Application',
    category: 'Python Full Stack',
    subtitle: 'Django Powered Restaurant & Ordering Platform',
    description: 'A full-stack Python Django web application featuring user authentication, customer profile management, dynamic food menu listings, cart management, and order placement.',
    longDescription: 'Developed using Django framework following MVT (Model-View-Template) architecture. Includes secure user signup/login, dynamic menu filtering by category, cart session storage, SQLite database integration, and responsive Bootstrap glass UI styling.',
    technologies: ['Python', 'Django', 'HTML', 'CSS', 'Bootstrap'],
    features: [
      'User Authentication System (Register, Login, Logout, Password Reset)',
      'Customer Profile Dashboard with past order history',
      'Dynamic Menu Filtering & Search bar',
      'Cart session management & order summary generation',
      'Django Admin Panel for restaurant menu items management'
    ],
    objectives: [
      'Build a robust full-stack web app demonstrating Django backend skills',
      'Ensure seamless database relationship mappings between Users, Items, and Orders'
    ],
    learnings: [
      'Utilized Django ORM for complex database queries and Foreign Key relationships',
      'Implemented session-based cart management for guest and logged-in users'
    ],
    githubUrl: 'https://github.com/NivashMukil/Food-apps-django',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Full Django Authentication', 'MVT Architecture', 'Menu & Order Cart'],
    codeSnippet: {
      title: 'Django Food Menu View & Cart Logic',
      language: 'python',
      code: `from django.shortcuts import render, get_object_or_404, redirect
from .models import FoodItem, Category, OrderItem

def menu_view(request):
    categories = Category.objects.all()
    selected_cat = request.GET.get('category')
    
    if selected_cat:
        items = FoodItem.objects.filter(category__name=selected_cat, is_available=True)
    else:
        items = FoodItem.objects.filter(is_available=True)
        
    return render(request, 'food/menu.html', {
        'items': items,
        'categories': categories
    })`
    }
  },
  {
    id: 'organic-grocery-website',
    title: 'Organic Grocery E-Commerce Website',
    category: 'Python Full Stack',
    subtitle: 'Modern Responsive Frontend E-Commerce Platform',
    description: 'A stylish, eco-friendly e-commerce web application front-end built with HTML5, CSS3, and JavaScript showcasing fresh organic produce, blog updates, and promotional deals.',
    longDescription: 'Created with modern web design standards emphasizing high performance, smooth micro-interactions, responsive mobile grid layouts, product filtering, interactive deal countdown timer, and glassmorphism product showcase cards.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    features: [
      'Modern Eco-Friendly Glassmorphism Interface Design',
      'Product Showcase Grid with quick view and wishlist toggle',
      'Featured Deals section with live JavaScript Countdown Timer',
      'Blog updates layout with category filters',
      '100% Mobile Responsive across phones, tablets, and desktops'
    ],
    objectives: [
      'Demonstrate strong semantic HTML5 structure and clean vanilla CSS styling',
      'Create intuitive, fast-loading e-commerce UI components'
    ],
    learnings: [
      'Utilized CSS Grid & Flexbox to build fluid responsive product layouts',
      'Built custom JavaScript carousel for featured organic deal banners'
    ],
    githubUrl: 'https://github.com/NivashMukil/Organic-Product-Web',
    liveUrl: 'https://nivashmukil.github.io/Organic-Product-Web',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Modern Glass UI', 'Live Countdown Timer', '100% Responsive Grid'],
    codeSnippet: {
      title: 'JavaScript Deals Countdown Timer',
      language: 'javascript',
      code: `function startCountdown(endDate) {
  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = new Date(endDate).getTime() - now;
    
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("timer").innerHTML = \`\${hours}h \${minutes}m \${seconds}s\`;
    if (distance < 0) clearInterval(timer);
  }, 1000);
}`
    }
  }
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 't-hsc',
    year: '2019 - 2020',
    title: 'Higher Secondary Education (HSC)',
    institution: 'Computer Science Stream',
    description: 'Completed higher secondary education focusing on Mathematics, Physics, Chemistry, and Computer Science fundamentals.',
    type: 'education',
    skills: ['C++', 'Mathematics', 'Computer Science Fundamentals']
  },
  {
    id: 't-bsc',
    year: '2020 - 2023',
    title: 'Bachelor of Computer Science (B.Sc CS)',
    institution: 'Madurai Kamaraj University College',
    description: 'Graduated with strong foundations in Data Structures, Database Management Systems (DBMS), Software Engineering, and Object-Oriented Programming.',
    type: 'education',
    skills: ['Data Structures', 'DBMS', 'Software Engineering', 'SQL', 'C/C++']
  },
  {
    id: 't-pyspiders',
    year: '2023 - 2024',
    title: 'Data Analysis & Python Full Stack Training',
    institution: 'PySpiders Training Institute',
    description: 'Intensive professional training program covering Python programming, SQL database operations, Power BI analytics, Django web framework, and Machine Learning basics.',
    type: 'training',
    skills: ['Python', 'SQL', 'Power BI', 'Pandas', 'NumPy', 'Django', 'REST API', 'EDA']
  },
  {
    id: 't-projects',
    year: '2024 - Present',
    title: 'Analytics & Software Projects Development',
    institution: 'Independent Hands-on Engineering',
    description: 'Built real-world projects including HR Attrition EDA, Executive Sales Power BI Dashboard, Django Food Delivery Web App, and Titanic Survival analysis.',
    type: 'project',
    skills: ['Power BI DAX', 'Python EDA', 'Seaborn', 'Django ORM', 'Git/GitHub']
  },
  {
    id: 't-goal',
    year: 'Current Goal',
    title: 'Seeking Data Analyst / Python Full Stack Developer Role',
    institution: 'Ready for Immediate Opportunities',
    description: 'Eager to leverage analytical skills, database expertise, and full-stack capabilities to solve high-impact business problems in a dynamic team.',
    type: 'goal',
    skills: ['Business Intelligence', 'Data Science Pipeline', 'Full Stack Engineering']
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-pbi',
    title: 'Power BI Desktop & Business Intelligence',
    issuer: 'PySpiders / Analytics Training',
    date: '2024',
    icon: 'BarChart2',
    skillsCovered: ['Power Query ETL', 'DAX Measures', 'Dashboard Design', 'Data Modeling'],
    badgeColor: 'from-amber-500 to-yellow-400'
  },
  {
    id: 'cert-python',
    title: 'Python Programming Masterclass',
    issuer: 'PySpiders Training Institute',
    date: '2023',
    icon: 'FileCode',
    skillsCovered: ['Data Structures', 'OOP Concepts', 'File Handling', 'Exception Handling'],
    badgeColor: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'cert-sql',
    title: 'Advanced SQL & Relational Databases',
    issuer: 'PySpiders / Oracle Certification',
    date: '2023',
    icon: 'Database',
    skillsCovered: ['Complex Joins', 'Subqueries', 'Indexing', 'Stored Procedures'],
    badgeColor: 'from-cyan-500 to-teal-400'
  },
  {
    id: 'cert-da',
    title: 'Data Analysis & Visualization with Python',
    issuer: 'PySpiders Training Institute',
    date: '2024',
    icon: 'LineChart',
    skillsCovered: ['Pandas Dataframes', 'NumPy Arrays', 'Matplotlib Charts', 'Seaborn Heatmaps'],
    badgeColor: 'from-emerald-500 to-green-400'
  },
  {
    id: 'cert-ml',
    title: 'Machine Learning Basics',
    issuer: 'PySpiders Training Institute',
    date: '2024',
    icon: 'Brain',
    skillsCovered: ['Supervised Learning', 'Linear Regression', 'Decision Trees', 'Model Evaluation'],
    badgeColor: 'from-purple-500 to-indigo-400'
  }
];

export const TOOLS_CAROUSEL = [
  { name: 'Python', icon: 'FileCode' },
  { name: 'SQL', icon: 'Database' },
  { name: 'Power BI', icon: 'BarChart' },
  { name: 'Excel', icon: 'Sheet' },
  { name: 'Pandas', icon: 'Table' },
  { name: 'NumPy', icon: 'Calculator' },
  { name: 'Matplotlib', icon: 'LineChart' },
  { name: 'Seaborn', icon: 'PieChart' },
  { name: 'Django', icon: 'Server' },
  { name: 'FastAPI', icon: 'Zap' },
  { name: 'HTML5', icon: 'Layout' },
  { name: 'CSS3', icon: 'Palette' },
  { name: 'Bootstrap', icon: 'Grid' },
  { name: 'Git', icon: 'GitBranch' },
  { name: 'GitHub', icon: 'Github' }
];
