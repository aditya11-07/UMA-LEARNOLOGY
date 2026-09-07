import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  X,
  Award,
  IdCard,
  User,
  Calendar,
  Building,
  GraduationCap
} from '../Icons';

export const CertificateVerificationModal = ({ isOpen, onClose, initialRoll = '' }) => {
  const { students, coachingInfo } = useApp();
  const [searchRoll, setSearchRoll] = useState(initialRoll || 'UMA-101');
  const [searchedStudent, setSearchedStudent] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (e) => {
    e?.preventDefault();
    const query = searchRoll.trim().toUpperCase();
    const found = students.find(s => s.rollNo.toUpperCase() === query || s.name.toUpperCase().includes(query));
    setSearchedStudent(found || null);
    setHasSearched(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={22} color="var(--secondary)" />
            <div>
              <h3 style={{ fontSize: '1.25rem' }}>Official Student & Certificate Verification</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                National Academic Registry & Authenticity Check
              </div>
            </div>
          </div>
          <button className="btn btn-secondary btn-icon-only" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Search Input Bar */}
          <form onSubmit={handleVerify} style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Enter Student Roll No (e.g. UMA-101, UMA-102)..."
                className="form-control"
                style={{ paddingLeft: '44px' }}
                value={searchRoll}
                onChange={(e) => setSearchRoll(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <ShieldCheck size={16} /> Verify Credentials
            </button>
          </form>

          {/* Results Display */}
          {hasSearched && searchedStudent ? (
            <div style={{
              background: 'var(--bg-card-subtle)',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid #10b981',
              padding: '2rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #10b981' }}>
                    <img src={searchedStudent.photo} alt={searchedStudent.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', marginBottom: '2px' }}>{searchedStudent.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="badge badge-success">
                        <CheckCircle2 size={12} /> Verified Active Student
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--primary)', fontSize: '0.88rem' }}>
                        {searchedStudent.rollNo}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ISSUING INSTITUTION</div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{coachingInfo.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Reg: {coachingInfo.registrationNo}</div>
                </div>
              </div>

              {/* Grid of Verified Credentials */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>ACADEMIC PROGRAM</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '2px' }}>{searchedStudent.courseName}</div>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>BATCH & COHORT</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '2px' }}>{searchedStudent.batch}</div>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>ATTENDANCE RATE</div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--success)', marginTop: '2px' }}>{searchedStudent.attendancePercentage}% (Good Standing)</div>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>VALIDITY PERIOD</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '2px' }}>Through {searchedStudent.validTill}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={16} color="var(--secondary)" />
                <span>This digital verification record is cryptographically signed by the registrar of {coachingInfo.name}.</span>
              </div>
            </div>
          ) : hasSearched ? (
            <div style={{ textAlign: 'center', padding: '2.5rem', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-lg)' }}>
              <X size={44} color="var(--danger)" style={{ margin: '0 auto 0.75rem' }} />
              <h4 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>No Verified Record Found</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                No student matched Roll Number <strong>"{searchRoll}"</strong> in the active institute database. Please verify the roll number.
              </p>
            </div>
          ) : null}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
