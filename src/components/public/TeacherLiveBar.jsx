import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Edit,
  Sparkles,
  BookOpen,
  HelpCircle,
  MapPin,
  Bell,
  Youtube,
  Settings,
  Eye,
  CheckCircle,
  ChevronUp,
  ChevronDown,
  Users,
  Trophy,
  FileText,
  DollarSign,
  LogOut,
  Lock
} from '../Icons';

export const TeacherLiveBar = () => {
  const {
    isTeacherMode,
    toggleTeacherMode,
    navigateToAdmin,
    courses,
    faqs,
    setIsEditHeroModalOpen,
    setIsEditFaqModalOpen,
    setEditingFaq,
    setIsEditContactModalOpen,
    setIsQuickNoticeModalOpen,
    logoutAdmin,
    isAdminAuthenticated
  } = useApp();

  const [isMinimized, setIsMinimized] = useState(false);

  if (!isAdminAuthenticated) return null;

  return (
    <div
      className="no-print"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="btn btn-primary"
          style={{
            borderRadius: 'var(--radius-full)',
            padding: '0.65rem 1.25rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.45)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}
          title="Open Teacher Quick Controls"
        >
          <Edit size={16} />
          <span style={{ fontWeight: 700 }}>Teacher Live Controls ✏️</span>
          <ChevronUp size={16} />
        </button>
      ) : (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(16, 185, 129, 0.3)',
            borderRadius: '16px',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            backdropFilter: 'blur(16px)',
            maxWidth: '92vw',
            overflowX: 'auto'
          }}
        >
          {/* Status & Toggle */}
          <div
            onClick={toggleTeacherMode}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              background: isTeacherMode ? 'var(--primary-light)' : 'var(--bg-card-subtle)',
              border: isTeacherMode ? '1px solid var(--primary)' : '1px solid var(--border-color)',
              flexShrink: 0
            }}
            title="Click to toggle visual Edit buttons on the website"
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: isTeacherMode ? '#10b981' : '#9ca3af',
                boxShadow: isTeacherMode ? '0 0 8px #10b981' : 'none'
              }}
            />
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: isTeacherMode ? 'var(--primary)' : 'var(--text-muted)' }}>
              Live Edit Mode: {isTeacherMode ? 'ON' : 'OFF'}
            </span>
          </div>

          <div style={{ width: '1px', height: '24px', background: 'var(--border-color)', flexShrink: 0 }} />

          {/* Quick Edit Section Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setIsEditHeroModalOpen(true)}
              style={{ fontSize: '0.76rem', padding: '0.35rem 0.6rem' }}
              title="Edit Hero Title, Description, and Statistics"
            >
              <Sparkles size={13} color="var(--primary)" /> Hero
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateToAdmin('courses')}
              style={{ fontSize: '0.76rem', padding: '0.35rem 0.6rem' }}
              title="Add or Edit Courses and Pricing"
            >
              <BookOpen size={13} color="var(--secondary)" /> Courses ({courses.length})
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setEditingFaq(null);
                setIsEditFaqModalOpen(true);
              }}
              style={{ fontSize: '0.76rem', padding: '0.35rem 0.6rem' }}
              title="Manage Frequently Asked Questions"
            >
              <HelpCircle size={13} color="var(--accent-hover)" /> FAQs ({faqs.length})
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateToAdmin('faculty')}
              style={{ fontSize: '0.76rem', padding: '0.35rem 0.6rem' }}
              title="Edit Faculty Members"
            >
              <Users size={13} color="#6366f1" /> Faculty
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateToAdmin('rankers')}
              style={{ fontSize: '0.76rem', padding: '0.35rem 0.6rem' }}
              title="Edit Achievers & Toppers"
            >
              <Trophy size={13} color="#f59e0b" /> Toppers
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateToAdmin('materials')}
              style={{ fontSize: '0.76rem', padding: '0.35rem 0.6rem' }}
              title="Upload Notes & Handout PDFs"
            >
              <FileText size={13} color="#10b981" /> Notes
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setIsEditAdmissionModalOpen(true)}
              style={{ fontSize: '0.76rem', padding: '0.35rem 0.6rem', color: '#f59e0b' }}
              title="Edit Admission & Demo Pop-up text, promotional offer banner and perks"
            >
              <Sparkles size={13} /> Pop-up
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setIsQuickNoticeModalOpen(true)}
              style={{ fontSize: '0.76rem', padding: '0.35rem 0.6rem' }}
              title="Edit Top Ticker Announcements"
            >
              <Bell size={13} color="#f59e0b" /> Ticker
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setIsEditContactModalOpen(true)}
              style={{ fontSize: '0.76rem', padding: '0.35rem 0.6rem' }}
              title="Edit Campus Address & Helplines"
            >
              <MapPin size={13} color="#10b981" /> Contact
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigateToAdmin('youtube')}
              style={{ fontSize: '0.76rem', padding: '0.35rem 0.6rem', color: '#ef4444' }}
              title="Edit YouTube Channel & Videos"
            >
              <Youtube size={13} /> YouTube
            </button>
          </div>

          <div style={{ width: '1px', height: '24px', background: 'var(--border-color)', flexShrink: 0 }} />

          {/* Full Dashboard & Minimize */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigateToAdmin('overview')}
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
              title="Go to Full Teacher & Administration Suite"
            >
              <Settings size={14} /> Teacher Suite
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={logoutAdmin}
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.6rem', color: '#ef4444' }}
              title="Lock Admin Session"
            >
              <LogOut size={14} />
            </button>

            <button
              onClick={() => setIsMinimized(true)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Minimize Live Bar"
            >
              <ChevronDown size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
