import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Admin } from '../models/Admin.js';
import { Course } from '../models/Course.js';
import { Inquiry } from '../models/Inquiry.js';
import { Certificate } from '../models/Certificate.js';
import { Notice } from '../models/Notice.js';
import { Testimonial } from '../models/Testimonial.js';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mgi_education';

async function seed(): Promise<void> {
  try {
    console.log('Connecting to MongoDB for seeding...');
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB. Purging existing collections...');

    await Promise.all([
      Admin.deleteMany({}),
      Course.deleteMany({}),
      Inquiry.deleteMany({}),
      Certificate.deleteMany({}),
      Notice.deleteMany({}),
      Testimonial.deleteMany({})
    ]);

    // 1. Seed Admin
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('Admin@MGI2026!', salt);

    await Admin.create({
      username: 'admin',
      email: 'admin@mgieducation.in',
      passwordHash,
      role: 'superadmin',
      fullName: 'Director MGI Education'
    });
    console.log('✔ Admin user created (username: admin, email: admin@mgieducation.in, password: Admin@MGI2026!)');

    // 2. Seed Courses
    const courses = [
      // University UG
      {
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
      // University PG
      {
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

    await Course.insertMany(courses);
    console.log(`✔ ${courses.length} courses seeded successfully!`);

    // 3. Seed Notices
    const notices = [
      {
        title: 'Admissions Open for 2026-2027 Academic Year (Distance Degrees & NIOS)',
        category: 'admission',
        content: 'Direct counseling and admission support available for BA, B.Com, BCA, BBA, MBA, MCA and NIOS 10th & 12th. Visit our Mayur Vihar center or call +91-8929909708 for instant eligibility assessment.',
        urgent: true,
        active: true,
        publishDate: new Date()
      },
      {
        title: 'NIOS October/November Exam Hall Ticket Notification & TMA Submissions',
        category: 'exam',
        content: 'Students enrolled for upcoming NIOS secondary and senior secondary exams must ensure their Tutor Marked Assignments (TMA) are submitted before the deadline. Contact our study desk for file assistance.',
        urgent: true,
        active: true,
        publishDate: new Date(Date.now() - 86400000 * 2)
      },
      {
        title: 'New Weekend Batch for Tally Prime + GST & Advanced Excel Starting This Week',
        category: 'general',
        content: 'Limited 10 seats per batch for personalized one-on-one computer training. Practical accounting with real GST bills. Register today to avail scholarship discounts.',
        urgent: false,
        active: true,
        publishDate: new Date(Date.now() - 86400000 * 5)
      }
    ];
    await Notice.insertMany(notices);
    console.log('✔ Notices seeded successfully!');

    // 4. Seed Verified Certificates
    const certificates = [
      {
        studentName: 'Rahul Sharma',
        fatherName: 'Rajesh Sharma',
        rollNumber: 'MGI-2025-ADCA01',
        certificateNumber: 'CERT-MGI-9011',
        courseName: 'Advanced Diploma in Computer Applications (ADCA)',
        courseCategory: 'computer',
        grade: 'A+ (Distinction)',
        completionYear: '2024-2025',
        center: 'MGI Education, Mayur Vihar-3, Delhi',
        status: 'VALID'
      },
      {
        studentName: 'Priya Verma',
        fatherName: 'Sunil Verma',
        rollNumber: 'MGI-2025-TALLY02',
        certificateNumber: 'CERT-MGI-9012',
        courseName: 'Tally Prime with GST & Financial Accounting',
        courseCategory: 'computer',
        grade: 'A (First Class)',
        completionYear: '2024-2025',
        center: 'MGI Education, Mayur Vihar-3, Delhi',
        status: 'VALID'
      },
      {
        studentName: 'Amit Kumar',
        fatherName: 'Manoj Kumar',
        rollNumber: 'MGI-2025-BCA03',
        certificateNumber: 'CERT-MGI-9013',
        courseName: 'Bachelor of Computer Applications (BCA)',
        courseCategory: 'university',
        grade: 'A+ (First Class with Distinction)',
        completionYear: '2022-2025',
        center: 'MGI Education, Mayur Vihar-3, Delhi',
        status: 'VALID'
      }
    ];
    await Certificate.insertMany(certificates);
    console.log('✔ Certificates seeded for verification testing!');

    // 5. Seed Testimonials
    const testimonials = [
      {
        name: 'Vikas Rawat',
        course: 'ADCA & Advanced Excel',
        rating: 5,
        review: 'MGI Education completely transformed my skills. The faculty gave personal attention on every topic in Tally and Excel. Within 2 months of completing my ADCA, I got placed as an Office Assistant in Noida!',
        roleOrJob: 'Placed as Office Executive'
      },
      {
        name: 'Neha Pandey',
        course: 'NIOS 12th (Arts)',
        rating: 5,
        review: 'I had dropped out in 11th due to family circumstances. MGI Education guided me with NIOS 12th admission, helped with all TMA files and exam preparation. I scored 78% and am now enrolled in graduation!',
        roleOrJob: 'College Student (DU Sol)'
      },
      {
        name: 'Deepak Joshi',
        course: 'BCA (Distance)',
        rating: 5,
        review: 'Best educational guidance center in Mayur Vihar. All degree documentation, university portal access, and examination guidelines were smoothly handled by the team. Highly recommended!',
        roleOrJob: 'Junior Software Associate'
      }
    ];
    await Testimonial.insertMany(testimonials);
    console.log('✔ Testimonials seeded!');

    // 6. Seed Sample Leads / Inquiries
    const inquiries = [
      {
        referenceNumber: 'MGI-2026-1001',
        fullName: 'Manish Singh',
        phone: '9876543210',
        email: 'manish.singh@gmail.com',
        category: 'computer',
        courseInterest: 'Advanced Diploma in Computer Applications (ADCA)',
        highestQualification: '12th Pass',
        city: 'Mayur Vihar, Delhi',
        message: 'Interested in evening batch for ADCA with Tally.',
        status: 'NEW',
        counselorNotes: 'Called once, needs evening slot around 5 PM.',
        source: 'hero_form'
      },
      {
        referenceNumber: 'MGI-2026-1002',
        fullName: 'Sneha Gupta',
        phone: '9811223344',
        email: 'sneha.gupta@outlook.com',
        category: 'nios',
        courseInterest: 'NIOS Class 12th (Senior Secondary Admission)',
        highestQualification: '10th Pass',
        city: 'Gharoli, Delhi',
        message: 'Want to opt for Commerce stream in NIOS.',
        status: 'COUNSELING',
        counselorNotes: 'Counseling scheduled for Saturday at center.',
        source: 'course_modal'
      },
      {
        referenceNumber: 'MGI-2026-1003',
        fullName: 'Rohan Chaudhary',
        phone: '9955443322',
        email: 'rohan.c@yahoo.com',
        category: 'university',
        courseInterest: 'Bachelor of Computer Applications (BCA)',
        highestQualification: '12th Pass (Science)',
        city: 'Noida Sector 62',
        message: 'Need fee installment details for BCA.',
        status: 'ENROLLED',
        counselorNotes: 'Enrolled in 2026 batch. First semester fee submitted.',
        source: 'contact_page'
      }
    ];
    await Inquiry.insertMany(inquiries);
    console.log('✔ Sample Inquiries seeded!');

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
