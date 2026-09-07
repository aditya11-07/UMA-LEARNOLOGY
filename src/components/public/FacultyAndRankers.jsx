import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Award, Star, Quote, CheckCircle2, Trophy, Sparkles, Plus, Edit } from '../Icons';

export const FacultyAndRankers = () => {
  const { faculty, rankers, isTeacherMode, navigateToAdmin } = useApp();

  return (
    <div>
      {/* Faculty Showcase */}
      <section className="section" id="faculty" style={{ background: 'var(--bg-card)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <div className="section-badge">
              <Users size={14} /> Master Mentors & Language Coaches
            </div>
            <h2 className="section-title">Learn from Certified Language & Exam Masters</h2>
            <p className="section-subtitle">
              Our faculty members hold Cambridge CELTA, British Council certifications, and Ph.D. degrees, dedicated to making English natural, intuitive, and high-scoring.
            </p>
            {isTeacherMode && (
              <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ borderRadius: 'var(--radius-full)', padding: '0.35rem 0.9rem', fontSize: '0.78rem' }}
                  onClick={() => navigateToAdmin('faculty')}
                  title="Add, Edit or Delete Faculty Members"
                >
                  <Plus size={13} /> Teacher: Manage Faculty Profiles
                </button>
              </div>
            )}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {faculty.map((fac) => (
              <div key={fac.id} className="card card-interactive" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {isTeacherMode && (
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ position: 'absolute', top: '12px', right: '12px', padding: '2px 8px', fontSize: '0.72rem' }}
                    onClick={() => navigateToAdmin('faculty', fac.id)}
                    title="Edit Faculty in Admin"
                  >
                    <Edit size={12} /> Edit
                  </button>
                )}
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  margin: '0 auto 1.25rem',
                  overflow: 'hidden',
                  border: '4px solid var(--primary-light)',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <img src={fac.photo} alt={fac.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{fac.name}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.4rem' }}>
                  {fac.designation}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 600 }}>
                  {fac.qualification}
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1.25rem', flex: 1 }}>
                  {fac.bio}
                </p>

                <div style={{
                  background: 'var(--bg-card-subtle)',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.82rem',
                  fontStyle: 'italic',
                  color: 'var(--text-main)',
                  borderLeft: '3px solid var(--primary)',
                  textAlign: 'left'
                }}>
                  "{fac.quote}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wall of Fame / Rankers */}
      <section className="section" id="rankers" style={{ background: 'var(--bg-main)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <div className="section-badge" style={{ background: 'var(--warning-light)', color: 'var(--accent-hover)', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
              <Trophy size={14} /> Wall of Fame & Selections
            </div>
            <h2 className="section-title">Our Proud Champions & Toppers</h2>
            <p className="section-subtitle">
              Proof of our methodology: hear from students who transformed their speaking confidence and secured top exam ranks across India and abroad.
            </p>
            {isTeacherMode && (
              <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ borderRadius: 'var(--radius-full)', padding: '0.35rem 0.9rem', fontSize: '0.78rem' }}
                  onClick={() => navigateToAdmin('rankers')}
                  title="Add, Edit or Remove Achievers"
                >
                  <Plus size={13} /> Teacher: Manage Champions & Toppers
                </button>
              </div>
            )}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem'
          }}>
            {rankers.map((ranker, idx) => (
              <div key={idx} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {isTeacherMode && (
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ position: 'absolute', top: '12px', right: '12px', padding: '2px 8px', fontSize: '0.72rem' }}
                    onClick={() => navigateToAdmin('rankers', ranker.id)}
                    title="Edit Ranker in Admin"
                  >
                    <Edit size={12} /> Edit
                  </button>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: '68px', height: '68px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #f59e0b', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>
                    <img src={ranker.photo} alt={ranker.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem' }}>{ranker.name}</h3>
                    <div style={{
                      display: 'inline-block',
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      color: '#ffffff',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      marginTop: '3px'
                    }}>
                      {ranker.rank}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '3px', fontWeight: 600 }}>
                      {ranker.college}
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'var(--bg-card-subtle)',
                  padding: '1.15rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  flex: 1,
                  display: 'flex',
                  alignItems: 'flex-start',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <Quote size={20} color="var(--primary)" style={{ opacity: 0.6, marginRight: '8px', flexShrink: 0, marginTop: '2px' }} />
                  <span>"{ranker.testimonial}"</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
