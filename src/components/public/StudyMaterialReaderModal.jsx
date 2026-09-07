import React from 'react';
import { FileText, Printer, Download, X, BookOpen, CheckCircle2 } from '../Icons';
import { useApp } from '../../context/AppContext';

export const StudyMaterialReaderModal = ({ material, onClose }) => {
  const { showToast } = useApp();

  if (!material) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast(`Downloading PDF: ${material.title}`);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card modal-card-lg"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '850px', maxHeight: '92vh', background: '#ffffff', color: '#0f172a' }}
      >
        {/* Top Header (No Print) */}
        <div className="modal-header no-print" style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} color="#ea580c" />
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#0f172a', margin: 0 }}>{material.title}</h3>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Subject: {material.subject} • {material.fileSize} • Official Revision Material
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button className="btn btn-primary btn-sm" onClick={handlePrint}>
              <Printer size={16} /> Print Handbook
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleDownload}>
              <Download size={16} /> Download PDF
            </button>
            <button className="btn btn-secondary btn-icon-only" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Handbook Reader Body */}
        <div
          className="modal-body printable-area"
          style={{
            padding: '2.5rem',
            overflowY: 'auto',
            background: '#ffffff',
            color: '#1e293b',
            lineHeight: 1.7,
            fontFamily: 'var(--font-body)'
          }}
        >
          <div style={{ paddingBottom: '1rem', borderBottom: '2px solid #ea580c', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '1px' }}>
              UMA LEARNOLOGY ACADEMIC HANDBOOK
            </span>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#0f172a', marginTop: '4px', marginBottom: '6px' }}>
              {material.title}
            </h1>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Target: {material.targetClass} • Verified Educational Resource
            </div>
          </div>

          {/* Full Content Text */}
          <div style={{ whiteSpace: 'pre-line', fontSize: '0.95rem' }}>
            {material.fullContent || `
### 1. FOUNDATIONS & CORE CONCEPTS
This handbook contains official formulas, mnemonics, and solved examples designed for comprehensive mastery.

### 2. SOLVED PRACTICE EXAMPLES
- **Concept 1:** Line-by-line breakdown with examiner step marking rubrics.
- **Concept 2:** Rapid elimination techniques to solve questions within 10 seconds.
- **Concept 3:** High-yield vocabulary, root words, and structural frameworks.

### 3. EXAMINER STEP MARKING RUBRICS
Always structure your answers with clear introductory thesis statements, cohesive body arguments, and formal conclusions.
            `}
          </div>

          <div style={{
            marginTop: '2.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: '#94a3b8'
          }}>
            <div>© UMA Learnology Coaching Institute. All Rights Reserved.</div>
            <div>Authored by Cambridge CELTA Certified Faculty Desk</div>
          </div>
        </div>
      </div>
    </div>
  );
};
