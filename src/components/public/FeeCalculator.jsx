import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, Percent, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from '../Icons';

export const FeeCalculator = () => {
  const { courses, openAdmissionForCourse } = useApp();
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || 'course-spoken-english');
  const [scholarshipPercent, setScholarshipPercent] = useState(20);
  const [installmentsCount, setInstallmentsCount] = useState(2);

  const selectedCourse = courses.find(c => c.id === selectedCourseId) || courses[0];
  const baseFee = selectedCourse ? selectedCourse.totalFee : 18000;
  const discountAmount = Math.round((baseFee * scholarshipPercent) / 100);
  const netFee = baseFee - discountAmount;
  const perInstallment = Math.round(netFee / installmentsCount);

  return (
    <section className="section" id="fee-calculator" style={{ background: 'var(--bg-card-subtle)' }}>
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-badge">
            <Calculator size={14} /> Transparent Pricing & Calculator
          </div>
          <h2 className="section-title">Fee Estimator & Scholarship Planner</h2>
          <p className="section-subtitle">
            Calculate customized installment plans and discover potential fee concessions through the UMA Learnology National Scholarship & Fluency Aptitude Test.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2.5rem',
          alignItems: 'center',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* Controls */}
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calculator size={20} color="var(--primary)" /> Customize Your Academic Plan
            </h3>

            {/* Select Course */}
            <div className="form-group">
              <label className="form-label">Select Academic Program</label>
              <select
                className="form-control"
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} (₹{c.totalFee.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            {/* Scholarship Slider */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                <label className="form-label" style={{ margin: 0 }}>Scholarship / Concession Slab</label>
                <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.95rem' }}>{scholarshipPercent}% Waiver</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                step="5"
                value={scholarshipPercent}
                onChange={(e) => setScholarshipPercent(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>0% (Standard)</span>
                <span>30% (Silver Slab)</span>
                <span>60% (Gold Slab)</span>
                <span>90% (Star Ranker)</span>
              </div>
            </div>

            {/* Installments Option */}
            <div className="form-group">
              <label className="form-label">Preferred Installment Frequency</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`btn btn-sm ${installmentsCount === num ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setInstallmentsCount(num)}
                  >
                    {num === 1 ? '1 Pay (Full)' : `${num} Equal EMIs`}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
              <ShieldCheck size={16} color="var(--secondary)" />
              <span>Includes complete study materials, audio lab access, and test portal.</span>
            </div>
          </div>

          {/* Result Card */}
          <div style={{
            background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #78350f 100%)',
            color: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-xl)',
            position: 'relative',
            border: '1px solid rgba(16, 185, 129, 0.25)'
          }}>
            <div style={{ fontSize: '0.78rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Estimated Fee Breakdown
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '4px', marginBottom: '1.5rem' }}>
              {selectedCourse?.title}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.9 }}>
                <span>Base Program Tuition:</span>
                <span>₹{baseFee.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399', fontWeight: 600 }}>
                <span>Scholarship Concession ({scholarshipPercent}%):</span>
                <span>- ₹{discountAmount.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.2)', fontSize: '1.15rem', fontWeight: 800 }}>
                <span>Net Payable Amount:</span>
                <span>₹{netFee.toLocaleString()}</span>
              </div>
            </div>

            {/* EMI Highlight */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.12)',
              padding: '1.15rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              textAlign: 'center',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}>
              <div style={{ fontSize: '0.78rem', opacity: 0.9 }}>Installment Amount ({installmentsCount} payments)</div>
              <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#f59e0b' }}>
                ₹{perInstallment.toLocaleString()}
                <span style={{ fontSize: '0.85rem', fontWeight: 500, opacity: 0.85, marginLeft: '4px' }}>/ installment</span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                color: '#ffffff',
                fontWeight: 800,
                border: 'none',
                boxShadow: '0 4px 16px rgba(234, 88, 12, 0.4)'
              }}
              onClick={() => openAdmissionForCourse(selectedCourse)}
            >
              <Sparkles size={18} /> Apply with this Scholarship
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
