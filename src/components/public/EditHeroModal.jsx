import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Save, RefreshCw, BarChart2 } from '../Icons';

export const EditHeroModal = ({ isOpen, onClose }) => {
  const { heroContent, updateHeroContent, coachingInfo, updateCoachingInfo } = useApp();

  const [formData, setFormData] = useState({
    badge: '',
    title: '',
    description: '',
    studentsMentored: '',
    topSelections: '',
    videoLectures: '',
    successRate: '',
    admissionBadge: 'ADMISSION SESSION 2026-27 OPEN',
    batchTag: 'Super-30 Batches'
  });

  useEffect(() => {
    if (heroContent) {
      setFormData({
        badge: heroContent.badge || 'Premier English, Competitive & Academic Coaching',
        title: heroContent.title || 'Empower Your Voice, Master Fluency & Top Ranks.',
        description: heroContent.description || `Welcome to ${coachingInfo.name} — your complete language and academic ecosystem. Featuring premier interactive batches by Cambridge & British Council certified faculty, free daily YouTube masterclasses, tamper-proof digital student ID badges, smart fee management, and 24x7 personalized doubt solving.`,
        studentsMentored: heroContent.stats?.studentsMentored || coachingInfo.stats?.studentsMentored || '12,500+',
        topSelections: heroContent.stats?.topSelections || coachingInfo.stats?.topSelections || '1,850+',
        videoLectures: heroContent.stats?.videoLectures || coachingInfo.stats?.videoLectures || '450+',
        successRate: heroContent.stats?.successRate || coachingInfo.stats?.successRate || '98.4%',
        admissionBadge: heroContent.admissionBadge || 'ADMISSION SESSION 2026-27 OPEN',
        batchTag: heroContent.batchTag || 'Super-30 Batches'
      });
    }
  }, [heroContent, coachingInfo, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateHeroContent({
      badge: formData.badge,
      title: formData.title,
      description: formData.description,
      admissionBadge: formData.admissionBadge,
      batchTag: formData.batchTag,
      stats: {
        studentsMentored: formData.studentsMentored,
        topSelections: formData.topSelections,
        videoLectures: formData.videoLectures,
        successRate: formData.successRate
      }
    });

    // Also sync coachingInfo stats
    updateCoachingInfo({
      stats: {
        studentsMentored: formData.studentsMentored,
        topSelections: formData.topSelections,
        videoLectures: formData.videoLectures,
        successRate: formData.successRate
      }
    });

    onClose();
  };

  const handleResetDefaults = () => {
    setFormData({
      badge: 'Premier English, Competitive & Academic Coaching',
      title: 'Empower Your Voice, Master Fluency & Top Ranks.',
      description: `Welcome to ${coachingInfo.name} — your complete language and academic ecosystem. Featuring premier interactive batches by Cambridge & British Council certified faculty, free daily YouTube masterclasses, tamper-proof digital student ID badges, smart fee management, and 24x7 personalized doubt solving.`,
      studentsMentored: '12,500+',
      topSelections: '1,850+',
      videoLectures: '450+',
      successRate: '98.4%',
      admissionBadge: 'ADMISSION SESSION 2026-27 OPEN',
      batchTag: 'Super-30 Batches'
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Teacher Editor: Hero Section & Live Stats</h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Edit main headline, promotional description, and homepage numerical statistics
              </p>
            </div>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={onClose} style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label">Top Highlight Badge Text</label>
            <input
              type="text"
              required
              className="form-control"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              placeholder="e.g. Premier English, Competitive & Academic Coaching"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hero Main Headline (H1)</label>
            <input
              type="text"
              required
              className="form-control"
              style={{ fontSize: '1.05rem', fontWeight: 700 }}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Empower Your Voice, Master Fluency & Top Ranks."
            />
            <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '4px', display: 'block' }}>
              Tip: Catchy headlines increase student engagement and demo registrations.
            </small>
          </div>

          <div className="form-group">
            <label className="form-label">Hero Introduction & Overview Description</label>
            <textarea
              rows="4"
              required
              className="form-control"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of your institute, faculty certifications, and coaching ecosystem..."
            />
          </div>

          <div className="card" style={{ background: 'var(--bg-card-subtle)', padding: '1.25rem', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: 'var(--primary)' }}>
              <BarChart2 size={18} />
              <h4 style={{ margin: 0, fontSize: '1rem' }}>Live Numerical Stats Strip</h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.82rem' }}>Students Mentored</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={formData.studentsMentored}
                  onChange={(e) => setFormData({ ...formData, studentsMentored: e.target.value })}
                  placeholder="e.g. 12,500+"
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.82rem' }}>Selections & Band 8+</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={formData.topSelections}
                  onChange={(e) => setFormData({ ...formData, topSelections: e.target.value })}
                  placeholder="e.g. 1,850+"
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.82rem' }}>YouTube Masterclasses</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={formData.videoLectures}
                  onChange={(e) => setFormData({ ...formData, videoLectures: e.target.value })}
                  placeholder="e.g. 450+"
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.82rem' }}>Exam Success Rate</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={formData.successRate}
                  onChange={(e) => setFormData({ ...formData, successRate: e.target.value })}
                  placeholder="e.g. 98.4%"
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Admission Status Tag</label>
              <input
                type="text"
                className="form-control"
                value={formData.admissionBadge}
                onChange={(e) => setFormData({ ...formData, admissionBadge: e.target.value })}
                placeholder="e.g. ADMISSION SESSION 2026-27 OPEN"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Batch Badge Tag</label>
              <input
                type="text"
                className="form-control"
                value={formData.batchTag}
                onChange={(e) => setFormData({ ...formData, batchTag: e.target.value })}
                placeholder="e.g. Super-30 Batches"
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleResetDefaults}
            >
              <RefreshCw size={14} /> Reset Standard Copy
            </button>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <Save size={16} /> Save Public Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
