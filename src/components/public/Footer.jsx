import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Heart,
  ShieldCheck,
  CreditCard,
  IdCard,
  LayoutDashboard,
  UserCheck,
  Lock
} from '../Icons';

export const Footer = () => {
  const {
    coachingInfo,
    setCurrentView,
    setIsAdmissionModalOpen,
    isAdminAuthenticated,
    requireAdminAccess
  } = useApp();

  const handleNav = (viewName) => {
    setCurrentView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="no-print" style={{
      background: '#090d14',
      color: '#cbd5e1',
      borderTop: '1px solid #1e293b',
      padding: '4.5rem 0 2rem'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 0.9fr 0.9fr 1.2fr',
          gap: '2.5rem',
          paddingBottom: '3.5rem',
          borderBottom: '1px solid #1e293b'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.25rem', color: '#fff' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.35)',
                border: '2px solid rgba(245, 158, 11, 0.6)',
                background: '#fff',
                flexShrink: 0
              }}>
                <img src={coachingInfo.logo || '/logo.png'} alt="UMA Learnology Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '1.45rem', fontWeight: 900, letterSpacing: '-0.5px', lineHeight: 1.15 }}>
                  UMA <span style={{ color: '#fb923c' }}>Learnology</span>
                </div>
                <div style={{
                  fontSize: '0.72rem',
                  color: '#34d399',
                  fontWeight: 700,
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase',
                  marginTop: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
                  <span>Where Learning Never Ends</span>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.25rem', maxWidth: '340px' }}>
              Empowering students and professionals across India with fearless English fluency, competitive exam excellence, Cambridge certified mentorship, and verified digital academic management.
            </p>

            <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>
              <strong>Reg No:</strong> {coachingInfo.registrationNo} <br />
              <strong>GSTIN:</strong> {coachingInfo.gstin}
            </div>
          </div>

          {/* Quick Portal Navigation */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '1.25rem' }}>Portals & Tools</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={() => handleNav('public')}>
                • Home & All Programs
              </li>
              <li style={{ cursor: 'pointer', color: '#ff4d4d', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => handleNav('youtube-hub')}>
                <Youtube size={15} /> YouTube Video Classroom
              </li>
              <li style={{ cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => handleNav('student-portal')}>
                <UserCheck size={15} /> Student & Parent Login
              </li>

              {/* Admin Links or Discreet Staff Login */}
              {isAdminAuthenticated ? (
                <>
                  <li style={{ cursor: 'pointer', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => handleNav('id-studio')}>
                    <IdCard size={15} /> 3D Student ID Card Studio 🔓
                  </li>
                  <li style={{ cursor: 'pointer', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={() => handleNav('admin')}>
                    <LayoutDashboard size={15} /> Admin Desk & Fees Hub 🔓
                  </li>
                </>
              ) : (
                <li
                  style={{ cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '0.5rem', fontSize: '0.82rem' }}
                  onClick={() => requireAdminAccess('admin')}
                  title="Teacher & Admin Login"
                >
                  <Lock size={13} /> Faculty & Staff Login
                </li>
              )}
            </ul>
          </div>

          {/* Academic Courses */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '1.25rem' }}>Featured Courses</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', color: '#94a3b8' }}>
              <li style={{ cursor: 'pointer' }} onClick={() => setIsAdmissionModalOpen(true)}>• Spoken English & Fluency</li>
              <li style={{ cursor: 'pointer' }} onClick={() => setIsAdmissionModalOpen(true)}>• Complete English Grammar</li>
              <li style={{ cursor: 'pointer' }} onClick={() => setIsAdmissionModalOpen(true)}>• IELTS & TOEFL Band 8+</li>
              <li style={{ cursor: 'pointer' }} onClick={() => setIsAdmissionModalOpen(true)}>• 9th to 12th Board Booster</li>
              <li style={{ cursor: 'pointer' }} onClick={() => setIsAdmissionModalOpen(true)}>• Science Foundation (JEE/NEET)</li>
              <li style={{ cursor: 'pointer' }} onClick={() => setIsAdmissionModalOpen(true)}>• National Scholarship Test</li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: '1.25rem' }}>Connect With Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="#818cf8" /> {coachingInfo.phone}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="#818cf8" /> {coachingInfo.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={16} color="#818cf8" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{coachingInfo.address}, {coachingInfo.city}</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <a
                href={coachingInfo.youtubeLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn-youtube btn-sm"
                style={{ width: '100%' }}
              >
                <Youtube size={16} /> Subscribe on YouTube ({coachingInfo.youtubeSubscribers})
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} <strong>{coachingInfo.name}</strong>. All Rights Reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            Built with <Heart size={14} color="#ef4444" fill="#ef4444" /> for English Fluency & Academic Excellence.
          </div>
        </div>
      </div>
    </footer>
  );
};
