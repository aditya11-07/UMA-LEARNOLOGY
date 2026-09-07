import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  Youtube,
  CreditCard,
  IdCard,
  Award,
  CheckCircle2,
  Users,
  PlayCircle,
  BookOpen,
  GraduationCap
} from '../Icons';

export const HeroSection = ({ onOpenEdit }) => {
  const {
    coachingInfo,
    heroContent,
    isTeacherMode,
    setIsEditHeroModalOpen,
    setCurrentView,
    setIsAdmissionModalOpen,
    setPlayingVideo,
    videos
  } = useApp();

  const handleWatchFeatured = () => {
    if (videos && videos.length > 0) {
      setPlayingVideo(videos[0]);
    } else {
      setCurrentView('youtube-hub');
    }
  };

  const handleEditHero = () => {
    if (onOpenEdit) {
      onOpenEdit();
    } else if (setIsEditHeroModalOpen) {
      setIsEditHeroModalOpen(true);
    }
  };

  const currentBadge = heroContent?.badge || 'Premier English, Competitive & Academic Coaching';
  const currentTitle = heroContent?.title || 'Empower Your Voice, Master Fluency & Top Ranks.';
  const currentDesc = heroContent?.description || `Welcome to ${coachingInfo.name} — your complete language and academic ecosystem. Featuring premier interactive batches by Cambridge & British Council certified faculty, free daily YouTube masterclasses, tamper-proof digital student ID badges, smart fee management, and 24x7 personalized doubt solving.`;
  const admissionBadge = heroContent?.admissionBadge || 'ADMISSION SESSION 2026-27 OPEN';
  const batchTag = heroContent?.batchTag || 'Super-30 Batches';

  const stats = {
    studentsMentored: heroContent?.stats?.studentsMentored || coachingInfo.stats?.studentsMentored || '12,500+',
    topSelections: heroContent?.stats?.topSelections || coachingInfo.stats?.topSelections || '1,850+',
    videoLectures: heroContent?.stats?.videoLectures || coachingInfo.stats?.videoLectures || '450+',
    successRate: heroContent?.stats?.successRate || coachingInfo.stats?.successRate || '98.4%'
  };

  return (
    <section className="hero-section" style={{ position: 'relative' }}>
      <div className="container">
        {/* Teacher In-Place Edit Banner */}
        {isTeacherMode && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--primary-light)',
            border: '1px solid var(--primary)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700 }}>
              <Sparkles size={16} />
              <span>Teacher Mode Active: You can customize all hero texts, stats, badges, and pricing in real time!</span>
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleEditHero}
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.85rem' }}
            >
              ✏️ Edit Hero & Stats
            </button>
          </div>
        )}

        <div className="hero-grid">
          {/* Left Column: Headline & Action */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <div className="section-badge">
                <Sparkles size={14} /> {currentBadge}
              </div>
              {isTeacherMode && (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleEditHero}
                  style={{ borderRadius: 'var(--radius-full)', padding: '2px 8px', fontSize: '0.72rem', height: '24px' }}
                  title="Edit Headline & Descriptions"
                >
                  ✏️ Edit Headline
                </button>
              )}
            </div>

            <h1 className="hero-title">
              {currentTitle}
            </h1>

            <p className="hero-description">
              {currentDesc}
            </p>

            <div className="hero-cta-group">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => setIsAdmissionModalOpen(true)}
              >
                <Sparkles size={18} />
                <span>Book Free 3-Day Demo</span>
                <ArrowRight size={18} />
              </button>

              <button
                className="btn btn-youtube btn-lg"
                onClick={handleWatchFeatured}
              >
                <Youtube size={20} />
                <span>Watch Free Lectures</span>
              </button>

              <button
                className="btn btn-secondary btn-lg"
                onClick={() => setCurrentView('id-studio')}
              >
                <IdCard size={18} />
                <span>Student ID Studio</span>
              </button>
            </div>

            {/* Live Stats Strip */}
            <div className="hero-stats-strip" style={{ position: 'relative' }}>
              <div className="stat-item">
                <span className="stat-number">{stats.studentsMentored}</span>
                <span className="stat-label">Students Mentored</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.topSelections}</span>
                <span className="stat-label">Selections & Band 8+</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.videoLectures}</span>
                <span className="stat-label">YouTube Masterclasses</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.successRate}</span>
                <span className="stat-label">Exam Success Rate</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Coaching Hub Preview Card */}
          <div className="hero-card-preview">
            <div className="hero-feature-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    {admissionBadge}
                  </span>
                </div>
                <span className="badge badge-primary">{batchTag}</span>
              </div>

              {/* Card visual highlight */}
              <div style={{
                background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #78350f 100%)',
                color: '#fff',
                padding: '1.5rem',
                borderRadius: '16px',
                marginBottom: '1.5rem',
                boxShadow: '0 10px 24px rgba(6, 78, 59, 0.3)',
                border: '1px solid rgba(16, 185, 129, 0.25)'
              }}>
                <div style={{ fontSize: '0.78rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  All-in-One Coaching Ecosystem
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.35rem 0 1rem' }}>
                  UMA Learnology Suite
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} color="#34d399" /> Smart ID Badges
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} color="#34d399" /> GST Tax Invoices
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} color="#34d399" /> YouTube Video Hub
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} color="#34d399" /> 24x7 Doubts Forum
                  </div>
                </div>
              </div>

              {/* Quick portal shortcut links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  className="btn btn-secondary"
                  style={{ justifyContent: 'space-between', width: '100%' }}
                  onClick={() => setCurrentView('student-portal')}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={18} color="var(--primary)" /> Student & Parent Portal
                  </span>
                  <ArrowRight size={16} />
                </button>
                <button
                  className="btn btn-secondary"
                  style={{ justifyContent: 'space-between', width: '100%' }}
                  onClick={() => setIsAdmissionModalOpen(true)}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={18} color="var(--accent)" /> Book Free Demo Class
                  </span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Floating Top Badge */}
            <div className="hero-floating-badge badge-pos-1">
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(255, 0, 0, 0.4)'
              }}>
                <PlayCircle size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>YouTube Official</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 800 }}>{coachingInfo.youtubeSubscribers} Subscribers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
