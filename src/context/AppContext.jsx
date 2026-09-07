import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_COACHING_INFO,
  INITIAL_COURSES,
  INITIAL_YOUTUBE_VIDEOS,
  INITIAL_STUDENTS,
  INITIAL_TRANSACTIONS,
  INITIAL_NOTICES,
  INITIAL_STUDY_MATERIALS,
  INITIAL_FACULTY,
  INITIAL_RANKERS,
  INITIAL_ENQUIRIES,
  INITIAL_DOUBTS,
  INITIAL_HERO_CONTENT,
  INITIAL_FAQS,
  INITIAL_ADMISSION_MODAL_CONTENT
} from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme State ('light' | 'dark')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('uma_theme') || 'light';
  });

  // Active View / Portal: 'public', 'student-portal', 'admin', 'id-studio', 'fees-hub', 'youtube-hub'
  const [currentView, setCurrentView] = useState('public');

  // Admin Security Authentication State (persisted in sessionStorage - defaults to locked/false for visitors)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('uma_admin_auth') === 'true';
  });

  // Admin Security PIN (persisted in localStorage, defaults to '2026')
  const [adminPin, setAdminPin] = useState(() => {
    return localStorage.getItem('uma_admin_pin') || '2026';
  });

  // Admin Security Modal State
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const [adminAuthPendingAction, setAdminAuthPendingAction] = useState(null);

  // Teacher Live Edit Mode State (strictly requires Admin Authentication)
  const [isTeacherMode, setIsTeacherMode] = useState(() => {
    const isAuth = sessionStorage.getItem('uma_admin_auth') === 'true';
    if (!isAuth) return false;
    const saved = localStorage.getItem('uma_teacher_mode');
    return saved !== null ? JSON.parse(saved) : false;
  });

  // Admin Dashboard Active Tab State
  const [adminTab, setAdminTab] = useState('overview');
  
  // Specific item selected for editing in Admin
  const [adminEditingCourseId, setAdminEditingCourseId] = useState(null);
  const [adminEditingFacultyId, setAdminEditingFacultyId] = useState(null);
  const [adminEditingRankerId, setAdminEditingRankerId] = useState(null);
  const [adminEditingMaterialId, setAdminEditingMaterialId] = useState(null);
  const [adminEditingVideoId, setAdminEditingVideoId] = useState(null);
  const [adminEditingNoticeId, setAdminEditingNoticeId] = useState(null);
  
  // Logged in Student Roll No for Student Portal lookup
  const [activeStudentRoll, setActiveStudentRoll] = useState(() => {
    return localStorage.getItem('uma_active_student_roll') || 'UMA-101';
  });

  // Selected Student for ID Studio
  const [selectedStudentId, setSelectedStudentId] = useState('STU-2026-001');

  // ID Card visual template: 'emerald' | 'indigo' | 'gold' | 'cyber'
  const [idCardTheme, setIdCardTheme] = useState('emerald');

  // Active Receipt Modal
  const [activeReceipt, setActiveReceipt] = useState(null);

  // Active YouTube Video Modal for playing
  const [playingVideo, setPlayingVideo] = useState(null);

  // Active Course Detail Modal
  const [activeCourseDetails, setActiveCourseDetails] = useState(null);

  // Admission / Demo Modal State
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [admissionModalInitialCourse, setAdmissionModalInitialCourse] = useState(null);

  // Public Live Customizer Modals State
  const [isEditHeroModalOpen, setIsEditHeroModalOpen] = useState(false);
  const [isEditFaqModalOpen, setIsEditFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false);
  const [isQuickNoticeModalOpen, setIsQuickNoticeModalOpen] = useState(false);
  const [isEditAdmissionModalOpen, setIsEditAdmissionModalOpen] = useState(false);

  // Admission Modal / Pop-up Content State
  const [admissionModalContent, setAdmissionModalContent] = useState(() => {
    const saved = localStorage.getItem('uma_admission_modal_content');
    return saved ? JSON.parse(saved) : INITIAL_ADMISSION_MODAL_CONTENT;
  });

  // Saved / Bookmarked video IDs for student / user
  const [savedVideoIds, setSavedVideoIds] = useState(() => {
    const saved = localStorage.getItem('uma_saved_videos');
    return saved ? JSON.parse(saved) : [];
  });

  // Global Toast Notification
  const [toast, setToast] = useState(null);

  // Coaching Info State
  const [coachingInfo, setCoachingInfo] = useState(() => {
    const saved = localStorage.getItem('uma_coaching_info');
    if (saved) {
      try {
        return {
          ...INITIAL_COACHING_INFO,
          ...parsed,
          logo: (parsed.logo && parsed.logo !== '/logo.png' && parsed.logo !== 'logo.png') ? parsed.logo : INITIAL_COACHING_INFO.logo,
          youtubeLink: parsed.youtubeLink || INITIAL_COACHING_INFO.youtubeLink
        };
      } catch (e) {
        return INITIAL_COACHING_INFO;
      }
    }
    return INITIAL_COACHING_INFO;
  });

  // Hero Section Content State
  const [heroContent, setHeroContent] = useState(() => {
    const saved = localStorage.getItem('uma_hero_content');
    return saved ? JSON.parse(saved) : INITIAL_HERO_CONTENT;
  });

  // FAQs State
  const [faqs, setFaqs] = useState(() => {
    const saved = localStorage.getItem('uma_faqs');
    return saved ? JSON.parse(saved) : INITIAL_FAQS;
  });

  // Courses State
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('uma_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  // YouTube Videos State
  const [videos, setVideos] = useState(() => {
    const saved = localStorage.getItem('uma_videos');
    return saved ? JSON.parse(saved) : INITIAL_YOUTUBE_VIDEOS;
  });

  // Students State
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('uma_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  // Faculty State
  const [faculty, setFaculty] = useState(() => {
    const saved = localStorage.getItem('uma_faculty');
    return saved ? JSON.parse(saved) : INITIAL_FACULTY;
  });

  // Rankers State
  const [rankers, setRankers] = useState(() => {
    const saved = localStorage.getItem('uma_rankers');
    return saved ? JSON.parse(saved) : INITIAL_RANKERS;
  });

  // Transactions State
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('uma_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  // Notices State
  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem('uma_notices');
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  // Study Materials State
  const [studyMaterials, setStudyMaterials] = useState(() => {
    const saved = localStorage.getItem('uma_materials');
    return saved ? JSON.parse(saved) : INITIAL_STUDY_MATERIALS;
  });

  // Enquiries / Leads State
  const [enquiries, setEnquiries] = useState(() => {
    const saved = localStorage.getItem('uma_enquiries');
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });

  // Doubts Forum State
  const [doubts, setDoubts] = useState(() => {
    const saved = localStorage.getItem('uma_doubts');
    return saved ? JSON.parse(saved) : INITIAL_DOUBTS;
  });

  // Sync to LocalStorage on changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('uma_theme', theme);
  }, [theme]);

  useEffect(() => {
    sessionStorage.setItem('uma_admin_auth', isAdminAuthenticated ? 'true' : 'false');
    if (!isAdminAuthenticated) {
      setIsTeacherMode(false);
    }
  }, [isAdminAuthenticated]);

  useEffect(() => {
    localStorage.setItem('uma_admin_pin', adminPin);
  }, [adminPin]);

  useEffect(() => {
    localStorage.setItem('uma_teacher_mode', JSON.stringify(isTeacherMode));
  }, [isTeacherMode]);

  useEffect(() => {
    localStorage.setItem('uma_hero_content', JSON.stringify(heroContent));
  }, [heroContent]);

  useEffect(() => {
    localStorage.setItem('uma_faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('uma_active_student_roll', activeStudentRoll);
  }, [activeStudentRoll]);

  useEffect(() => {
    localStorage.setItem('uma_saved_videos', JSON.stringify(savedVideoIds));
  }, [savedVideoIds]);

  useEffect(() => {
    localStorage.setItem('uma_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('uma_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('uma_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('uma_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('uma_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('uma_materials', JSON.stringify(studyMaterials));
  }, [studyMaterials]);

  useEffect(() => {
    localStorage.setItem('uma_doubts', JSON.stringify(doubts));
  }, [doubts]);

  useEffect(() => {
    localStorage.setItem('uma_coaching_info', JSON.stringify(coachingInfo));
  }, [coachingInfo]);

  useEffect(() => {
    localStorage.setItem('uma_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('uma_faculty', JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem('uma_rankers', JSON.stringify(rankers));
  }, [rankers]);

  useEffect(() => {
    localStorage.setItem('uma_admission_modal_content', JSON.stringify(admissionModalContent));
  }, [admissionModalContent]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3800);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // ==========================================
  // ADMIN SECURITY & ACCESS CONTROL
  // ==========================================
  const loginAdmin = (enteredPin) => {
    if (String(enteredPin).trim() === String(adminPin).trim()) {
      setIsAdminAuthenticated(true);
      setIsTeacherMode(true);
      setIsAdminAuthModalOpen(false);
      showToast('🔓 Teacher & Admin access granted. Live site editing unlocked!', 'success');

      if (adminAuthPendingAction) {
        if (typeof adminAuthPendingAction === 'function') {
          adminAuthPendingAction();
        } else if (typeof adminAuthPendingAction === 'string') {
          setCurrentView(adminAuthPendingAction);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setAdminAuthPendingAction(null);
      }
      return true;
    } else {
      showToast('Incorrect Admin Passcode / PIN. Access Denied.', 'error');
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setIsTeacherMode(false);
    showToast('🔒 Admin session locked. Returned to Public Portal.', 'info');
    if (currentView === 'admin' || currentView === 'id-studio' || currentView === 'fees-hub') {
      setCurrentView('public');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateAdminPin = (oldPin, newPin) => {
    if (String(oldPin).trim() !== String(adminPin).trim()) {
      showToast('Current PIN is incorrect.', 'error');
      return false;
    }
    if (!newPin || String(newPin).trim().length < 4) {
      showToast('New PIN must be at least 4 digits/characters.', 'error');
      return false;
    }
    setAdminPin(String(newPin).trim());
    showToast('Admin Passcode / PIN successfully updated!', 'success');
    return true;
  };

  const requireAdminAccess = (targetViewOrAction = 'admin') => {
    if (isAdminAuthenticated) {
      if (typeof targetViewOrAction === 'function') {
        targetViewOrAction();
      } else if (typeof targetViewOrAction === 'string') {
        setCurrentView(targetViewOrAction);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setAdminAuthPendingAction(() => {
        if (typeof targetViewOrAction === 'function') return targetViewOrAction;
        return () => {
          setCurrentView(targetViewOrAction);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        };
      });
      setIsAdminAuthModalOpen(true);
    }
  };

  const toggleTeacherMode = () => {
    if (!isAdminAuthenticated) {
      setAdminAuthPendingAction(() => () => {
        setIsTeacherMode(true);
      });
      setIsAdminAuthModalOpen(true);
      showToast('Please enter Admin Passcode to enable Teacher Live Edit Mode.', 'info');
      return;
    }

    setIsTeacherMode(prev => {
      const next = !prev;
      showToast(next ? '✏️ Teacher Live Edit Mode ENABLED!' : 'Teacher Live Edit Mode turned OFF', 'info');
      return next;
    });
  };

  const updateAdmissionModalContent = (newContent) => {
    setAdmissionModalContent(prev => ({
      ...prev,
      ...newContent
    }));
    showToast('Admission & Demo Pop-up content updated successfully!');
  };
  const navigateToAdmin = (tab = 'overview', targetItemId = null) => {
    const executeNavigation = () => {
      setAdminTab(tab);
      if (tab === 'courses' && targetItemId) setAdminEditingCourseId(targetItemId);
      if (tab === 'faculty' && targetItemId) setAdminEditingFacultyId(targetItemId);
      if (tab === 'rankers' && targetItemId) setAdminEditingRankerId(targetItemId);
      if (tab === 'materials' && targetItemId) setAdminEditingMaterialId(targetItemId);
      if (tab === 'youtube' && targetItemId) setAdminEditingVideoId(targetItemId);
      if (tab === 'notices' && targetItemId) setAdminEditingNoticeId(targetItemId);
      setCurrentView('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isAdminAuthenticated) {
      executeNavigation();
    } else {
      setAdminAuthPendingAction(() => executeNavigation);
      setIsAdminAuthModalOpen(true);
    }
  };

  // ==========================================
  // 1. HERO CONTENT & PUBLIC HOMEPAGE CRUD
  // ==========================================
  const updateHeroContent = (newContent) => {
    setHeroContent(prev => ({
      ...prev,
      ...newContent,
      stats: {
        ...(prev.stats || {}),
        ...(newContent.stats || {})
      }
    }));
    // Also sync stats with coachingInfo if updated
    if (newContent.stats) {
      setCoachingInfo(prev => ({
        ...prev,
        stats: { ...(prev.stats || {}), ...newContent.stats }
      }));
    }
    showToast('Hero section content updated successfully!');
  };

  // ==========================================
  // 2. FAQ QUESTIONS & ANSWERS CRUD
  // ==========================================
  const addFaq = (faqData) => {
    const newFaq = {
      id: `faq-${Date.now()}`,
      category: faqData.category || 'General Questions',
      question: faqData.question || 'New Frequently Asked Question',
      answer: faqData.answer || 'Answer details explaining policy or curriculum.'
    };
    setFaqs(prev => [newFaq, ...prev]);
    showToast('FAQ question added to public portal!');
    return newFaq;
  };

  const updateFaq = (id, updatedData) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, ...updatedData } : f));
    showToast('FAQ question updated.');
  };

  const deleteFaq = (id) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    showToast('FAQ question removed.', 'info');
  };

  // ==========================================
  // 3. COURSE CRUD & PRICING OPERATIONS
  // ==========================================
  const addCourse = (courseData) => {
    const newId = courseData.id || `course-${Date.now()}`;
    const newCourse = {
      id: newId,
      title: courseData.title || 'New Academic Program',
      category: courseData.category || 'English & Communication',
      targetClass: courseData.targetClass || 'All Students & Professionals',
      level: courseData.level || 'Beginner to Advanced',
      duration: courseData.duration || '3 Months',
      mode: courseData.mode || 'Hybrid (Classroom + App)',
      rating: Number(courseData.rating) || 4.9,
      reviewsCount: Number(courseData.reviewsCount) || 120,
      totalFee: Number(courseData.totalFee) || 18000,
      installments: Number(courseData.installments) || 2,
      badge: courseData.badge || 'Popular',
      icon: courseData.icon || 'BookOpen',
      description: courseData.description || 'Comprehensive curriculum designed for maximum conceptual clarity and practical excellence.',
      highlights: Array.isArray(courseData.highlights) ? courseData.highlights : [
        "Daily 1-on-1 speaking practice with certified language mentors",
        "Printed study modules & chapter worksheets",
        "Weekly mock exams and individual performance reviews",
        "Certificate of completion upon batch completion"
      ],
      curriculum: Array.isArray(courseData.curriculum) ? courseData.curriculum : [
        "Module 1: Foundations & Core Concepts",
        "Module 2: Applied Fluency & Practical Speaking",
        "Module 3: Speed, Accuracy & Test Strategy",
        "Module 4: Full Syllabus Simulation Exams"
      ],
      batchTimings: courseData.batchTimings || 'Morning (8:00 AM - 10:00 AM) | Evening (5:00 PM - 7:00 PM)',
      upcomingBatch: courseData.upcomingBatch || 'Admissions Open for New Batch'
    };

    setCourses(prev => [newCourse, ...prev]);
    showToast(`Course "${newCourse.title}" created successfully!`);
    return newCourse;
  };

  const updateCourse = (id, updatedData) => {
    setCourses(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          ...updatedData,
          totalFee: updatedData.totalFee !== undefined ? Number(updatedData.totalFee) : c.totalFee,
          installments: updatedData.installments !== undefined ? Number(updatedData.installments) : c.installments,
          rating: updatedData.rating !== undefined ? Number(updatedData.rating) : c.rating,
          reviewsCount: updatedData.reviewsCount !== undefined ? Number(updatedData.reviewsCount) : c.reviewsCount
        };
      }
      return c;
    }));
    showToast('Course details updated successfully.');
  };

  const updateCoursePrice = (id, newPrice, newInstallments = 2) => {
    const numPrice = Number(newPrice);
    if (isNaN(numPrice) || numPrice < 0) {
      showToast('Please enter a valid price amount.', 'error');
      return;
    }
    setCourses(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          totalFee: numPrice,
          installments: Number(newInstallments) || c.installments
        };
      }
      return c;
    }));
    showToast(`Course price updated to ₹${numPrice.toLocaleString()}!`);
  };

  const deleteCourse = (id) => {
    const target = courses.find(c => c.id === id);
    if (courses.length <= 1) {
      showToast('Cannot delete the only remaining course.', 'error');
      return;
    }
    setCourses(prev => prev.filter(c => c.id !== id));
    showToast(`Course "${target?.title || ''}" removed.`, 'info');
  };

  // ==========================================
  // 4. STUDENT CRUD & RECORD OPERATIONS
  // ==========================================
  const addStudent = (studentData) => {
    const nextNum = students.length + 101;
    const newId = `STU-2026-${String(students.length + 1).padStart(3, '0')}`;
    const newRoll = studentData.rollNo ? studentData.rollNo.toUpperCase().trim() : `UMA-${nextNum}`;
    const total = Number(studentData.totalFee) || 20000;
    const paid = Number(studentData.paidFee) || 0;
    
    let calculatedStatus = 'Overdue';
    if (paid >= total) calculatedStatus = 'Paid';
    else if (paid > 0) calculatedStatus = 'Partial';

    const newStudent = {
      id: newId,
      rollNo: newRoll,
      name: studentData.name,
      photo: studentData.photo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
      email: studentData.email || `${studentData.name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      phone: studentData.phone || '+91 98000 11223',
      parentName: studentData.parentName || 'Parent of ' + studentData.name,
      parentPhone: studentData.parentPhone || studentData.phone || '+91 98000 99887',
      courseId: studentData.courseId || courses[0]?.id || 'course-spoken-english',
      courseName: studentData.courseName || courses[0]?.title || 'Master Spoken English & Fluency Bootcamp',
      batch: studentData.batch || 'Fluency Achievers (Morning)',
      bloodGroup: studentData.bloodGroup || 'O+',
      dob: studentData.dob || '2006-01-01',
      admissionDate: studentData.admissionDate || new Date().toISOString().split('T')[0],
      validTill: studentData.validTill || '2027-05-31',
      address: studentData.address || 'Knowledge Park, New Delhi',
      attendancePercentage: Number(studentData.attendancePercentage) || 100,
      presentDays: Number(studentData.presentDays) || 1,
      totalDays: Number(studentData.totalDays) || 1,
      totalFee: total,
      paidFee: paid,
      feeStatus: calculatedStatus,
      lastPaymentDate: paid > 0 ? new Date().toISOString().split('T')[0] : 'N/A',
      recentTestRank: studentData.recentTestRank || 'Enrolled',
      recentTestScore: studentData.recentTestScore || 'Pending First Test',
      teacherRemarks: studentData.teacherRemarks || 'Enrolled student. Demonstrates high enthusiasm and dedication.',
      performanceScores: studentData.performanceScores || [
        { test: "Enrollment Assessment", score: 85, max: 100 }
      ]
    };

    setStudents(prev => [newStudent, ...prev]);

    if (paid > 0) {
      const receiptNo = `UMA/RCP/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;
      const newTxn = {
        id: `TXN-${Date.now()}`,
        receiptNo,
        studentId: newId,
        studentName: newStudent.name,
        rollNo: newRoll,
        courseName: newStudent.courseName,
        amount: paid,
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMode: studentData.paymentMode || 'Online Payment',
        transactionRef: `REF-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        status: 'Completed',
        description: 'Initial Admission / Registration Fee Deposit',
        collectedBy: 'Admissions Desk'
      };
      setTransactions(prev => [newTxn, ...prev]);
    }

    showToast(`Student ${newStudent.name} enrolled! Roll No: ${newRoll}`);
    return newStudent;
  };

  const updateStudent = (id, updatedData) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const updated = { ...s, ...updatedData };
        const total = Number(updated.totalFee) !== undefined ? Number(updated.totalFee) : s.totalFee;
        const paid = Number(updated.paidFee) !== undefined ? Number(updated.paidFee) : s.paidFee;
        updated.totalFee = total;
        updated.paidFee = paid;

        if (paid >= total && total > 0) updated.feeStatus = 'Paid';
        else if (paid > 0) updated.feeStatus = 'Partial';
        else updated.feeStatus = 'Overdue';

        if (updated.presentDays !== undefined && updated.totalDays !== undefined && updated.totalDays > 0) {
          updated.attendancePercentage = Math.round((Number(updated.presentDays) / Number(updated.totalDays)) * 100);
        }

        return updated;
      }
      return s;
    }));
    showToast('Student record updated successfully.');
  };

  const deleteStudent = (id) => {
    const target = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));
    showToast(`Removed student ${target?.name || ''}.`, 'info');
  };

  const quickIncrementAttendance = (studentId) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const newPres = (Number(s.presentDays) || 0) + 1;
        const newTot = (Number(s.totalDays) || 0) + 1;
        const newPct = Math.round((newPres / newTot) * 100);
        return {
          ...s,
          presentDays: newPres,
          totalDays: newTot,
          attendancePercentage: newPct
        };
      }
      return s;
    }));
    showToast('Attendance recorded: +1 Present Day.');
  };

  const addStudentTestScore = (studentId, { test, score, max = 100 }) => {
    const numScore = Number(score);
    const numMax = Number(max);
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const existing = s.performanceScores || [];
        const updatedScores = [{ test, score: numScore, max: numMax }, ...existing];
        return {
          ...s,
          recentTestScore: `${numScore}/${numMax} (${Math.round((numScore / numMax) * 100)}%)`,
          performanceScores: updatedScores
        };
      }
      return s;
    }));
    showToast(`Added test score "${test}: ${numScore}/${numMax}"!`);
  };

  // ==========================================
  // 5. FEE PAYMENT HANDLER
  // ==========================================
  const recordFeePayment = ({ studentId, amount, paymentMode, remarks, collectedBy = 'Accounts Counter' }) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const numAmount = Number(amount);
    const newPaidFee = (Number(student.paidFee) || 0) + numAmount;
    const total = Number(student.totalFee) || 0;
    
    let newStatus = 'Overdue';
    if (newPaidFee >= total && total > 0) {
      newStatus = 'Paid';
    } else if (newPaidFee > 0) {
      newStatus = 'Partial';
    }

    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          paidFee: newPaidFee,
          feeStatus: newStatus,
          lastPaymentDate: new Date().toISOString().split('T')[0]
        };
      }
      return s;
    }));

    const receiptNo = `UMA/RCP/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;
    const newTxn = {
      id: `TXN-${Date.now()}`,
      receiptNo,
      studentId: student.id,
      studentName: student.name,
      rollNo: student.rollNo,
      courseName: student.courseName,
      amount: numAmount,
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMode: paymentMode || 'UPI',
      transactionRef: `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}/AXIS`,
      status: 'Completed',
      description: remarks || 'Tuition Fee Installment Payment',
      collectedBy
    };

    setTransactions(prev => [newTxn, ...prev]);
    setActiveReceipt(newTxn);
    showToast(`Payment of ₹${numAmount.toLocaleString()} recorded for ${student.name}!`);
    return newTxn;
  };

  // ==========================================
  // 6. FACULTY & MENTORS CRUD
  // ==========================================
  const addFaculty = (facData) => {
    const newFac = {
      id: `fac-${Date.now()}`,
      name: facData.name || 'New Faculty Member',
      designation: facData.designation || 'Master Language Coach',
      qualification: facData.qualification || 'M.A. English, CELTA Certified',
      experience: facData.experience || '8+ Years',
      photo: facData.photo || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      bio: facData.bio || 'Passionate educator committed to interactive learning and student mastery.',
      quote: facData.quote || 'Fluency is not about perfection; it is about authentic connection and clarity.'
    };
    setFaculty(prev => [...prev, newFac]);
    showToast(`Faculty member "${newFac.name}" added!`);
    return newFac;
  };

  const updateFaculty = (id, updatedData) => {
    setFaculty(prev => prev.map(f => f.id === id ? { ...f, ...updatedData } : f));
    showToast('Faculty profile updated successfully.');
  };

  const deleteFaculty = (id) => {
    if (faculty.length <= 1) {
      showToast('Cannot delete the only remaining faculty member.', 'error');
      return;
    }
    setFaculty(prev => prev.filter(f => f.id !== id));
    showToast('Faculty profile removed.', 'info');
  };

  // ==========================================
  // 7. TOPPERS & RANKERS CRUD
  // ==========================================
  const addRanker = (rankerData) => {
    const newRanker = {
      id: `rnk-${Date.now()}`,
      name: rankerData.name || 'Achiever Student',
      rank: rankerData.rank || 'All India Rank 12',
      exam: rankerData.exam || 'SSC CGL & Spoken Mastery',
      year: rankerData.year || '2025',
      quote: rankerData.quote || 'UMA Learnology gave me the exact conceptual confidence and fluency drills to ace the exam.',
      photo: rankerData.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
    };
    setRankers(prev => [newRanker, ...prev]);
    showToast(`Achiever "${newRanker.name}" added to Hall of Fame!`);
    return newRanker;
  };

  const updateRanker = (id, updatedData) => {
    setRankers(prev => prev.map(r => r.id === id ? { ...r, ...updatedData } : f));
    showToast('Ranker story updated.');
  };

  const deleteRanker = (id) => {
    setRankers(prev => prev.filter(r => r.id !== id));
    showToast('Ranker record removed.', 'info');
  };

  // ==========================================
  // 8. STUDY MATERIALS CRUD
  // ==========================================
  const addStudyMaterial = (matData) => {
    const newMat = {
      id: `mat-${Date.now()}`,
      title: matData.title || 'Comprehensive Study Guide',
      subject: matData.subject || 'English & Fluency',
      type: matData.type || 'Handout PDF',
      pages: matData.pages || '24 Pages',
      fileSize: matData.fileSize || '3.5 MB',
      isPremium: matData.isPremium !== undefined ? matData.isPremium : true,
      downloadUrl: matData.downloadUrl || '#',
      description: matData.description || 'Complete chapter notes and solved practice drills.',
      uploadDate: new Date().toISOString().split('T')[0]
    };
    setStudyMaterials(prev => [newMat, ...prev]);
    showToast(`Study material "${newMat.title}" uploaded!`);
    return newMat;
  };

  const updateStudyMaterial = (id, updatedData) => {
    setStudyMaterials(prev => prev.map(m => m.id === id ? { ...m, ...updatedData } : m));
    showToast('Study material updated.');
  };

  const deleteStudyMaterial = (id) => {
    setStudyMaterials(prev => prev.filter(m => m.id !== id));
    showToast('Study material deleted.', 'info');
  };

  // ==========================================
  // 9. INSTITUTE / COACHING BRANDING UPDATE
  // ==========================================
  const updateCoachingInfo = (newInfo) => {
    setCoachingInfo(prev => ({
      ...prev,
      ...newInfo,
      stats: {
        ...(prev.stats || {}),
        ...(newInfo.stats || {})
      }
    }));
    showToast('Institute branding and contact info updated!');
  };

  // ==========================================
  // 10. YOUTUBE VIDEO MANAGEMENT
  // ==========================================
  const addYouTubeVideo = (videoData) => {
    let cleanYtId = videoData.youtubeId || 'dQw4w9WgXcQ';
    if (cleanYtId.includes('youtube.com/watch?v=')) {
      cleanYtId = cleanYtId.split('v=')[1]?.split('&')[0] || cleanYtId;
    } else if (cleanYtId.includes('youtu.be/')) {
      cleanYtId = cleanYtId.split('youtu.be/')[1]?.split('?')[0] || cleanYtId;
    }

    const newVideo = {
      id: `yt-${Date.now()}`,
      views: videoData.views || '1.2K views',
      publishDate: 'Just now',
      youtubeId: cleanYtId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${cleanYtId}`,
      isFeatured: videoData.isFeatured || false,
      notesUrl: '#',
      chapters: videoData.chapters && videoData.chapters.length > 0
        ? videoData.chapters
        : ['00:00 Lecture Start', '15:00 Core Concepts', '45:00 Solved Questions'],
      ...videoData
    };
    setVideos(prev => [newVideo, ...prev]);
    showToast('New video lecture added to catalog!');
    return newVideo;
  };

  const updateYouTubeVideo = (id, updatedData) => {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, ...updatedData } : v));
    showToast('Video lecture updated.');
  };

  const deleteYouTubeVideo = (id) => {
    setVideos(prev => prev.filter(v => v.id !== id));
    showToast('Video removed from catalog.', 'info');
  };

  const toggleFeaturedVideo = (id) => {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, isFeatured: !v.isFeatured } : v));
    showToast('Video featured status updated.');
  };

  const toggleSaveVideo = (videoId) => {
    setSavedVideoIds(prev => {
      if (prev.includes(videoId)) {
        showToast('Removed from Watch Later list.', 'info');
        return prev.filter(id => id !== videoId);
      } else {
        showToast('Added to Watch Later list!');
        return [...prev, videoId];
      }
    });
  };

  // ==========================================
  // 11. NOTICE MANAGEMENT
  // ==========================================
  const addNotice = (noticeData) => {
    const newNotice = {
      id: `not-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      ...noticeData
    };
    setNotices(prev => [newNotice, ...prev]);
    showToast('Announcement posted to notice ticker!');
  };

  const updateNotice = (id, updatedData) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, ...updatedData } : n));
    showToast('Notice updated.');
  };

  const deleteNotice = (id) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    showToast('Notice deleted.', 'info');
  };

  const toggleUrgentNotice = (id) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, isUrgent: !n.isUrgent } : n));
    showToast('Notice priority updated.');
  };

  // ==========================================
  // 12. ENQUIRY / DEMO LEAD MANAGEMENT
  // ==========================================
  const addEnquiry = (enquiryData) => {
    const newEnq = {
      id: `enq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'New Lead',
      ...enquiryData
    };
    setEnquiries(prev => [newEnq, ...prev]);
    showToast('Demo request submitted! Our counseling team will reach out.');
    return newEnq;
  };

  const updateEnquiryStatus = (id, newStatus, notes) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus, notes: notes || e.notes } : e));
    showToast(`Lead status updated to: ${newStatus}`);
  };

  const deleteEnquiry = (id) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
    showToast('Enquiry removed.', 'info');
  };

  // ==========================================
  // 13. DOUBTS FORUM HANDLERS
  // ==========================================
  const addDoubt = ({ studentRoll, studentName, subject, topic, question }) => {
    const newDoubt = {
      id: `dbt-${Date.now()}`,
      studentRoll,
      studentName,
      subject,
      topic,
      question,
      response: "Assigned to subject mentor. Answer will appear shortly.",
      facultyName: "UMA Faculty Desk",
      date: new Date().toISOString().split('T')[0],
      status: "In Review"
    };
    setDoubts(prev => [newDoubt, ...prev]);
    showToast('Your doubt has been submitted to subject faculty!');
    return newDoubt;
  };

  const resolveDoubt = (id, responseText, facultyName = "Uma Nandini Ma'am") => {
    setDoubts(prev => prev.map(d => d.id === id ? {
      ...d,
      response: responseText,
      facultyName,
      status: 'Resolved'
    } : d));
    showToast('Doubt answered and marked resolved!');
  };

  const deleteDoubt = (id) => {
    setDoubts(prev => prev.filter(d => d.id !== id));
    showToast('Doubt deleted.', 'info');
  };

  // ==========================================
  // 14. DATA BACKUP & RESTORE
  // ==========================================
  const exportDataJSON = () => {
    const data = {
      coachingInfo,
      heroContent,
      faqs,
      courses,
      videos,
      students,
      faculty,
      rankers,
      transactions,
      notices,
      studyMaterials,
      enquiries,
      doubts,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `uma_classes_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Complete system data backup exported as JSON!');
  };

  const importDataJSON = (jsonData) => {
    try {
      if (jsonData.students) setStudents(jsonData.students);
      if (jsonData.transactions) setTransactions(jsonData.transactions);
      if (jsonData.videos) setVideos(jsonData.videos);
      if (jsonData.notices) setNotices(jsonData.notices);
      if (jsonData.enquiries) setEnquiries(jsonData.enquiries);
      if (jsonData.doubts) setDoubts(jsonData.doubts);
      if (jsonData.courses) setCourses(jsonData.courses);
      if (jsonData.faculty) setFaculty(jsonData.faculty);
      if (jsonData.rankers) setRankers(jsonData.rankers);
      if (jsonData.studyMaterials) setStudyMaterials(jsonData.studyMaterials);
      if (jsonData.coachingInfo) setCoachingInfo(jsonData.coachingInfo);
      if (jsonData.heroContent) setHeroContent(jsonData.heroContent);
      if (jsonData.faqs) setFaqs(jsonData.faqs);
      showToast('System data successfully imported and updated!');
    } catch (e) {
      showToast('Failed to import JSON data. Format invalid.', 'error');
    }
  };

  const resetDataToDefault = () => {
    localStorage.clear();
    setStudents(INITIAL_STUDENTS);
    setTransactions(INITIAL_TRANSACTIONS);
    setVideos(INITIAL_YOUTUBE_VIDEOS);
    setNotices(INITIAL_NOTICES);
    setStudyMaterials(INITIAL_STUDY_MATERIALS);
    setFaculty(INITIAL_FACULTY);
    setRankers(INITIAL_RANKERS);
    setEnquiries(INITIAL_ENQUIRIES);
    setDoubts(INITIAL_DOUBTS);
    setCourses(INITIAL_COURSES);
    setCoachingInfo(INITIAL_COACHING_INFO);
    setHeroContent(INITIAL_HERO_CONTENT);
    setFaqs(INITIAL_FAQS);
    setSavedVideoIds([]);
    showToast('System data reset to initial demo state.', 'info');
  };

  const openAdmissionForCourse = (course) => {
    setAdmissionModalInitialCourse(course);
    setIsAdmissionModalOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        coachingInfo,
        setCoachingInfo,
        updateCoachingInfo,
        heroContent,
        setHeroContent,
        updateHeroContent,
        faqs,
        setFaqs,
        addFaq,
        updateFaq,
        deleteFaq,
        isTeacherMode,
        setIsTeacherMode,
        toggleTeacherMode,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        adminPin,
        isAdminAuthModalOpen,
        setIsAdminAuthModalOpen,
        loginAdmin,
        logoutAdmin,
        updateAdminPin,
        requireAdminAccess,
        isEditHeroModalOpen,
        setIsEditHeroModalOpen,
        isEditFaqModalOpen,
        setIsEditFaqModalOpen,
        editingFaq,
        setEditingFaq,
        isEditContactModalOpen,
        setIsEditContactModalOpen,
        isQuickNoticeModalOpen,
        setIsQuickNoticeModalOpen,
        isEditAdmissionModalOpen,
        setIsEditAdmissionModalOpen,
        admissionModalContent,
        setAdmissionModalContent,
        updateAdmissionModalContent,
        courses,
        setCourses,
        addCourse,
        updateCourse,
        updateCoursePrice,
        deleteCourse,
        faculty,
        setFaculty,
        addFaculty,
        updateFaculty,
        deleteFaculty,
        rankers,
        setRankers,
        addRanker,
        updateRanker,
        deleteRanker,
        studyMaterials,
        setStudyMaterials,
        addStudyMaterial,
        updateStudyMaterial,
        deleteStudyMaterial,
        videos,
        students,
        transactions,
        notices,
        enquiries,
        doubts,
        theme,
        toggleTheme,
        currentView,
        setCurrentView,
        adminTab,
        setAdminTab,
        adminEditingCourseId,
        setAdminEditingCourseId,
        adminEditingFacultyId,
        setAdminEditingFacultyId,
        adminEditingRankerId,
        setAdminEditingRankerId,
        adminEditingMaterialId,
        setAdminEditingMaterialId,
        adminEditingVideoId,
        setAdminEditingVideoId,
        adminEditingNoticeId,
        setAdminEditingNoticeId,
        navigateToAdmin,
        activeStudentRoll,
        setActiveStudentRoll,
        selectedStudentId,
        setSelectedStudentId,
        idCardTheme,
        setIdCardTheme,
        activeReceipt,
        setActiveReceipt,
        playingVideo,
        setPlayingVideo,
        activeCourseDetails,
        setActiveCourseDetails,
        isAdmissionModalOpen,
        setIsAdmissionModalOpen,
        admissionModalInitialCourse,
        setAdmissionModalInitialCourse,
        openAdmissionForCourse,
        savedVideoIds,
        toggleSaveVideo,
        toast,
        showToast,
        addStudent,
        updateStudent,
        deleteStudent,
        quickIncrementAttendance,
        addStudentTestScore,
        recordFeePayment,
        addYouTubeVideo,
        updateYouTubeVideo,
        deleteYouTubeVideo,
        toggleFeaturedVideo,
        addNotice,
        updateNotice,
        deleteNotice,
        toggleUrgentNotice,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        addDoubt,
        resolveDoubt,
        deleteDoubt,
        exportDataJSON,
        importDataJSON,
        resetDataToDefault
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
