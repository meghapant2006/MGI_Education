import { Course, Certificate, Notice } from '../types';

export const fallbackCourses: Course[] = [
  {
    _id: '1',
    title: 'Bachelor of Computer Applications (BCA)',
    shortName: 'BCA',
    slug: 'bca',
    category: 'university',
    level: 'UG',
    duration: '3 Years (6 Semesters)',
    eligibility: '10+2 passed with Mathematics/Computer or recognized equivalent',
    description: 'Comprehensive undergraduate degree in computer software development, database systems, networking, and web applications. Ideal for students aiming for careers in IT and software engineering.',
    highlights: ['UGC-DEB Recognized University Partner', 'Weekend & Flexible Exam Options', 'Live Industry Projects & Lab Guidance', 'Career Guidance for Placement in IT Firms'],
    syllabus: [
      { title: 'Year 1: Foundations', topics: ['C Programming', 'Digital Electronics', 'Mathematics for Computing', 'Data Structures'] },
      { title: 'Year 2: Advanced Core', topics: ['Java Programming', 'Database Management (SQL)', 'Computer Networks', 'Operating Systems'] },
      { title: 'Year 3: Application Development', topics: ['Web Technologies', 'Software Engineering', 'Python / Cloud', 'Major Project'] }
    ],
    feeRange: 'Affordable installment options available',
    mode: 'Online & Distance Learning',
    featured: true,
    active: true,
    order: 1
  },
  {
    _id: '2',
    title: 'Bachelor of Business Administration (BBA)',
    shortName: 'BBA',
    slug: 'bba',
    category: 'university',
    level: 'UG',
    duration: '3 Years (6 Semesters)',
    eligibility: '10+2 passed in any stream from recognized board',
    description: 'Industry-oriented management program focusing on business administration, marketing strategies, human resource management, and financial analysis.',
    highlights: ['Management Leadership Curriculum', 'Study Material & Assignment Guidance', 'Specialization in Marketing, HR, or Finance', 'Flexible Exam Schedules for Working Students'],
    syllabus: [
      { title: 'Year 1: Management Fundamentals', topics: ['Principles of Management', 'Business Economics', 'Financial Accounting', 'Business Communication'] },
      { title: 'Year 2: Functional Areas', topics: ['Marketing Management', 'Human Resource Management', 'Organizational Behavior', 'Business Law'] },
      { title: 'Year 3: Strategic Leadership', topics: ['Financial Management', 'Strategic Management', 'Entrepreneurship', 'Capstone Project'] }
    ],
    feeRange: 'Affordable installment options available',
    mode: 'Online & Distance Learning',
    featured: true,
    active: true,
    order: 2
  },
  {
    _id: '3',
    title: 'Bachelor of Commerce (B.Com)',
    shortName: 'B.Com',
    slug: 'bcom',
    category: 'university',
    level: 'UG',
    duration: '3 Years',
    eligibility: '10+2 with Commerce or equivalent from a recognized board',
    description: 'Foundational degree in financial accounting, auditing, taxation, corporate finance, and commercial business laws.',
    highlights: ['UGC Approved Degree', 'Complete Study Material Provided', 'Coaching for Accounting & Taxation', 'Ideal for CA, CS, and Banking Aspirants'],
    syllabus: [
      { title: 'Year 1: Accounting Basics', topics: ['Financial Accounting', 'Business Organization', 'Business Law', 'Economics'] },
      { title: 'Year 2: Corporate Accounts', topics: ['Corporate Accounting', 'Income Tax Law', 'Cost Accounting', 'Company Law'] },
      { title: 'Year 3: Advanced Finance', topics: ['Auditing', 'GST & Indirect Taxes', 'Financial Management', 'Banking Operations'] }
    ],
    feeRange: 'Affordable installment options available',
    mode: 'Online & Distance Learning',
    featured: false,
    active: true,
    order: 3
  },
  {
    _id: '4',
    title: 'Bachelor of Arts (BA)',
    shortName: 'BA',
    slug: 'ba',
    category: 'university',
    level: 'UG',
    duration: '3 Years',
    eligibility: '10+2 in any stream',
    description: 'Flexible undergraduate degree in humanities offering choices in Political Science, History, Hindi, English, Sociology, and Public Administration.',
    highlights: ['Multiple Subject Combinations', 'Preparation Support for Govt & UPSC Exams', 'Study Material & Notes Provided', 'Self-Paced Learning with Expert Help'],
    syllabus: [
      { title: 'Year 1', topics: ['Foundation English/Hindi', 'History of India', 'Political Theory', 'Sociology Fundamentals'] },
      { title: 'Year 2', topics: ['Comparative Politics', 'Medieval & Modern History', 'Public Administration', 'Elective Subject'] },
      { title: 'Year 3', topics: ['International Relations', 'Indian Constitution', 'Modern Indian Thought', 'Elective Subject'] }
    ],
    feeRange: 'Affordable installment options available',
    mode: 'Online & Distance Learning',
    featured: false,
    active: true,
    order: 4
  },
  {
    _id: '5',
    title: 'Bachelor of Laws (LLB)',
    shortName: 'LLB',
    slug: 'llb',
    category: 'university',
    level: 'UG',
    duration: '3 Years (Post-Graduation) / 5 Years (Integrated)',
    eligibility: 'Graduation in any stream with minimum 45% marks (for 3-yr LLB)',
    description: 'Comprehensive legal education covering Constitutional Law, Criminal Law, Civil Procedure, Corporate Law, and Legal Ethics for bar council practice.',
    highlights: ['Bar Council of India Recognized Universities', 'Moot Court & Practical Case Analysis', 'Complete Counseling & Admission Assistance', 'Experienced Faculty Guidance'],
    syllabus: [
      { title: 'Year 1: Foundation Law', topics: ['Constitutional Law', 'Law of Crimes (IPC)', 'Law of Contracts', 'Family Law'] },
      { title: 'Year 2: Procedure & Rights', topics: ['Civil Procedure Code (CPC)', 'Criminal Procedure Code (CrPC)', 'Law of Evidence', 'Jurisprudence'] },
      { title: 'Year 3: Practice & Ethics', topics: ['Company Law', 'Administrative Law', 'Professional Ethics', 'Drafting & Moot Court'] }
    ],
    feeRange: 'Consult with counseling desk',
    mode: 'Regular / Hybrid as per University Rules',
    featured: true,
    active: true,
    order: 5
  },
  {
    _id: '6',
    title: 'Master of Business Administration (MBA)',
    shortName: 'MBA',
    slug: 'mba',
    category: 'university',
    level: 'PG',
    duration: '2 Years (4 Semesters)',
    eligibility: 'Graduation in any discipline from a recognized university',
    description: 'Premier postgraduate business program designed for ambitious professionals and graduates seeking executive management roles in corporate and consulting sectors.',
    highlights: ['Dual Specialization Available (HR, Marketing, Finance, IT, Operations)', 'Weekend Sessions for Working Executives', 'UGC-DEB Approved Degree', 'Resume & Interview Mentorship'],
    syllabus: [
      { title: 'Semester 1-2: Core Management', topics: ['Managerial Economics', 'Financial Accounting & Reporting', 'Marketing Management', 'Human Capital Management', 'Operations Research'] },
      { title: 'Semester 3-4: Dual Specialization', topics: ['Strategic Management', 'Elective 1 (Finance/Marketing/HR)', 'Elective 2 (IT/Operations)', 'Dissertation / Industry Project'] }
    ],
    feeRange: 'Easy installment plans available',
    mode: 'Distance / Hybrid Online',
    featured: true,
    active: true,
    order: 6
  },
  {
    _id: '7',
    title: 'Master of Computer Applications (MCA)',
    shortName: 'MCA',
    slug: 'mca',
    category: 'university',
    level: 'PG',
    duration: '2 Years',
    eligibility: 'BCA / B.Sc (CS/IT) or Graduation with Mathematics at 10+2/Graduation',
    description: 'Advanced computer software program covering modern cloud architectures, full-stack enterprise development, AI/ML concepts, and database scalability.',
    highlights: ['Modern Curriculum (Full Stack, Cloud, Mobile Apps)', 'UGC-DEB Recognized Partner Universities', 'Hands-on Coding Mentorship', 'High Placement Demand in IT'],
    syllabus: [
      { title: 'Year 1: Advanced Computing', topics: ['Object Oriented Software Design', 'Advanced Data Structures & Algorithms', 'Web Application Frameworks', 'Relational & NoSQL Databases'] },
      { title: 'Year 2: Enterprise Solutions', topics: ['Cloud Computing & DevOps', 'Machine Learning Essentials', 'Mobile Application Development', 'Major Capstone Project'] }
    ],
    feeRange: 'Easy installment plans available',
    mode: 'Distance / Online',
    featured: true,
    active: true,
    order: 7
  },
  {
    _id: '8',
    title: 'Master of Commerce (M.Com)',
    shortName: 'M.Com',
    slug: 'mcom',
    category: 'university',
    level: 'PG',
    duration: '2 Years',
    eligibility: 'B.Com / BBA or equivalent graduation in commerce/allied field',
    description: 'Specialized postgraduate degree for commerce graduates seeking careers in finance, academia (NET/JRF), taxation, and corporate governance.',
    highlights: ['In-depth Corporate Finance & Accounting', 'Ideal for UGC-NET Preparation', 'Complete Study Kits & Notes', 'Flexible Exam Dates'],
    syllabus: [
      { title: 'Year 1: Advanced Theory', topics: ['Advanced Financial Management', 'Marketing Management', 'Accounting Theory & Practice', 'Business Environment'] },
      { title: 'Year 2: Research & Taxation', topics: ['Direct & Indirect Tax Laws', 'International Business', 'Financial Markets & Services', 'Project Work'] }
    ],
    feeRange: 'Easy installment plans available',
    mode: 'Online & Distance Learning',
    featured: false,
    active: true,
    order: 8
  },
  // NIOS Courses
  {
    _id: '9',
    title: 'NIOS Class 10th (Secondary School Admission)',
    shortName: 'NIOS 10th',
    slug: 'nios-10th',
    category: 'nios',
    level: '10th',
    duration: 'Flexible (Up to 5 Years / 9 Examination Attempts)',
    eligibility: 'Minimum 14 years of age with proof of birth / Aadhaar card',
    description: 'Official National Institute of Open Schooling (NIOS) Class 10th admission and study support. Recognized by Govt. of India, equivalent to CBSE, ICSE, and all State Boards for higher secondary admission and government jobs.',
    highlights: ['100% Valid & Recognized Equivalent to CBSE', 'Hindi & English Medium Choices', 'Complete TMA (Tutor Marked Assignments) Guidance', 'Study Material & Practical Exam Coaching', 'On-Demand Examination (ODE) Available'],
    syllabus: [
      { title: 'Core Subjects', topics: ['Hindi (201)', 'English (202)', 'Mathematics (211)', 'Science and Technology (212)', 'Social Science (213)'] },
      { title: 'Vocational & Elective Options', topics: ['Data Entry Operations (229)', 'Home Science (216)', 'Business Studies (215)', 'Painting (225)'] }
    ],
    feeRange: 'Affordable Govt Board Fees + Center Support',
    mode: 'Open Schooling with Classroom/Weekend Mentorship',
    featured: true,
    active: true,
    order: 9
  },
  {
    _id: '10',
    title: 'NIOS Class 12th (Senior Secondary Admission)',
    shortName: 'NIOS 12th',
    slug: 'nios-12th',
    category: 'nios',
    level: '12th',
    duration: 'Flexible (Up to 5 Years / 9 Examination Attempts)',
    eligibility: 'Passed Class 10th Secondary from any recognized board',
    description: 'Admission support for NIOS Senior Secondary (12th) across Arts, Commerce, and Science streams. Fully eligible for NEET, JEE, CUET, NDA, and all university admissions across India.',
    highlights: ['Eligible for NEET, JEE, CUET, NDA & All Colleges', 'Arts, Commerce, and Science Streams Available', 'Transfer of Credit (TOC) for Failed Students (Save Your Year)', 'Full Lab Practical File Support & Assignment Assistance', 'Flexible Exam Sessions (April/May & October/November)'],
    syllabus: [
      { title: 'Science Stream', topics: ['Physics (312)', 'Chemistry (313)', 'Biology (314)', 'Mathematics (311)', 'English (302)'] },
      { title: 'Commerce Stream', topics: ['Accountancy (320)', 'Business Studies (319)', 'Economics (318)', 'English (302)', 'Data Entry (336)'] },
      { title: 'Arts / Humanities Stream', topics: ['Political Science (317)', 'History (315)', 'Geography (316)', 'Sociology (331)', 'Hindi (301)'] }
    ],
    feeRange: 'Affordable Govt Board Fees + Center Support',
    mode: 'Open Schooling with Classroom/Weekend Mentorship',
    featured: true,
    active: true,
    order: 10
  },
  // Computer Courses
  {
    _id: '11',
    title: 'Advanced Diploma in Computer Applications (ADCA)',
    shortName: 'ADCA',
    slug: 'adca',
    category: 'computer',
    level: 'diploma',
    duration: '1 Year (12 Months)',
    eligibility: '10th / 12th pass from any stream',
    description: 'Our most popular comprehensive computer diploma. Combines office automation, advanced accounting with Tally Prime, graphic designing, and web design basics into a single power-packed certification.',
    highlights: ['Govt Registered Institute Certificate', '100% Practical Computer Lab Training', 'Free Study Notes & Shortcut Books', 'Job Assistance in Office & Data Processing'],
    syllabus: [
      { title: 'Module 1: Office Automation', topics: ['Operating Systems (Windows/Linux)', 'MS Word, Excel, PowerPoint', 'Advanced Internet & Cyber Awareness'] },
      { title: 'Module 2: Accounting & GST', topics: ['Financial Accounting Basics', 'Tally ERP 9 & Tally Prime', 'GST Billing & Inventory Management'] },
      { title: 'Module 3: Graphic & Web Essentials', topics: ['Photoshop Basics', 'CorelDraw Designing', 'HTML5 & CSS3 Web Basics'] }
    ],
    feeRange: 'Budget friendly monthly installments',
    mode: 'Daily Lab Practical Training',
    featured: true,
    active: true,
    order: 11
  },
  {
    _id: '12',
    title: 'Tally Prime with GST & Financial Accounting',
    shortName: 'Tally Prime + GST',
    slug: 'tally-prime-gst',
    category: 'computer',
    level: 'certificate',
    duration: '3 to 6 Months',
    eligibility: '10th / 12th / Commerce students or working accountants',
    description: 'Specialized accounting course focused on real-world voucher entry, inventory tracking, GST calculation, e-way bills, TDS, and financial balance sheet finalization in Tally Prime.',
    highlights: ['Real Industry Practice on Live Firm Data', 'GST Returns & E-Way Bill Generation', 'TDS, Payroll & Bank Reconciliation', 'Practical Case Studies for Small & Medium Businesses'],
    syllabus: [
      { title: 'Module 1: Accounting Foundations', topics: ['Rules of Debit & Credit', 'Journal, Ledger, Trial Balance', 'Company Creation in Tally Prime'] },
      { title: 'Module 2: Goods & Services Tax (GST)', topics: ['CGST, SGST, IGST Configuration', 'GST Invoicing & Debit/Credit Notes', 'GST Returns (GSTR-1, GSTR-3B)'] },
      { title: 'Module 3: Advanced Features', topics: ['Inventory Management', 'Payroll Management', 'TDS & TCS Deductions', 'Balance Sheet & P&L Analysis'] }
    ],
    feeRange: 'Affordable certified course',
    mode: 'Daily 1-Hour Lab Practice',
    featured: true,
    active: true,
    order: 12
  },
  {
    _id: '13',
    title: 'Advanced Excel & MIS Reporting',
    shortName: 'Advanced Excel',
    slug: 'advanced-excel',
    category: 'computer',
    level: 'certificate',
    duration: '2 to 3 Months',
    eligibility: 'Basic knowledge of computers',
    description: 'Master advanced spreadsheet operations used by corporate analysts: complex formulas, VLOOKUP, XLOOKUP, Pivot Tables, conditional formatting, and interactive dashboard creation.',
    highlights: ['Over 100+ Formulas Covered (XLOOKUP, INDEX-MATCH, SUMIFS)', 'Dynamic Dashboards & Data Visualization', 'Data Cleaning & Power Query Basics', 'MIS Executive Job Preparation'],
    syllabus: [
      { title: 'Module 1: Advanced Functions', topics: ['XLOOKUP, VLOOKUP, HLOOKUP', 'INDEX & MATCH Functions', 'Logical IF, AND, OR, Nested IFS', 'Text & Date Functions'] },
      { title: 'Module 2: Data Modeling', topics: ['Pivot Tables & Pivot Charts', 'Slicers & Timelines', 'Data Validation & Dropdowns', 'Conditional Formatting Rules'] },
      { title: 'Module 3: Reporting & MIS', topics: ['Building Corporate Executive Dashboards', 'Macros & Automation Introduction', 'Data Import & Cleaning (Power Query)'] }
    ],
    feeRange: 'Short-term skill upgrade',
    mode: 'Daily Practical Batches',
    featured: true,
    active: true,
    order: 13
  },
  {
    _id: '14',
    title: 'Graphic Designing Mastercourse',
    shortName: 'Graphic Design',
    slug: 'graphic-designing',
    category: 'computer',
    level: 'certificate',
    duration: '6 Months',
    eligibility: 'Creative mindset, 10th or 12th pass',
    description: 'Learn professional design software including Adobe Photoshop, CorelDraw, Illustrator, and Canva. Design social media creatives, brochures, banners, logos, and print media.',
    highlights: ['Hands-on Real Client Design Briefs', 'Color Theory & Typography Mastery', 'Portfolio Building for Freelance or Agency Work', 'High Demand in Advertising & Digital Marketing'],
    syllabus: [
      { title: 'Module 1: Adobe Photoshop', topics: ['Photo Retouching & Masking', 'Banner & Poster Design', 'Layer Styles & Special Effects'] },
      { title: 'Module 2: CorelDraw & Vector Art', topics: ['Logo Designing & Vector Tracing', 'Brochures, Pamphlets, Visiting Cards', 'Flex & Print Media Preparation'] },
      { title: 'Module 3: Adobe Illustrator & Canva', topics: ['Branding Kits & Social Media Templates', 'Infographics & Vector Illustrations', 'Portfolio Preparation'] }
    ],
    feeRange: 'Affordable creative course',
    mode: 'Lab Hands-on Practical',
    featured: true,
    active: true,
    order: 14
  },
  {
    _id: '15',
    title: 'Web Designing & Frontend Development',
    shortName: 'Web Designing',
    slug: 'web-designing',
    category: 'computer',
    level: 'diploma',
    duration: '6 Months',
    eligibility: '10th / 12th pass with basic computer interest',
    description: 'Learn how to build responsive, modern, mobile-friendly websites using HTML5, CSS3, JavaScript, Tailwind CSS, and GitHub hosting.',
    highlights: ['Build Live Responsive Websites', 'Modern CSS Grid & Flexbox layouts', 'JavaScript Interactivity & DOM manipulation', 'Portfolio Website Deployment'],
    syllabus: [
      { title: 'Module 1: HTML5 & Modern CSS3', topics: ['Semantic HTML5 Structure', 'CSS Box Model, Flexbox & Grid', 'Responsive Media Queries'] },
      { title: 'Module 2: JavaScript Essentials', topics: ['Variables, Functions, Loops', 'DOM Manipulation & Events', 'Fetch API & JSON'] },
      { title: 'Module 3: Frameworks & Deployment', topics: ['Bootstrap & Tailwind CSS', 'Git & GitHub Basics', 'Live Project Deployment'] }
    ],
    feeRange: 'Practical career diploma',
    mode: 'Lab Practical Batches',
    featured: false,
    active: true,
    order: 15
  },
  {
    _id: '16',
    title: 'Computer Basic & Office Automation',
    shortName: 'Computer Basic',
    slug: 'computer-basic',
    category: 'computer',
    level: 'certificate',
    duration: '3 Months',
    eligibility: 'Open to all (Beginners, Students, Housewives, Seniors)',
    description: 'Ideal starting point for anyone looking to build confidence on computers. Learn Windows navigation, typing speed, MS Office (Word, Excel, PowerPoint), and safe internet usage.',
    highlights: ['Patient, step-by-step personal mentorship', 'English & Hindi Typing Practice', 'Practical Daily Assignments', 'Certificate on Course Completion'],
    syllabus: [
      { title: 'Module 1: Computer Fundamentals', topics: ['Hardware vs Software Overview', 'Windows Operations & File Management', 'Typing Master Practice'] },
      { title: 'Module 2: Microsoft Office Suite', topics: ['MS Word (Document Drafting & Letters)', 'MS Excel (Simple Tables & Calculations)', 'MS PowerPoint (Slide Presentations)'] },
      { title: 'Module 3: Internet & Everyday Digital Tools', topics: ['Emailing & Google Drive', 'Online Forms & Payments', 'Safe Browsing Habits'] }
    ],
    feeRange: 'Very budget-friendly',
    mode: 'Flexible Morning / Evening Batches',
    featured: false,
    active: true,
    order: 16
  }
];

export const fallbackCertificates: Record<string, Certificate> = {
  'MGI-2025-ADCA01': {
    studentName: 'Rahul Sharma',
    fatherName: 'Rajesh Sharma',
    rollNumber: 'MGI-2025-ADCA01',
    certificateNumber: 'CERT-MGI-9011',
    courseName: 'Advanced Diploma in Computer Applications (ADCA)',
    courseCategory: 'computer',
    grade: 'A+ (Distinction)',
    completionYear: '2024-2025',
    center: 'MGI Education, Mayur Vihar-3, Delhi',
    status: 'VALID',
    issueDate: '2025-05-15'
  },
  'CERT-MGI-9011': {
    studentName: 'Rahul Sharma',
    fatherName: 'Rajesh Sharma',
    rollNumber: 'MGI-2025-ADCA01',
    certificateNumber: 'CERT-MGI-9011',
    courseName: 'Advanced Diploma in Computer Applications (ADCA)',
    courseCategory: 'computer',
    grade: 'A+ (Distinction)',
    completionYear: '2024-2025',
    center: 'MGI Education, Mayur Vihar-3, Delhi',
    status: 'VALID',
    issueDate: '2025-05-15'
  },
  'MGI-2025-TALLY02': {
    studentName: 'Priya Verma',
    fatherName: 'Sunil Verma',
    rollNumber: 'MGI-2025-TALLY02',
    certificateNumber: 'CERT-MGI-9012',
    courseName: 'Tally Prime with GST & Financial Accounting',
    courseCategory: 'computer',
    grade: 'A (First Class)',
    completionYear: '2024-2025',
    center: 'MGI Education, Mayur Vihar-3, Delhi',
    status: 'VALID',
    issueDate: '2025-06-20'
  },
  'MGI-2025-BCA03': {
    studentName: 'Amit Kumar',
    fatherName: 'Manoj Kumar',
    rollNumber: 'MGI-2025-BCA03',
    certificateNumber: 'CERT-MGI-9013',
    courseName: 'Bachelor of Computer Applications (BCA)',
    courseCategory: 'university',
    grade: 'A+ (First Class with Distinction)',
    completionYear: '2022-2025',
    center: 'MGI Education, Mayur Vihar-3, Delhi',
    status: 'VALID',
    issueDate: '2025-07-10'
  }
};
