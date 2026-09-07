import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, ChevronRight, Sparkles, ChevronLeft, Edit } from '../Icons';

export const AnnouncementTicker = ({ onOpenNoticeEdit }) => {
  const { notices, setIsAdmissionModalOpen, isTeacherMode } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!notices || notices.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notices.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [notices]);

  if (!notices || notices.length === 0) return null;

  const currentNotice = notices[currentIndex] || notices[0];

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % notices.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + notices.length) % notices.length);
  };

  return (
    <div className="ticker-wrap no-print">
      <div className="container ticker-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden', flex: 1 }}>
          <span className="ticker-badge">
            <Bell size={12} style={{ display: 'inline', marginRight: '4px' }} />
            {currentNotice.category}
          </span>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.86rem' }}>
            <strong>{currentNotice.title}</strong>: {currentNotice.content}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          {isTeacherMode && (
            <button
              onClick={onOpenNoticeEdit}
              style={{
                background: 'rgba(255, 255, 255, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                color: '#fff',
                padding: '2px 8px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '0.72rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Add or Delete Announcement Notices"
            >
              <Edit size={11} /> Edit Notices
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <button
              onClick={handlePrev}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                color: '#fff',
                width: '22px',
                height: '22px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Previous Announcement"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={handleNext}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                color: '#fff',
                width: '22px',
                height: '22px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Next Announcement"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          <button
            onClick={() => setIsAdmissionModalOpen(true)}
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
              border: 'none',
              color: '#fff',
              padding: '3px 12px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Sparkles size={12} /> Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};
