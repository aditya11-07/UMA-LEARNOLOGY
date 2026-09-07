import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { FeeManagement } from '../fees/FeeManagement';
import { IDCardStudio } from '../idcard/IDCardStudio';
import { ImageUploadInput } from '../ImageUploadInput';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  IdCard,
  Youtube,
  Calendar,
  Bell,
  Settings,
  Plus,
  Search,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  BookOpen,
  X,
  Sparkles,
  Download,
  RotateCcw,
  MessageSquare,
  MessageCircle,
  Phone,
  Mail,
  Upload,
  UserCheck,
  ShieldCheck,
  Award,
  FileText,
  Star,
  Clock,
  ArrowRight,
  GraduationCap,
  Building2,
  Percent,
  MapPin,
  Sliders,
  Check,
  ExternalLink,
  Save,
  Trophy,
  RefreshCw,
  PlayCircle,
  Lock,
  Unlock,
  KeyRound,
  LogOut
} from '../Icons';

export const AdminDashboard = () => {
  const {
    students,
    transactions,
    videos,
    notices,
    enquiries,
    courses,
    faculty,
    rankers,
    studyMaterials,
    coachingInfo,
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
    addCourse,
    updateCourse,
    updateCoursePrice,
    deleteCourse,
    addStudent,
    updateStudent,
    deleteStudent,
    quickIncrementAttendance,
    addStudentTestScore,
    addFaculty,
    updateFaculty,
    deleteFaculty,
    addRanker,
    updateRanker,
    deleteRanker,
    addStudyMaterial,
    updateStudyMaterial,
    deleteStudyMaterial,
    updateCoachingInfo,
    addYouTubeVideo,
    updateYouTubeVideo,
    deleteYouTubeVideo,
    toggleFeaturedVideo,
    addNotice,
    updateNotice,
    deleteNotice,
    toggleUrgentNotice,
    updateEnquiryStatus,
    deleteEnquiry,
    setSelectedStudentId,
    setPlayingVideo,
    setCurrentView,
    exportDataJSON,
    importDataJSON,
    resetDataToDefault,
    showToast,
    logoutAdmin,
    adminPin,
    updateAdminPin
  } = useApp();

  // Search & Filters
  const [studentSearch, setStudentSearch] = useState('');
  const [studentFeeFilter, setStudentFeeFilter] = useState('All');
  const [courseSearch, setCourseSearch] = useState('');
  const [videoSearch, setVideoSearch] = useState('');

  // Admin PIN Change Form
  const [changePinForm, setChangePinForm] = useState({ currentPin: '', newPin: '', confirmPin: '' });

  // Course Sub-tab: 'all' | 'quick-price'
  const [courseSubTab, setCourseSubTab] = useState('all');

  // Modals & Active Edit Entities
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);

  const [isAddFacultyOpen, setIsAddFacultyOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);

  const [isAddRankerOpen, setIsAddRankerOpen] = useState(false);
  const [editingRanker, setEditingRanker] = useState(null);

  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);

  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  const [isAddNoticeOpen, setIsAddNoticeOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);

  // New Test Score Form inside Dossier
  const [newTestForm, setNewTestForm] = useState({ test: '', score: '', max: 100 });

  // Quick Price local draft states for rapid editing
  const [priceDrafts, setPriceDrafts] = useState({});

  // YouTube Live Channel Settings Form State
  const [ytSettingsForm, setYtSettingsForm] = useState({
    youtubeChannel: coachingInfo.youtubeChannel || 'UMA English Learnology',
    youtubeHandle: coachingInfo.youtubeHandle || '@umaenglishlearnology',
    youtubeSubscribers: coachingInfo.youtubeSubscribers || '1.25K Subscribers',
    youtubeLink: coachingInfo.youtubeLink || 'https://youtube.com/@umaenglishlearnology?si=ngO3ao2j9Ue0UzbJ',
    youtubeTotalViews: coachingInfo.youtubeTotalViews || '48K+ Views'
  });

  // Branding Form State
  const [brandingForm, setBrandingForm] = useState(coachingInfo);

  useEffect(() => {
    setBrandingForm(coachingInfo);
    setYtSettingsForm({
      youtubeChannel: coachingInfo.youtubeChannel || 'UMA English Learnology',
      youtubeHandle: coachingInfo.youtubeHandle || '@umaenglishlearnology',
      youtubeSubscribers: coachingInfo.youtubeSubscribers || '1.25K Subscribers',
      youtubeLink: coachingInfo.youtubeLink || 'https://youtube.com/@umaenglishlearnology?si=ngO3ao2j9Ue0UzbJ',
      youtubeTotalViews: coachingInfo.youtubeTotalViews || '48K+ Views'
    });
  }, [coachingInfo]);

  // Handle external navigation with pre-selected item
  useEffect(() => {
    if (adminEditingCourseId) {
      const target = courses.find(c => c.id === adminEditingCourseId);
      if (target) {
        setEditingCourse(target);
        setAdminEditingCourseId(null);
      }
    }
  }, [adminEditingCourseId, courses]);

  useEffect(() => {
    if (adminEditingFacultyId) {
      const target = faculty.find(f => f.id === adminEditingFacultyId);
      if (target) {
        setEditingFaculty(target);
        setAdminEditingFacultyId(null);
      }
    }
  }, [adminEditingFacultyId, faculty]);

  useEffect(() => {
    if (adminEditingRankerId) {
      const target = rankers.find(r => r.id === adminEditingRankerId);
      if (target) {
        setEditingRanker(target);
        setAdminEditingRankerId(null);
      }
    }
  }, [adminEditingRankerId, rankers]);

  useEffect(() => {
    if (adminEditingMaterialId) {
      const target = studyMaterials.find(m => m.id === adminEditingMaterialId);
      if (target) {
        setEditingMaterial(target);
        setAdminEditingMaterialId(null);
      }
    }
  }, [adminEditingMaterialId, studyMaterials]);

  useEffect(() => {
    if (adminEditingVideoId) {
      const target = videos.find(v => v.id === adminEditingVideoId);
      if (target) {
        setEditingVideo(target);
        setAdminEditingVideoId(null);
      }
    }
  }, [adminEditingVideoId, videos]);

  useEffect(() => {
    if (adminEditingNoticeId) {
      const target = notices.find(n => n.id === adminEditingNoticeId);
      if (target) {
        setEditingNotice(target);
        setAdminEditingNoticeId(null);
      }
    }
  }, [adminEditingNoticeId, notices]);

  // Initialize Price Drafts
  useEffect(() => {
    const drafts = {};
    courses.forEach(c => {
      drafts[c.id] = { totalFee: c.totalFee, installments: c.installments };
    });
    setPriceDrafts(drafts);
  }, [courses]);

  // Initial Form Templates
  const [newCourseForm, setNewCourseForm] = useState({
    title: '',
    category: 'English & Communication',
    targetClass: 'College Students & Working Professionals',
    level: 'Beginner to Advanced',
    duration: '3 Months',
    mode: 'Hybrid (Classroom + App)',
    rating: 4.9,
    reviewsCount: 150,
    totalFee: 18000,
    installments: 2,
    badge: 'Popular',
    icon: 'BookOpen',
    description: '',
    highlights: [
      'Daily 1-on-1 speaking practice with certified language mentors',
      'Comprehensive concept worksheets and study modules',
      'Regular mock tests and performance feedback'
    ],
    curriculum: [
      'Module 1: Foundations & Essential Rules',
      'Module 2: Applied Fluency & Practical Speaking',
      'Module 3: Advanced Concepts & Exam Strategy'
    ],
    batchTimings: 'Morning (8:00 AM - 9:30 AM) | Evening (6:00 PM - 7:30 PM)',
    upcomingBatch: 'Starts next Monday'
  });

  const [newStudentForm, setNewStudentForm] = useState({
    name: '',
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    rollNo: '',
    phone: '',
    email: '',
    parentName: '',
    parentPhone: '',
    address: 'Knowledge Park, New Delhi',
    courseId: courses[0]?.id || 'course-spoken-english',
    batch: 'Fluency Achievers (Morning)',
    bloodGroup: 'O+',
    dob: '2006-05-15',
    totalFee: courses[0]?.totalFee || 18000,
    paidFee: courses[0]?.totalFee || 18000,
    paymentMode: 'UPI / Online',
    teacherRemarks: 'Enrolled in core batch. Active learner.'
  });

  const [newFacultyForm, setNewFacultyForm] = useState({
    name: '',
    designation: 'Senior Language Mentor',
    qualification: 'M.A. English, CELTA Certified',
    experience: '8+ Years',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    bio: 'Dedicated mentor specializing in fluency acceleration and phonetic training.',
    quote: 'Fluency is a skill forged through consistent, guided practice.'
  });

  const [newRankerForm, setNewRankerForm] = useState({
    name: '',
    rank: 'AIR 24 (SSC CGL)',
    exam: 'SSC CGL 2025',
    year: '2025',
    quote: 'UMA Learnology helped me master English grammar and speed reading with zero stress.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
  });

  const [newMaterialForm, setNewMaterialForm] = useState({
    title: '',
    subject: 'English Grammar',
    type: 'Comprehensive Handout PDF',
    pages: '28 Pages',
    fileSize: '4.2 MB',
    isPremium: true,
    downloadUrl: '#',
    description: 'Complete revision notes with solved exercises.'
  });

  const [newVideoForm, setNewVideoForm] = useState({
    title: '',
    subject: 'English Grammar',
    instructor: "Uma Nandini Ma'am",
    duration: '1h 15m',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'English Grammar',
    views: '1.4K views',
    isFeatured: false,
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80',
    description: 'Masterclass concept revision lecture.'
  });

  const [newNoticeForm, setNewNoticeForm] = useState({
    title: '',
    category: 'Academic Notice',
    isUrgent: false,
    content: ''
  });

  // Avatar Presets
  const avatarPresets = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80'
  ];

  // Calculations
  const totalRevenue = students.reduce((acc, s) => acc + (Number(s.paidFee) || 0), 0);
  const totalDue = students.reduce((acc, s) => acc + ((Number(s.totalFee) || 0) - (Number(s.paidFee) || 0)), 0);
  const avgCoursePrice = courses.length > 0 ? Math.round(courses.reduce((acc, c) => acc + (Number(c.totalFee) || 0), 0) / courses.length) : 0;

  // Filtered Lists
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.batch.toLowerCase().includes(studentSearch.toLowerCase()) ||
      (s.courseName && s.courseName.toLowerCase().includes(studentSearch.toLowerCase()));
    const matchesFee = studentFeeFilter === 'All' || s.feeStatus === studentFeeFilter;
    return matchesSearch && matchesFee;
  });

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
    c.category.toLowerCase().includes(courseSearch.toLowerCase()) ||
    c.targetClass.toLowerCase().includes(courseSearch.toLowerCase())
  );

  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(videoSearch.toLowerCase()) ||
    (v.subject && v.subject.toLowerCase().includes(videoSearch.toLowerCase())) ||
    (v.category && v.category.toLowerCase().includes(videoSearch.toLowerCase())) ||
    (v.instructor && v.instructor.toLowerCase().includes(videoSearch.toLowerCase()))
  );

  // Handlers
  const handleSaveYtSettings = (e) => {
    e.preventDefault();
    updateCoachingInfo(ytSettingsForm);
    showToast(`YouTube Channel details & Subscriber count updated to "${ytSettingsForm.youtubeSubscribers}"!`);
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    addCourse(newCourseForm);
    setIsAddCourseOpen(false);
    setNewCourseForm({
      title: '',
      category: 'English & Communication',
      targetClass: 'College Students & Working Professionals',
      level: 'Beginner to Advanced',
      duration: '3 Months',
      mode: 'Hybrid (Classroom + App)',
      rating: 4.9,
      reviewsCount: 150,
      totalFee: 18000,
      installments: 2,
      badge: 'Popular',
      icon: 'BookOpen',
      description: '',
      highlights: [
        'Daily 1-on-1 speaking practice with certified language mentors',
        'Comprehensive concept worksheets and study modules',
        'Regular mock tests and performance feedback'
      ],
      curriculum: [
        'Module 1: Foundations & Essential Rules',
        'Module 2: Applied Fluency & Practical Speaking',
        'Module 3: Advanced Concepts & Exam Strategy'
      ],
      batchTimings: 'Morning (8:00 AM - 9:30 AM) | Evening (6:00 PM - 7:30 PM)',
      upcomingBatch: 'Starts next Monday'
    });
  };

  const handleSaveEditCourse = (e) => {
    e.preventDefault();
    if (!editingCourse) return;
    updateCourse(editingCourse.id, editingCourse);
    setEditingCourse(null);
  };

  const handleQuickPriceSave = (courseId) => {
    const draft = priceDrafts[courseId];
    if (draft) {
      updateCoursePrice(courseId, draft.totalFee, draft.installments);
    }
  };

  const handleCreateStudent = (e) => {
    e.preventDefault();
    const selectedCourse = courses.find(c => c.id === newStudentForm.courseId) || courses[0];
    addStudent({
      ...newStudentForm,
      photo: newStudentForm.photo || avatarPresets[0],
      courseName: selectedCourse.title,
      totalFee: newStudentForm.totalFee || selectedCourse.totalFee
    });
    setIsAddStudentOpen(false);
    setNewStudentForm({
      name: '',
      photo: avatarPresets[0],
      rollNo: '',
      phone: '',
      email: '',
      parentName: '',
      parentPhone: '',
      address: 'Knowledge Park, New Delhi',
      courseId: courses[0]?.id || 'course-spoken-english',
      batch: 'Fluency Achievers (Morning)',
      bloodGroup: 'O+',
      dob: '2006-05-15',
      totalFee: courses[0]?.totalFee || 18000,
      paidFee: courses[0]?.totalFee || 18000,
      paymentMode: 'UPI / Online',
      teacherRemarks: 'Enrolled in core batch. Active learner.'
    });
  };

  const handleSaveEditStudent = (e) => {
    e.preventDefault();
    if (!editingStudent) return;
    updateStudent(editingStudent.id, editingStudent);
    setEditingStudent(null);
  };

  const handleAddTestScoreSubmit = (e) => {
    e.preventDefault();
    if (!viewingStudent || !newTestForm.test || !newTestForm.score) {
      showToast('Please enter test name and score.', 'error');
      return;
    }
    addStudentTestScore(viewingStudent.id, {
      test: newTestForm.test,
      score: Number(newTestForm.score),
      max: Number(newTestForm.max) || 100
    });
    const updated = students.find(s => s.id === viewingStudent.id);
    if (updated) {
      setViewingStudent({
        ...updated,
        performanceScores: [
          { test: newTestForm.test, score: Number(newTestForm.score), max: Number(newTestForm.max) || 100 },
          ...(updated.performanceScores || [])
        ]
      });
    }
    setNewTestForm({ test: '', score: '', max: 100 });
  };

  const handleCreateFaculty = (e) => {
    e.preventDefault();
    addFaculty(newFacultyForm);
    setIsAddFacultyOpen(false);
    setNewFacultyForm({
      name: '',
      designation: 'Senior Language Mentor',
      qualification: 'M.A. English, CELTA Certified',
      experience: '8+ Years',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      bio: 'Dedicated mentor specializing in fluency acceleration and phonetic training.',
      quote: 'Fluency is a skill forged through consistent, guided practice.'
    });
  };

  const handleSaveEditFaculty = (e) => {
    e.preventDefault();
    if (!editingFaculty) return;
    updateFaculty(editingFaculty.id, editingFaculty);
    setEditingFaculty(null);
  };

  const handleCreateRanker = (e) => {
    e.preventDefault();
    addRanker(newRankerForm);
    setIsAddRankerOpen(false);
    setNewRankerForm({
      name: '',
      rank: 'AIR 24 (SSC CGL)',
      exam: 'SSC CGL 2025',
      year: '2025',
      quote: 'UMA Learnology helped me master English grammar and speed reading with zero stress.',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
    });
  };

  const handleSaveEditRanker = (e) => {
    e.preventDefault();
    if (!editingRanker) return;
    updateRanker(editingRanker.id, editingRanker);
    setEditingRanker(null);
  };

  const handleCreateMaterial = (e) => {
    e.preventDefault();
    addStudyMaterial(newMaterialForm);
    setIsAddMaterialOpen(false);
    setNewMaterialForm({
      title: '',
      subject: 'English Grammar',
      type: 'Comprehensive Handout PDF',
      pages: '28 Pages',
      fileSize: '4.2 MB',
      isPremium: true,
      downloadUrl: '#',
      description: 'Complete revision notes with solved exercises.'
    });
  };

  const handleSaveEditMaterial = (e) => {
    e.preventDefault();
    if (!editingMaterial) return;
    updateStudyMaterial(editingMaterial.id, editingMaterial);
    setEditingMaterial(null);
  };

  const handleSaveBranding = (e) => {
    e.preventDefault();
    updateCoachingInfo(brandingForm);
  };

  const handleCreateVideo = (e) => {
    e.preventDefault();
    addYouTubeVideo(newVideoForm);
    setIsAddVideoOpen(false);
    setNewVideoForm({
      title: '',
      subject: 'English Grammar',
      instructor: "Uma Nandini Ma'am",
      duration: '1h 15m',
      youtubeId: 'dQw4w9WgXcQ',
      category: 'English Grammar',
      views: '1.4K views',
      isFeatured: false,
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80',
      description: 'Masterclass concept revision lecture.'
    });
  };

  const handleSaveEditVideo = (e) => {
    e.preventDefault();
    if (!editingVideo) return;
    let cleanYtId = editingVideo.youtubeId || 'dQw4w9WgXcQ';
    if (cleanYtId.includes('youtube.com/watch?v=')) {
      cleanYtId = cleanYtId.split('v=')[1]?.split('&')[0] || cleanYtId;
    } else if (cleanYtId.includes('youtu.be/')) {
      cleanYtId = cleanYtId.split('youtu.be/')[1]?.split('?')[0] || cleanYtId;
    }
    updateYouTubeVideo(editingVideo.id, {
      ...editingVideo,
      youtubeId: cleanYtId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${cleanYtId}`
    });
    setEditingVideo(null);
  };

  const handleCreateNotice = (e) => {
    e.preventDefault();
    addNotice(newNoticeForm);
    setIsAddNoticeOpen(false);
    setNewNoticeForm({ title: '', category: 'Academic Notice', isUrgent: false, content: '' });
  };

  const handleSaveEditNotice = (e) => {
    e.preventDefault();
    if (!editingNotice) return;
    updateNotice(editingNotice.id, editingNotice);
    setEditingNotice(null);
  };

  const handleChangePin = (e) => {
    e.preventDefault();
    if (!changePinForm.currentPin) {
      showToast('Please enter your current PIN.', 'error');
      return;
    }
    if (changePinForm.newPin !== changePinForm.confirmPin) {
      showToast('New PIN and confirmation PIN do not match.', 'error');
      return;
    }
    if (changePinForm.newPin.length < 4) {
      showToast('New PIN must be at least 4 digits/characters.', 'error');
      return;
    }
    const success = updateAdminPin(changePinForm.currentPin, changePinForm.newPin);
    if (success) {
      setChangePinForm({ currentPin: '', newPin: '', confirmPin: '' });
    }
  };

  const handleFileUpload = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          importDataJSON(parsed);
        } catch (err) {
          showToast('Invalid JSON file format.', 'error');
        }
      };
    }
  };

  return (
    <div className="section" style={{ background: 'var(--bg-main)', minHeight: '90vh', paddingTop: '2.5rem' }}>
      <div className="container">
        {/* Admin Top Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div className="section-badge" style={{ marginBottom: '0.4rem' }}>
              <LayoutDashboard size={14} /> Teacher & Operations Command Center
            </div>
            <h2 style={{ fontSize: '1.9rem', letterSpacing: '-0.5px' }}>
              Institute Control & Academic Management
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-sm" onClick={() => setIsAddCourseOpen(true)}>
              <Plus size={16} /> Add Course
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setIsAddStudentOpen(true)}>
              <UserCheck size={16} color="var(--primary)" /> Enroll Student
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setIsAddVideoOpen(true)}>
              <Youtube size={16} color="var(--youtube-red)" /> Add YouTube Lecture
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setIsAddNoticeOpen(true)}>
              <Bell size={16} color="var(--accent)" /> Post Notice
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={logoutAdmin}
              style={{
                color: '#ef4444',
                borderColor: 'rgba(239, 68, 68, 0.4)',
                background: 'rgba(239, 68, 68, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
              title="Lock Admin Session and Return to Public Website"
            >
              <LogOut size={15} /> Lock Admin
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs Bar */}
        <div className="no-print" style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          {[
            { id: 'overview', label: 'Admin Overview', icon: LayoutDashboard },
            { id: 'courses', label: `Courses & Pricing (${courses.length})`, icon: GraduationCap, highlight: true },
            { id: 'youtube', label: `YouTube Hub (${videos.length})`, icon: Youtube, highlight: true },
            { id: 'students', label: `Student Roster (${students.length})`, icon: Users },
            { id: 'fees', label: 'Fees & Invoicing', icon: CreditCard },
            { id: 'idcards', label: 'ID Card Studio', icon: IdCard },
            { id: 'materials', label: `Study Materials (${studyMaterials.length})`, icon: FileText },
            { id: 'faculty', label: `Faculty & Mentors (${faculty.length})`, icon: Award },
            { id: 'rankers', label: `Toppers & Rankers (${rankers.length})`, icon: Trophy },
            { id: 'enquiries', label: `Leads & CRM (${enquiries.length})`, icon: BookOpen },
            { id: 'notices', label: `Notice Board (${notices.length})`, icon: Bell },
            { id: 'branding', label: 'Institute Branding', icon: Building2 },
            { id: 'settings', label: 'Data & Backup', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  borderRadius: 'var(--radius-full)',
                  padding: '0.5rem 1.15rem',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 4px 12px rgba(16, 185, 129, 0.25)' : 'none',
                  fontWeight: isActive ? 700 : 600
                }}
                onClick={() => setAdminTab(tab.id)}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: ADMIN OVERVIEW */}
        {/* ========================================================================= */}
        {adminTab === 'overview' && (
          <div>
            {/* KPI Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem'
            }}>
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Courses</span>
                  <div style={{ padding: '8px', background: 'var(--primary-light)', borderRadius: '8px', color: 'var(--primary)' }}>
                    <GraduationCap size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800 }}>{courses.length}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--success)', marginTop: '4px', fontWeight: 600 }}>
                  Avg Price: ₹{avgCoursePrice.toLocaleString()}
                </div>
              </div>

              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>YouTube Subscribers</span>
                  <div style={{ padding: '8px', background: 'rgba(255, 0, 0, 0.12)', borderRadius: '8px', color: 'var(--youtube-red)' }}>
                    <Youtube size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--youtube-red)' }}>
                  {coachingInfo.youtubeSubscribers}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {videos.length} Lectures in Catalog
                </div>
              </div>

              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Revenue Collected</span>
                  <div style={{ padding: '8px', background: 'var(--success-light)', borderRadius: '8px', color: 'var(--success)' }}>
                    <DollarSign size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success)' }}>
                  ₹{totalRevenue.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {transactions.length} verified receipts
                </div>
              </div>

              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pending Fee Balance</span>
                  <div style={{ padding: '8px', background: 'var(--warning-light)', borderRadius: '8px', color: 'var(--accent-hover)' }}>
                    <TrendingUp size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-hover)' }}>
                  ₹{totalDue.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Installments due
                </div>
              </div>
            </div>

            {/* Quick Management Shortcuts */}
            <div className="card" style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="var(--primary)" /> Teacher Operations Quick Launch
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <button
                  className="btn btn-secondary"
                  style={{ justifyContent: 'flex-start', padding: '1rem' }}
                  onClick={() => { setAdminTab('courses'); setCourseSubTab('quick-price'); }}
                >
                  <DollarSign size={20} color="var(--success)" />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700 }}>⚡ 1-Click Price Updater</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Quickly adjust course fees</div>
                  </div>
                </button>

                <button
                  className="btn btn-secondary"
                  style={{ justifyContent: 'flex-start', padding: '1rem' }}
                  onClick={() => setAdminTab('youtube')}
                >
                  <Youtube size={20} color="var(--youtube-red)" />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700 }}>YouTube Subscribers & Lectures</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Update real subscriber count & videos</div>
                  </div>
                </button>

                <button
                  className="btn btn-secondary"
                  style={{ justifyContent: 'flex-start', padding: '1rem' }}
                  onClick={() => setAdminTab('students')}
                >
                  <Users size={20} color="var(--secondary)" />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700 }}>Student Dossiers & Marks</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Update scores & attendance</div>
                  </div>
                </button>

                <button
                  className="btn btn-secondary"
                  style={{ justifyContent: 'flex-start', padding: '1rem' }}
                  onClick={() => setAdminTab('materials')}
                >
                  <FileText size={20} color="var(--accent)" />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700 }}>Study Material Library</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Upload notes and PDFs</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: COURSES & PRICING MANAGEMENT */}
        {/* ========================================================================= */}
        {adminTab === 'courses' && (
          <div>
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <GraduationCap size={22} color="var(--primary)" /> Academic Courses & Pricing Manager ({courses.length})
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                    Create new courses, edit titles, syllabus modules, batch timings, and modify course pricing in 1 click.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.65rem' }}>
                  <button className="btn btn-primary btn-sm" onClick={() => setIsAddCourseOpen(true)}>
                    <Plus size={16} /> Add New Course
                  </button>
                </div>
              </div>

              {/* Course Subtabs */}
              <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <button
                  className={`btn btn-sm ${courseSubTab === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderRadius: 'var(--radius-full)', padding: '0.4rem 1.1rem' }}
                  onClick={() => setCourseSubTab('all')}
                >
                  <BookOpen size={15} /> All Course Profiles ({courses.length})
                </button>
                <button
                  className={`btn btn-sm ${courseSubTab === 'quick-price' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderRadius: 'var(--radius-full)', padding: '0.4rem 1.1rem' }}
                  onClick={() => setCourseSubTab('quick-price')}
                >
                  <DollarSign size={15} /> ⚡ 1-Click Fast Price & Fee Updater
                </button>
              </div>
            </div>

            {/* SUB-VIEW 1: 1-CLICK FAST PRICE UPDATER */}
            {courseSubTab === 'quick-price' && (
              <div className="card">
                <div style={{ background: 'var(--bg-card-subtle)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <DollarSign size={18} /> Instant Course Fee Editor
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                    Type the new price and number of installments below, then click "Save Price". It will immediately update everywhere across the site!
                  </p>
                </div>

                <div className="table-responsive">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Course Program</th>
                        <th>Category</th>
                        <th>Current Price</th>
                        <th style={{ minWidth: '180px' }}>Set New Total Price (₹)</th>
                        <th style={{ minWidth: '140px' }}>Installments</th>
                        <th style={{ textAlign: 'right' }}>Save Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((c) => {
                        const draft = priceDrafts[c.id] || { totalFee: c.totalFee, installments: c.installments };
                        const hasChanged = draft.totalFee !== c.totalFee || draft.installments !== c.installments;
                        return (
                          <tr key={c.id}>
                            <td>
                              <div style={{ fontWeight: 700 }}>{c.title}</div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{c.duration} • {c.badge}</div>
                            </td>
                            <td>
                              <span className="badge badge-primary">{c.category}</span>
                            </td>
                            <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)' }}>
                              ₹{c.totalFee.toLocaleString()}
                            </td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontWeight: 700 }}>₹</span>
                                <input
                                  type="number"
                                  className="form-control"
                                  style={{ padding: '6px 10px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}
                                  value={draft.totalFee}
                                  onChange={(e) => {
                                    setPriceDrafts({
                                      ...priceDrafts,
                                      [c.id]: { ...draft, totalFee: Number(e.target.value) }
                                    });
                                  }}
                                />
                              </div>
                            </td>
                            <td>
                              <select
                                className="form-control"
                                style={{ padding: '6px 10px' }}
                                value={draft.installments}
                                onChange={(e) => {
                                  setPriceDrafts({
                                    ...priceDrafts,
                                    [c.id]: { ...draft, installments: Number(e.target.value) }
                                  });
                                }}
                              >
                                <option value={1}>1 (Full Pay)</option>
                                <option value={2}>2 Installments</option>
                                <option value={3}>3 Installments</option>
                                <option value={4}>4 Installments</option>
                                <option value={6}>6 Installments</option>
                              </select>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <button
                                className={`btn btn-sm ${hasChanged ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => handleQuickPriceSave(c.id)}
                                title="Apply Price Change"
                              >
                                <Save size={15} /> {hasChanged ? 'Save Price' : 'Updated'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SUB-VIEW 2: FULL COURSE PROFILES LIST */}
            {courseSubTab === 'all' && (
              <div className="card">
                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                  <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search courses by title, category, or target class..."
                    className="form-control"
                    style={{ paddingLeft: '44px' }}
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
                  {filteredCourses.map((c) => (
                    <div key={c.id} style={{
                      background: 'var(--bg-card-subtle)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <span className="badge badge-primary">{c.category}</span>
                        <span className="badge badge-success">{c.badge}</span>
                      </div>

                      <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', lineHeight: 1.35 }}>{c.title}</h4>
                      <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5, flex: 1 }}>
                        {c.description}
                      </p>

                      <div style={{ background: 'var(--bg-main)', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Duration & Mode:</span>
                          <span style={{ fontWeight: 600 }}>{c.duration} ({c.mode})</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Batch Timings:</span>
                          <span style={{ fontWeight: 600 }}>{c.batchTimings}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Fee</div>
                          <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--primary)' }}>
                            ₹{c.totalFee.toLocaleString()}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setEditingCourse(c)}
                            title="Edit Full Course Profile & Syllabus"
                          >
                            <Edit size={15} /> Edit
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{ color: 'var(--danger)' }}
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete course "${c.title}"?`)) {
                                deleteCourse(c.id);
                              }
                            }}
                            title="Delete Course"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: YOUTUBE MANAGEMENT & REAL SUBSCRIBER EDITOR (NEW & EXPANDED) */}
        {/* ========================================================================= */}
        {adminTab === 'youtube' && (
          <div>
            {/* Real Subscriber Count & Live Channel Details Editor Card */}
            <div className="card" style={{ marginBottom: '2rem', border: '1px solid rgba(255, 0, 0, 0.25)', background: 'var(--bg-card)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div className="section-badge" style={{ background: 'rgba(255, 0, 0, 0.1)', color: 'var(--youtube-red)', border: '1px solid rgba(255, 0, 0, 0.3)', marginBottom: '0.35rem' }}>
                    <Youtube size={14} /> Official YouTube Channel Controller
                  </div>
                  <h3 style={{ fontSize: '1.35rem' }}>Live Channel Info & Real Subscriber Settings</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Edit the exact subscriber count, channel handle, and YouTube link shown across the website.
                  </p>
                </div>

                <a
                  href={ytSettingsForm.youtubeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-youtube btn-sm"
                >
                  <Youtube size={16} /> Open Channel on YouTube <ExternalLink size={13} />
                </a>
              </div>

              <form onSubmit={handleSaveYtSettings}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '1.25rem',
                  marginBottom: '1.5rem'
                }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700, color: 'var(--youtube-red)' }}>
                      👥 Real Subscriber Count (Shows Everywhere) *
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="e.g. 1.25K Subscribers or 1,250"
                      value={ytSettingsForm.youtubeSubscribers}
                      onChange={(e) => setYtSettingsForm({ ...ytSettingsForm, youtubeSubscribers: e.target.value })}
                    />
                    <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '3px', display: 'block' }}>
                      Updates the Hero badge, YouTube Hub banner, and Footer counters live.
                    </small>
                  </div>

                  <div className="form-group">
                    <label className="form-label">YouTube Channel Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. UMA English Learnology"
                      value={ytSettingsForm.youtubeChannel}
                      onChange={(e) => setYtSettingsForm({ ...ytSettingsForm, youtubeChannel: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Channel Handle</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. @umaenglishlearnology"
                      value={ytSettingsForm.youtubeHandle}
                      onChange={(e) => setYtSettingsForm({ ...ytSettingsForm, youtubeHandle: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Total Video Views</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 48K+ Views"
                      value={ytSettingsForm.youtubeTotalViews}
                      onChange={(e) => setYtSettingsForm({ ...ytSettingsForm, youtubeTotalViews: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Official YouTube Channel Link *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="https://youtube.com/@umaenglishlearnology?si=..."
                      value={ytSettingsForm.youtubeLink}
                      onChange={(e) => setYtSettingsForm({ ...ytSettingsForm, youtubeLink: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="submit" className="btn btn-primary">
                    <Save size={16} /> Save YouTube Channel Details
                  </button>
                </div>
              </form>
            </div>

            {/* Video Lectures Catalog */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Youtube size={22} color="var(--youtube-red)" /> Video Lectures Catalog ({videos.length})
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Add, edit, or feature video lectures displayed in the video classroom.
                  </p>
                </div>

                <button className="btn btn-primary btn-sm" onClick={() => setIsAddVideoOpen(true)}>
                  <Plus size={16} /> Add New Video Lecture
                </button>
              </div>

              {/* Search */}
              <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search lectures by title, topic, or instructor..."
                  className="form-control"
                  style={{ paddingLeft: '44px' }}
                  value={videoSearch}
                  onChange={(e) => setVideoSearch(e.target.value)}
                />
              </div>

              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Video Lecture & Thumbnail</th>
                      <th>Subject / Topic</th>
                      <th>Instructor</th>
                      <th>Duration & Views</th>
                      <th>Featured</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVideos.map((v) => (
                      <tr key={v.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ position: 'relative', width: '70px', height: '42px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
                              <img src={v.thumbnail} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <div
                                onClick={() => setPlayingVideo(v)}
                                style={{
                                  position: 'absolute',
                                  inset: 0,
                                  background: 'rgba(0,0,0,0.3)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  color: '#fff'
                                }}
                              >
                                <PlayCircle size={18} />
                              </div>
                            </div>
                            <div style={{ maxWidth: '300px' }}>
                              <div style={{ fontWeight: 700, fontSize: '0.92rem', lineHeight: 1.3 }}>{v.title}</div>
                              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                                ID: {v.youtubeId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-primary">{v.category || v.subject}</span>
                        </td>
                        <td>{v.instructor}</td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{v.duration}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{v.views || '1.2K views'}</div>
                        </td>
                        <td>
                          <button
                            className={`btn btn-sm ${v.isFeatured ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                            onClick={() => toggleFeaturedVideo(v.id)}
                            title="Toggle Top Featured Status"
                          >
                            {v.isFeatured ? '★ Featured' : 'Standard'}
                          </button>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.35rem' }}>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => setPlayingVideo(v)}
                              title="Play Video"
                            >
                              <PlayCircle size={15} />
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => setEditingVideo(v)}
                              title="Edit Video Details"
                            >
                              <Edit size={15} />
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              style={{ color: 'var(--danger)' }}
                              onClick={() => {
                                if (window.confirm(`Delete video "${v.title}"?`)) {
                                  deleteYouTubeVideo(v.id);
                                }
                              }}
                              title="Delete Video"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: STUDENT DIRECTORY & DOSSIERS */}
        {/* ========================================================================= */}
        {adminTab === 'students' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={22} color="var(--primary)" /> Enrolled Students Directory ({students.length})
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  View dossiers, edit personal/parent info, record marks, and take 1-click attendance.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <button className="btn btn-primary btn-sm" onClick={() => setIsAddStudentOpen(true)}>
                  <Plus size={16} /> Enroll New Student
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search by student name, roll number, course, or batch..."
                  className="form-control"
                  style={{ paddingLeft: '44px' }}
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Fee:</span>
                {['All', 'Paid', 'Partial', 'Overdue'].map((status) => (
                  <button
                    key={status}
                    className={`btn btn-sm ${studentFeeFilter === status ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ borderRadius: 'var(--radius-full)', padding: '0.35rem 0.9rem', fontSize: '0.8rem' }}
                    onClick={() => setStudentFeeFilter(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Student Details</th>
                    <th>Roll No</th>
                    <th>Program & Batch</th>
                    <th>Attendance</th>
                    <th>Fee Balance</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s) => {
                    const balance = (Number(s.totalFee) || 0) - (Number(s.paidFee) || 0);
                    return (
                      <tr key={s.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary)', flexShrink: 0 }}>
                              <img src={s.photo} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{s.name}</div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                                {s.phone}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--primary)' }}>
                          {s.rollNo}
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{s.courseName}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.batch}</div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{s.attendancePercentage}%</span>
                            <button
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '2px 6px', fontSize: '0.72rem', color: 'var(--success)' }}
                              onClick={() => quickIncrementAttendance(s.id)}
                              title="Mark Present Today (+1 Day)"
                            >
                              +1 Day
                            </button>
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            {s.presentDays}/{s.totalDays} Days
                          </div>
                        </td>
                        <td>
                          <span className={`badge badge-${s.feeStatus === 'Paid' ? 'success' : (s.feeStatus === 'Partial' ? 'warning' : 'danger')}`}>
                            {s.feeStatus}
                          </span>
                          {balance > 0 && (
                            <div style={{ fontSize: '0.78rem', color: 'var(--accent-hover)', fontWeight: 700, marginTop: '2px' }}>
                              Due: ₹{balance.toLocaleString()}
                            </div>
                          )}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.35rem' }}>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => setViewingStudent(s)}
                              title="Open Full Academic Dossier & Marks"
                            >
                              <Eye size={15} /> Dossier
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => setEditingStudent(s)}
                              title="Edit All Details"
                            >
                              <Edit size={15} /> Edit
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              style={{ color: 'var(--danger)' }}
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to remove student ${s.name}?`)) {
                                  deleteStudent(s.id);
                                }
                              }}
                              title="Remove Student"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: FEES & INVOICING */}
        {/* ========================================================================= */}
        {adminTab === 'fees' && <FeeManagement />}

        {/* ========================================================================= */}
        {/* TAB 6: ID CARD STUDIO */}
        {/* ========================================================================= */}
        {adminTab === 'idcards' && <IDCardStudio />}

        {/* ========================================================================= */}
        {/* TAB 7: STUDY MATERIALS & DIGITAL LIBRARY */}
        {/* ========================================================================= */}
        {adminTab === 'materials' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={22} color="var(--primary)" /> Study Materials & PDF Notes Library ({studyMaterials.length})
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Upload chapter handouts, grammar cheat sheets, speaking drills, and practice PDFs.
                </p>
              </div>

              <button className="btn btn-primary btn-sm" onClick={() => setIsAddMaterialOpen(true)}>
                <Plus size={16} /> Upload New Material
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
              {studyMaterials.map((m) => (
                <div key={m.id} style={{
                  background: 'var(--bg-card-subtle)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <span className="badge badge-primary">{m.subject}</span>
                      <span className="badge badge-secondary">{m.type}</span>
                    </div>

                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', lineHeight: 1.35 }}>{m.title}</h4>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                      {m.description}
                    </p>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      📄 {m.pages} • 💾 {m.fileSize}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {m.isPremium ? '🔒 Enrolled Only' : '🌐 Public Access'}
                    </span>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditingMaterial(m)} title="Edit">
                        <Edit size={14} />
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ color: 'var(--danger)' }}
                        onClick={() => {
                          if (window.confirm(`Delete study material "${m.title}"?`)) {
                            deleteStudyMaterial(m.id);
                          }
                        }}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: FACULTY & MENTORS */}
        {/* ========================================================================= */}
        {adminTab === 'faculty' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={22} color="var(--primary)" /> Faculty & Master Mentors ({faculty.length})
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Manage teacher profiles, qualifications, bios, and quotes displayed on the public website.
                </p>
              </div>

              <button className="btn btn-primary btn-sm" onClick={() => setIsAddFacultyOpen(true)}>
                <Plus size={16} /> Add Faculty Member
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {faculty.map((f) => (
                <div key={f.id} style={{
                  background: 'var(--bg-card-subtle)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    margin: '0 auto 1rem',
                    border: '3px solid var(--primary-light)'
                  }}>
                    <img src={f.photo} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <h4 style={{ fontSize: '1.15rem', marginBottom: '2px' }}>{f.name}</h4>
                  <div style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '4px' }}>
                    {f.designation}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: 600 }}>
                    {f.qualification} • {f.experience}
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem', flex: 1 }}>
                    {f.bio}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingFaculty(f)}>
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ color: 'var(--danger)' }}
                      onClick={() => {
                        if (window.confirm(`Delete faculty "${f.name}"?`)) {
                          deleteFaculty(f.id);
                        }
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 9: TOPPERS & HALL OF FAME */}
        {/* ========================================================================= */}
        {adminTab === 'rankers' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Trophy size={22} color="var(--accent)" /> Toppers & Hall of Fame Achievers ({rankers.length})
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Manage top student selections, competitive exam ranks, and testimonials.
                </p>
              </div>

              <button className="btn btn-primary btn-sm" onClick={() => setIsAddRankerOpen(true)}>
                <Plus size={16} /> Add Ranker Story
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {rankers.map((r) => (
                <div key={r.id} style={{
                  background: 'var(--bg-card-subtle)',
                  padding: '1.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent)' }}>
                      <img src={r.photo} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', marginBottom: '2px' }}>{r.name}</h4>
                      <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 700 }}>{r.rank}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{r.exam} ({r.year})</div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '1rem', flex: 1 }}>
                    "{r.quote}"
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingRanker(r)}>
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ color: 'var(--danger)' }}
                      onClick={() => {
                        if (window.confirm(`Delete ranker "${r.name}"?`)) {
                          deleteRanker(r.id);
                        }
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 10: DEMO ENQUIRIES CRM */}
        {/* ========================================================================= */}
        {adminTab === 'enquiries' && (
          <div className="card">
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={22} color="var(--primary)" /> Admissions & Demo Enquiries Pipeline ({enquiries.length})
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Track prospective students who submitted demo class requests or contact queries.
            </p>

            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Lead Name</th>
                    <th>Contact Details</th>
                    <th>Program Interested</th>
                    <th>Date Received</th>
                    <th>Status Workflow</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq) => (
                    <tr key={enq.id}>
                      <td>
                        <div style={{ fontWeight: 700 }}>{enq.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{enq.targetClass}</div>
                      </td>
                      <td>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{enq.phone}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{enq.email}</div>
                      </td>
                      <td style={{ fontWeight: 600 }}>{enq.courseInterest}</td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{enq.date}</td>
                      <td>
                        <select
                          className="form-control"
                          style={{ padding: '4px 8px', fontSize: '0.82rem', width: 'auto' }}
                          value={enq.status}
                          onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                        >
                          <option value="New Lead">New Lead</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Demo Scheduled">Demo Scheduled</option>
                          <option value="Admitted">Admitted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                          <a
                            href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${enq.name}, thank you for inquiring about ${enq.courseInterest} at UMA Learnology. We would like to schedule your free demo class!`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-secondary btn-sm"
                            style={{ color: '#10b981' }}
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle size={15} />
                          </a>
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{ color: 'var(--danger)' }}
                            onClick={() => deleteEnquiry(enq.id)}
                            title="Remove Lead"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 11: NOTICE BOARD */}
        {/* ========================================================================= */}
        {adminTab === 'notices' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bell size={22} color="var(--accent)" /> Announcements & Notice Marquee ({notices.length})
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Notices are broadcast live on the top announcement ticker of the platform.
                </p>
              </div>

              <button className="btn btn-primary btn-sm" onClick={() => setIsAddNoticeOpen(true)}>
                <Plus size={16} /> Post Announcement
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {notices.map((n) => (
                <div key={n.id} style={{
                  background: 'var(--bg-card-subtle)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className="badge badge-primary">{n.category}</span>
                      {n.isUrgent && <span className="badge badge-danger">Urgent / Breaking</span>}
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{n.date}</span>
                    </div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{n.title}</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{n.content}</p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingNotice(n)}
                      title="Edit Notice Text"
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      className={`btn btn-sm ${n.isUrgent ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => toggleUrgentNotice(n.id)}
                    >
                      {n.isUrgent ? 'Priority High' : 'Normal'}
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ color: 'var(--danger)' }}
                      onClick={() => deleteNotice(n.id)}
                    >
                      <Trash2 size={15} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 12: INSTITUTE BRANDING & SETTINGS */}
        {/* ========================================================================= */}
        {adminTab === 'branding' && (
          <div className="card">
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={22} color="var(--primary)" /> Institute Profile & Official Branding
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
              Update institute name, contact numbers, email, physical address, and live student stats across the entire platform.
            </p>

            <form onSubmit={handleSaveBranding}>
              <div style={{ marginBottom: '1.5rem', background: 'var(--bg-card-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <ImageUploadInput
                  value={brandingForm.logo || ''}
                  onChange={(url) => setBrandingForm({ ...brandingForm, logo: url })}
                  label="Official Coaching Institute Logo (Displayed in Navbar, ID Cards & Footer)"
                  shape="rounded"
                  aspectRatio="1/1"
                  previewSize={72}
                  helperText="Upload official transparent PNG / WebP / JPG logo"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Institute Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={brandingForm.name || ''}
                    onChange={(e) => setBrandingForm({ ...brandingForm, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Brand Subtitle / Department</label>
                  <input
                    type="text"
                    className="form-control"
                    value={brandingForm.brandSubtitle || ''}
                    onChange={(e) => setBrandingForm({ ...brandingForm, brandSubtitle: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Official Tagline</label>
                  <input
                    type="text"
                    className="form-control"
                    value={brandingForm.tagline || ''}
                    onChange={(e) => setBrandingForm({ ...brandingForm, tagline: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Primary Contact Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={brandingForm.phone || ''}
                    onChange={(e) => setBrandingForm({ ...brandingForm, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Alternate Helpline / WhatsApp</label>
                  <input
                    type="text"
                    className="form-control"
                    value={brandingForm.altPhone || ''}
                    onChange={(e) => setBrandingForm({ ...brandingForm, altPhone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Admissions Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={brandingForm.email || ''}
                    onChange={(e) => setBrandingForm({ ...brandingForm, email: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Campus Physical Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={brandingForm.address || ''}
                    onChange={(e) => setBrandingForm({ ...brandingForm, address: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">YouTube Channel Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={brandingForm.youtubeChannel || ''}
                    onChange={(e) => setBrandingForm({ ...brandingForm, youtubeChannel: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">YouTube Subscribers Badge</label>
                  <input
                    type="text"
                    className="form-control"
                    value={brandingForm.youtubeSubscribers || ''}
                    onChange={(e) => setBrandingForm({ ...brandingForm, youtubeSubscribers: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">YouTube Link</label>
                  <input
                    type="text"
                    className="form-control"
                    value={brandingForm.youtubeLink || ''}
                    onChange={(e) => setBrandingForm({ ...brandingForm, youtubeLink: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} /> Save Institute Branding
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 13: DATA BACKUP & MAINTENANCE */}
        {/* ========================================================================= */}
        {adminTab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Security Passcode & Access Control Card */}
            <div className="card" style={{ border: '1px solid rgba(245, 158, 11, 0.35)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <KeyRound size={22} color="var(--accent)" /> Security & Admin Passcode Protection
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>
                    Protect your administrative dashboard, student dossiers, fee collection, and pricing tools from public access.
                  </p>
                </div>
                <div style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <ShieldCheck size={16} /> Passcode Protected Active
                </div>
              </div>

              <form onSubmit={handleChangePin} style={{ background: 'var(--bg-card-subtle)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '1rem', fontWeight: 700 }}>Change Security Passcode / PIN</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label">Current PIN / Passcode *</label>
                    <input
                      type="password"
                      required
                      className="form-control"
                      placeholder="e.g. 2026"
                      value={changePinForm.currentPin}
                      onChange={(e) => setChangePinForm({ ...changePinForm, currentPin: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">New PIN / Passcode *</label>
                    <input
                      type="password"
                      required
                      className="form-control"
                      placeholder="Enter new 4+ digit PIN..."
                      value={changePinForm.newPin}
                      onChange={(e) => setChangePinForm({ ...changePinForm, newPin: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm New PIN *</label>
                    <input
                      type="password"
                      required
                      className="form-control"
                      placeholder="Re-enter new PIN..."
                      value={changePinForm.confirmPin}
                      onChange={(e) => setChangePinForm({ ...changePinForm, confirmPin: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    💡 Tip: Store your passcode safely. Default passcode upon reset is <strong>2026</strong>.
                  </span>
                  <button type="submit" className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Save size={15} /> Update Admin PIN
                  </button>
                </div>
              </form>
            </div>

            {/* System Backup & Data Persistence Card */}
            <div className="card">
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings size={22} color="var(--primary)" /> System Backup & Data Persistence
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Export complete platform data (students, courses, prices, faculty, materials, transactions) as JSON, restore from file, or reset to initial default state.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: 'var(--bg-card-subtle)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Download size={18} color="var(--primary)" /> Export Full System Backup
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    Download a JSON backup with all student dossiers, updated course prices, and records.
                  </p>
                  <button className="btn btn-primary btn-sm" onClick={exportDataJSON}>
                    <Download size={16} /> Export JSON File
                  </button>
                </div>

                <div style={{ background: 'var(--bg-card-subtle)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Upload size={18} color="var(--secondary)" /> Import JSON Backup
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    Restore courses, prices, and student profiles from a previously exported backup file.
                  </p>
                  <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', display: 'inline-flex' }}>
                    <Upload size={16} /> Upload JSON Backup
                    <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
                  </label>
                </div>

                <div style={{ background: 'var(--bg-card-subtle)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--danger)' }}>
                    <RotateCcw size={18} /> Reset to Demo State
                  </h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                    Clear localStorage and restore all initial courses and student records.
                  </p>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ color: 'var(--danger)', borderColor: 'var(--danger-border)' }}
                    onClick={() => {
                      if (window.confirm('Reset all demo data to initial factory state?')) {
                        resetDataToDefault();
                      }
                    }}
                  >
                    <RotateCcw size={16} /> Reset Everything
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: ADD NEW COURSE */}
      {/* ========================================================================= */}
      {isAddCourseOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddCourseOpen(false)}>
          <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GraduationCap size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.25rem' }}>Create New Academic Program</h3>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setIsAddCourseOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateCourse}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Course Title *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="e.g. Master Spoken English & Fluency Bootcamp"
                      value={newCourseForm.title}
                      onChange={(e) => setNewCourseForm({ ...newCourseForm, title: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="form-control"
                      value={newCourseForm.category}
                      onChange={(e) => setNewCourseForm({ ...newCourseForm, category: e.target.value })}
                    >
                      <option value="English & Communication">English & Communication</option>
                      <option value="Competitive Exams">Competitive Exams</option>
                      <option value="Global English">Global English</option>
                      <option value="School Academics">School Academics</option>
                      <option value="Corporate Training">Corporate Training</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Total Course Fee / Price (₹) *</label>
                    <input
                      type="number"
                      required
                      className="form-control"
                      placeholder="18000"
                      value={newCourseForm.totalFee}
                      onChange={(e) => setNewCourseForm({ ...newCourseForm, totalFee: Number(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Installments Allowed</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="2"
                      value={newCourseForm.installments}
                      onChange={(e) => setNewCourseForm({ ...newCourseForm, installments: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 3 Months Intensive"
                      value={newCourseForm.duration}
                      onChange={(e) => setNewCourseForm({ ...newCourseForm, duration: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mode</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Hybrid (Live Classes + Audio Lab)"
                      value={newCourseForm.mode}
                      onChange={(e) => setNewCourseForm({ ...newCourseForm, mode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Target Audience / Class</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. College Students, Job Seekers"
                      value={newCourseForm.targetClass}
                      onChange={(e) => setNewCourseForm({ ...newCourseForm, targetClass: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Badge</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Bestseller / 95%+ Target"
                      value={newCourseForm.badge}
                      onChange={(e) => setNewCourseForm({ ...newCourseForm, badge: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Course Description</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    placeholder="Comprehensive program overview..."
                    value={newCourseForm.description}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, description: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Batch Timings & Schedule</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Morning (7:30 AM - 9:00 AM) | Evening (6:30 PM - 8:00 PM)"
                    value={newCourseForm.batchTimings}
                    onChange={(e) => setNewCourseForm({ ...newCourseForm, batchTimings: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddCourseOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Sparkles size={16} /> Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: EDIT COURSE & SYLLABUS */}
      {/* ========================================================================= */}
      {editingCourse && (
        <div className="modal-backdrop" onClick={() => setEditingCourse(null)}>
          <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.25rem' }}>Edit Course: {editingCourse.title}</h3>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setEditingCourse(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEditCourse}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Course Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingCourse.title}
                      onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="form-control"
                      value={editingCourse.category}
                      onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
                    >
                      <option value="English & Communication">English & Communication</option>
                      <option value="Competitive Exams">Competitive Exams</option>
                      <option value="Global English">Global English</option>
                      <option value="School Academics">School Academics</option>
                      <option value="Corporate Training">Corporate Training</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Total Fee (₹ Price)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editingCourse.totalFee}
                      onChange={(e) => setEditingCourse({ ...editingCourse, totalFee: Number(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Installments Allowed</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editingCourse.installments}
                      onChange={(e) => setEditingCourse({ ...editingCourse, installments: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingCourse.duration}
                      onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Badge Tag</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingCourse.badge}
                      onChange={(e) => setEditingCourse({ ...editingCourse, badge: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Batch Timings</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingCourse.batchTimings}
                    onChange={(e) => setEditingCourse({ ...editingCourse, batchTimings: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    value={editingCourse.description}
                    onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingCourse(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} /> Save Course Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ENROLL NEW STUDENT */}
      {/* ========================================================================= */}
      {isAddStudentOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddStudentOpen(false)}>
          <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserCheck size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.25rem' }}>Enroll New Student</h3>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setIsAddStudentOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateStudent}>
              <div className="modal-body">
                <ImageUploadInput
                  value={newStudentForm.photo || ''}
                  onChange={(url) => setNewStudentForm({ ...newStudentForm, photo: url })}
                  label="Student Profile Photo (Direct Device Upload / Camera)"
                  presets={avatarPresets}
                />

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="e.g. Vikas Gupta"
                      value={newStudentForm.name}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Roll Number (Leave blank to auto-generate)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. UMA-108"
                      value={newStudentForm.rollNo}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, rollNo: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Student Phone Number *</label>
                    <input
                      type="tel"
                      required
                      className="form-control"
                      placeholder="+91 98765 00000"
                      value={newStudentForm.phone}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Student Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="student@gmail.com"
                      value={newStudentForm.email}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Academic Program / Course</label>
                    <select
                      className="form-control"
                      value={newStudentForm.courseId}
                      onChange={(e) => {
                        const selected = courses.find(c => c.id === e.target.value);
                        setNewStudentForm({
                          ...newStudentForm,
                          courseId: e.target.value,
                          totalFee: selected ? selected.totalFee : newStudentForm.totalFee
                        });
                      }}
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title} (₹{c.totalFee.toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Assigned Batch</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Fluency Achievers (Morning)"
                      value={newStudentForm.batch}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, batch: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Parent / Guardian Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Parent Name"
                      value={newStudentForm.parentName}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, parentName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Parent WhatsApp / Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="+91 98000 00000"
                      value={newStudentForm.parentPhone}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, parentPhone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Total Fee (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newStudentForm.totalFee}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, totalFee: Number(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Initial Paid Deposit (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newStudentForm.paidFee}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, paidFee: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddStudentOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Sparkles size={16} /> Complete Admission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: EDIT STUDENT FULL PROFILE */}
      {/* ========================================================================= */}
      {editingStudent && (
        <div className="modal-backdrop" onClick={() => setEditingStudent(null)}>
          <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.25rem' }}>Edit Student: {editingStudent.name}</h3>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setEditingStudent(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEditStudent}>
              <div className="modal-body">
                {/* Photo avatar direct upload form */}
                <ImageUploadInput
                  value={editingStudent.photo || ''}
                  onChange={(url) => setEditingStudent({ ...editingStudent, photo: url })}
                  label="Student Profile Photo (Direct Device Upload / Camera)"
                  presets={avatarPresets}
                />

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingStudent.name}
                      onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Roll Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingStudent.rollNo}
                      onChange={(e) => setEditingStudent({ ...editingStudent, rollNo: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={editingStudent.phone}
                      onChange={(e) => setEditingStudent({ ...editingStudent, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={editingStudent.email || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Enrolled Program</label>
                    <select
                      className="form-control"
                      value={editingStudent.courseId || courses[0]?.id}
                      onChange={(e) => {
                        const sel = courses.find(c => c.id === e.target.value);
                        setEditingStudent({
                          ...editingStudent,
                          courseId: e.target.value,
                          courseName: sel ? sel.title : editingStudent.courseName
                        });
                      }}
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Batch</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingStudent.batch}
                      onChange={(e) => setEditingStudent({ ...editingStudent, batch: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Parent Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingStudent.parentName || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, parentName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Parent Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={editingStudent.parentPhone || ''}
                      onChange={(e) => setEditingStudent({ ...editingStudent, parentPhone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Total Fee (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editingStudent.totalFee}
                      onChange={(e) => setEditingStudent({ ...editingStudent, totalFee: Number(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Paid Fee (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editingStudent.paidFee}
                      onChange={(e) => setEditingStudent({ ...editingStudent, paidFee: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Teacher's Remarks / Confidential Notes</label>
                  <textarea
                    rows={2}
                    className="form-control"
                    value={editingStudent.teacherRemarks || ''}
                    onChange={(e) => setEditingStudent({ ...editingStudent, teacherRemarks: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingStudent(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} /> Save Student Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: FULL STUDENT DOSSIER & MARKS LOGGER */}
      {/* ========================================================================= */}
      {viewingStudent && (
        <div className="modal-backdrop" onClick={() => setViewingStudent(null)}>
          <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.25rem' }}>Student Academic Dossier: {viewingStudent.name}</h3>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setViewingStudent(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {/* Top Profile Card */}
              <div style={{
                background: 'var(--bg-card-subtle)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                marginBottom: '1.5rem',
                border: '1px solid var(--border-color)',
                flexWrap: 'wrap'
              }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--primary)', flexShrink: 0 }}>
                  <img src={viewingStudent.photo} alt={viewingStudent.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <h3 style={{ fontSize: '1.3rem' }}>{viewingStudent.name}</h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--primary)', background: 'var(--primary-light)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                      {viewingStudent.rollNo}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                    {viewingStudent.courseName} • {viewingStudent.batch}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    📞 {viewingStudent.phone} • ✉️ {viewingStudent.email}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`badge badge-${viewingStudent.feeStatus === 'Paid' ? 'success' : (viewingStudent.feeStatus === 'Partial' ? 'warning' : 'danger')}`}>
                    Fee {viewingStudent.feeStatus}
                  </span>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, marginTop: '4px' }}>
                    Paid: ₹{(viewingStudent.paidFee || 0).toLocaleString()} / ₹{(viewingStudent.totalFee || 0).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Attendance & Performance Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--bg-card-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Attendance Record</span>
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '2px 8px', fontSize: '0.75rem', color: 'var(--success)' }}
                      onClick={() => {
                        quickIncrementAttendance(viewingStudent.id);
                        const updated = students.find(s => s.id === viewingStudent.id);
                        if (updated) setViewingStudent(updated);
                      }}
                    >
                      +1 Present Day
                    </button>
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{viewingStudent.attendancePercentage}%</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {viewingStudent.presentDays} days present out of {viewingStudent.totalDays} sessions
                  </div>
                </div>

                <div style={{ background: 'var(--bg-card-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Teacher Observation / Remarks</span>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginTop: '8px', lineHeight: 1.5, fontStyle: 'italic' }}>
                    "{viewingStudent.teacherRemarks || 'Consistent learner with good participation.'}"
                  </p>
                </div>
              </div>

              {/* Test Performance & Add Marks Form */}
              <div style={{ background: 'var(--bg-card-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award size={18} color="var(--primary)" /> Academic Assessments & Test Scores
                </h4>

                <form onSubmit={handleAddTestScoreSubmit} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Assessment Name (e.g. Mock Speaking Test)"
                    className="form-control"
                    style={{ flex: 2, minWidth: '180px' }}
                    value={newTestForm.test}
                    onChange={(e) => setNewTestForm({ ...newTestForm, test: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Score (e.g. 92)"
                    className="form-control"
                    style={{ flex: 1, minWidth: '90px' }}
                    value={newTestForm.score}
                    onChange={(e) => setNewTestForm({ ...newTestForm, score: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="form-control"
                    style={{ width: '80px' }}
                    value={newTestForm.max}
                    onChange={(e) => setNewTestForm({ ...newTestForm, max: Number(e.target.value) })}
                  />
                  <button type="submit" className="btn btn-primary btn-sm">
                    <Plus size={15} /> Add Test Score
                  </button>
                </form>

                <div className="table-responsive">
                  <table className="custom-table" style={{ fontSize: '0.85rem' }}>
                    <thead>
                      <tr>
                        <th>Test / Assessment</th>
                        <th>Score</th>
                        <th>Max</th>
                        <th>Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(viewingStudent.performanceScores || [{ test: 'Enrollment Assessment', score: 85, max: 100 }]).map((t, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 600 }}>{t.test}</td>
                          <td style={{ fontWeight: 800, color: 'var(--primary)' }}>{t.score}</td>
                          <td>{t.max || 100}</td>
                          <td>
                            <span className="badge badge-success">
                              {Math.round(((t.score) / (t.max || 100)) * 100)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedStudentId(viewingStudent.id);
                  setViewingStudent(null);
                  setCurrentView('id-studio');
                }}
              >
                <IdCard size={16} /> Open in ID Studio
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setEditingStudent(viewingStudent);
                  setViewingStudent(null);
                }}
              >
                <Edit size={16} /> Edit Student Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: ADD STUDY MATERIAL */}
      {/* ========================================================================= */}
      {isAddMaterialOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddMaterialOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.25rem' }}>Upload Study Material</h3>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setIsAddMaterialOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateMaterial}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Material Title *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. 100 Golden Rules of English Grammar"
                    value={newMaterialForm.title}
                    onChange={(e) => setNewMaterialForm({ ...newMaterialForm, title: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. English Grammar"
                      value={newMaterialForm.subject}
                      onChange={(e) => setNewMaterialForm({ ...newMaterialForm, subject: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Document Type</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. PDF Handout / Cheat Sheet"
                      value={newMaterialForm.type}
                      onChange={(e) => setNewMaterialForm({ ...newMaterialForm, type: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Pages / Length</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 32 Pages"
                      value={newMaterialForm.pages}
                      onChange={(e) => setNewMaterialForm({ ...newMaterialForm, pages: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Access Level</label>
                    <select
                      className="form-control"
                      value={newMaterialForm.isPremium ? 'enrolled' : 'public'}
                      onChange={(e) => setNewMaterialForm({ ...newMaterialForm, isPremium: e.target.value === 'enrolled' })}
                    >
                      <option value="enrolled">Enrolled Students Only</option>
                      <option value="public">Free Public Access</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description / Summary</label>
                  <textarea
                    rows={2}
                    className="form-control"
                    placeholder="Brief description of the material..."
                    value={newMaterialForm.description}
                    onChange={(e) => setNewMaterialForm({ ...newMaterialForm, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddMaterialOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Upload size={16} /> Upload to Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 7: ADD FACULTY MEMBER */}
      {/* ========================================================================= */}
      {isAddFacultyOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddFacultyOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.25rem' }}>Add Faculty Member</h3>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setIsAddFacultyOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateFaculty}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Faculty Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={newFacultyForm.name}
                    onChange={(e) => setNewFacultyForm({ ...newFacultyForm, name: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Designation / Role</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Master Language Coach"
                      value={newFacultyForm.designation}
                      onChange={(e) => setNewFacultyForm({ ...newFacultyForm, designation: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Qualifications</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. M.A. English, CELTA Certified"
                      value={newFacultyForm.qualification}
                      onChange={(e) => setNewFacultyForm({ ...newFacultyForm, qualification: e.target.value })}
                    />
                  </div>
                </div>

                <ImageUploadInput
                  value={newFacultyForm.photo}
                  onChange={(url) => setNewFacultyForm({ ...newFacultyForm, photo: url })}
                  label="Faculty Mentor Profile Photo"
                />

                <div className="form-group">
                  <label className="form-label">Bio</label>
                  <textarea
                    rows={2}
                    className="form-control"
                    value={newFacultyForm.bio}
                    onChange={(e) => setNewFacultyForm({ ...newFacultyForm, bio: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Inspirational Quote</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newFacultyForm.quote}
                    onChange={(e) => setNewFacultyForm({ ...newFacultyForm, quote: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddFacultyOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} /> Add Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 7.5: ADD TOPPER / RANKER STORY */}
      {/* ========================================================================= */}
      {isAddRankerOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddRankerOpen(false)}>
          <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Trophy size={20} color="var(--accent)" />
                <h3 style={{ fontSize: '1.25rem' }}>Add Topper / Ranker Story</h3>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setIsAddRankerOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateRanker}>
              <div className="modal-body">
                <ImageUploadInput
                  value={newRankerForm.photo}
                  onChange={(url) => setNewRankerForm({ ...newRankerForm, photo: url })}
                  label="Student Achiever Photo"
                />

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Student Name *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="e.g. Priya Sharma"
                      value={newRankerForm.name}
                      onChange={(e) => setNewRankerForm({ ...newRankerForm, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Rank / Score Achieved *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="e.g. AIR 24 (SSC CGL) or Band 8.5"
                      value={newRankerForm.rank}
                      onChange={(e) => setNewRankerForm({ ...newRankerForm, rank: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Exam Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. SSC CGL / IELTS / NDA"
                      value={newRankerForm.exam}
                      onChange={(e) => setNewRankerForm({ ...newRankerForm, exam: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Year</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 2025"
                      value={newRankerForm.year}
                      onChange={(e) => setNewRankerForm({ ...newRankerForm, year: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Testimonial / Student Quote</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    placeholder="Student's experience at UMA Learnology..."
                    value={newRankerForm.quote}
                    onChange={(e) => setNewRankerForm({ ...newRankerForm, quote: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddRankerOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} /> Publish Ranker Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 8: ADD NEW YOUTUBE VIDEO LECTURE */}
      {/* ========================================================================= */}
      {isAddVideoOpen && (
        <div className="modal-backdrop" onClick={() => setIsAddVideoOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Youtube size={20} color="var(--youtube-red)" />
                <h3 style={{ fontSize: '1.25rem' }}>Add YouTube Masterclass Lecture</h3>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setIsAddVideoOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateVideo}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Lecture Title *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Master Tenses & Passive Voice in 60 Minutes"
                    value={newVideoForm.title}
                    onChange={(e) => setNewVideoForm({ ...newVideoForm, title: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">YouTube Video Link or ID *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="Paste https://youtu.be/... or ID"
                      value={newVideoForm.youtubeId}
                      onChange={(e) => setNewVideoForm({ ...newVideoForm, youtubeId: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject / Category</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. English Grammar"
                      value={newVideoForm.category}
                      onChange={(e) => setNewVideoForm({ ...newVideoForm, category: e.target.value, subject: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Instructor Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Uma Nandini Ma'am"
                      value={newVideoForm.instructor}
                      onChange={(e) => setNewVideoForm({ ...newVideoForm, instructor: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 1h 15m"
                      value={newVideoForm.duration}
                      onChange={(e) => setNewVideoForm({ ...newVideoForm, duration: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Views Badge</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 2.4K views"
                      value={newVideoForm.views}
                      onChange={(e) => setNewVideoForm({ ...newVideoForm, views: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', marginTop: '1.75rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600 }}>
                      <input
                        type="checkbox"
                        checked={newVideoForm.isFeatured}
                        onChange={(e) => setNewVideoForm({ ...newVideoForm, isFeatured: e.target.checked })}
                      />
                      Feature on Top Player Banner
                    </label>
                  </div>
                </div>

                <ImageUploadInput
                  value={newVideoForm.thumbnail}
                  onChange={(url) => setNewVideoForm({ ...newVideoForm, thumbnail: url })}
                  label="Lecture Video Thumbnail (Device Upload or Web URL)"
                  shape="rounded"
                  aspectRatio="16/9"
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddVideoOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} /> Add to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 9: EDIT EXISTING YOUTUBE VIDEO LECTURE */}
      {/* ========================================================================= */}
      {editingVideo && (
        <div className="modal-backdrop" onClick={() => setEditingVideo(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit size={20} color="var(--youtube-red)" />
                <h3 style={{ fontSize: '1.25rem' }}>Edit Video Lecture: {editingVideo.title}</h3>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setEditingVideo(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEditVideo}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Lecture Title *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={editingVideo.title}
                    onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">YouTube Video Link or ID *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={editingVideo.youtubeId}
                      onChange={(e) => setEditingVideo({ ...editingVideo, youtubeId: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject / Category</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingVideo.category || editingVideo.subject || ''}
                      onChange={(e) => setEditingVideo({ ...editingVideo, category: e.target.value, subject: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Instructor Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingVideo.instructor}
                      onChange={(e) => setEditingVideo({ ...editingVideo, instructor: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingVideo.duration}
                      onChange={(e) => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Views Badge</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingVideo.views || ''}
                      onChange={(e) => setEditingVideo({ ...editingVideo, views: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', marginTop: '1.75rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600 }}>
                      <input
                        type="checkbox"
                        checked={editingVideo.isFeatured || false}
                        onChange={(e) => setEditingVideo({ ...editingVideo, isFeatured: e.target.checked })}
                      />
                      Feature on Top Player Banner
                    </label>
                  </div>
                </div>

                <ImageUploadInput
                  value={editingVideo.thumbnail}
                  onChange={(url) => setEditingVideo({ ...editingVideo, thumbnail: url })}
                  label="Lecture Video Thumbnail (Device Upload or Web URL)"
                  shape="rounded"
                  aspectRatio="16/9"
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingVideo(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} /> Save Video Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 11: EDIT FACULTY MEMBER */}
      {/* ========================================================================= */}
      {editingFaculty && (
        <div className="modal-backdrop" onClick={() => setEditingFaculty(null)}>
          <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.25rem' }}>Edit Faculty Profile: {editingFaculty.name}</h3>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setEditingFaculty(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEditFaculty}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Faculty Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={editingFaculty.name || ''}
                    onChange={(e) => setEditingFaculty({ ...editingFaculty, name: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Designation / Role</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingFaculty.designation || ''}
                      onChange={(e) => setEditingFaculty({ ...editingFaculty, designation: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Qualifications</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingFaculty.qualification || ''}
                      onChange={(e) => setEditingFaculty({ ...editingFaculty, qualification: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Experience</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingFaculty.experience || ''}
                    onChange={(e) => setEditingFaculty({ ...editingFaculty, experience: e.target.value })}
                  />
                </div>

                <ImageUploadInput
                  value={editingFaculty.photo || ''}
                  onChange={(url) => setEditingFaculty({ ...editingFaculty, photo: url })}
                  label="Faculty Mentor Profile Photo"
                />

                <div className="form-group">
                  <label className="form-label">Bio Summary</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    value={editingFaculty.bio || ''}
                    onChange={(e) => setEditingFaculty({ ...editingFaculty, bio: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Inspirational Quote</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingFaculty.quote || ''}
                    onChange={(e) => setEditingFaculty({ ...editingFaculty, quote: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingFaculty(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} /> Save Faculty Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 12: EDIT TOPPER / RANKER STORY */}
      {/* ========================================================================= */}
      {editingRanker && (
        <div className="modal-backdrop" onClick={() => setEditingRanker(null)}>
          <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit size={20} color="var(--accent)" />
                <h3 style={{ fontSize: '1.25rem' }}>Edit Ranker Story: {editingRanker.name}</h3>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setEditingRanker(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEditRanker}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Student Name *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={editingRanker.name || ''}
                      onChange={(e) => setEditingRanker({ ...editingRanker, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Rank / Score Achieved *</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      value={editingRanker.rank || ''}
                      onChange={(e) => setEditingRanker({ ...editingRanker, rank: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Exam Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingRanker.exam || ''}
                      onChange={(e) => setEditingRanker({ ...editingRanker, exam: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Year</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingRanker.year || ''}
                      onChange={(e) => setEditingRanker({ ...editingRanker, year: e.target.value })}
                    />
                  </div>
                </div>

                <ImageUploadInput
                  value={editingRanker.photo || ''}
                  onChange={(url) => setEditingRanker({ ...editingRanker, photo: url })}
                  label="Student Achiever Photo"
                />

                <div className="form-group">
                  <label className="form-label">Testimonial / Student Quote</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    value={editingRanker.quote || ''}
                    onChange={(e) => setEditingRanker({ ...editingRanker, quote: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingRanker(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} /> Save Ranker Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 13: EDIT STUDY MATERIAL */}
      {/* ========================================================================= */}
      {editingMaterial && (
        <div className="modal-backdrop" onClick={() => setEditingMaterial(null)}>
          <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.25rem' }}>Edit Study Material: {editingMaterial.title}</h3>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setEditingMaterial(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEditMaterial}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Material Title *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={editingMaterial.title || ''}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, title: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingMaterial.subject || ''}
                      onChange={(e) => setEditingMaterial({ ...editingMaterial, subject: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Document Type</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingMaterial.type || ''}
                      onChange={(e) => setEditingMaterial({ ...editingMaterial, type: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Pages / Length</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingMaterial.pages || ''}
                      onChange={(e) => setEditingMaterial({ ...editingMaterial, pages: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Access Level</label>
                    <select
                      className="form-control"
                      value={editingMaterial.isPremium ? 'enrolled' : 'public'}
                      onChange={(e) => setEditingMaterial({ ...editingMaterial, isPremium: e.target.value === 'enrolled' })}
                    >
                      <option value="enrolled">Enrolled Students Only</option>
                      <option value="public">Free Public Access</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description / Summary</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    value={editingMaterial.description || ''}
                    onChange={(e) => setEditingMaterial({ ...editingMaterial, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingMaterial(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} /> Save Material Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 14: EDIT NOTICE */}
      {/* ========================================================================= */}
      {editingNotice && (
        <div className="modal-backdrop" onClick={() => setEditingNotice(null)}>
          <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit size={20} color="var(--accent)" />
                <h3 style={{ fontSize: '1.25rem' }}>Edit Notice: {editingNotice.title}</h3>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setEditingNotice(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEditNotice}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Notice Headline *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={editingNotice.title || ''}
                    onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="form-control"
                      value={editingNotice.category || 'Academic Notice'}
                      onChange={(e) => setEditingNotice({ ...editingNotice, category: e.target.value })}
                    >
                      <option value="Academic Notice">Academic Notice</option>
                      <option value="Scholarship">Scholarship</option>
                      <option value="Exam Alert">Exam Alert</option>
                      <option value="Workshop">Workshop</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', marginTop: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600 }}>
                      <input
                        type="checkbox"
                        checked={editingNotice.isUrgent || false}
                        onChange={(e) => setEditingNotice({ ...editingNotice, isUrgent: e.target.checked })}
                      />
                      Mark as Urgent / Breaking Marquee
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Notice Details</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    value={editingNotice.content || ''}
                    onChange={(e) => setEditingNotice({ ...editingNotice, content: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingNotice(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} /> Save Notice Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
