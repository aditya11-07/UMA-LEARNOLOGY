import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, HelpCircle, Save, Plus, Trash2, Edit } from '../Icons';

export const EditFaqModal = ({ isOpen, onClose, faq = null, editingFaqId = null }) => {
  const { faqs, addFaq, updateFaq, deleteFaq } = useApp();

  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    category: 'General Questions',
    question: '',
    answer: ''
  });

  const categories = [
    'General Questions',
    'Batches & Timings',
    'Fee & Payment',
    'Course & Syllabus',
    'Study Materials & Tests',
    'Online & Hybrid Modes'
  ];

  useEffect(() => {
    const activeTargetId = (faq && (typeof faq === 'string' ? faq : faq.id)) || editingFaqId;
    if (activeTargetId) {
      setSelectedId(activeTargetId);
      const target = (faq && typeof faq === 'object' && faq.question) ? faq : faqs.find(f => f.id === activeTargetId);
      if (target) {
        setFormData({
          category: target.category || 'General Questions',
          question: target.question || '',
          answer: target.answer || ''
        });
      }
    } else {
      setSelectedId(null);
      setFormData({
        category: 'General Questions',
        question: '',
        answer: ''
      });
    }
  }, [faq, editingFaqId, isOpen, faqs]);

  if (!isOpen) return null;

  const handleSelectFaqToEdit = (faq) => {
    setSelectedId(faq.id);
    setFormData({
      category: faq.category || 'General Questions',
      question: faq.question || '',
      answer: faq.answer || ''
    });
  };

  const handleStartNewFaq = () => {
    setSelectedId(null);
    setFormData({
      category: 'General Questions',
      question: '',
      answer: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) return;

    if (selectedId) {
      updateFaq(selectedId, formData);
    } else {
      addFaq(formData);
    }
    onClose();
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this FAQ question from the public portal?')) {
      deleteFaq(id);
      if (selectedId === id) {
        handleStartNewFaq();
      }
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card modal-card-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HelpCircle size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Teacher Editor: FAQs Management</h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Add new student questions or edit existing answers displayed on the public portal
              </p>
            </div>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={onClose} style={{ padding: '6px' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '1.5rem', padding: '1.5rem' }}>
          {/* Left Column: Existing FAQs List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderRight: '1px solid var(--border-color)', paddingRight: '1.25rem', maxHeight: '500px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                Questions on Portal ({faqs.length})
              </span>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                style={{ fontSize: '0.75rem', padding: '3px 8px' }}
                onClick={handleStartNewFaq}
              >
                <Plus size={13} /> Add New
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  onClick={() => handleSelectFaqToEdit(faq)}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: selectedId === faq.id ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    background: selectedId === faq.id ? 'var(--primary-light)' : 'var(--bg-card)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '4px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                      {faq.category}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(faq.id, e)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '2px' }}
                      title="Delete FAQ"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '2px', color: 'var(--text-main)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {faq.question}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Form Editor */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {selectedId ? <><Edit size={16} /> Edit Selected FAQ</> : <><Plus size={16} /> Create New FAQ Question</>}
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Question Title *</label>
              <input
                type="text"
                required
                className="form-control"
                placeholder="e.g. Can I attend a free demo class before enrolling?"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Detailed Answer *</label>
              <textarea
                rows="6"
                required
                className="form-control"
                placeholder="Write a clear, helpful response explaining policies, timings, syllabus, or guarantees..."
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                <Save size={16} /> {selectedId ? 'Update FAQ' : 'Save & Publish FAQ'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
