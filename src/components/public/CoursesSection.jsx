import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Atom,
  GraduationCap,
  Award,
  Star,
  CheckCircle,
  Calendar,
  Clock,
  ArrowRight,
  Info,
  X,
  Search,
  Download,
  Sparkles,
  CheckCircle2,
  Edit,
  Plus,
  DollarSign
} from '../Icons';
import { QuickPriceModal } from './QuickPriceModal';

export const CoursesSection = () => {
  const { courses, openAdmissionForCourse, navigateToAdmin, showToast, isTeacherMode } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourseDetails, setActiveCourseDetails] = useState(null);
  const [quickPriceCourse, setQuickPriceCourse] = useState(null);

  // Dynamically extract categories from current courses
  const categories = ['All', ...Array.from(new Set(courses.map(c => c.category)))];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.targetClass.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCourseIcon = (iconName) => {
    switch (iconName) {
      case 'Atom': return <Atom size={24} color="var(--primary)" />;
      case 'Award': return <Award size={24} color="var(--accent)" />;
      case 'GraduationCap': return <GraduationCap size={24} color="var(--secondary)" />;
      default: return <BookOpen size={24} color="var(--primary)" />;
    }
  };

  const handleDownloadBrochure = (course) => {
    showToast(`Downloading official course brochure & syllabus for: ${course.title}`);
  };

  return (
    <section className="section" id="courses" style={{ background: 'var(--bg-main)' }}>
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-badge">
            <BookOpen size={14} /> Comprehensive Academic Programs
          </div>
          <h2 className="section-title">Programs Designed for Peak Results</h2>
          <p className="section-subtitle">
            From foundational fluency to high-stakes competitive examinations and board boosters, our structured curriculum delivers concept mastery, rigorous practice, and top percentiles.
          </p>
          {isTeacherMode && (
            <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary btn-sm"
                style={{ borderRadius: 'var(--radius-full)', padding: '0.35rem 0.9rem', fontSize: '0.78rem' }}
                onClick={() => navigateToAdmin('courses')}
                title="Create New Course"
              >
                <Plus size={13} /> Teacher: Add New Course
              </button>
              <button
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: 'var(--radius-full)', padding: '0.35rem 0.9rem', fontSize: '0.78rem' }}
                onClick={() => navigateToAdmin('courses')}
                title="Open Teacher Fast Price Manager Table"
              >
                <DollarSign size={13} color="var(--primary)" /> 1-Click Fast Price Table
              </button>
            </div>
          )}
        </div>

        {/* Search & Dynamic Category Tabs */}
        <div style={{ maxWidth: '800px', margin: '0 auto 3rem' }}>
          {/* Search bar */}
          <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search courses by keyword, exam (IELTS, SSC, Boards), or class..."
              className="form-control"
              style={{ paddingLeft: '46px', borderRadius: 'var(--radius-full)' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Dynamic Categories */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-full)', padding: '0.45rem 1.15rem' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '2rem'
        }}>
          {filteredCourses.map((course) => (
            <div key={course.id} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Card Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: 'var(--bg-card-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border-color)'
                }}>
                  {getCourseIcon(course.icon)}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <span className="badge badge-primary">{course.badge}</span>
                    {isTeacherMode && (
                      <>
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '2px 6px', fontSize: '0.7rem', height: '22px' }}
                          onClick={() => setQuickPriceCourse(course)}
                          title="Quick Price Adjustment"
                        >
                          <DollarSign size={11} color="var(--primary)" /> ₹ Fee
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '2px 6px', fontSize: '0.7rem', height: '22px' }}
                          onClick={() => navigateToAdmin('courses', course.id)}
                          title="Edit this Course details in Teacher Suite"
                        >
                          <Edit size={11} /> Edit
                        </button>
                      </>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-hover)' }}>
                    <Star size={14} fill="#f59e0b" color="#f59e0b" />
                    <span>{course.rating}</span>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>({course.reviewsCount})</span>
                  </div>
                </div>
              </div>

              {/* Title & Category */}
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '4px' }}>
                {course.category}
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                {course.title}
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.55, flex: 1 }}>
                {course.description}
              </p>

              {/* Key Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem', background: 'var(--bg-card-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                {course.highlights.slice(0, 2).map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem' }}>
                    <CheckCircle size={15} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Meta Tags */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={15} color="var(--primary)" />
                  <span>{course.duration}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={15} color="var(--primary)" />
                  <span>{course.mode}</span>
                </div>
              </div>

              {/* Price & Actions */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-color)',
                marginTop: 'auto'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Program Fee</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-main)' }}>
                    ₹{course.totalFee.toLocaleString()}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setActiveCourseDetails(course)}
                    title="View Full Syllabus & Details"
                  >
                    <Info size={16} /> Details
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => openAdmissionForCourse(course)}
                  >
                    <span>Enroll Now</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <BookOpen size={48} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
            <h3>No matching courses found</h3>
            <p style={{ marginTop: '0.5rem' }}>Try clearing your search query or selecting "All" categories.</p>
            <button
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '1rem' }}
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Course Details Modal */}
      {activeCourseDetails && (
        <div className="modal-backdrop" onClick={() => setActiveCourseDetails(null)}>
          <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getCourseIcon(activeCourseDetails.icon)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem' }}>{activeCourseDetails.title}</h3>
                  <span className="badge badge-primary">{activeCourseDetails.category}</span>
                </div>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setActiveCourseDetails(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {activeCourseDetails.description}
              </p>

              {/* Specs Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem',
                background: 'var(--bg-card-subtle)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>TARGET AUDIENCE</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '2px' }}>{activeCourseDetails.targetClass}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>DURATION & PACE</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '2px' }}>{activeCourseDetails.duration}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>DELIVERY MODE</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '2px' }}>{activeCourseDetails.mode}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL TUITION FEE</div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)', marginTop: '2px' }}>₹{activeCourseDetails.totalFee.toLocaleString()}</div>
                </div>
              </div>

              {/* Full Curriculum Breakdown */}
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={18} color="var(--primary)" /> Detailed Syllabus Modules
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                {activeCourseDetails.curriculum.map((item, idx) => (
                  <div key={idx} style={{
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* What You'll Get */}
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>Program Features & Benefits</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1rem' }}>
                {activeCourseDetails.highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem' }}>
                    <CheckCircle2 size={16} color="var(--secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => handleDownloadBrochure(activeCourseDetails)}
              >
                <Download size={16} /> Download Syllabus PDF
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  const targetCourse = activeCourseDetails;
                  setActiveCourseDetails(null);
                  openAdmissionForCourse(targetCourse);
                }}
              >
                <Sparkles size={16} /> Apply / Book Free Demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Price Adjustment Modal */}
      <QuickPriceModal
        isOpen={Boolean(quickPriceCourse)}
        course={quickPriceCourse}
        onClose={() => setQuickPriceCourse(null)}
      />
    </section>
  );
};
