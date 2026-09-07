import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import defaultLogo from '../../assets/logo.png';
import { QRCodeSVG } from 'qrcode.react';
import {
  IdCard,
  RotateCw,
  Printer,
  Download,
  CheckCircle,
  User,
  ShieldCheck,
  Phone,
  Calendar,
  Sparkles,
  Search,
  Eye,
  CheckCircle2,
  GraduationCap,
  Layers,
  Palette
} from '../Icons';

export const IDCardStudio = () => {
  const {
    students,
    selectedStudentId,
    setSelectedStudentId,
    idCardTheme,
    setIdCardTheme,
    coachingInfo,
    showToast
  } = useApp();

  const [isFlipped, setIsFlipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBulkView, setIsBulkView] = useState(false);
  const [showHologram, setShowHologram] = useState(true);
  const [showBarcode, setShowBarcode] = useState(true);

  const currentStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.batch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast(`Digital ID Badge for ${currentStudent.name} downloaded successfully.`);
  };

  // QR Code payload containing verified credentials
  const qrPayload = JSON.stringify({
    org: coachingInfo.name,
    rollNo: currentStudent.rollNo,
    name: currentStudent.name,
    batch: currentStudent.batch,
    validTill: currentStudent.validTill,
    verifyUrl: `https://umalearnology.com/verify?roll=${currentStudent.rollNo}`
  });

  return (
    <div className="section" style={{ background: 'var(--bg-main)', minHeight: '85vh' }}>
      <div className="container">
        {/* Title */}
        <div className="section-title-wrap no-print">
          <div className="section-badge">
            <IdCard size={14} /> Official ID Card Studio & Badge Generator
          </div>
          <h2 className="section-title">Smart Digital Student ID Cards</h2>
          <p className="section-subtitle">
            Tamper-proof digital and printable ID badges equipped with scannable QR verification, barcode, hologram seal, and batch details.
          </p>
        </div>

        {/* View Toggle (Single Studio vs Bulk Print) */}
        <div className="no-print" style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <button
            className={`btn btn-sm ${!isBulkView ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setIsBulkView(false)}
          >
            <IdCard size={16} /> 3D Interactive Studio & Theme Customizer
          </button>
          <button
            className={`btn btn-sm ${isBulkView ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setIsBulkView(true)}
          >
            <Printer size={16} /> Bulk Print All Badges ({students.length} Students)
          </button>
        </div>

        {!isBulkView ? (
          /* Single Card Studio View */
          <div className="idcard-studio-layout">
            {/* Left: Interactive 3D Card Display */}
            <div className="idcard-preview-stage">
              <div className="no-print" style={{ display: 'flex', gap: '0.75rem', width: '100%', maxWidth: '330px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <RotateCw size={16} /> Flip Card ({isFlipped ? 'Back' : 'Front'})
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handlePrint}
                >
                  <Printer size={16} /> Print ID
                </button>
              </div>

              {/* 3D Perspective Card Wrapper */}
              <div className={`id-card-perspective ${idCardTheme ? `id-theme-${idCardTheme}` : 'id-theme-emerald'}`}>
                <div className={`id-card-flipper ${isFlipped ? 'flipped' : ''}`}>
                  
                  {/* FRONT SIDE */}
                  <div className="id-card-side id-card-front">
                    {/* Lanyard Hole */}
                    <div className="id-card-slot"></div>

                    {/* Card Header */}
                    <div style={{ textAlign: 'center', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '2px' }}>
                        <div style={{ width: '26px', height: '26px', borderRadius: '50%', overflow: 'hidden', border: '1.5px solid #f59e0b', background: '#fff', flexShrink: 0 }}>
                          <img src={coachingInfo.logo && coachingInfo.logo !== '/logo.png' ? coachingInfo.logo : defaultLogo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                          {coachingInfo.name}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.62rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Official Student Identity Badge
                      </div>
                    </div>

                    {/* Photo & Hologram */}
                    <div style={{ position: 'relative', width: '92px', height: '92px', margin: '0 auto 0.65rem' }}>
                      <div style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '3px solid #f59e0b',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.4)'
                      }}>
                        <img src={currentStudent.photo} alt={currentStudent.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>

                      {showHologram && (
                        <div
                          className="id-hologram-seal"
                          style={{ position: 'absolute', bottom: '-4px', right: '-4px' }}
                          title="Verified Tamper-Proof Hologram"
                        >
                          <ShieldCheck size={18} color="#ffffff" />
                        </div>
                      )}
                    </div>

                    {/* Student Info */}
                    <div style={{ textAlign: 'center', marginBottom: '0.65rem' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
                        {currentStudent.name}
                      </h3>
                      <div style={{
                        display: 'inline-block',
                        background: '#f59e0b',
                        color: '#000000',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 900,
                        fontSize: '0.8rem',
                        padding: '2px 10px',
                        borderRadius: '4px'
                      }}>
                        {currentStudent.rollNo}
                      </div>
                    </div>

                    {/* Details Rows */}
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.25)',
                      borderRadius: '10px',
                      padding: '0.6rem 0.85rem',
                      fontSize: '0.74rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      marginBottom: 'auto'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ opacity: 0.75 }}>Program:</span>
                        <strong style={{ maxWidth: '170px', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {currentStudent.courseName}
                        </strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ opacity: 0.75 }}>Batch:</span>
                        <strong>{currentStudent.batch}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ opacity: 0.75 }}>Blood Group:</span>
                        <strong>{currentStudent.bloodGroup || 'O+'}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ opacity: 0.75 }}>Valid Till:</span>
                        <strong style={{ color: '#34d399' }}>{currentStudent.validTill}</strong>
                      </div>
                    </div>

                    {/* Barcode Strip */}
                    {showBarcode && (
                      <div style={{
                        marginTop: '0.4rem',
                        background: '#ffffff',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        textAlign: 'center',
                        color: '#000'
                      }}>
                        <div style={{ fontFamily: 'monospace', letterSpacing: '4px', fontSize: '0.82rem', fontWeight: 900 }}>
                          ||| | |||| | ||||| ||| ||||
                        </div>
                        <div style={{ fontSize: '0.55rem', letterSpacing: '1px', marginTop: '-2px' }}>
                          AUTH: {currentStudent.rollNo}-VERIFIED
                        </div>
                      </div>
                    )}
                  </div>

                  {/* BACK SIDE */}
                  <div className="id-card-side id-card-back">
                    {/* Lanyard Hole */}
                    <div className="id-card-slot"></div>

                    <div style={{ textAlign: 'center', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#f59e0b', textTransform: 'uppercase' }}>
                        Emergency & Verification Portal
                      </div>
                      <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>
                        Scan QR code to verify student status online
                      </div>
                    </div>

                    {/* QR Code Container */}
                    <div style={{
                      background: '#ffffff',
                      padding: '8px',
                      borderRadius: '10px',
                      width: '110px',
                      height: '110px',
                      margin: '0 auto 0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}>
                      <QRCodeSVG value={qrPayload} size={94} level="M" />
                    </div>

                    {/* Address & Emergency info */}
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.25)',
                      borderRadius: '10px',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.72rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      marginBottom: 'auto'
                    }}>
                      <div>
                        <span style={{ opacity: 0.75 }}>Guardian: </span>
                        <strong>{currentStudent.parentName} ({currentStudent.parentPhone})</strong>
                      </div>
                      <div>
                        <span style={{ opacity: 0.75 }}>Campus: </span>
                        <span>{coachingInfo.address}</span>
                      </div>
                      <div>
                        <span style={{ opacity: 0.75 }}>Helpline: </span>
                        <strong>{coachingInfo.phone}</strong>
                      </div>
                    </div>

                    {/* Terms & Signature */}
                    <div style={{
                      marginTop: '0.5rem',
                      paddingTop: '0.5rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      fontSize: '0.62rem'
                    }}>
                      <div style={{ opacity: 0.8, maxWidth: '140px' }}>
                        Card must be worn in campus & test centers at all times.
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'cursive', fontSize: '0.85rem', color: '#f59e0b' }}>Uma Nandini</div>
                        <div style={{ opacity: 0.75 }}>Director Signature</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="no-print" style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '330px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                  onClick={handleDownload}
                >
                  <Download size={15} /> Download Digital Badge
                </button>
              </div>
            </div>

            {/* Right: Studio Customizer & Student Selector */}
            <div className="no-print">
              {/* Studio Controls Card */}
              <div className="card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Palette size={18} color="var(--primary)" /> ID Badge Customizer & Theme
                </h3>

                {/* Theme Selector */}
                <div className="form-group">
                  <label className="form-label">Select ID Badge Theme</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                    {[
                      { id: 'emerald', label: 'Emerald Mint', color: '#10b981' },
                      { id: 'indigo', label: 'Royal Indigo', color: '#6366f1' },
                      { id: 'gold', label: 'Amber Gold', color: '#f59e0b' },
                      { id: 'cyber', label: 'Cyber Dark', color: '#f97316' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        className={`btn btn-sm ${idCardTheme === t.id ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setIdCardTheme(t.id)}
                        style={{ fontSize: '0.8rem', padding: '0.5rem' }}
                      >
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: t.color, display: 'inline-block' }}></span>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggle Controls */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                    <input
                      type="checkbox"
                      checked={showHologram}
                      onChange={(e) => setShowHologram(e.target.checked)}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span>Tamper-Proof Hologram Seal</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                    <input
                      type="checkbox"
                      checked={showBarcode}
                      onChange={(e) => setShowBarcode(e.target.checked)}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span>Barcode & Auth Verification</span>
                  </label>
                </div>
              </div>

              {/* Student Roster Selector */}
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.15rem' }}>Select Student ({students.length})</h3>
                  <span className="badge badge-primary">Active Enrollments</span>
                </div>

                {/* Search */}
                <div style={{ position: 'relative', marginBottom: '1rem' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search by name, roll no, or batch..."
                    className="form-control"
                    style={{ paddingLeft: '38px', fontSize: '0.88rem' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Student List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '320px', overflowY: 'auto' }}>
                  {filteredStudents.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedStudentId(s.id)}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        background: selectedStudentId === s.id ? 'var(--primary-light)' : 'var(--bg-card-subtle)',
                        border: selectedStudentId === s.id ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary)' }}>
                          <img src={s.photo} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{s.name}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.batch}</div>
                        </div>
                      </div>

                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.8rem', color: 'var(--primary)' }}>
                        {s.rollNo}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Bulk Print View */
          <div>
            <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', background: 'var(--bg-card)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem' }}>Printable Batch ID Sheet (A4 Ready)</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Formatted with crop guides for direct multi-up color printing on standard A4 PVC card paper.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn btn-primary btn-sm" onClick={handlePrint}>
                  <Printer size={16} /> Print Sheet Now
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setIsBulkView(false)}>
                  Back to Single Studio
                </button>
              </div>
            </div>

            {/* Bulk Cards Printable Grid */}
            <div className="idcard-bulk-grid printable-area">
              {students.map((stu) => (
                <div
                  key={stu.id}
                  className={`id-theme-${idCardTheme || 'emerald'}`}
                  style={{
                    width: '280px',
                    height: '430px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    margin: '0 auto',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid #000'
                  }}
                >
                  <div className="id-card-side" style={{ position: 'relative', width: '100%', height: '100%', padding: '1rem' }}>
                    <div className="id-card-slot" style={{ marginTop: '4px' }}></div>
                    <div style={{ textAlign: 'center', margin: '4px 0 8px' }}>
                      <div style={{ fontWeight: 900, fontSize: '0.95rem' }}>{coachingInfo.name}</div>
                      <div style={{ fontSize: '0.55rem', opacity: 0.8 }}>STUDENT IDENTITY BADGE</div>
                    </div>

                    <div style={{ width: '74px', height: '74px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #f59e0b', margin: '0 auto 6px' }}>
                      <img src={stu.photo} alt={stu.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '6px' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#fff' }}>{stu.name}</div>
                      <div style={{ display: 'inline-block', background: '#f59e0b', color: '#000', fontFamily: 'monospace', fontWeight: 900, fontSize: '0.75rem', padding: '1px 6px', borderRadius: '3px' }}>
                        {stu.rollNo}
                      </div>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '6px', fontSize: '0.68rem', display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: 'auto' }}>
                      <div><strong>Course:</strong> {stu.courseName}</div>
                      <div><strong>Batch:</strong> {stu.batch}</div>
                      <div><strong>Valid:</strong> {stu.validTill}</div>
                    </div>

                    <div style={{ background: '#fff', padding: '2px', borderRadius: '3px', textAlign: 'center', color: '#000', marginTop: '4px' }}>
                      <div style={{ fontFamily: 'monospace', letterSpacing: '3px', fontSize: '0.7rem', fontWeight: 900 }}>
                        ||| | |||| | ||||| |||
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
