import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  X,
  CheckCircle2,
  Calendar,
  User,
  Phone,
  Mail,
  BookOpen,
  MapPin,
  CreditCard,
  IdCard,
  ArrowRight,
  Edit,
  Bell
} from '../Icons';

export const AdmissionModal = () => {
  const {
    isAdmissionModalOpen,
    setIsAdmissionModalOpen,
    admissionModalInitialCourse,
    courses,
    addStudent,
    addEnquiry,
    setSelectedStudentId,
    setCurrentView,
    showToast,
    isTeacherMode,
    admissionModalContent,
    setIsEditAdmissionModalOpen
  } = useApp();

  const [mode, setMode] = useState('demo'); // 'demo' | 'admission'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    targetClass: 'College / Professional',
    courseId: courses[0]?.id || 'course-spoken-english',
    parentName: '',
    parentPhone: '',
    address: '',
    notes: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [createdStudent, setCreatedStudent] = useState(null);

  // Sync initial course if passed
  useEffect(() => {
    if (admissionModalInitialCourse) {
      setFormData(prev => ({
        ...prev,
        courseId: admissionModalInitialCourse.id
      }));
    }
  }, [admissionModalInitialCourse]);

  if (!isAdmissionModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCourse = courses.find((c) => c.id === formData.courseId) || courses[0];

    try {
      confetti({
        particleCount: 140,
        spread: 85,
        origin: { y: 0.55 }
      });
    } catch (err) {}

    if (mode === 'admission') {
      const newStu = addStudent({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        parentName: formData.parentName || 'Parent of ' + formData.name,
        parentPhone: formData.parentPhone || formData.phone,
        courseId: selectedCourse.id,
        courseName: selectedCourse.title,
        batch: `${selectedCourse.category} Achievers Batch`,
        totalFee: selectedCourse.totalFee,
        paidFee: 8000, // Initial booking seat deposit
        paymentMode: 'Online Registration Deposit',
        bloodGroup: 'B+',
        address: formData.address || 'New Delhi'
      });
      setCreatedStudent(newStu);
      setSelectedStudentId(newStu.id);
    } else {
      addEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        targetClass: formData.targetClass,
        courseInterest: selectedCourse.title,
        notes: formData.notes || 'Requested free 3-day demo class'
      });
    }

    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsAdmissionModalOpen(false);
    setIsSuccess(false);
    setCreatedStudent(null);
  };

  const handleViewIdCard = () => {
    handleClose();
    setCurrentView('id-studio');
  };

  const handleViewPortal = () => {
    handleClose();
    setCurrentView('student-portal');
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={22} color="var(--primary)" />
            <div>
              <h3 style={{ fontSize: '1.25rem' }}>
                {mode === 'demo'
                  ? (admissionModalContent?.demoTitle || 'Book Free 3-Day Demo Masterclass')
                  : (admissionModalContent?.admissionTitle || 'Direct Online Admission Registration')}
              </h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {admissionModalContent?.badgeText || 'Session 2026-27 Enrollment & Scholarship Desk'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isTeacherMode && (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setIsEditAdmissionModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 10px',
                  fontSize: '0.78rem',
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)'
                }}
                title="Edit Pop-up texts, promo banner and perks"
              >
                <Edit size={13} /> Edit Pop-up
              </button>
            )}

            <button className="btn btn-secondary btn-icon-only" onClick={handleClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Promo Banner if configured */}
              {admissionModalContent?.promoBanner && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.08) 100%)',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  marginBottom: '1rem',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  color: 'var(--accent-hover)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Bell size={15} color="var(--accent)" />
                  <span>{admissionModalContent.promoBanner}</span>
                </div>
              )}

              {/* Type Switcher */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                marginBottom: '1rem',
                background: 'var(--bg-card-subtle)',
                padding: '4px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)'
              }}>
                <button
                  type="button"
                  className={`btn btn-sm ${mode === 'demo' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setMode('demo')}
                >
                  <Sparkles size={15} /> Book Free Demo Seat
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${mode === 'admission' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setMode('admission')}
                >
                  <BookOpen size={15} /> Direct Admission Portal
                </button>
              </div>

              {/* Value Highlights / Perks */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.5rem',
                marginBottom: '1.25rem',
                background: 'var(--bg-card-subtle)',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                color: 'var(--text-muted)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <span>{admissionModalContent?.bullet1 || '1-on-1 speaking evaluation'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <span>{admissionModalContent?.bullet2 || 'Free diagnostic toolkit'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <span>{admissionModalContent?.bullet3 || 'Early bird scholarship'}</span>
                </div>
              </div>

              {/* Form Fields */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">WhatsApp Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    className="form-control"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="rahul.sharma@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Target Class / Level</label>
                  <select
                    className="form-control"
                    value={formData.targetClass}
                    onChange={(e) => setFormData({ ...formData, targetClass: e.target.value })}
                  >
                    <option value="College / Professional">College / Job Aspirant / Professional</option>
                    <option value="Competitive Exam Aspirant">Competitive Exam (SSC / Bank / CDS)</option>
                    <option value="Study Abroad (IELTS/TOEFL)">Study Abroad (IELTS / TOEFL)</option>
                    <option value="Class 11 or 12">Class 11 or 12 CBSE / State Board</option>
                    <option value="Class 9 or 10">Class 9 or 10 Foundation</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Select Academic Program *</label>
                <select
                  className="form-control"
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} — (₹{c.totalFee.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              {mode === 'admission' && (
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Parent / Guardian Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Suresh Sharma"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Parent Contact Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="+91 98112 00000"
                      value={formData.parentPhone}
                      onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Specific requirements or preferred batch timing?</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="e.g. Interested in morning weekend speaking slots, 1-on-1 interview practice..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                ></textarea>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <Sparkles size={16} />
                <span>{mode === 'demo' ? 'Confirm Demo Reservation' : 'Complete Admission Registration'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="modal-body" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
            <div style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              background: 'var(--success-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: 'var(--success)',
              boxShadow: '0 0 20px var(--success-glow)'
            }}>
              <CheckCircle2 size={44} />
            </div>

            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              {mode === 'admission' ? 'Admission Confirmed!' : 'Free Demo Class Reserved!'}
            </h3>

            <p style={{ color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 1.75rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {mode === 'admission' ? (
                <>
                  Welcome to UMA Learnology, <strong>{formData.name}</strong>! Your permanent Student Roll Number is{' '}
                  <strong style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}>{createdStudent?.rollNo}</strong>.
                  Your digital ID badge and initial fee receipt have been generated in the institute portal.
                </>
              ) : (
                <>
                  Thank you <strong>{formData.name}</strong>. Our senior language mentor will contact you on{' '}
                  <strong>{formData.phone}</strong> with demo class access links and study material pass.
                </>
              )}
            </p>

            {mode === 'admission' ? (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={handleViewIdCard}>
                  <IdCard size={18} /> View Digital ID Badge
                </button>
                <button className="btn btn-secondary" onClick={handleViewPortal}>
                  <User size={18} /> Open Student Portal
                </button>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleClose}>
                Done & Return to Website
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
