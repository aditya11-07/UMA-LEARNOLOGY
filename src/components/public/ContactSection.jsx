import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle, MessageCircle, Edit } from '../Icons';

export const ContactSection = ({ onOpenEdit }) => {
  const { coachingInfo, addEnquiry, showToast, isTeacherMode, setIsEditContactModalOpen } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    courseInterest: 'Master Spoken English & Fluency Bootcamp',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleOpenEdit = () => {
    if (onOpenEdit) onOpenEdit();
    else if (setIsEditContactModalOpen) setIsEditContactModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEnquiry({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      targetClass: 'General Enquiry',
      courseInterest: formData.courseInterest,
      notes: formData.message || 'Direct enquiry submitted via contact form'
    });
    setSubmitted(true);
    showToast('Enquiry received. Our academic counselor will call you shortly!');
  };

  const cleanPhone = coachingInfo.phone.replace(/[^0-9]/g, '');

  return (
    <section className="section" id="contact" style={{ background: 'var(--bg-main)' }}>
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-badge">
            <MapPin size={14} /> Visit & Contact Us
          </div>
          <h2 className="section-title">Get in Touch with Admissions Desk</h2>
          <p className="section-subtitle">
            Visit our Knowledge Park study center, call our student helpline, or submit an online query for instant academic counseling.
          </p>
          {isTeacherMode && (
            <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleOpenEdit}
                style={{ borderRadius: 'var(--radius-full)', padding: '0.35rem 0.9rem', fontSize: '0.78rem' }}
              >
                <Edit size={13} color="var(--primary)" /> Teacher: Edit Campus Address & Helplines
              </button>
            </div>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Contact Details & Info Card */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', margin: 0, color: 'var(--primary)' }}>
                Head Office & Language Lab
              </h3>
              {isTeacherMode && (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleOpenEdit}
                  style={{ fontSize: '0.72rem', padding: '2px 8px' }}
                >
                  <Edit size={12} /> Edit
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Campus Address</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>
                    {coachingInfo.address}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {coachingInfo.city}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--success-light)',
                  color: 'var(--success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Phone size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Phone & WhatsApp Support</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                    <a href={`tel:${cleanPhone}`} style={{ color: 'var(--text-main)', fontWeight: 600 }}>{coachingInfo.phone}</a>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                    {coachingInfo.altPhone}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--warning-light)',
                  color: 'var(--warning)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Official Email</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>
                    <a href={`mailto:${coachingInfo.email}`} style={{ color: 'var(--text-main)' }}>{coachingInfo.email}</a>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {coachingInfo.supportEmail}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--bg-card-subtle)',
                  color: 'var(--text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Clock size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Working Hours</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '2px' }}>
                    Monday - Saturday: 8:00 AM – 8:00 PM
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Sunday: 9:00 AM – 4:00 PM (Mock Test Batches)
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.75rem' }}>
              <a
                href={`https://wa.me/919876543210?text=Hi%20UMA%20Learnology,%20I%20want%20to%20inquire%20about%20admissions`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ flex: 1, color: '#10b981', borderColor: 'var(--success-border)' }}
              >
                <MessageCircle size={16} /> WhatsApp Counselor
              </a>
              <a
                href={`tel:${cleanPhone}`}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                <Phone size={16} /> Call Helpline
              </a>
            </div>
          </div>

          {/* Quick Query Form */}
          <div className="card">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={20} color="var(--primary)" /> Send Instant Message
            </h3>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">WhatsApp Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      className="form-control"
                      placeholder="+91 98765 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="yourname@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Program of Interest</label>
                  <select
                    className="form-control"
                    value={formData.courseInterest}
                    onChange={(e) => setFormData({ ...formData, courseInterest: e.target.value })}
                  >
                    <option value="Master Spoken English & Fluency Bootcamp">Master Spoken English & Fluency Bootcamp</option>
                    <option value="Complete English Grammar for Competitive Exams">Complete English Grammar for Competitive Exams</option>
                    <option value="IELTS & TOEFL Academic Pinnacle Batch">IELTS & TOEFL Academic Pinnacle Batch</option>
                    <option value="Senior School Board Booster (Class 9-12)">Senior School Board Booster (Class 9-12)</option>
                    <option value="Science & Engineering Academic Foundation">Science & Engineering Academic Foundation</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Query / Message *</label>
                  <textarea
                    required
                    rows="3"
                    className="form-control"
                    placeholder="Ask about batch timings, 1-on-1 speaking slots, fee concessions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Send size={16} /> Submit Query to Admissions
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <CheckCircle size={52} color="#10b981" style={{ margin: '0 auto 1.25rem' }} />
                <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Message Submitted!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  Thank you <strong>{formData.name}</strong>. Our counseling desk has received your request and will reach out via WhatsApp/Call.
                </p>
                <button className="btn btn-secondary btn-sm" onClick={() => setSubmitted(false)}>
                  Send Another Query
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
