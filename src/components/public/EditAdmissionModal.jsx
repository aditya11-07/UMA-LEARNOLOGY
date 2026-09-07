import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Save, RotateCcw, HelpCircle, CheckCircle2, MessageSquare, Bell } from '../Icons';
import { INITIAL_ADMISSION_MODAL_CONTENT } from '../../data/initialData';

export const EditAdmissionModal = ({ isOpen, onClose }) => {
  const { admissionModalContent, updateAdmissionModalContent } = useApp();

  const [formData, setFormData] = useState(INITIAL_ADMISSION_MODAL_CONTENT);

  useEffect(() => {
    if (admissionModalContent) {
      setFormData({
        ...INITIAL_ADMISSION_MODAL_CONTENT,
        ...admissionModalContent
      });
    }
  }, [admissionModalContent, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAdmissionModalContent(formData);
    onClose();
  };

  const handleReset = () => {
    if (window.confirm('Reset popup texts to initial defaults?')) {
      setFormData(INITIAL_ADMISSION_MODAL_CONTENT);
      updateAdmissionModalContent(INITIAL_ADMISSION_MODAL_CONTENT);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 10000 }}>
      <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Teacher Editor: Admission & Demo Pop-up</h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Customize titles, promotional offer banners, perk bullet points, and helpline text on the pop-up modal.
              </p>
            </div>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={onClose} style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Promo Banner */}
            <div className="form-group" style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <label className="form-label" style={{ color: 'var(--accent-hover)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Bell size={16} /> Top Promotional Offer Banner (Highlights in Popup)
              </label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="e.g. 🎉 Special 15% Early Bird Discount + Free Cambridge Speaking Test Included!"
                value={formData.promoBanner || ''}
                onChange={(e) => setFormData({ ...formData, promoBanner: e.target.value })}
              />
            </div>

            {/* Titles */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Demo Class Tab Headline *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Book Free 3-Day Demo Masterclass"
                  value={formData.demoTitle || ''}
                  onChange={(e) => setFormData({ ...formData, demoTitle: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Direct Admission Tab Headline *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Direct Online Admission Registration"
                  value={formData.admissionTitle || ''}
                  onChange={(e) => setFormData({ ...formData, admissionTitle: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Subtitle / Session Tagline</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Session 2026-27 Enrollment & Scholarship Desk"
                  value={formData.badgeText || ''}
                  onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Admissions Helpline Note</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Need immediate assistance? Call Admissions Desk: +91 98765 43210"
                  value={formData.helplineText || ''}
                  onChange={(e) => setFormData({ ...formData, helplineText: e.target.value })}
                />
              </div>
            </div>

            {/* Bullets / Value props */}
            <div style={{ background: 'var(--bg-card-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <label className="form-label" style={{ fontWeight: 800, marginBottom: '0.75rem', display: 'block' }}>
                ⭐ Value Highlights / Student Perks Shown Inside Pop-up
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Perk Bullet 1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bullet point 1..."
                    value={formData.bullet1 || ''}
                    onChange={(e) => setFormData({ ...formData, bullet1: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Perk Bullet 2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bullet point 2..."
                    value={formData.bullet2 || ''}
                    onChange={(e) => setFormData({ ...formData, bullet2: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Perk Bullet 3</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bullet point 3..."
                    value={formData.bullet3 || ''}
                    onChange={(e) => setFormData({ ...formData, bullet3: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Success Messages */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Demo Booking Success Message</label>
                <textarea
                  rows={2}
                  className="form-control"
                  value={formData.successMessageDemo || ''}
                  onChange={(e) => setFormData({ ...formData, successMessageDemo: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Admission Confirmation Message</label>
                <textarea
                  rows={2}
                  className="form-control"
                  value={formData.successMessageAdmission || ''}
                  onChange={(e) => setFormData({ ...formData, successMessageAdmission: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleReset}>
              <RotateCcw size={15} /> Reset Defaults
            </button>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                <Save size={15} /> Save Pop-up Content
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
