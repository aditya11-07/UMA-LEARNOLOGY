import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Toast } from './components/Toast';
import { InstallAppBanner } from './components/InstallAppBanner';
import { AnnouncementTicker } from './components/public/AnnouncementTicker';
import { HeroSection } from './components/public/HeroSection';
import { CoursesSection } from './components/public/CoursesSection';
import { YouTubeHub } from './components/public/YouTubeHub';
import { FeeCalculator } from './components/public/FeeCalculator';
import { FacultyAndRankers } from './components/public/FacultyAndRankers';
import { StudyMaterialPublic } from './components/public/StudyMaterialPublic';
import { FAQSection } from './components/public/FAQSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { AdmissionModal } from './components/public/AdmissionModal';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { EditHeroModal } from './components/public/EditHeroModal';
import { EditFaqModal } from './components/public/EditFaqModal';
import { EditContactModal } from './components/public/EditContactModal';
import { QuickNoticeModal } from './components/public/QuickNoticeModal';
import { EditAdmissionModal } from './components/public/EditAdmissionModal';
import { TeacherLiveBar } from './components/public/TeacherLiveBar';
import { IDCardStudio } from './components/idcard/IDCardStudio';
import { FeeManagement } from './components/fees/FeeManagement';
import { StudentPortal } from './components/student/StudentPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Lock, KeyRound, ArrowRight } from './components/Icons';

function LockedAdminScreen() {
  const { setIsAdminAuthModalOpen, setCurrentView } = useApp();

  return (
    <div style={{
      minHeight: '75vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'var(--bg-main)'
    }}>
      <div className="card" style={{
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        padding: '2.5rem 2rem',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(245, 158, 11, 0.35)',
        background: 'var(--bg-card)',
        boxShadow: 'var(--shadow-xl)'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem',
          boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4)'
        }}>
          <Lock size={34} color="#000" strokeWidth={2.5} />
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Restricted Area
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
          This section contains private student academic records, fee collection tools, and administrative settings. Please enter the authorized Admin Passcode to continue.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentView('public')}
          >
            Back to Public Website
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setIsAdminAuthModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <KeyRound size={16} />
            <span>Enter Passcode</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function MainApp() {
  const {
    currentView,
    isAdminAuthenticated,
    isEditHeroModalOpen,
    setIsEditHeroModalOpen,
    isEditFaqModalOpen,
    setIsEditFaqModalOpen,
    editingFaq,
    isEditContactModalOpen,
    setIsEditContactModalOpen,
    isQuickNoticeModalOpen,
    setIsQuickNoticeModalOpen,
    isEditAdmissionModalOpen,
    setIsEditAdmissionModalOpen
  } = useApp();

  // Register PWA Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('[PWA] Service Worker registered with scope:', reg.scope);
          })
          .catch((err) => {
            console.warn('[PWA] Service Worker registration failed:', err);
          });
      });
    }
  }, []);

  return (
    <div className="app-container">
      {/* Toast Notification Container */}
      <Toast />

      {/* Floating PWA Install Prompt Banner */}
      <InstallAppBanner />

      {/* Breaking Announcements Ticker on Top */}
      <AnnouncementTicker onOpenNoticeEdit={() => setIsQuickNoticeModalOpen(true)} />

      {/* Main Navbar */}
      <Navbar />

      {/* View Routing */}
      <main className="main-content">
        {currentView === 'public' && (
          <>
            <HeroSection />
            <CoursesSection />
            <YouTubeHub />
            <FeeCalculator />
            <FacultyAndRankers />
            <StudyMaterialPublic />
            <FAQSection />
            <ContactSection />
          </>
        )}

        {currentView === 'youtube-hub' && <YouTubeHub />}
        {currentView === 'fees-hub' && (isAdminAuthenticated ? <FeeManagement /> : <LockedAdminScreen />)}
        {currentView === 'id-studio' && (isAdminAuthenticated ? <IDCardStudio /> : <LockedAdminScreen />)}
        {currentView === 'student-portal' && <StudentPortal />}
        {currentView === 'admin' && (isAdminAuthenticated ? <AdminDashboard /> : <LockedAdminScreen />)}
      </main>

      {/* Global Interactive Modals */}
      <AdmissionModal />
      <AdminAuthModal />

      {/* Teacher Live Edit Modals (accessible when authenticated) */}
      <EditHeroModal
        isOpen={isEditHeroModalOpen}
        onClose={() => setIsEditHeroModalOpen(false)}
      />
      <EditFaqModal
        isOpen={isEditFaqModalOpen}
        faq={editingFaq}
        onClose={() => setIsEditFaqModalOpen(false)}
      />
      <EditContactModal
        isOpen={isEditContactModalOpen}
        onClose={() => setIsEditContactModalOpen(false)}
      />
      <QuickNoticeModal
        isOpen={isQuickNoticeModalOpen}
        onClose={() => setIsQuickNoticeModalOpen(false)}
      />
      <EditAdmissionModal
        isOpen={isEditAdmissionModalOpen}
        onClose={() => setIsEditAdmissionModalOpen(false)}
      />

      {/* Floating Teacher Live Controls Bar */}
      {isAdminAuthenticated && <TeacherLiveBar />}

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return <MainApp />;
}
