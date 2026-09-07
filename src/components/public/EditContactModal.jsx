import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, MapPin, Save, Phone, Mail, Clock } from '../Icons';

export const EditContactModal = ({ isOpen, onClose }) => {
  const { coachingInfo, updateCoachingInfo } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    address: '',
    city: '',
    phone: '',
    altPhone: '',
    email: '',
    supportEmail: ''
  });

  useEffect(() => {
    if (coachingInfo) {
      setFormData({
        name: coachingInfo.name || 'UMA CLASSES - Where Learning Never Ends',
        tagline: coachingInfo.tagline || 'English Language & Academic Excellence',
        address: coachingInfo.address || 'Plot 42, Education Corridor, Near Central Metro Station',
        city: coachingInfo.city || 'Knowledge Park, New Delhi - 110001',
        phone: coachingInfo.phone || '+91 98765 43210',
        altPhone: coachingInfo.altPhone || '+91 98765 43211 (WhatsApp Helpline)',
        email: coachingInfo.email || 'admissions@umaclasses.com',
        supportEmail: coachingInfo.supportEmail || 'support@umaclasses.com'
      });
    }
  }, [coachingInfo, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCoachingInfo(formData);
    onClose();
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
              <MapPin size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Teacher Editor: Campus & Contact Details</h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Update address, student helplines, WhatsApp support, and official emails
              </p>
            </div>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={onClose} style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Coaching Institute Brand Name *</label>
              <input
                type="text"
                required
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Institute Slogan / Tagline</label>
              <input
                type="text"
                className="form-control"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Campus Street Address *</label>
            <input
              type="text"
              required
              className="form-control"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">City, State & Postal PIN *</label>
            <input
              type="text"
              required
              className="form-control"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Primary Student Helpline (Call) *</label>
              <input
                type="text"
                required
                className="form-control"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">WhatsApp Helpline / Alternate Phone</label>
              <input
                type="text"
                className="form-control"
                value={formData.altPhone}
                onChange={(e) => setFormData({ ...formData, altPhone: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Admissions Email *</label>
              <input
                type="email"
                required
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Student Support Email</label>
              <input
                type="email"
                className="form-control"
                value={formData.supportEmail}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} /> Save Contact Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
