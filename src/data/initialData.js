import defaultLogo from '../assets/logo.png';

// Initial dataset for UMA Learnology Coaching & EdTech Platform

export const INITIAL_COACHING_INFO = {
  name: "UMA Learnology",
  brandSubtitle: "UMA English & Academic Learnology",
  tagline: "Empowering Fluency, Concept Mastery & Academic Excellence",
  founded: "2018",
  registrationNo: "REG/UMA/2018/88924",
  gstin: "07AAACU9823Q1Z2",
  phone: "+91 98765 43210",
  altPhone: "+91 87654 32109",
  email: "admissions@umalearnology.com",
  supportEmail: "support@umalearnology.com",
  address: "UMA Learnology Tower, 3rd Floor, Knowledge Park, Central Avenue, Sector 14",
  city: "New Delhi, PIN 110001",
  logo: defaultLogo,
  youtubeChannel: "UMA English Learnology",
  youtubeHandle: "@umaenglishlearnology",
  youtubeSubscribers: "1.25K Subscribers",
  youtubeLink: "https://youtube.com/@umaenglishlearnology?si=ngO3ao2j9Ue0UzbJ",
  youtubeTotalViews: "48K+ Views",
  stats: {
    studentsMentored: "12,500+",
    topSelections: "850+",
    videoLectures: "350+",
    expertFaculty: "24+",
    successRate: "96.8%"
  }
};

export const INITIAL_COURSES = [
  {
    id: "course-spoken-english",
    title: "Master Spoken English & Fluency Bootcamp",
    category: "English & Communication",
    targetClass: "College Students, Job Seekers & Working Professionals",
    level: "Beginner to Advanced (CEFR A2 - C1)",
    duration: "3 to 6 Months Intensive",
    mode: "Hybrid (Live Classes + Audio Speaking Lab)",
    rating: 4.95,
    reviewsCount: 520,
    totalFee: 18000,
    installments: 2,
    badge: "Bestseller",
    icon: "GraduationCap",
    description: "Achieve native-level English fluency, eliminate hesitation, master correct pronunciation, intonation, and gain confidence for corporate interviews, presentations, and group discussions.",
    highlights: [
      "Daily 1-on-1 speaking practice with certified language mentors",
      "Accent reduction, phonetic training & active listening drills",
      "Mock interviews, corporate presentations, and impromptu speech workshops",
      "Lifetime access to vocabulary flashcards and audio conversation modules"
    ],
    curriculum: [
      "Module 1: Everyday Conversational English & Eliminating Hesitation",
      "Module 2: Pronunciation, Accent Neutralization & Phonetics",
      "Module 3: Advanced Business Vocabulary, Idioms & Presentation Skills",
      "Module 4: Group Discussion Mastery, Debate Drills & Interview Etiquette"
    ],
    batchTimings: "Morning (7:30 AM - 9:00 AM) | Evening (6:30 PM - 8:00 PM) | Weekend Special",
    upcomingBatch: "Starts next Monday"
  },
  {
    id: "course-grammar-comp",
    title: "Complete English Grammar & Vocabulary for Competitive Exams",
    category: "Competitive Exams",
    targetClass: "SSC CGL, Bank PO, CDS, NDA, CUET & State PSC Aspirants",
    level: "Intermediate to Exam Mastery",
    duration: "6 Months Comprehensive",
    mode: "Classroom + Test Series Portal",
    rating: 4.9,
    reviewsCount: 480,
    totalFee: 24000,
    installments: 2,
    badge: "High Scoring",
    icon: "BookOpen",
    description: "Zero-to-Hero English preparation for all major competitive exams. Master 100+ golden grammar rules, speed reading comprehension (RC), cloze tests, para jumbles, and high-frequency root words.",
    highlights: [
      "100+ Golden Grammar Rules with 5,000+ solved previous year questions",
      "Speed reading comprehension hacks and inference elimination techniques",
      "Daily 20-word root vocabulary capsules with mnemonics",
      "Weekly timed CBT mock tests with negative marking analysis"
    ],
    curriculum: [
      "Part 1: Grammar Foundations — Tenses, Voices, Narration & Subject-Verb Agreement",
      "Part 2: Advanced Syntax — Conditionals, Inversion, Modifiers & Parallelism",
      "Part 3: Vocabulary — Synonyms, Antonyms, One Word Substitution & Phrasal Verbs",
      "Part 4: Reading Comprehension, Cloze Tests & Para Jumbles Strategy"
    ],
    batchTimings: "Mon-Fri (10:00 AM - 12:00 PM) | Weekend Marathon (10 AM - 2 PM)",
    upcomingBatch: "Limited to 30 seats per batch"
  },
  {
    id: "course-ielts-toefl",
    title: "IELTS & TOEFL Academic Pinnacle Batch (Band 8+ Target)",
    category: "Global English",
    targetClass: "Study Abroad Aspirants & Immigrants",
    level: "Advanced (Target Band 7.5 - 9.0)",
    duration: "2 Months Intensive",
    mode: "Online Live & Interactive",
    rating: 4.95,
    reviewsCount: 310,
    totalFee: 28000,
    installments: 2,
    badge: "Top Rated",
    icon: "Award",
    description: "Comprehensive preparation covering all 4 modules: Speaking, Writing (Task 1 & 2), Reading, and Listening with individualized essay evaluations by British Council & IDP certified trainers.",
    highlights: [
      "Unlimited 1-on-1 speaking interview mock tests with instant band scoring",
      "Detailed structural essay reviews with vocabulary enhancement",
      "Authentic Cambridge test paper drills with audio transcripts",
      "Visa interview and SOP (Statement of Purpose) guidance"
    ],
    curriculum: [
      "Writing: Task 1 (Charts/Graphs/Letters) & Task 2 (Opinion/Discussion Essays)",
      "Speaking: Cue Cards, Fluency, Lexical Resource & Pronunciation Mastery",
      "Reading & Listening: Speed skimming, keyword spotting & audio traps",
      "Full Length Timed Simulation Mock Exams with Detailed Feedback"
    ],
    batchTimings: "Daily Evening (8:00 PM - 9:30 PM)",
    upcomingBatch: "Weekly enrollment open"
  },
  {
    id: "course-boards-english",
    title: "Senior School Board Booster (Class 9th, 10th, 11th & 12th CBSE/ICSE)",
    category: "School Academics",
    targetClass: "Class 9, 10, 11 & 12 (CBSE / ICSE / State)",
    level: "School & Board Special",
    duration: "Academic Year (8 Months)",
    mode: "Hybrid (Classroom + App)",
    rating: 4.85,
    reviewsCount: 390,
    totalFee: 22000,
    installments: 2,
    badge: "95%+ Target",
    icon: "BookOpen",
    description: "Score 95%+ in English Core & Literature with chapter-by-chapter character sketches, poetic devices, formal letter/article formats, and step-marking evaluation rubrics.",
    highlights: [
      "Line-by-line decoding of all Prose, Poetry, and Drama chapters",
      "Writing skills formats (Notices, Invitations, Letters, Articles, Reports)",
      "CBSE Board pattern sample papers with model answer keys",
      "Viva & ASL (Assessment of Speaking and Listening) training"
    ],
    curriculum: [
      "Literature: Flamingo, Vistas, First Flight, Footprints without Feet",
      "Advanced Writing Skills & Grammar Application",
      "Reading Comprehension Unseen Passages Mastery",
      "Pre-Board Mock Marathons with Examiner Step-Marking"
    ],
    batchTimings: "Tuesday, Thursday, Saturday (4:30 PM - 6:00 PM)",
    upcomingBatch: "Board Special Crash Course Available"
  },
  {
    id: "course-jee-neet",
    title: "Science & Engineering Academic Foundation (JEE / NEET / Boards)",
    category: "Science & Tech",
    targetClass: "Class 11, 12 & Droppers",
    level: "Foundation to Advanced",
    duration: "1 or 2 Years Intensive",
    mode: "Hybrid (Classroom + LMS)",
    rating: 4.9,
    reviewsCount: 410,
    totalFee: 65000,
    installments: 3,
    badge: "Integrated Program",
    icon: "Atom",
    description: "Rigorous preparation for IIT-JEE and NEET with top faculty in Physics, Chemistry, Mathematics, and Biology integrated with strong scientific communication and analytical thinking.",
    highlights: [
      "Daily classroom lectures + Dedicated 1-on-1 doubt clearing clinics",
      "National CBT mock test series with percentile rankings and error analysis",
      "Complete comprehensive study material, DPPs, and formula handbooks"
    ],
    curriculum: [
      "Physics: Mechanics, Electromagnetism, Optics & Modern Physics",
      "Chemistry: Physical, Organic, and Inorganic Chemistry Mastery",
      "Mathematics: Calculus, Algebra, Coordinate Geometry & Vectors",
      "Biology: Botany, Zoology & Human Physiology Deep Dives"
    ],
    batchTimings: "Daily Morning (8:00 AM - 1:30 PM)",
    upcomingBatch: "Super-30 Scholarship Batch"
  }
];

export const INITIAL_YOUTUBE_VIDEOS = [
  {
    id: "yt-1",
    title: "12 Tenses in 1 Shot with Real-Life Examples | Complete English Grammar",
    subject: "English Grammar",
    instructor: "Uma Nandini Ma'am",
    duration: "1h 45m",
    views: "210K",
    publishDate: "3 days ago",
    youtubeId: "dQw4w9WgXcQ",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "English Grammar",
    isFeatured: true,
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80",
    notesUrl: "#",
    description: "Never get confused with Past, Present, and Future Tenses again! Master all 12 tenses with real-world conversational sentences, timeline rules, and practice quiz exercises.",
    chapters: ["00:00 Intro & Tense Timeline", "12:30 Simple Present vs Continuous", "35:10 Perfect Tenses & 'Since/For'", "1:05:00 Past Tenses Mastery", "1:30:00 Future Tenses & Practice Quiz"]
  },
  {
    id: "yt-2",
    title: "50 Most Common English Speaking Mistakes Indian Learners Make (How to Fix Them)",
    subject: "Spoken English",
    instructor: "Uma Nandini Ma'am",
    duration: "42m",
    views: "185K",
    publishDate: "1 week ago",
    youtubeId: "dQw4w9WgXcQ",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "Spoken English",
    isFeatured: true,
    thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
    notesUrl: "#",
    description: "Common errors like 'discuss about', 'cousin brother', 'revert back', and preposition mistakes explained with crisp everyday conversational corrections.",
    chapters: ["00:00 Introduction", "08:15 Redundancy Mistakes", "18:30 Preposition Traps", "30:00 Subject-Verb Agreement Errors"]
  },
  {
    id: "yt-3",
    title: "Active & Passive Voice Super Tricks | Solve Any Question in 10 Seconds",
    subject: "Competitive English",
    instructor: "Prof. S. K. Gupta",
    duration: "1h 15m",
    views: "142K",
    publishDate: "2 weeks ago",
    youtubeId: "dQw4w9WgXcQ",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "Competitive English",
    isFeatured: true,
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80",
    notesUrl: "#",
    description: "Fast conversion rules for Assertive, Interrogative, and Imperative sentences for SSC CGL, Bank PO, NDA, and Board Exams.",
    chapters: ["00:00 Basic Conversion Formula", "22:00 Modals & Continuous Voice", "45:00 Who / Whom Questions", "1:00:00 Tricky Exceptions"]
  },
  {
    id: "yt-4",
    title: "100 Daily Use English Sentences for Rapid Conversation & Fluency",
    subject: "Spoken English",
    instructor: "Uma Nandini Ma'am",
    duration: "55m",
    views: "295K",
    publishDate: "3 weeks ago",
    youtubeId: "dQw4w9WgXcQ",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "Spoken English",
    isFeatured: false,
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
    notesUrl: "#",
    description: "High-frequency sentences for office communication, telephone etiquette, asking directions, shopping, and everyday small talk.",
    chapters: ["00:00 Greetings & Small Talk", "15:00 Work & Office Phrases", "32:00 Shopping & Travel", "45:00 Expressing Opinions"]
  },
  {
    id: "yt-5",
    title: "Root Words Vocabulary Booster: Learn 500 English Words in 1 Hour",
    subject: "Vocabulary & IELTS",
    instructor: "Dr. Priya Sengupta",
    duration: "1h 05m",
    views: "98K",
    publishDate: "1 month ago",
    youtubeId: "dQw4w9WgXcQ",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "Vocabulary & IELTS",
    isFeatured: false,
    thumbnail: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&auto=format&fit=crop&q=80",
    notesUrl: "#",
    description: "Etymology & Greek/Latin root words method to guess the meaning of unfamiliar words instantly in IELTS, GRE, SSC, and Board exams.",
    chapters: ["00:00 Intro to Roots", "12:00 Bene/Mal Roots", "28:00 Chron/Temp Roots", "45:00 Phil/Phob Roots"]
  },
  {
    id: "yt-6",
    title: "How to Score 95+ in Class 10 & 12 Board English Exam | Answer Writing Blueprint",
    subject: "Board Exam Strategy",
    instructor: "Uma Nandini Ma'am",
    duration: "48m",
    views: "120K",
    publishDate: "1 month ago",
    youtubeId: "dQw4w9WgXcQ",
    embedUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    category: "Board Exam Strategy",
    isFeatured: false,
    thumbnail: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80",
    notesUrl: "#",
    description: "Step-by-step answer presentation, formatting rules for Letters & Articles, and time-management tips to maximize your board score.",
    chapters: ["00:00 Board Examiner Mindset", "12:00 Reading Section Strategy", "24:00 Writing Skills Formats", "38:00 Literature Long Answers"]
  }
];

export const INITIAL_STUDENTS = [
  {
    id: "STU-2026-001",
    rollNo: "UMA-101",
    name: "Aarav Sharma",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    email: "aarav.sharma@gmail.com",
    phone: "+91 98112 34567",
    parentName: "Rajesh Sharma",
    parentPhone: "+91 98112 99887",
    courseId: "course-spoken-english",
    courseName: "Master Spoken English & Fluency Bootcamp",
    batch: "Fluency Achievers (Morning 8 AM)",
    bloodGroup: "O+",
    dob: "2006-04-15",
    admissionDate: "2025-06-10",
    validTill: "2027-05-31",
    address: "B-42, Vasant Vihar, New Delhi",
    attendancePercentage: 96.5,
    presentDays: 82,
    totalDays: 85,
    totalFee: 18000,
    paidFee: 18000,
    feeStatus: "Paid",
    lastPaymentDate: "2025-06-10",
    recentTestRank: "1st / 60",
    recentTestScore: "96 / 100 (Band 8.5 Fluency)",
    performanceScores: [
      { test: "Weekly Vocab & Pronunciation 1", score: 92, max: 100 },
      { test: "Tenses & Syntax Sprint", score: 94, max: 100 },
      { test: "GD & Impromptu Speech", score: 98, max: 100 },
      { test: "Mid-Term Comprehensive Mock", score: 96, max: 100 }
    ]
  },
  {
    id: "STU-2026-002",
    rollNo: "UMA-102",
    name: "Diya Patel",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    email: "diya.patel@gmail.com",
    phone: "+91 98223 45678",
    parentName: "Mahesh Patel",
    parentPhone: "+91 98223 88776",
    courseId: "course-grammar-comp",
    courseName: "Complete English Grammar & Vocabulary for Competitive Exams",
    batch: "SSC & Bank English Toppers",
    bloodGroup: "B+",
    dob: "2005-11-20",
    admissionDate: "2025-05-20",
    validTill: "2027-05-31",
    address: "C-14, Green Park Extension, New Delhi",
    attendancePercentage: 98.2,
    presentDays: 88,
    totalDays: 90,
    totalFee: 24000,
    paidFee: 14000,
    feeStatus: "Partial",
    lastPaymentDate: "2025-05-20",
    recentTestRank: "2nd / 120",
    recentTestScore: "48 / 50 (96% Accuracy)",
    performanceScores: [
      { test: "Error Spotting Golden Rules", score: 46, max: 50 },
      { test: "Cloze Test Speed Hack", score: 48, max: 50 },
      { test: "Para Jumbles & Reading Drill", score: 45, max: 50 },
      { test: "Full Length Mock CBT 1", score: 48, max: 50 }
    ]
  },
  {
    id: "STU-2026-003",
    rollNo: "UMA-103",
    name: "Rohan Verma",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    email: "rohan.verma@gmail.com",
    phone: "+91 98334 56789",
    parentName: "Sanjay Verma",
    parentPhone: "+91 98334 77665",
    courseId: "course-ielts-toefl",
    courseName: "IELTS & TOEFL Academic Pinnacle Batch (Band 8+ Target)",
    batch: "IELTS FastTrack (Evening)",
    bloodGroup: "A+",
    dob: "2004-08-05",
    admissionDate: "2025-07-01",
    validTill: "2026-03-31",
    address: "Flat 204, Surya Apartments, Rohini",
    attendancePercentage: 91.0,
    presentDays: 68,
    totalDays: 75,
    totalFee: 28000,
    paidFee: 15000,
    feeStatus: "Partial",
    lastPaymentDate: "2025-07-01",
    recentTestRank: "3rd / 45",
    recentTestScore: "Band 8.0 (Mock Exam)",
    performanceScores: [
      { test: "Listening Audio Simulation", score: 8.5, max: 9.0 },
      { test: "Reading Academic Passages", score: 8.0, max: 9.0 },
      { test: "Writing Task 2 Discursive", score: 7.5, max: 9.0 },
      { test: "Speaking 1-on-1 Interview", score: 8.5, max: 9.0 }
    ]
  },
  {
    id: "STU-2026-004",
    rollNo: "UMA-104",
    name: "Ananya Iyer",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    email: "ananya.iyer@gmail.com",
    phone: "+91 98445 67890",
    parentName: "Venkat Iyer",
    parentPhone: "+91 98445 66554",
    courseId: "course-boards-english",
    courseName: "Senior School Board Booster (Class 9th, 10th, 11th & 12th CBSE/ICSE)",
    batch: "Class 12 Board 95%+ Batch",
    bloodGroup: "AB+",
    dob: "2008-01-12",
    admissionDate: "2025-06-15",
    validTill: "2026-04-30",
    address: "H-8, Mayur Vihar Phase 1, New Delhi",
    attendancePercentage: 97.0,
    presentDays: 80,
    totalDays: 82,
    totalFee: 22000,
    paidFee: 22000,
    feeStatus: "Paid",
    lastPaymentDate: "2025-06-15",
    recentTestRank: "1st / 80",
    recentTestScore: "98 / 100 (Literature Pre-Board)",
    performanceScores: [
      { test: "Official Formats Writing Skills", score: 96, max: 100 },
      { test: "Flamingo Literature Decoding", score: 98, max: 100 },
      { test: "Unseen Passages Speed Test", score: 95, max: 100 },
      { test: "Pre-Board Full Paper Mock 1", score: 98, max: 100 }
    ]
  },
  {
    id: "STU-2026-005",
    rollNo: "UMA-105",
    name: "Kabir Mehta",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    email: "kabir.mehta@gmail.com",
    phone: "+91 98556 78901",
    parentName: "Alok Mehta",
    parentPhone: "+91 98556 55443",
    courseId: "course-jee-neet",
    courseName: "Science & Engineering Academic Foundation (JEE / NEET / Boards)",
    batch: "Science & Engineering Super-30",
    bloodGroup: "O-",
    dob: "2007-09-28",
    admissionDate: "2025-08-01",
    validTill: "2026-02-28",
    address: "Tower 5, Palm Heights, Gurugram",
    attendancePercentage: 92.0,
    presentDays: 73,
    totalDays: 80,
    totalFee: 65000,
    paidFee: 40000,
    feeStatus: "Overdue",
    lastPaymentDate: "2025-08-01",
    recentTestRank: "4th / 110",
    recentTestScore: "265 / 300 (88.3%)",
    performanceScores: [
      { test: "Physics Mechanics & Vectors", score: 88, max: 100 },
      { test: "Chemistry Organic Mechanisms", score: 92, max: 100 },
      { test: "Maths Calculus & Matrices", score: 85, max: 100 },
      { test: "National Mock 1", score: 265, max: 300 }
    ]
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: "TXN-2026-901",
    receiptNo: "UMA/RCP/2025/1042",
    studentId: "STU-2026-001",
    studentName: "Aarav Sharma",
    rollNo: "UMA-101",
    courseName: "Master Spoken English & Fluency Bootcamp",
    amount: 18000,
    paymentDate: "2025-06-10",
    paymentMode: "UPI / NetBanking",
    transactionRef: "UPI/516273891024/HDFC",
    status: "Completed",
    description: "Full Course Tuition & Speaking Lab Fee",
    collectedBy: "Admin Office - Desk A"
  },
  {
    id: "TXN-2026-902",
    receiptNo: "UMA/RCP/2025/1004",
    studentId: "STU-2026-002",
    studentName: "Diya Patel",
    rollNo: "UMA-102",
    courseName: "Complete English Grammar & Vocabulary for Competitive Exams",
    amount: 14000,
    paymentDate: "2025-05-20",
    paymentMode: "Bank Transfer (NEFT)",
    transactionRef: "NEFT/SBIN0029384",
    status: "Completed",
    description: "Admission Fee + Installment 1",
    collectedBy: "Admin Office - Accounts"
  },
  {
    id: "TXN-2026-903",
    receiptNo: "UMA/RCP/2025/1120",
    studentId: "STU-2026-003",
    studentName: "Rohan Verma",
    rollNo: "UMA-103",
    courseName: "IELTS & TOEFL Academic Pinnacle Batch",
    amount: 15000,
    paymentDate: "2025-07-01",
    paymentMode: "Cash Receipt",
    transactionRef: "CSH/2025/084",
    status: "Completed",
    description: "Registration + Term 1 IELTS Fee",
    collectedBy: "Cashier Counter 2"
  },
  {
    id: "TXN-2026-904",
    receiptNo: "UMA/RCP/2025/1089",
    studentId: "STU-2026-004",
    studentName: "Ananya Iyer",
    rollNo: "UMA-104",
    courseName: "Senior School Board Booster (11th & 12th CBSE)",
    amount: 22000,
    paymentDate: "2025-06-15",
    paymentMode: "UPI / PhonePe",
    transactionRef: "UPI/516288471923/ICICI",
    status: "Completed",
    description: "Full Course Payment (10% Early Bird Applied)",
    collectedBy: "Online Portal"
  },
  {
    id: "TXN-2026-905",
    receiptNo: "UMA/RCP/2025/1245",
    studentId: "STU-2026-005",
    studentName: "Kabir Mehta",
    rollNo: "UMA-105",
    courseName: "Science & Engineering Foundation (JEE / NEET)",
    amount: 40000,
    paymentDate: "2025-08-01",
    paymentMode: "UPI / Google Pay",
    transactionRef: "UPI/519920194820/AXIS",
    status: "Completed",
    description: "Admission + Installment 1",
    collectedBy: "Online Portal"
  }
];

export const INITIAL_NOTICES = [
  {
    id: "not-1",
    title: "All-India English Olympiad & National Scholarship Test 2026",
    date: "Aug 28, 2026",
    category: "Scholarship",
    isUrgent: true,
    content: "Register online for up to 100% tuition waiver in Spoken English, Grammar & Board Exam batches. Test date: Sept 14, 2026."
  },
  {
    id: "not-2",
    title: "Special Live Tenses & Voice Marathon on YouTube",
    date: "Aug 29, 2026 (7:00 PM)",
    category: "YouTube Live",
    isUrgent: false,
    content: "Uma Nandini Ma'am will conduct a 2-hour interactive live lecture solving 100 grammar MCQs on @umaenglishlearnology channel."
  },
  {
    id: "not-3",
    title: "Weekend Spoken English & Group Discussion Club",
    date: "Aug 26, 2026",
    category: "Fluency Workshop",
    isUrgent: false,
    content: "Live GD & Debating session this Saturday at 11 AM in the Language Audio Lab for all enrolled students."
  }
];

export const INITIAL_STUDY_MATERIALS = [
  {
    id: "mat-1",
    title: "Complete 100 Golden Rules of English Grammar & Error Spotting Handbook",
    subject: "English Grammar",
    targetClass: "Competitive & Board Exams",
    fileSize: "4.8 MB",
    downloads: 3420,
    fileType: "PDF",
    description: "Exhaustive rulebook covering Subject-Verb Agreement, Inversion, Tense Sequences, Conditionals, and Preposition Traps with solved examples.",
    fullContent: `
# 100 GOLDEN RULES OF ENGLISH GRAMMAR (PREMIUM REVISION HANDBOOK)
*Author: Uma Nandini Ma'am & Prof. S.K. Gupta | UMA Learnology*

---

### RULE 1: SUBJECT-VERB AGREEMENT WITH 'NEITHER...NOR' & 'EITHER...OR'
When two subjects are joined by **neither...nor**, **either...or**, or **not only...but also**, the verb agrees with the **nearest subject**.
- *Incorrect:* Neither the teacher nor the students was present.
- *Correct:* Neither the teacher nor the **students were** present.
- *Correct:* Neither the students nor the **teacher was** present.

---

### RULE 2: COLLECTIVE NOUNS (UNIT VS INDIVIDUALS)
A collective noun takes a **singular verb** when thought of as a single whole, and a **plural verb** when individuals are acting separately.
- *Example (Whole):* The jury **has** given its verdict.
- *Example (Divided):* The jury **were** divided in their opinions.

---

### RULE 3: INVERSION WITH NEGATIVE ADVERBS
When sentences begin with negative adverbs like **Hardly**, **Scarcely**, **Barely**, **No sooner**, or **Seldom**, inversion of subject and auxiliary verb occurs.
- *Pattern:* Hardly + had + Subject + V3 + when + Clause.
- *Correct:* **Hardly had I arrived** at the station when the train whistled.
- *Note:* 'No sooner' takes **THAN**, not 'when'.

---

### RULE 4: CONDITIONAL SENTENCES (TYPE 3 UNREAL PAST)
- *Pattern:* If + had + V3 ..., would + have + V3 ...
- *Incorrect:* If you would have studied, you would have passed.
- *Correct:* If you **had studied**, you **would have passed**.

---

### RULE 5: UNCOUNTABLE NOUNS
Words like *Information, Advice, Furniture, Luggage, Baggage, Scenery, Poetry, Bread, Machinery, Hair* are uncountable. They do NOT take 'a/an' and cannot be pluralized with '-s'.
- *Incorrect:* He gave me many advices.
- *Correct:* He gave me **pieces of advice** (or **much advice**).
    `
  },
  {
    id: "mat-2",
    title: "5,000+ High-Yield Idioms, Phrasal Verbs & One Word Substitutions Bible",
    subject: "Vocabulary & Spoken English",
    targetClass: "All Aspirants & Learners",
    fileSize: "6.2 MB",
    downloads: 4180,
    fileType: "PDF",
    description: "Alphabetical and theme-based idioms with sentences, memory mnemonics, and origin stories for effortless everyday retention.",
    fullContent: `
# 5,000+ HIGH-YIELD IDIOMS & PHRASAL VERBS BIBLE
*Published by: UMA Learnology Language Lab*

---

### TOP 10 HIGH-FREQUENCY IDIOMS IN CORPORATE & EXAMS
1. **Bite the bullet:** Face a painful or difficult situation with courage.
   - *Example:* "I had to bite the bullet and give the critical feedback directly."
2. **Break the ice:** Initiate conversation in a social or formal setting to ease tension.
   - *Example:* "Uma Ma'am used a fun vocabulary game to break the ice in our first speaking class."
3. **Burn the midnight oil:** Work or study late into the night.
   - *Example:* "Rohan burned the midnight oil to secure Band 8.5 in IELTS."
4. **Hit the nail on the head:** State or describe a situation with exact precision.
   - *Example:* "Her analysis of the reading passage hit the nail on the head."
5. **A blessing in disguise:** Something good that initially seemed bad.
   - *Example:* "Missing that train was a blessing in disguise as I met my mentor."
6. **Cost an arm and a leg:** Extremely expensive.
7. **Under the weather:** Feeling slightly unwell or sick.
8. **Piece of cake:** Very easy task.
9. **Back to the drawing board:** Start over from the beginning after a failure.
10. **Through thick and thin:** Under all circumstances, no matter how difficult.
    `
  },
  {
    id: "mat-3",
    title: "Class 10 & 12 Board English Writing Skills Formats & Model 100/100 Answers",
    subject: "School Academics",
    targetClass: "Class 9 to 12 (CBSE/ICSE)",
    fileSize: "3.9 MB",
    downloads: 2850,
    fileType: "PDF",
    description: "Official CBSE formats for Letters, Articles, Report Writing, Invitations, and character sketches with step-marking rubrics.",
    fullContent: `
# CBSE CLASS 10 & 12 OFFICIAL WRITING SKILLS BLUEPRINT
*Evaluator Approved Guide — Step Marking & Layout Rubrics*

---

### 1. FORMAL LETTER FORMAT (5 MARKS)
1. **Sender's Address** (2-3 lines, no comma at line end)
2. **Date** (e.g., 14th September 2026)
3. **Receiver's Designation & Address**
4. **Subject:** (Concise, underlined or bold)
5. **Salutation:** (Respected Sir / Madam)
6. **Body of Letter** in 3 Paragraphs:
   - *Para 1:* Introduction & Purpose of writing.
   - *Para 2:* Details of cause, impact, and consequences.
   - *Para 3:* Remedial suggestions / request for publication / swift action.
7. **Complimentary Close:** (Yours sincerely / Yours faithfully)
8. **Name & Designation**

---

### 2. NOTICE WRITING FORMAT (4 MARKS)
- Must be enclosed inside a **Box**.
- **Name of Institution** at top center.
- Word **NOTICE** in capital letters.
- **Date** on left margin.
- **Heading/Title** in center.
- **Content** answering 5 Ws: *What, Where, When, Who is eligible, Whom to contact*.
- **Word Limit:** Strictly under 50 words.
    `
  },
  {
    id: "mat-4",
    title: "IELTS Speaking & Writing Band 8.5 Master Templates & Lexical Resource",
    subject: "IELTS / TOEFL",
    targetClass: "Study Abroad Aspirants",
    fileSize: "5.1 MB",
    downloads: 2200,
    fileType: "PDF",
    description: "High-scoring phrase banks, cohesive devices, essay templates for Task 2, and cue card frameworks for Band 8+.",
    fullContent: `
# IELTS ACADEMIC WRITING TASK 2 & SPEAKING BAND 8.5 PLAYBOOK
*British Council Certified Trainer Evaluator Strategies*

---

### ESSAY STRUCTURE FOR 'DISCUSS BOTH VIEWS & GIVE OPINION' (TASK 2)
- **Introduction (2-3 Sentences):**
  - *Sentence 1 (Paraphrase):* "While it is often argued that [View A], others contend that [View B]."
  - *Sentence 2 (Thesis & Opinion):* "In my perspective, although [View A counterpoint], I firmly believe that [View B reason]."
  - *Sentence 3 (Outline):* "This essay will elucidate both perspectives before substantiating my viewpoint."

- **Body Paragraph 1 (View A):**
  - "On the one hand, proponents of [View A] emphasize that..."
  - Provide a concrete example & consequence.

- **Body Paragraph 2 (View B - Your Preferred View):**
  - "On the other hand, there is a compelling justification for [View B] because..."
  - Provide evidence & societal impact.

- **Conclusion:**
  - "To conclude, while [reiterate View A], I maintain that [reiterate View B]."
    `
  }
];

export const INITIAL_FACULTY = [
  {
    id: "fac-1",
    name: "Uma Nandini Ma'am",
    designation: "Founder & Chief Mentor — English & Communication",
    qualification: "M.A. English Literature, CELTA Certified, Cambridge (15+ Yrs Exp.)",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    subject: "Spoken English, Grammar & Fluency",
    bio: "Renowned educator on YouTube with millions of views across India. Passionate about empowering students with fearless English fluency and confidence.",
    quote: "English is not a measure of intelligence; it is simply a skill of confidence and practice. Speak without fear!"
  },
  {
    id: "fac-2",
    name: "Prof. S. K. Gupta",
    designation: "Head of Competitive English & Aptitude",
    qualification: "M.A., Ph.D. Applied Linguistics (14+ Yrs Exp.)",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    subject: "Competitive English (SSC / Banking / CUET)",
    bio: "Author of 4 national competitive English guides. Master of 10-second grammar shortcuts and error-spotting elimination hacks.",
    quote: "Master the structure of grammar once, and competitive exam papers become crystal clear."
  },
  {
    id: "fac-3",
    name: "Dr. Priya Sengupta",
    designation: "Senior IELTS & Global Communication Coach",
    qualification: "British Council Certified Trainer, Ph.D. (10+ Yrs Exp.)",
    photo: "https://images.unsplash.com/photo-1594824813589-3e0f9bdf6e44?w=400&auto=format&fit=crop&q=80",
    subject: "IELTS / TOEFL & Accent Training",
    bio: "Trained over 1,500 students to secure Band 8+ in IELTS Academic and General. Expert in writing task 2 and speaking interview fluency.",
    quote: "A rich vocabulary and clear structure are your passport to global universities."
  }
];

export const INITIAL_RANKERS = [
  {
    name: "Aaditya Singhania",
    rank: "IELTS Band 8.5 (Overall)",
    exam: "IELTS Academic 2025",
    college: "University of Toronto (Admitted)",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    testimonial: "Uma Ma'am's speaking sessions and daily confidence drills helped me score Band 9 in Speaking and 8.5 overall!"
  },
  {
    name: "Meera Krishnan",
    rank: "AIR 18 (English 49.5/50)",
    exam: "SSC CGL 2025",
    college: "Selected as Assistant Section Officer (ASO)",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    testimonial: "The grammar rules handbook and YouTube one-shot lectures on UMA Learnology were the backbone of my preparation."
  },
  {
    name: "Devendra Rawat",
    rank: "99/100 in CBSE 12th English Core",
    exam: "CBSE Board Examination",
    college: "St. Stephen's College, Delhi",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    testimonial: "The answer writing rubrics and literature summaries provided in the Student Portal made all the difference in my pre-boards and boards."
  }
];

export const INITIAL_ENQUIRIES = [
  {
    id: "enq-1",
    name: "Shreya Mukherjee",
    phone: "+91 98765 11223",
    email: "shreya.m@gmail.com",
    targetClass: "College Graduate",
    courseInterest: "Master Spoken English & Fluency Bootcamp",
    date: "2026-08-25",
    status: "Demo Scheduled",
    notes: "Requested weekend morning speaking batch."
  },
  {
    id: "enq-2",
    name: "Vikramaditya Chauhan",
    phone: "+91 97112 44556",
    email: "vikram.chauhan@gmail.com",
    targetClass: "Competitive Aspirant",
    courseInterest: "Complete English Grammar for SSC & Banking",
    date: "2026-08-24",
    status: "Contacted",
    notes: "Interested in error spotting and vocab module."
  }
];

export const INITIAL_DOUBTS = [
  {
    id: "dbt-1",
    studentRoll: "UMA-101",
    studentName: "Aarav Sharma",
    subject: "English Grammar",
    topic: "Difference between Present Perfect & Simple Past",
    question: "Ma'am, when should I use 'I have eaten dinner' versus 'I ate dinner yesterday'?",
    response: "Use Simple Past when a specific past time is mentioned (e.g. yesterday, in 2022). Use Present Perfect when the action is completed with present relevance, without a specific past timestamp.",
    facultyName: "Uma Nandini Ma'am",
    date: "2026-08-28",
    status: "Resolved"
  },
  {
    id: "dbt-2",
    studentRoll: "UMA-102",
    studentName: "Diya Patel",
    subject: "Competitive English",
    topic: "Inversion with 'No sooner ... than'",
    question: "Is 'No sooner had I reached the station when the train left' grammatically correct?",
    response: "No, 'No sooner' always takes the correlative conjunction 'than' (not 'when'). Correct: 'No sooner had I reached the station than the train left.'",
    facultyName: "Prof. S. K. Gupta",
    date: "2026-08-29",
    status: "Resolved"
  }
];

// Interactive 2-Minute English CEFR Level Test Questions
export const ENGLISH_LEVEL_TEST_QUESTIONS = [
  {
    id: 1,
    question: "Choose the grammatically correct sentence:",
    options: [
      "Neither of the candidates have submitted their resume.",
      "Neither of the candidates has submitted his or her resume.",
      "Neither of the candidates are submitting their resume.",
      "Neither of the candidate have submitted resume."
    ],
    correct: 1,
    explanation: "'Neither of' takes a singular pronoun and singular verb ('has submitted')."
  },
  {
    id: 2,
    question: "Fill in the blank: 'Hardly had she entered the room _______ the phone rang.'",
    options: ["than", "when", "then", "after"],
    correct: 1,
    explanation: "'Hardly / Scarcely' is followed by 'when', whereas 'No sooner' is followed by 'than'."
  },
  {
    id: 3,
    question: "Identify the idiom that means 'to face a difficult situation with courage':",
    options: [
      "Burn the midnight oil",
      "Bite the bullet",
      "Break the ice",
      "Hit the nail on the head"
    ],
    correct: 1,
    explanation: "'Bite the bullet' means to accept or face something unpleasant or difficult bravely."
  },
  {
    id: 4,
    question: "Select the sentence with correct conditional structure:",
    options: [
      "If I will see him, I would tell him.",
      "If I had known the answer, I would have answered correctly.",
      "If I knew the answer, I would have answered correctly.",
      "If I would have known the answer, I will answer."
    ],
    correct: 1,
    explanation: "Third conditional formula: If + had + V3 ..., would + have + V3 ..."
  },
  {
    id: 5,
    question: "Which of the following is an uncountable noun in standard English?",
    options: ["Advice", "Suggestion", "Idea", "Opinion"],
    correct: 0,
    explanation: "'Advice' is uncountable; we say 'a piece of advice' rather than 'an advice'."
  }
];

// Interactive Speaking Practice Phrases for Audio Speaking Lab
export const AUDIO_SPEAKING_DRILLS = [
  {
    id: "spk-1",
    phrase: "Could you please elaborate on the key deliverables for this quarterly project?",
    category: "Corporate & Presentation",
    phonetic: "/kʊd juː pliːz ɪˈlæb.ə.reɪt ɒn ðə kiː dɪˈlɪv.ər.ə.bəlz/",
    tip: "Keep a smooth, rising intonation on 'elaborate' and stress 'key deliverables'."
  },
  {
    id: "spk-2",
    phrase: "In my perspective, fostering cross-functional collaboration accelerates our innovation.",
    category: "Group Discussion & Debates",
    phonetic: "/ɪn maɪ pəˈspek.tɪv ˈfɒs.tər.ɪŋ krɒs ˈfʌŋk.ʃən.əl kəˌlæb.əˈreɪ.ʃən/",
    tip: "Pronounce 'perspective' clearly without swallowing the second syllable."
  },
  {
    id: "spk-3",
    phrase: "I am confident that my academic background and analytical mindset align with this role.",
    category: "Job Interview Mastery",
    phonetic: "/aɪ æm ˈkɒn.fɪ.dənt ðæt maɪ ˌæk.əˈdem.ɪk ˈbæk.ɡraʊnd/",
    tip: "Maintain eye contact and steady breath pacing on 'confident' and 'align'."
  },
  {
    id: "spk-4",
    phrase: "Furthermore, the environmental ramifications of urbanization cannot be overlooked.",
    category: "IELTS Speaking & Academic",
    phonetic: "/ˌfɜː.ðəˈmɔːr ði ɪnˌvaɪ.rənˈmen.təl ˌræm.ɪ.fɪˈkeɪ.ʃənz/",
    tip: "Stress 'ramifications' on the fourth syllable /keɪ/."
  }
];

// Interactive Student CBT Mock Test Data for Student Portal
export const STUDENT_CBT_MOCK_TEST = {
  title: "National English Aptitude & Speed CBT Mock Test 2026",
  durationMinutes: 10,
  totalMarks: 20,
  questions: [
    {
      id: 1,
      section: "Grammar & Error Spotting",
      question: "Find the error in the sentence: 'Neither the manager (A) / nor his assistants (B) / was present in the meeting (C) / No error (D)'",
      options: ["A", "B", "C", "D"],
      correct: 2,
      explanation: "Part C is incorrect. The verb should be 'were' because the nearest subject 'assistants' is plural."
    },
    {
      id: 2,
      section: "Vocabulary & Antonyms",
      question: "What is the most appropriate ANTONYM of the word 'EPHEMERAL'?",
      options: ["Fleeting", "Permanent", "Transient", "Short-lived"],
      correct: 1,
      explanation: "'Ephemeral' means lasting for a very short time. Its opposite is 'Permanent'."
    },
    {
      id: 3,
      section: "Active & Passive Voice",
      question: "Change to Passive Voice: 'The committee has approved the new scholarship proposal.'",
      options: [
        "The new scholarship proposal was approved by the committee.",
        "The new scholarship proposal has been approved by the committee.",
        "The new scholarship proposal is approved by the committee.",
        "The new scholarship proposal had been approved by the committee."
      ],
      correct: 1,
      explanation: "Present Perfect Active ('has approved') converts to 'has been approved' in passive voice."
    },
    {
      id: 4,
      section: "One Word Substitution",
      question: "A person who is fluent in two languages is called:",
      options: ["Polyglot", "Bilingual", "Linguist", "Omniscient"],
      correct: 1,
      explanation: "'Bilingual' means able to speak two languages fluently."
    }
  ]
};

// Hero Section Content Template
export const INITIAL_HERO_CONTENT = {
  badge: "Premier English, Competitive & Academic Coaching",
  headlineMain: "Empower Your Voice,",
  headlineHighlight: "Master Fluency & Top Ranks.",
  description: "Welcome to UMA Classes — your complete language and academic ecosystem. Featuring premier interactive batches by Cambridge & British Council certified faculty, free daily YouTube masterclasses, tamper-proof digital student ID badges, smart fee management, and 24x7 personalized doubt solving.",
  sessionBadge: "ADMISSION SESSION 2026-27 OPEN",
  superBatchTag: "Super-30 Batches",
  boxTitle: "All-in-One Coaching Ecosystem",
  boxSubtitle: "UMA Learnology Suite",
  features: [
    "Smart ID Badges",
    "GST Tax Invoices",
    "YouTube Video Hub",
    "24x7 Doubts Forum"
  ],
  stats: {
    studentsMentored: "12,500+",
    topSelections: "850+",
    videoLectures: "350+",
    successRate: "96.8%"
  }
};

// Frequently Asked Questions
export const INITIAL_FAQS = [
  {
    id: "faq-1",
    category: "Admissions & Demo Classes",
    question: "How does the free 3-Day Demo Class work?",
    answer: "You can book a free demo class online in 30 seconds. You will receive an instant WhatsApp confirmation with the batch timing and classroom link (or center room number for offline classes). You can attend 3 full interactive sessions without any advance payment."
  },
  {
    id: "faq-2",
    category: "Admissions & Demo Classes",
    question: "Can I switch between Offline Classroom and Online Live Batches?",
    answer: "Yes! All UMA Learnology programs are 100% hybrid. You can attend in-person at our Knowledge Park campus or switch to live HD video stream anytime using your Student Portal login."
  },
  {
    id: "faq-3",
    category: "Courses & Certifications",
    question: "Are your language certificates recognized internationally?",
    answer: "Yes. Our courses are structured aligned with CEFR (Common European Framework of Reference for Languages) standards. On completion, students receive a verified digital certificate with QR authentication valid for job interviews, university admissions, and resume enhancement."
  },
  {
    id: "faq-4",
    category: "Fees & Payment Plans",
    question: "Are flexible monthly installment options (EMI) available?",
    answer: "Yes, all tuition fees can be paid in 2 or 3 equal monthly installments without any interest or extra charges. We accept UPI (GPay/PhonePe), NetBanking, Debit/Credit cards, and cash at accounts desks."
  },
  {
    id: "faq-5",
    category: "Test Series & Materials",
    question: "Do I get printed books or digital study materials?",
    answer: "Every enrolled student receives physical printed handbooks (100 Golden Rules, Idioms Bible, Question Banks) along with lifetime digital access to PDF notes, audio pronunciation drills, and video recordings on the Student Portal."
  }
];

// Admission & Demo Popup Customizer Content
export const INITIAL_ADMISSION_MODAL_CONTENT = {
  demoTitle: "Book Free 3-Day Demo Masterclass",
  admissionTitle: "Direct Online Admission Registration",
  badgeText: "Session 2026-27 Enrollment & Scholarship Desk",
  promoBanner: "🎉 Special 15% Early Bird Discount + Free Cambridge Speaking Assessment Included!",
  bullet1: "Daily 1-on-1 speaking evaluation with Cambridge certified language mentor",
  bullet2: "Free printed diagnostic toolkit & 5,000 idioms handbook upon visit",
  bullet3: "Instant early bird scholarship & flexible zero-interest installments",
  successMessageDemo: "Our senior language mentor will contact you with demo class access links and study material pass.",
  successMessageAdmission: "Your permanent Student Roll Number and digital ID badge have been generated in the institute portal.",
  helplineText: "Need immediate assistance? Call Admissions Desk: +91 98765 43210"
};

