import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import {
  UserCheck,
  Award,
  Calendar,
  IdCard,
  BookOpen,
  HelpCircle,
  Download,
  Printer,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Send,
  FileText,
  Clock,
  ChevronRight,
  TrendingUp,
  RotateCw,
  GraduationCap,
  ShieldCheck,
  CreditCard,
  MessageSquare,
  BarChart2,
  CheckCircle,
  AlertTriangle
} from '../Icons';

export const StudentPortal = () => {
  const {
    students,
    activeStudentRoll,
    setActiveStudentRoll,
    studyMaterials,
    doubts,
    addDoubt,
    coachingInfo,
    showToast,
    recordFeePayment
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'attendance' | 'tests' | 'doubts' | 'materials' | 'idcard'
  const [doubtSubject, setDoubtSubject] = useState('English Grammar');
  const [doubtTopic, setDoubtTopic] = useState('');
  const [doubtQuestion, setDoubtQuestion] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  // Quick Pay Modal inside student portal
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [payAmount, setPayAmount] = useState('');

  // Active student object
  const currentStudent = students.find((s) => s.rollNo === activeStudentRoll) || students[0];
  const balance = (Number(currentStudent.totalFee) || 0) - (Number(currentStudent.paidFee) || 0);

  // Filter doubts for this student
  const studentDoubts = doubts.filter(d => d.studentRoll === currentStudent.rollNo);

  const handleDoubtSubmit = (e) => {
    e.preventDefault();
    if (!doubtTopic || !doubtQuestion) {
      showToast('Please enter both topic and doubt question.', 'error');
      return;
    }

    addDoubt({
      studentRoll: currentStudent.rollNo,
      studentName: currentStudent.name,
      subject: doubtSubject,
      topic: doubtTopic,
      question: doubtQuestion
    });

    setDoubtTopic('');
    setDoubtQuestion('');
  };

  const handleQuickPay = (e) => {
    e.preventDefault();
    if (!payAmount || Number(payAmount) <= 0) {
      showToast('Please enter a valid payment amount.', 'error');
      return;
    }

    recordFeePayment({
      studentId: currentStudent.id,
      amount: payAmount,
      paymentMode: 'Student Portal UPI',
      remarks: `Student Portal Online Payment for ${currentStudent.batch}`,
      collectedBy: 'Student Portal Gateway'
    });

    setIsPayModalOpen(false);
    setPayAmount('');
  };

  const qrPayload = JSON.stringify({
    org: coachingInfo.name,
    rollNo: currentStudent.rollNo,
    name: currentStudent.name,
    batch: currentStudent.batch,
    validTill: currentStudent.validTill,
    verifyUrl: `https://umalearnology.com/verify?roll=${currentStudent.rollNo}`
  });

  return (
    <div className="section" style={{ background: 'var(--bg-main)', minHeight: '85vh', paddingTop: '2.5rem' }}>
      <div className="container">
        {/* Portal Header & Student Switcher */}
        <div className="card no-print" style={{
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #1e1b4b 100%)',
          color: '#fff',
          border: '1px solid rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #f59e0b',
                boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
                flexShrink: 0
              }}>
                <img src={currentStudent.photo} alt={currentStudent.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '1.65rem', color: '#fff', fontWeight: 800 }}>{currentStudent.name}</h2>
                  <span style={{
                    background: '#f59e0b',
                    color: '#000',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 900,
                    fontSize: '0.82rem',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}>
                    {currentStudent.rollNo}
                  </span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#a7f3d0', marginTop: '2px' }}>
                  {currentStudent.courseName}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#e2e8f0', opacity: 0.85 }}>
                  Batch: <strong>{currentStudent.batch}</strong> • Valid Till: <strong>{currentStudent.validTill}</strong>
                </div>
              </div>
            </div>

            {/* Switch Student Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <span style={{ fontSize: '0.8rem', color: '#e2e8f0' }}>Switch Profile:</span>
              <select
                value={activeStudentRoll}
                onChange={(e) => setActiveStudentRoll(e.target.value)}
                style={{
                  background: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {students.map((s) => (
                  <option key={s.id} value={s.rollNo}>
                    {s.name} ({s.rollNo})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Portal Navigation Tabs */}
        <div className="no-print" style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          {[
            { id: 'overview', label: 'Academic Overview', icon: UserCheck },
            { id: 'attendance', label: 'Attendance Tracker', icon: Calendar },
            { id: 'tests', label: 'Test Series & Analytics', icon: BarChart2 },
            { id: 'doubts', label: `24x7 Faculty Doubts (${studentDoubts.length})`, icon: HelpCircle },
            { id: 'materials', label: 'Course Notes & Bibles', icon: BookOpen },
            { id: 'idcard', label: 'Digital ID Card Badge', icon: IdCard }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-full)', padding: '0.5rem 1.25rem', whiteSpace: 'nowrap' }}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ACADEMIC OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            {/* Quick KPI Stat Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem'
            }}>
              {/* Attendance */}
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Attendance Rate</span>
                  <div style={{ padding: '6px', background: 'var(--success-light)', borderRadius: '8px', color: 'var(--success)' }}>
                    <Calendar size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--success)' }}>
                  {currentStudent.attendancePercentage}%
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {currentStudent.presentDays || 80} attended of {currentStudent.totalDays || 82} sessions
                </div>
              </div>

              {/* Fee Status */}
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Fee Account Status</span>
                  <div style={{ padding: '6px', background: 'var(--primary-light)', borderRadius: '8px', color: 'var(--primary)' }}>
                    <CreditCard size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: currentStudent.feeStatus === 'Paid' ? 'var(--success)' : 'var(--accent-hover)' }}>
                  {currentStudent.feeStatus}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {balance > 0 ? `Pending Due: ₹${balance.toLocaleString()}` : 'Fully Paid & Cleared'}
                </div>
              </div>

              {/* Recent Test Rank */}
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Recent Exam Rank</span>
                  <div style={{ padding: '6px', background: 'var(--warning-light)', borderRadius: '8px', color: 'var(--accent-hover)' }}>
                    <Award size={18} />
                  </div>
                </div>
                <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--accent-hover)' }}>
                  {currentStudent.recentTestRank}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Score: {currentStudent.recentTestScore}
                </div>
              </div>
            </div>

            {/* Fee Banner if Balance Due */}
            {balance > 0 && (
              <div className="card" style={{
                marginBottom: '2rem',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(234, 88, 12, 0.1) 100%)',
                border: '1px solid var(--warning-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <AlertCircle size={28} color="#ea580c" />
                  <div>
                    <h4 style={{ fontSize: '1.1rem' }}>Tuition Fee Installment Due</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      You have an outstanding balance of <strong>₹{balance.toLocaleString()}</strong> for your current term.
                    </p>
                  </div>
                </div>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setPayAmount(String(balance));
                    setIsPayModalOpen(true);
                  }}
                >
                  <CreditCard size={16} /> Pay Online Now (UPI / Card)
                </button>
              </div>
            )}

            {/* Quick Actions Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div className="card card-interactive" onClick={() => setActiveTab('doubts')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                  <div style={{ padding: '8px', background: 'var(--primary-light)', borderRadius: '8px', color: 'var(--primary)' }}>
                    <HelpCircle size={20} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem' }}>Ask Subject Mentor</h4>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Post grammar, pronunciation, or writing doubts directly to Cambridge certified mentors.
                </p>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Open Doubts Forum <ChevronRight size={16} />
                </span>
              </div>

              <div className="card card-interactive" onClick={() => setActiveTab('idcard')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                  <div style={{ padding: '8px', background: 'var(--secondary-light)', borderRadius: '8px', color: 'var(--secondary)' }}>
                    <IdCard size={20} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem' }}>Digital ID Badge</h4>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  View, flip, and print your tamper-proof student ID badge with verification QR code.
                </p>
                <span style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  View 3D ID Badge <ChevronRight size={16} />
                </span>
              </div>

              <div className="card card-interactive" onClick={() => setActiveTab('materials')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                  <div style={{ padding: '8px', background: 'var(--info-light)', borderRadius: '8px', color: 'var(--info)' }}>
                    <BookOpen size={20} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem' }}>Handbooks & Notes</h4>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Download the 100 Golden Rules grammar book, idiom bibles, and chapter worksheets.
                </p>
                <span style={{ fontSize: '0.85rem', color: 'var(--info)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Browse Handbooks <ChevronRight size={16} />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ATTENDANCE TRACKER */}
        {activeTab === 'attendance' && (
          <div className="card">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={20} color="var(--primary)" /> Attendance Records & Biometric Logs
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '2rem',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              {/* Circular Gauge */}
              <div style={{
                background: 'var(--bg-card-subtle)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'center',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Overall Term Attendance
                </div>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--success)', margin: '0.5rem 0' }}>
                  {currentStudent.attendancePercentage}%
                </div>
                <div style={{ display: 'inline-block', background: 'var(--success-light)', color: 'var(--success)', padding: '3px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>
                  Eligible for Test Series & Certificate
                </div>
              </div>

              {/* Stats Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sessions Held</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{currentStudent.totalDays || 82}</div>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Present Days</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--success)' }}>{currentStudent.presentDays || 80}</div>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Absences</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--danger)' }}>
                    {(currentStudent.totalDays || 82) - (currentStudent.presentDays || 80)}
                  </div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              * Biometric and Audio Lab attendance is synchronized daily at 8:00 PM. A minimum of 75% attendance is required for institute graduation certificates.
            </p>
          </div>
        )}

        {/* TAB 3: TEST SERIES & ANALYTICS */}
        {activeTab === 'tests' && (
          <div className="card">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart2 size={20} color="var(--primary)" /> Mock Test Scores & Percentile Analytics
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {(currentStudent.performanceScores || [
                { test: 'Weekly Grammar Mock 1', score: 92, max: 100 },
                { test: 'Vocabulary & Idiom Sprint', score: 96, max: 100 },
                { test: 'Speaking Interview Assessment', score: 94, max: 100 }
              ]).map((t, idx) => {
                const percentage = Math.round((t.score / t.max) * 100);
                return (
                  <div key={idx} style={{ background: 'var(--bg-card-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.test}</div>
                      <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)' }}>
                        {t.score} / {t.max} ({percentage}%)
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${percentage}%`, height: '100%', background: percentage >= 90 ? 'var(--success)' : 'var(--primary)', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ background: 'var(--bg-card-subtle)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700 }}>Current Batch Standing: {currentStudent.recentTestRank}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Latest Assessment Score: {currentStudent.recentTestScore}</div>
              </div>
              <span className="badge badge-success">Top 5% Performer</span>
            </div>
          </div>
        )}

        {/* TAB 4: 24x7 FACULTY DOUBTS FORUM */}
        {activeTab === 'doubts' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', alignItems: 'start' }}>
            {/* Ask Form */}
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={20} color="var(--primary)" /> Ask Your Subject Mentor
              </h3>

              <form onSubmit={handleDoubtSubmit}>
                <div className="form-group">
                  <label className="form-label">Subject / Domain</label>
                  <select
                    className="form-control"
                    value={doubtSubject}
                    onChange={(e) => setDoubtSubject(e.target.value)}
                  >
                    <option value="English Grammar">English Grammar (Rules & Tenses)</option>
                    <option value="Spoken English & Pronunciation">Spoken English & Pronunciation</option>
                    <option value="Competitive English & Error Spotting">Competitive English & Error Spotting</option>
                    <option value="IELTS & TOEFL Writing/Speaking">IELTS & TOEFL Writing / Speaking</option>
                    <option value="Literature & School Boards">Literature & School Boards</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Topic / Chapter Heading *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Subject-Verb Agreement with 'Neither..nor'"
                    value={doubtTopic}
                    onChange={(e) => setDoubtTopic(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Explain your question in detail *</label>
                  <textarea
                    required
                    rows="4"
                    className="form-control"
                    placeholder="Paste the sentence or describe the exact concept you are finding tricky..."
                    value={doubtQuestion}
                    onChange={(e) => setDoubtQuestion(e.target.value)}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Send size={16} /> Submit Question to Faculty
                </button>
              </form>
            </div>

            {/* Resolved & Pending Doubts List */}
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                Your Doubt History ({studentDoubts.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '450px', overflowY: 'auto' }}>
                {studentDoubts.map((d) => (
                  <div key={d.id} style={{ background: 'var(--bg-card-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span className="badge badge-primary">{d.subject}</span>
                      <span className={`badge badge-${d.status === 'Resolved' ? 'success' : 'warning'}`}>
                        {d.status}
                      </span>
                    </div>

                    <div style={{ fontWeight: 800, fontSize: '0.98rem', marginBottom: '4px' }}>
                      {d.topic}
                    </div>

                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontStyle: 'italic' }}>
                      Q: "{d.question}"
                    </p>

                    {d.response && (
                      <div style={{ background: 'var(--bg-card)', padding: '0.85rem', borderRadius: '8px', borderLeft: '3px solid var(--secondary)', fontSize: '0.85rem' }}>
                        <div style={{ fontWeight: 700, color: 'var(--secondary)', marginBottom: '2px' }}>
                          Mentor Answer ({d.facultyName}):
                        </div>
                        <div style={{ color: 'var(--text-main)', lineHeight: 1.5 }}>{d.response}</div>
                      </div>
                    )}
                  </div>
                ))}

                {studentDoubts.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    <HelpCircle size={40} style={{ margin: '0 auto 0.5rem', opacity: 0.5 }} />
                    <p>No doubts asked yet. Use the form on the left to ask any subject question!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: STUDY MATERIALS */}
        {activeTab === 'materials' && (
          <div className="card">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={20} color="var(--primary)" /> Enrolled Course Study Handbooks & Bibles
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {studyMaterials.map((mat) => (
                <div key={mat.id} style={{ background: 'var(--bg-card-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className="badge badge-primary">{mat.subject}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{mat.fileSize}</span>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', lineHeight: 1.35 }}>{mat.title}</h4>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1rem', flex: 1 }}>{mat.description}</p>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => showToast(`Downloading: ${mat.title}`)}
                  >
                    <Download size={15} /> Download PDF Notes
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: DIGITAL ID CARD */}
        {activeTab === 'idcard' && (
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem' }}>Official Digital Student Identity Badge</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Your official tamper-proof credentials with QR verification and barcode.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setIsFlipped(!isFlipped)}>
                  <RotateCw size={16} /> Flip Badge
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => window.print()}>
                  <Printer size={16} /> Print ID Badge
                </button>
              </div>
            </div>

            {/* 3D Card Display */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
              <div className="id-card-perspective id-theme-emerald">
                <div className={`id-card-flipper ${isFlipped ? 'flipped' : ''}`}>
                  
                  {/* FRONT */}
                  <div className="id-card-side id-card-front" style={{ padding: '1.25rem', position: 'relative' }}>
                    <div className="id-card-slot"></div>
                    <div style={{ textAlign: 'center', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '2px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', overflow: 'hidden', border: '1.5px solid #f59e0b', background: '#fff', flexShrink: 0 }}>
                          <img src="/logo.png" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <span style={{ fontWeight: 900, fontSize: '1.05rem' }}>{coachingInfo.name}</span>
                      </div>
                      <div style={{ fontSize: '0.62rem', opacity: 0.85, textTransform: 'uppercase' }}>STUDENT IDENTITY BADGE</div>
                    </div>

                    <div style={{ width: '96px', height: '96px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #f59e0b', margin: '0 auto 0.75rem' }}>
                      <img src={currentStudent.photo} alt={currentStudent.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>{currentStudent.name}</h3>
                      <div style={{ display: 'inline-block', background: '#f59e0b', color: '#000', fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '0.82rem', padding: '2px 8px', borderRadius: '4px' }}>
                        {currentStudent.rollNo}
                      </div>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '0.6rem 0.8rem', fontSize: '0.74rem', display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: 'auto' }}>
                      <div><strong>Course:</strong> {currentStudent.courseName}</div>
                      <div><strong>Batch:</strong> {currentStudent.batch}</div>
                      <div><strong>Valid Till:</strong> {currentStudent.validTill}</div>
                    </div>

                    <div style={{ background: '#fff', padding: '3px', borderRadius: '4px', textAlign: 'center', color: '#000', marginTop: '4px' }}>
                      <div style={{ fontFamily: 'monospace', letterSpacing: '4px', fontSize: '0.8rem', fontWeight: 900 }}>
                        ||| | |||| | ||||| |||
                      </div>
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="id-card-side id-card-back" style={{ padding: '1.25rem', position: 'relative' }}>
                    <div className="id-card-slot"></div>
                    <div style={{ textAlign: 'center', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#f59e0b' }}>OFFICIAL VERIFICATION QR</div>
                      <div style={{ fontSize: '0.62rem', opacity: 0.8 }}>Scan to verify credentials</div>
                    </div>

                    <div style={{ background: '#fff', padding: '6px', borderRadius: '8px', width: '106px', height: '106px', margin: '0 auto 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <QRCodeSVG value={qrPayload} size={92} level="M" />
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '0.6rem 0.8rem', fontSize: '0.72rem', display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: 'auto' }}>
                      <div>Guardian: {currentStudent.parentName}</div>
                      <div>Helpline: {coachingInfo.phone}</div>
                      <div>Campus: {coachingInfo.address}</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Pay Modal */}
      {isPayModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsPayModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CreditCard size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.25rem' }}>Pay Tuition Fee Online</h3>
              </div>
              <button className="btn btn-secondary btn-icon-only" onClick={() => setIsPayModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleQuickPay}>
              <div className="modal-body">
                <div style={{ background: 'var(--bg-card-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
                  <div>Outstanding Due for <strong>{currentStudent.name}</strong> ({currentStudent.rollNo}):</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-hover)', marginTop: '4px' }}>
                    ₹{balance.toLocaleString()}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Payment Amount (INR) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max={balance > 0 ? balance : 50000}
                    className="form-control"
                    placeholder="Enter amount to pay"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Payment Gateway</label>
                  <select className="form-control">
                    <option>Instant UPI / QR Code (GPay / PhonePe)</option>
                    <option>NetBanking / Debit Card</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsPayModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Sparkles size={16} /> Pay ₹{payAmount || balance} Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
