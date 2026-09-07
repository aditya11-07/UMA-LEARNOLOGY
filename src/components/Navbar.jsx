import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InstallAppBanner } from './InstallAppBanner';
import {
  GraduationCap,
  Youtube,
  CreditCard,
  IdCard,
  UserCheck,
  LayoutDashboard,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  BookOpen,
  PhoneCall,
  Calculator,
  FileText,
  Lock,
  Unlock,
  LogOut,
  ShieldCheck,
  Smartphone
} from './Icons';

export const Navbar = () => {
  const {
    currentView,
    setCurrentView,
    theme,
    toggleTheme,
    setIsAdmissionModalOpen,
    coachingInfo,
    isAdminAuthenticated,
    logoutAdmin,
    requireAdminAccess
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);

  const handleNavClick = (viewName) => {
    if (viewName === 'admin' || viewName === 'id-studio' || viewName === 'fees-hub') {
      requireAdminAccess(viewName);
    } else {
      setCurrentView(viewName);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar no-print">
      <div className="container nav-container">
        {/* Brand Logo & Professional Tagline */}
        <div
          className="brand-logo-container"
          onClick={() => handleNavClick('public')}
          role="button"
          tabIndex={0}
          title="UMA Learnology - Where Learning Never Ends"
        >
          <div className="brand-avatar-box">
            <img src={coachingInfo.logo || '/logo.png'} alt="UMA Learnology Logo" />
          </div>

          <div className="brand-text-block">
            <div className="brand-main-title">
              <span className="brand-word-uma">UMA</span>
              <span className="brand-word-highlight">Learnology</span>
            </div>

            <div className="brand-tagline-wrap">
              <span className="brand-status-dot" aria-hidden="true" />
              <span>WHERE LEARNING NEVER ENDS</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li
            className={`nav-link ${currentView === 'public' ? 'active' : ''}`}
            onClick={() => handleNavClick('public')}
          >
            <BookOpen size={16} />
            Home & Courses
          </li>
          <li
            className={`nav-link ${currentView === 'youtube-hub' ? 'active' : ''}`}
            onClick={() => handleNavClick('youtube-hub')}
          >
            <Youtube size={17} color="var(--youtube-red)" />
            YouTube Hub
          </li>
          <li
            className={`nav-link ${currentView === 'student-portal' ? 'active' : ''}`}
            onClick={() => handleNavClick('student-portal')}
          >
            <UserCheck size={17} />
            Student Portal
          </li>

          {/* Admin / Teacher Exclusive Navigation Items */}
          {isAdminAuthenticated && (
            <>
              <li
                className={`nav-link ${currentView === 'id-studio' ? 'active' : ''}`}
                onClick={() => handleNavClick('id-studio')}
                style={{ color: 'var(--primary)' }}
              >
                <IdCard size={17} />
                ID Studio 🔓
              </li>
              <li
                className={`nav-link ${currentView === 'admin' ? 'active' : ''}`}
                onClick={() => handleNavClick('admin')}
                style={{ color: 'var(--primary)' }}
              >
                <LayoutDashboard size={17} />
                Admin Suite 🔓
              </li>
            </>
          )}
        </ul>

        {/* Right Actions & Portal Switcher */}
        <div className="nav-actions">
          {/* Portal Switcher Pill - Students only see Public & Student */}
          <div className="portal-switcher">
            <button
              className={`portal-btn ${currentView === 'public' || currentView === 'youtube-hub' ? 'active' : ''}`}
              onClick={() => handleNavClick('public')}
              title="Public Institute Website"
            >
              Public
            </button>
            <button
              className={`portal-btn ${currentView === 'student-portal' ? 'active' : ''}`}
              onClick={() => handleNavClick('student-portal')}
              title="Student & Parent Academic Portal"
            >
              Student
            </button>

            {/* Teacher / Admin pill is ONLY visible when Teacher is authenticated */}
            {isAdminAuthenticated && (
              <button
                className={`portal-btn ${currentView === 'admin' || currentView === 'fees-hub' || currentView === 'id-studio' ? 'active' : ''}`}
                onClick={() => handleNavClick('admin')}
                title="Teacher & Admin Management Suite"
                style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#10b981' }}
              >
                <Unlock size={14} color="#10b981" />
                <span>Admin Suite 🔓</span>
              </button>
            )}
          </div>

          {/* Staff Login Discreet Key Button for Teacher (when logged out) */}
          {!isAdminAuthenticated && (
            <button
              className="btn btn-secondary btn-icon-only"
              onClick={() => requireAdminAccess('admin')}
              title="Faculty / Teacher Login"
              aria-label="Teacher Login"
              style={{ opacity: 0.65 }}
            >
              <Lock size={16} />
            </button>
          )}

          {/* Admin Lock / Logout Button when authenticated */}
          {isAdminAuthenticated && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={logoutAdmin}
              title="Lock Teacher Session and Return to Student View"
              style={{
                color: '#ef4444',
                borderColor: 'rgba(239, 68, 68, 0.4)',
                background: 'rgba(239, 68, 68, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px'
              }}
            >
              <LogOut size={14} />
              <span className="hide-mobile">Lock Session</span>
            </button>
          )}

          {/* Install App Button */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowInstallModal(true)}
            title="Install UMA Learnology App to Phone or PC"
            style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 10px', fontSize: '0.82rem' }}
          >
            <Smartphone size={15} color="var(--primary)" />
            <span className="hide-mobile">App 📲</span>
          </button>

          {/* Theme Switcher */}
          <button
            className="btn btn-secondary btn-icon-only"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Admission CTA Button */}
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setIsAdmissionModalOpen(true)}
          >
            <Sparkles size={16} />
            <span>Admission / Demo</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <button
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start' }}
            onClick={() => handleNavClick('public')}
          >
            <BookOpen size={18} /> Home & Courses
          </button>
          <button
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start', color: 'var(--youtube-red)' }}
            onClick={() => handleNavClick('youtube-hub')}
          >
            <Youtube size={18} /> YouTube Video Classroom
          </button>
          <button
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start' }}
            onClick={() => handleNavClick('student-portal')}
          >
            <UserCheck size={18} /> Student & Parent Portal
          </button>
          <button
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start', color: 'var(--primary)' }}
            onClick={() => {
              setMobileMenuOpen(false);
              setShowInstallModal(true);
            }}
          >
            <Smartphone size={18} /> Install App to Phone / PC 📲
          </button>

          {/* Mobile Admin controls when authenticated */}
          {isAdminAuthenticated ? (
            <>
              <button
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', color: 'var(--primary)' }}
                onClick={() => handleNavClick('id-studio')}
              >
                <IdCard size={18} /> Student ID Card Studio 🔓
              </button>
              <button
                className="btn btn-secondary"
                style={{
                  justifyContent: 'flex-start',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)'
                }}
                onClick={() => handleNavClick('admin')}
              >
                <LayoutDashboard size={18} /> Admin Management Suite 🔓
              </button>
              <button
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', color: '#ef4444', borderColor: '#ef4444' }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  logoutAdmin();
                }}
              >
                <LogOut size={18} /> Lock Admin Session
              </button>
            </>
          ) : (
            <button
              className="btn btn-secondary"
              style={{ justifyContent: 'flex-start', opacity: 0.7 }}
              onClick={() => {
                setMobileMenuOpen(false);
                requireAdminAccess('admin');
              }}
            >
              <Lock size={18} /> Teacher / Faculty Login
            </button>
          )}

          <button
            className="btn btn-primary"
            style={{ marginTop: '0.5rem' }}
            onClick={() => {
              setMobileMenuOpen(false);
              setIsAdmissionModalOpen(true);
            }}
          >
            <Sparkles size={18} /> Book Free 3-Day Demo Class
          </button>
        </div>
      )}

      {/* Manual Install Guide Modal Trigger */}
      {showInstallModal && (
        <InstallAppBanner isOpenManual={true} onCloseManual={() => setShowInstallModal(false)} />
      )}
    </nav>
  );
};
