import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudyMaterialReaderModal } from './StudyMaterialReaderModal';
import { FileText, Download, Check, Sparkles, BookOpen, Search, ArrowDownCircle, Eye, Plus, Edit } from '../Icons';

export const StudyMaterialPublic = () => {
  const { studyMaterials, showToast, isTeacherMode, navigateToAdmin } = useApp();
  const [search, setSearch] = useState('');
  const [downloadingId, setDownloadingId] = useState(null);
  const [readingMaterial, setReadingMaterial] = useState(null);

  const filtered = studyMaterials.filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = (material) => {
    setDownloadingId(material.id);
    setTimeout(() => {
      setDownloadingId(null);
      showToast(`Downloaded PDF Handbook: ${material.title}`);
    }, 700);
  };

  return (
    <section className="section" id="study-materials" style={{ background: 'var(--bg-card)' }}>
      <div className="container">
        <div className="section-title-wrap">
          <div className="section-badge">
            <BookOpen size={14} /> Free Learning Resources & Handbooks
          </div>
          <h2 className="section-title">Faculty Notes, Idiom Bibles & Rulebooks</h2>
          <p className="section-subtitle">
            Read online or download our faculty-curated 100 Golden Grammar Rules handbook, 5,000 idioms bible, and Board exam answer writing blueprints.
          </p>
          {isTeacherMode && (
            <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              <button
                className="btn btn-primary btn-sm"
                style={{ borderRadius: 'var(--radius-full)', padding: '0.35rem 0.9rem', fontSize: '0.78rem' }}
                onClick={() => navigateToAdmin('materials')}
                title="Upload Handouts, Notes & PDFs"
              >
                <Plus size={13} /> Teacher: Upload & Manage Notes
              </button>
            </div>
          )}
        </div>

        {/* Search */}
        <div style={{ maxWidth: '500px', margin: '0 auto 2.5rem', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search notes by topic, grammar rule, or exam..."
            className="form-control"
            style={{ paddingLeft: '46px', borderRadius: 'var(--radius-full)' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.75rem'
        }}>
          {filtered.map((mat) => (
            <div key={mat.id} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="badge badge-primary">{mat.subject}</span>
                  {isTeacherMode && (
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '2px 8px', fontSize: '0.7rem', height: '22px' }}
                      onClick={() => navigateToAdmin('materials', mat.id)}
                      title="Edit this Study Material in Admin"
                    >
                      <Edit size={11} /> Edit
                    </button>
                  )}
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  {mat.fileSize} • {mat.fileType}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.65rem', lineHeight: 1.35 }}>
                {mat.title}
              </h3>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem', flex: 1, lineHeight: 1.55 }}>
                {mat.description}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-color)',
                gap: '0.5rem'
              }}>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => setReadingMaterial(mat)}
                >
                  <Eye size={15} /> Read Online
                </button>

                <button
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => handleDownload(mat)}
                >
                  {downloadingId === mat.id ? <Check size={15} /> : <Download size={15} />}
                  <span>{downloadingId === mat.id ? 'Saved' : 'Download'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <FileText size={48} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
            <h3>No study materials found</h3>
            <button
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '1rem' }}
              onClick={() => setSearch('')}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Reader Modal */}
      {readingMaterial && (
        <StudyMaterialReaderModal
          material={readingMaterial}
          onClose={() => setReadingMaterial(null)}
        />
      )}
    </section>
  );
};
